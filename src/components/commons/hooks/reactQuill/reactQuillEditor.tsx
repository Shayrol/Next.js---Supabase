import "react-quill/dist/quill.snow.css"; // Snow 테마
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useMemo } from "react";

export default function QuillEditor() {
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
  ];

  return (
    <ReactQuill
      // ref={quillRef}
      // modules={modules}
      formats={formats}
      placeholder={"게시물 내용을 입력 해 주세요!"}
      theme="snow"
    />
  );
}
