import {
  fetchBoard,
  IBoard,
} from "@/src/components/commons/hooks/reactQuery/query/board";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as S from "../../styles/userBoard.styles";
import dynamic from "next/dynamic";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createClient } from "@/utils/supabase/component";
import {
  fetchBoardComment,
  IBoardComment,
} from "@/src/components/commons/hooks/reactQuery/query/boardComment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  schemaComment,
  schemaCommentReply,
  schemaReply,
} from "@/src/components/commons/hooks/yup/validation";
import {
  fetchReply,
  IReply,
} from "@/src/components/commons/hooks/reactQuery/query/boardCommentReply";

interface ISSRProps {
  initialData: IBoard;
  dataComment: IBoardComment[];
  userLogin: User | null;
  setUserLogin: Dispatch<SetStateAction<User | null>>;
  reply: IReply[];
}

const ToastViewer = dynamic(
  () => import("../../src/components/commons/hooks/Editor/TuiViewer"),
  {
    ssr: false,
  }
);

export interface IForm {
  body: string;
}

export interface IFormReply {
  bodyReply: string;
}

export interface IFormCommentReply {
  bodyCommentReply: string;
}

export default function UserBoard({
  initialData,
  dataComment,
  userLogin,
  reply,
}: ISSRProps): JSX.Element {
  const router = useRouter();
  const [comment, setComment] = useState<IBoardComment[]>(dataComment);
  const [replyComment, setReplyComment] = useState<IReply[]>(reply);
  const [commentInputVisible, setCommentInputVisible] = useState<number | null>(
    null
  );
  const [replyInputVisible, setReplyInputVisible] = useState<number | null>(
    null
  );
  // 대댓글의 대댓글 위한 대댓글의 id
  const [commentReplyId, setCommentReplyId] = useState<number | null>(null);

  const [inputCount, setInputCount] = useState(0);
  const [inputCountComment, setInputCountComment] = useState(0);
  const [inputCountCommentReply, setInputCountCommentReply] = useState(0);
  const [like, setLike] = useState<number>(initialData.like);
  const [unlike, setUnlike] = useState<number>(initialData.unlike);

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

  // 댓글 useForm
  const { register, handleSubmit, trigger, formState, reset } = useForm<IForm>({
    resolver: yupResolver(schemaComment),
    mode: "onChange",
  });

  // 대댓글 useForm
  const {
    register: registerReply,
    handleSubmit: handleSubmitReply,
    formState: formStateReply,
    reset: resetReply,
  } = useForm({
    resolver: yupResolver(schemaReply), // 대댓글 유효성 검사
    mode: "onChange",
  });

  // 대댓글의 대댓글 useForm
  const {
    register: registerCommentReply,
    handleSubmit: handleSubmitCommentReply,
    formState: formStateCommentReply,
    reset: resetCommentReply,
  } = useForm({
    resolver: yupResolver(schemaCommentReply), // 대댓글 유효성 검사
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

  // 게시글 삭제
  const onClickDeleteBoard = async () => {
    const { error } = await supabase
      .from("page")
      .delete()
      .eq("id", initialData.id);

    if (error) {
      console.log("게시글 삭제 실패: ", error);
    } else {
      router.push("/");
    }
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

  // 추천 - 게시물
  const onClickUpLike = async () => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    // 추천을 했는지 추천한 유저 데이터 가져오기
    const { data: currentComment, error: fetchError } = await supabase
      .from("page")
      .select("like_users")
      .eq("id", router.query.boardId)
      .single();

    if (fetchError) {
      console.error("Error fetching comment:", fetchError.message);
      return;
    }

    // 현재 로그인한 유저 id와 data 저장 확인 후 추천 했는지 확인
    const likeUsers = currentComment.like_users || [];
    if (likeUsers.includes(userLogin.id)) {
      alert("이미 추천하셨습니다.");
      return;
    }

    // 추천 카운트 증가 및 추천한 유저 정보 저장
    const { data, error } = await supabase
      .from("page")
      .update({
        like: like + 1,
        like_users: [...likeUsers, userLogin.id],
      })
      .eq("id", initialData.id);

    if (error) {
      console.log("like count error: ", error.message);
    }
    setLike((prev) => prev + 1);
  };

  // 비추천 - 게시물
  const onClickDownLike = async () => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const { data: currentComment, error: fetchError } = await supabase
      .from("page")
      .select("like_users")
      .eq("id", router.query.boardId)
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

    const { data, error } = await supabase
      .from("page")
      .update({
        unlike: unlike + 1,
        like_users: [...likeUsers, userLogin.id], // Add user ID to like_users
      })
      .eq("id", initialData.id);

    if (error) {
      console.log("like count error: ", error.message);
    }
    setUnlike((prev) => prev + 1);
  };

  // 대댓글
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

  // 대댓글 입력 수
  const onTextareaHandlerComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCountComment(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };

  // 대댓글 입력창 띄우기
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

  // ✨ 대댓글의 답변 시 실행되는 함수들

  // 대댓글의 댓글 입력창 띄우기
  const onCommentReplyClick = (reply: IReply) => {
    setReplyInputVisible((prev) => (prev === reply.id ? null : reply.id));
    setCommentReplyId((prev) =>
      prev === reply.comment_id ? null : reply.comment_id
    );
    // 답글 쓰기 클릭 시 입력 내용 초기화
    setInputCountComment(0);
    resetCommentReply();
  };

  console.log("commentReplyId: ", commentReplyId);
  console.log("replyInputVisible: ", replyInputVisible);

  // 대댓글의 댓글
  const onClickSubmitCommentReply =
    (reply: IReply) => async (data: IFormCommentReply) => {
      if (userLogin === null) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }

      const { bodyCommentReply } = data;

      const { data: dataComment, error: commentError } = await supabase
        .from("reply")
        .insert([
          {
            board_id: router.query.boardId,
            comment_id: commentReplyId,
            body: bodyCommentReply,
            name: reply.user_id.name, // 여기에 reply 값 활용
          },
        ]);

      if (commentError) {
        console.log("대댓글 저장 실패: ", commentError.message);
        return;
      }

      const BoardId = String(router.query.boardId);

      const { data: replyComment } = await fetchReply(BoardId);
      setReplyComment(replyComment);
      resetCommentReply(); // 텍스트 입력 초기화
      setInputCountCommentReply(0);
      setReplyInputVisible(null);
      setCommentReplyId(null);
    };

  // 대댓글의 댓글 입력 수
  const onTextareaHandlerCommentReply = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputCountComment(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };

  // 대댓글 삭제
  const onClickDeleteReply = async (id: number) => {
    const { error } = await supabase.from("reply").delete().eq("id", id);
    console.log("replyId: ", id);
    if (error) {
      console.log("게시글 삭제 실패: ", error);
    } else {
      const { data: reply } = await fetchReply(String(router.query.boardId));
      setReplyComment(reply);
    }
  };

  useEffect(() => {
    const result = async () => {
      const { data, error } = await supabase
        .from("page")
        .update({ views: initialData.views + 1 })
        .eq("id", router.query.boardId);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
        });
      }
      return new Response(JSON.stringify({ data }), { status: 200 });
    };

    result();
  }, []);

  return (
    <S.Wrap>
      {/* <Head> */}
      {/* 동적 메타 태그 */}
      <title>{`${initialData.title} - BeeHappy`}</title>
      <meta name="description" content={`${initialData.body}`} />

      {/* Open Graph 메타 태그 */}
      {/* <meta property="og:title" content={`${meta.metaTag} 게시판`} /> */}
      {/* <meta
          property="og:description"
          content={`${meta.metaTag} 커뮤니티 게시판. 다양한 주제의 게시글을 확인하세요.`}
        /> */}
      {/* <meta property="og:type" content="website" /> */}
      {/* <meta
          property="og:url"
          content={`https://your-domain.com${router.asPath}`}
        /> */}
      {/* <meta property="og:image" content="/path/to/default-og-image.jpg" /> */}

      {/* Twitter Card */}
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      {/* <meta name="twitter:title" content={`${meta.metaTag} 게시판`} /> */}
      {/* <meta
          name="twitter:description"
          content={`${meta.metaTag} 커뮤니티 게시판. 다양한 주제의 게시글을 확인하세요.`}
        /> */}
      {/* <meta name="twitter:image" content="/path/to/default-og-image.jpg" /> */}
      {/* </Head> */}

      <S.BoardWrap>
        {initialData.id && (
          <S.BoardInfoWrap>
            <S.BoardTitleWrap>
              <S.Title>{initialData.title}</S.Title>
              <S.TitleUserInfoWrap>
                <S.UserInfoWrap>
                  <S.Tag>{initialData.tag}</S.Tag>
                  <S.Created>{initialData.created_at}</S.Created>
                  <S.Name>{initialData.user.name}</S.Name>
                </S.UserInfoWrap>
                <S.MetaInfoWrap>
                  <S.ViewCount>조회수: {initialData.views + 1}</S.ViewCount>
                  <S.CommentCount>댓글: {comment.length}</S.CommentCount>
                  <S.LikeCount>추천: {initialData.like}</S.LikeCount>
                </S.MetaInfoWrap>
              </S.TitleUserInfoWrap>
              {boardUserId === loginUserId ? (
                <S.EditDeleteWrap>
                  <S.Edit>
                    <Link href={`/${router.query.boardId}/edit`}>수정</Link>
                  </S.Edit>
                  <S.Delete>
                    <div onClick={onClickDeleteBoard}>삭제</div>
                  </S.Delete>
                </S.EditDeleteWrap>
              ) : (
                <></>
              )}
            </S.BoardTitleWrap>
            <S.BoardBody>
              <ToastViewer content={initialData.body} />
            </S.BoardBody>
            <S.LikeCountWrap>
              <S.LikeCountBtn onClick={onClickUpLike}>
                <S.LikeImg src="/images/logo/up-arrow.png" />
                <S.LikeCountInfo>{like}</S.LikeCountInfo>
              </S.LikeCountBtn>
              <S.UnLikeCountBtn onClick={onClickDownLike}>
                <S.LikeImg src="/images/logo/down-arrow.png" />
                <S.LikeCountInfo>{unlike}</S.LikeCountInfo>
              </S.UnLikeCountBtn>
            </S.LikeCountWrap>
          </S.BoardInfoWrap>
        )}
      </S.BoardWrap>

      {/* 게시글 댓글 */}
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
                          likeComment[index]?.like -
                            unlikeComment[index]?.unlike
                        ) ?? 0}
                        {/* {Number(el.like - el.unlike) ?? 0} */}
                      </S.CommentLikeCount>
                      <S.CommentLikeDownButton
                        onClick={() => onClickDownLikeComment(el)}
                      />
                    </S.CommentLikeWrap>
                    <S.CommentInfoWrap>
                      <S.CommentUserInfoWrap>
                        <S.User
                          isAuthor={boardUserId === String(el.user_id.id)}
                        >
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

                  {/* 댓글 입력 추가하기 */}
                  {/* 대댓글 */}
                  <S.ReplyWrap>
                    {filteredReplies.map((reply) => (
                      <div>
                        <S.ReplyInfoWrap key={reply.id}>
                          <S.ReplyIcon>ㄴ</S.ReplyIcon>
                          <S.CommentInfoWrap>
                            <S.CommentUserInfoWrap>
                              <S.User
                                isAuthor={
                                  boardUserId === String(reply.user_id?.id)
                                }
                              >
                                {boardUserId === String(reply.user_id?.id)
                                  ? "작성자"
                                  : reply.user_id?.name}
                              </S.User>
                              <S.CommentCreated>
                                {reply.created_at}
                              </S.CommentCreated>
                            </S.CommentUserInfoWrap>
                            <S.CommentBody>
                              {/* 대댓글 답변 시 이름 태그 붙음 */}
                              {reply.name !== null ? (
                                <S.TagName>
                                  {initialData.user.name === reply.name
                                    ? "작성자"
                                    : reply.name}
                                </S.TagName>
                              ) : (
                                <></>
                              )}
                              {reply.body}
                            </S.CommentBody>
                            <S.CommentOptWrap>
                              {loginUserId === String(reply.user_id?.id) ? (
                                <S.DeleteComment
                                  onClick={() => onClickDeleteReply(reply.id)}
                                >
                                  삭제
                                </S.DeleteComment>
                              ) : null}
                              <S.ReportBtn>신고</S.ReportBtn>
                              <S.ReplyBtn
                                onClick={() => onCommentReplyClick(reply)}
                              >
                                답글 쓰기
                              </S.ReplyBtn>
                            </S.CommentOptWrap>
                          </S.CommentInfoWrap>
                          {/* 댓글 입력 추가하기 */}
                        </S.ReplyInfoWrap>
                        {replyInputVisible === reply.id && (
                          <S.TextAreaWrapCom
                            onSubmit={handleSubmitCommentReply(
                              onClickSubmitCommentReply(reply)
                            )}
                          >
                            <S.ReplyIcon>ㄴ</S.ReplyIcon>
                            <S.TextAreaInfoWrapCom>
                              <S.TextAreaCom
                                {...registerCommentReply("bodyCommentReply")}
                                onChange={onTextareaHandlerCommentReply}
                                maxLength={1000}
                                placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 며예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
                              />
                              <S.TextButtonWrapCom>
                                <S.TextCountCom>
                                  ({inputCountCommentReply}/1000)
                                </S.TextCountCom>
                                <S.CommentBtnCom>작성</S.CommentBtnCom>
                              </S.TextButtonWrapCom>
                              <S.Error>
                                {formState.errors.body?.message}
                              </S.Error>
                            </S.TextAreaInfoWrapCom>
                          </S.TextAreaWrapCom>
                        )}
                      </div>
                    ))}
                  </S.ReplyWrap>
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
    </S.Wrap>
  );
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const boardId = String(context.query.boardId);

//   const { data } = await fetchBoard(boardId);
//   const { data: dataComment } = await fetchBoardComment(boardId, "latest");
//   const { data: reply } = await fetchReply(boardId);

//   return {
//     props: {
//       initialData: data,
//       dataComment,
//       reply,
//     },
//   };
// };

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const boardId = String(context.query.boardId);

  const results = await Promise.allSettled([
    fetchBoard(boardId),
    fetchBoardComment(boardId, "latest"),
    fetchReply(boardId),
  ]);

  const [data, dataComment, reply] = results.map((result) =>
    result.status === "fulfilled" ? result.value.data : null
  );

  return {
    props: {
      initialData: data,
      dataComment,
      reply,
    },
  };
};
