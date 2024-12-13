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
import { schemaComment } from "@/src/components/commons/hooks/yup/validation";
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

export default function UserBoard({
  initialData,
  dataComment,
  userLogin,
  reply,
}: ISSRProps): JSX.Element {
  const router = useRouter();
  const [comment, setComment] = useState<IBoardComment[]>(dataComment);
  const [replyComment, setReplyComment] = useState<IReply[]>(reply);
  const [inputCount, setInputCount] = useState(0);
  const [like, setLike] = useState<number>(initialData.like);
  const [unlike, setUnlike] = useState<number>(initialData.unlike);
  const [selectedOption, setSelectedOption] = useState<"popular" | "latest">(
    "latest"
  );

  const boardUserId = String(initialData.user_id);
  const loginUserId = String(userLogin?.id);
  const supabase = createClient();
  // console.log("data: ", initialData.id);
  // console.log("loginUserId: ", loginUserId);
  // console.log("loginUserId: ", userLogin);
  console.log("replyComment: ", replyComment);

  const color = "#cdcdcd";

  const { register, handleSubmit, trigger, formState, reset } = useForm<IForm>({
    resolver: yupResolver(schemaComment),
    mode: "onChange",
  });

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
      String(router.query.boardId)
    );
    setComment(refetchComment.data);
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
  const handleOptionClick = (option: "popular" | "latest") => {
    setSelectedOption(option);
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
      const { data } = await fetchBoardComment(String(router.query.boardId));

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
    }
  };

  // 추천
  const onClickUpLike = async () => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const { data, error } = await supabase
      .from("page")
      .update({ like: like + 1 })
      .eq("id", initialData.id);

    if (error) {
      console.log("like count error: ", error.message);
    }
    setLike((prev) => prev + 1);
  };

  // 비추천
  const onClickDownLike = async () => {
    if (userLogin === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const { data, error } = await supabase
      .from("page")
      .update({ unlike: unlike + 1 })
      .eq("id", initialData.id);
    if (error) {
      console.log("error: ", error);
    }
    console.log(data);
    setUnlike((prev) => prev + 1);
  };

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
                  <S.ViewCount>조회수: {initialData.views}</S.ViewCount>
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
                isSelected={selectedOption === "popular"}
                onClick={() => handleOptionClick("popular")}
              >
                인기순
              </S.ListOptBtn>
              <S.ListOptBtn
                isSelected={selectedOption === "latest"}
                onClick={() => handleOptionClick("latest")}
              >
                최신순
              </S.ListOptBtn>
            </S.CommentListOpt>
            {comment.map((el) => {
              // 필터링된 대댓글
              const filteredReplies = replyComment.filter(
                (reply) => reply.comment_id === el.id
              );
              console.log("rrrrrrrrrrrrrrrrrrrrr: ", filteredReplies);
              return (
                <S.CommentReplyWrap>
                  <S.CommentListInfoWrap
                    key={el.id}
                    isAuthor={boardUserId === String(el.user_id.id)}
                  >
                    <S.CommentLikeWrap>
                      <S.CommentLikeUpButton />
                      <S.CommentLikeCount>0</S.CommentLikeCount>
                      <S.CommentLikeDownButton />
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
                        <S.ReplyBtn>답글 쓰기</S.ReplyBtn>
                      </S.CommentOptWrap>
                    </S.CommentInfoWrap>
                  </S.CommentListInfoWrap>

                  {/* 댓글 입력 추가하기 */}
                  {/* 대댓글 */}
                  <S.ReplyWrap>
                    {filteredReplies.map((reply) => (
                      <S.ReplyInfoWrap key={reply.id}>
                        <S.ReplyIcon>ㄴ</S.ReplyIcon>
                        <S.CommentInfoWrap>
                          <S.CommentUserInfoWrap>
                            <S.User
                              isAuthor={
                                boardUserId === String(reply.user_id.id)
                              }
                            >
                              {boardUserId === String(reply.user_id.id)
                                ? "작성자"
                                : reply.user_id.name}
                            </S.User>
                            <S.CommentCreated>
                              {reply.created_at}
                            </S.CommentCreated>
                          </S.CommentUserInfoWrap>
                          <S.CommentBody>{reply.body}</S.CommentBody>
                          <S.CommentOptWrap>
                            {loginUserId === String(reply.user_id.id) ? (
                              <S.DeleteComment>삭제</S.DeleteComment>
                            ) : null}
                            <S.ReportBtn>신고</S.ReportBtn>
                            <S.ReplyBtn>답글 쓰기</S.ReplyBtn>
                          </S.CommentOptWrap>
                        </S.CommentInfoWrap>
                        {/* 댓글 입력 추가하기 */}
                      </S.ReplyInfoWrap>
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const boardId = String(context.query.boardId);

  const { data } = await fetchBoard(boardId);
  const { data: dataComment } = await fetchBoardComment(boardId);
  const { data: reply } = await fetchReply(boardId);

  return {
    props: {
      initialData: data,
      dataComment,
      reply: reply,
    },
  };
};

// {comment.map((el) => (
//   <S.CommentListInfoWrap
//     key={el.id}
//     // isAuthor={boardUserId === el.user_id}
//     isAuthor={boardUserId === String(el.user_id.id)}
//   >
//     <S.CommentLikeWrap>
//       <S.CommentLikeUpButton />
//       <S.CommentLikeCount>0</S.CommentLikeCount>
//       <S.CommentLikeDownButton />
//     </S.CommentLikeWrap>
//     <S.CommentInfoWrap>
//       <S.CommentUserInfoWrap>
//         {/* <S.User isAuthor={boardUserId === el.user_id}> */}
//         <S.User isAuthor={boardUserId === String(el.user_id.id)}>
//           {boardUserId === el.user_id.id
//             ? "작성자"
//             : el.user_id.name}
//         </S.User>
//         <S.CommentCreated>{el.created_at}</S.CommentCreated>
//       </S.CommentUserInfoWrap>
//       <S.CommentBody>{el.body}</S.CommentBody>
//       <S.ReplyWrap>
//         {loginUserId === el.user_id.id ? (
//           <S.DeleteComment
//             onClick={() => onClickDeleteComment(el.id)}
//           >
//             삭제
//           </S.DeleteComment>
//         ) : (
//           <></>
//         )}
//         <S.Report>신고</S.Report>
//         <S.Reply>답글 쓰기</S.Reply>
//       </S.ReplyWrap>
//     </S.CommentInfoWrap>
//     <div>{}</div>
//   </S.CommentListInfoWrap>
// ))}
