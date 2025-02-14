import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { IForm } from "@/pages/boardWriter";
import { createClient } from "@/utils/supabase/component";

interface ToastEditorProps {
  setValue: UseFormSetValue<IForm>; // useForm의 setValue 함수
  trigger: UseFormTrigger<IForm>; // useForm의 trigger 함수
  setImages: Dispatch<SetStateAction<string[]>>;
  images: string[];
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

const ToastEditor = ({
  images,
  setImages,
  setValue,
  trigger,
}: ToastEditorProps) => {
  const editorRef = useRef<Editor>(null);

  const uploadImageToSupabase = async (file: File) => {
    const supabase = createClient();

    // 한글 이미지 등록이 안되어 이미지 이름 수정 작업
    const sanitizeFileName = (fileName: string): string => {
      // 한글 또는 특수문자가 포함된 경우 파일 이름을 "boardImage"로 대체
      if (/[^a-zA-Z0-9._-]/.test(fileName)) {
        return `${Date.now()}_BoardImage`;
      }
      return `${Date.now()}_${fileName}`; // 문제가 없으면 원래 이름 유지
    };

    const sanitizedFileName = sanitizeFileName(file.name);

    // Supabase 스토리지에 이미지 업로드
    const { data, error } = await supabase.storage
      .from("images") // 버킷 이름
      .upload(sanitizedFileName, file);

    if (error) {
      console.error("Image upload error:", error);
      return null;
    }

    // 업로드된 이미지의 공개 URL 생성
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(sanitizedFileName);

    setImages((prev) => [...prev, publicUrl]);
    return publicUrl;
  };

  const handleChange = () => {
    const editorInstance = editorRef.current?.getInstance();
    const editorContent = DOMPurify.sanitize(editorInstance?.getHTML());
    const cleanContent =
      editorContent.trim() === "<p><br></p>" ? "" : editorContent;

    console.log("cleanContent: ", cleanContent);

    setValue("body", cleanContent);
    void trigger("body");
  };

  // Toast ui Editor에 이미지 등록 시 서버 저장 후 반환된 url 이미지를 callback으로 화면 출력
  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    // addImageBlobHook을 초기화 시점에 등록
    editorInstance.addHook(
      "addImageBlobHook",
      async (blob: File, callback: (url: string) => void) => {
        try {
          const uploadedImageUrl = await uploadImageToSupabase(blob);
          if (uploadedImageUrl) {
            callback(uploadedImageUrl);
          }
        } catch (error) {
          console.error("Image upload failed", error);
          // 서버 등록 실패 시 base64로 이미지 등록
          const reader = new FileReader();
          reader.onload = () => {
            callback(reader.result as string);
          };
          reader.readAsDataURL(blob);
        }
      }
    );
  }, []);

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
