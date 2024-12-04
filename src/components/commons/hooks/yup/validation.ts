import * as yup from "yup";

export const schema = yup.object({
  title: yup.string().required("제목을 입력해주세요."),
  body: yup.string().required("내용을 입력해주세요."),
  tag: yup.string().required("게시물 태그를 선택해 주세요."),
});

export const schemaComment = yup.object({
  body: yup.string().required("내용을 입력해주세요."),
});
