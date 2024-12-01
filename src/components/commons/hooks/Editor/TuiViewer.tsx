// import "@toast-ui/editor/dist/toastui-editor.css";
// import "./toast-viewer-custom.css";
import { Viewer } from "@toast-ui/react-editor";

interface Props {
  content: string;
}

const TuiEditor = ({ content = "" }: Props) => {
  return (
    <>
      {content && (
        <div style={{ fontSize: "18px" }}>
          <Viewer initialValue={content || ""} />
        </div>
      )}
    </>
  );
};

export default TuiEditor;
