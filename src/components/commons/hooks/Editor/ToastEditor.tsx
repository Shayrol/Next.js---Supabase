import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { IForm } from "@/pages/boardWriter";

interface ToastEditorProps {
  setValue: UseFormSetValue<IForm>; // useForm의 setValue 함수
  trigger: UseFormTrigger<IForm>; // useForm의 trigger 함수
}

const colorSyntaxOptions = {
  preset: [
    "#333333",
    "#666666",
    "#FFFFFF",
    "#EE2323",
    "#F89009",
    "#009A87",
    "#006DD7",
    "#8A3DB6",
    "#781B33",
    "#5733B1",
    "#953B34",
    "#FFC1C8",
    "#FFC9AF",
    "#9FEEC3",
    "#99CEFA",
    "#C1BEF9",
  ],
};

const ToastEditor = ({ setValue, trigger }: ToastEditorProps) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    const editorContent = DOMPurify.sanitize(editorInstance?.getHTML());
    // markdown 형식으로 저장됨 => <p>ddd</p> 가 아닌 ddd으로 단 빈 공간에 줄 바꿈만 하면 <br>
    const contentMark = editorInstance.getMarkdown();

    const cleanContent =
      editorContent.trim() === "<p><br></p>" ? "" : editorContent;

    console.log("editorContent: ", editorContent);
    console.log("cleanContent: ", cleanContent);
    console.log("contentMark: ", contentMark);

    setValue("body", cleanContent);
    void trigger("body");

    // ddddddddddddddddddddddddddddddddddddddddddddddddddddd

    if (editorInstance) {
      editorInstance.addHook(
        "addImageBlobHook",
        (blob: Blob, callback: (url: string) => void) => {
          // blob을 base64로 되 돌리는 작업
          const reader = new FileReader();

          // Blob 데이터를 Base64로 변환
          reader.onload = () => {
            const base64Image = reader.result as string;
            callback(base64Image); // 에디터에 이미지 삽입
          };

          reader.readAsDataURL(blob); // Blob -> Base64 변환 시작
        }
      );
    }

    return () => {
      editorInstance?.removeHook("addImageBlobHook");
    };
  };

  return (
    <>
      <Editor
        ref={editorRef}
        language="ko-KR" // 작업 툴 언어(적용안됨..)
        initialValue=" " // placeholder
        placeholder=""
        previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"}
        height="100%" // 높이
        initialEditType="wysiwyg" // 초기 편집모드
        useCommandShortcut={false} // 작업 툴 단축키
        hideModeSwitch={true} // 무슨 설정 스위치(필요없음)
        extendedAutolinks={true} // 링크 등록시 자동 하이퍼 링크 생성
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["image", "link"],
        ]}
        plugins={[[colorSyntax, colorSyntaxOptions]]}
        onChange={handleChange}
      />
    </>
  );
};

export default ToastEditor;
