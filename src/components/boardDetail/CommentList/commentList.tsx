import { ChangeEvent, useState } from "react";
import * as S from "../../../../styles/userBoard.styles";
import {
  fetchBoardComment,
  IBoardComment,
} from "../../commons/hooks/reactQuery/query/boardComment";
import { IForm, IFormReply } from "..";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { IBoard } from "../../commons/hooks/reactQuery/query/board";
import {
  fetchReply,
  IReply,
} from "../../commons/hooks/reactQuery/query/boardCommentReply";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaComment, schemaReply } from "../../commons/hooks/yup/validation";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/component";

interface ISSRProps {
  initialData: IBoard;
  dataComment: IBoardComment[];
  userLogin: User | null;
  reply: IReply[];
}

export default function CommentList({
  initialData,
  dataComment,
  userLogin,
  reply,
}: ISSRProps) {
  const router = useRouter();
  const [comment, setComment] = useState<IBoardComment[]>(dataComment);
  const [inputCount, setInputCount] = useState(0);
  const [inputCountComment, setInputCountComment] = useState(0);
  // 댓글 추천 데이터
  const [likeComment, setLikeComment] = useState<IBoardComment[]>(dataComment);
  const [unlikeComment, setUnlikeComment] =
    useState<IBoardComment[]>(dataComment);

  // 댓글 최신순, 인기순 선택 옵션
  const [selectedOption, setSelectedOption] = useState<"popular" | "latest">(
    "latest"
  );

  const boardUserId = String(initialData.user_id);
  const loginUserId = String(userLogin?.id);
  const supabase = createClient();

  // 🚗대댓글 state
  const [replyComment, setReplyComment] = useState<IReply[]>(reply);
  const [commentInputVisible, setCommentInputVisible] = useState<number | null>(
    null
  );
  const [replyInputVisible, setReplyInputVisible] = useState<number | null>(
    null
  );
  // 대댓글의 대댓글 위한 대댓글의 id - 🚗 대댓글 입력시 입력 내용 개별화 하기 위함
  const [commentReplyId, setCommentReplyId] = useState<number | null>(null);

  // 댓글 useForm
  const { register, handleSubmit, trigger, formState, reset } = useForm<IForm>({
    resolver: yupResolver(schemaComment),
    mode: "onChange",
  });

  // 🚗대댓글 useForm
  const {
    register: registerReply,
    handleSubmit: handleSubmitReply,
    formState: formStateReply,
    reset: resetReply,
  } = useForm({
    resolver: yupResolver(schemaReply), // 대댓글 유효성 검사
    mode: "onChange",
  });

  // 댓글
  const onClickSubmit = async (data: IForm) => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
    }

    const { body } = data;

    const { data: dataComment, error: commentError } = await supabase
      .from("comment")
      .insert([{ board_id: router.query.boardId, body }]);

    if (commentError) {
      console.log("댓글 저장 실패: ", commentError.message);
      return;
    }

    const comment_count = comment.length;

    const { data: updateData, error: updateError } = await supabase
      .from("page")
      .update({ comment_count: comment_count + 1 })
      .eq("id", initialData.id);

    if (updateError) {
      console.log(
        "page comment count 추가 업데이트 실패: ",
        updateError.message
      );
      return;
    }

    const refetchComment = await fetchBoardComment(
      String(router.query.boardId),
      selectedOption
    );
    setComment(refetchComment.data);
    setLikeComment(refetchComment.data);
    setUnlikeComment(refetchComment.data);
    reset(); // 텍스트 입력 초기화
    setInputCount(0);
  };

  // 댓글 입력 수
  const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };

  // 댓글 인기, 최신순
  const handleOptionClick = async (option: "popular" | "latest") => {
    setSelectedOption(option);
    const { data } = await fetchBoardComment(
      String(router.query.boardId),
      option
    );
    setComment(data);
    setLikeComment(data);
    setUnlikeComment(data);
  };

  // 댓글 삭제
  const onClickDeleteComment = async (id: number) => {
    const { error } = await supabase.from("comment").delete().eq("id", id);

    if (error) {
      console.log("게시글 삭제 실패: ", error);
    } else {
      const { data } = await fetchBoardComment(
        String(router.query.boardId),
        selectedOption
      );

      const comment_count = comment.length;

      const { data: updateData, error: updateError } = await supabase
        .from("page")
        .update({ comment_count: comment_count - 1 })
        .eq("id", initialData.id);

      if (updateError) {
        console.log(
          "page comment count 삭제 업데이트 실패: ",
          updateError.message
        );
        return;
      }

      setComment(data);
      setLikeComment(data);
      setUnlikeComment(data);
    }
  };

  // 🚗대댓글 입력창 띄우기
  const onReplyClick = (commentId: number) => {
    setCommentInputVisible((prev) => (prev === commentId ? null : commentId));
  };

  const onClickUpLikeComment = async (comment: IBoardComment) => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const { data: currentComment, error: fetchError } = await supabase
      .from("comment")
      .select("like_users")
      .eq("id", comment.id)
      .single();

    if (fetchError) {
      console.error("Error fetching comment:", fetchError.message);
      return;
    }

    const likeUsers = currentComment.like_users || [];
    if (likeUsers.includes(userLogin.id)) {
      alert("이미 추천하셨습니다.");
      return;
    }

    const { error: updateError } = await supabase
      .from("comment")
      .update({
        like: comment.like + 1,
        like_users: [...likeUsers, userLogin.id],
      })
      .eq("id", comment.id);

    if (updateError) {
      console.error("Error updating like:", updateError.message);
      return;
    }

    setLikeComment((prev) =>
      prev.map((el) =>
        el.id === comment.id ? { ...el, like: el.like + 1 } : el
      )
    );
  };

  const onClickDownLikeComment = async (comment: IBoardComment) => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const { data: currentComment, error: fetchError } = await supabase
      .from("comment")
      .select("like_users")
      .eq("id", comment.id)
      .single();

    if (fetchError) {
      console.error("Error fetching comment:", fetchError.message);
      return;
    }

    const likeUsers = currentComment.like_users || [];
    if (likeUsers.includes(userLogin.id)) {
      alert("이미 추천하셨습니다.");
      return;
    }

    const { error: updateError } = await supabase
      .from("comment")
      .update({
        unlike: comment.unlike + 1,
        like_users: [...likeUsers, userLogin.id],
      })
      .eq("id", comment.id);

    if (updateError) {
      console.error("Error updating like:", updateError.message);
      return;
    }

    // Update local state
    setUnlikeComment((prev) =>
      prev.map((el) =>
        el.id === comment.id ? { ...el, unlike: el.unlike + 1 } : el
      )
    );
  };

  // 🚗대댓글
  const onClickSubmitComment = async (data: IFormReply) => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
    }

    const { bodyReply } = data;

    const { data: dataComment, error: commentError } = await supabase
      .from("reply")
      .insert([
        {
          board_id: router.query.boardId,
          comment_id: commentInputVisible,
          body: bodyReply,
        },
      ]);

    if (commentError) {
      console.log("대댓글 저장 실패: ", commentError.message);
      return;
    }

    const BoardId = String(router.query.boardId);

    const { data: reply } = await fetchReply(BoardId);
    setReplyComment(reply);
    resetReply(); // 텍스트 입력 초기화
    setInputCountComment(0);
    setCommentInputVisible(null);
  };

  // 🚗대댓글 입력 수
  const onTextareaHandlerComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCountComment(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };
  // const comment_count = comment.length;
  return (
    <S.CommentWrap>
      <S.CommentHeader>
        <S.CommentHeaderTitle>댓글</S.CommentHeaderTitle>
        <S.CommentHeaderCount>
          총<S.Count>{comment.length}</S.Count>개
        </S.CommentHeaderCount>
      </S.CommentHeader>
      <S.TextAreaWrap onSubmit={handleSubmit(onClickSubmit)}>
        <S.TextArea
          {...register("body")}
          onChange={onTextareaHandler}
          maxLength={1000}
          placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 며예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
        />
        <S.TextButtonWrap>
          <S.TextCount>({inputCount}/1000)</S.TextCount>
          <S.CommentBtn>작성</S.CommentBtn>
        </S.TextButtonWrap>
        <S.Error>{formState.errors.body?.message}</S.Error>
      </S.TextAreaWrap>
      {comment.length ? (
        <S.CommentListWrap>
          <S.CommentListOpt>
            <S.ListOptBtn
              isSelected={selectedOption === "latest"}
              onClick={() => handleOptionClick("latest")}
            >
              최신순
            </S.ListOptBtn>
            <S.ListOptBtn
              isSelected={selectedOption === "popular"}
              onClick={() => handleOptionClick("popular")}
            >
              인기순
            </S.ListOptBtn>
          </S.CommentListOpt>
          {comment.map((el, index) => {
            // 필터링된 대댓글
            const filteredReplies = replyComment.filter(
              (reply) => reply.comment_id === el.id
            );
            // console.log("filteredReplies: ", filteredReplies);
            return (
              <S.CommentReplyWrap>
                <S.CommentListInfoWrap
                  key={el.id}
                  isAuthor={boardUserId === String(el.user_id.id)}
                >
                  <S.CommentLikeWrap>
                    <S.CommentLikeUpButton
                      onClick={() => onClickUpLikeComment(el)}
                    />
                    <S.CommentLikeCount>
                      {Number(
                        likeComment[index]?.like - unlikeComment[index]?.unlike
                      ) ?? 0}
                      {/* {Number(el.like - el.unlike) ?? 0} */}
                    </S.CommentLikeCount>
                    <S.CommentLikeDownButton
                      onClick={() => onClickDownLikeComment(el)}
                    />
                  </S.CommentLikeWrap>
                  <S.CommentInfoWrap>
                    <S.CommentUserInfoWrap>
                      <S.User isAuthor={boardUserId === String(el.user_id.id)}>
                        {boardUserId === el.user_id.id
                          ? "작성자"
                          : el.user_id.name}
                      </S.User>
                      <S.CommentCreated>{el.created_at}</S.CommentCreated>
                    </S.CommentUserInfoWrap>
                    <S.CommentBody>{el.body}</S.CommentBody>
                    <S.CommentOptWrap>
                      {loginUserId === el.user_id.id ? (
                        <S.DeleteComment
                          onClick={() => onClickDeleteComment(el.id)}
                        >
                          삭제
                        </S.DeleteComment>
                      ) : null}
                      <S.ReportBtn>신고</S.ReportBtn>
                      <S.ReplyBtn onClick={() => onReplyClick(el.id)}>
                        답글 쓰기
                      </S.ReplyBtn>
                    </S.CommentOptWrap>
                  </S.CommentInfoWrap>
                </S.CommentListInfoWrap>

                {commentInputVisible === el.id && (
                  <S.TextAreaWrapCom
                    onSubmit={handleSubmitReply(onClickSubmitComment)}
                  >
                    <S.ReplyIcon>ㄴ</S.ReplyIcon>
                    <S.TextAreaInfoWrapCom>
                      <S.TextAreaCom
                        {...registerReply("bodyReply")}
                        onChange={onTextareaHandlerComment}
                        maxLength={1000}
                        placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 며예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
                      />
                      <S.TextButtonWrapCom>
                        <S.TextCountCom>
                          ({inputCountComment}/1000)
                        </S.TextCountCom>
                        <S.CommentBtnCom>작성</S.CommentBtnCom>
                      </S.TextButtonWrapCom>
                      <S.Error>{formState.errors.body?.message}</S.Error>
                    </S.TextAreaInfoWrapCom>
                  </S.TextAreaWrapCom>
                )}
              </S.CommentReplyWrap>
            );
          })}
        </S.CommentListWrap>
      ) : (
        <S.NoneComment>
          <S.NoneCommentImg src="/images/logo/comment/message.png" />
          <S.NoneCommentText>등록된 댓글이 없습니다.</S.NoneCommentText>
        </S.NoneComment>
      )}
    </S.CommentWrap>
  );
}
