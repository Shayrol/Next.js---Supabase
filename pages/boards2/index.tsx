// import { createClient } from "@/utils/supabase/server-props";
import { createClient } from "@/utils/supabase/component";
// import { supabase } from "@/src/components/commons/Supabase";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRef } from "react";

interface IBoards {
  id: number;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  tag: string | string[] | undefined;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string | null;
  };
}

interface PageProps {
  profiles: IBoards[];
}

const supabase = createClient();

// export const getServerSideProps: GetServerSideProps<PageProps> = async (
//   context
// ) => {
//   const { data, error } = await supabase.from("page").select("*");
//   if (error) {
//     console.error("Error fetching profiles:", error);
//   }

//   return {
//     props: {
//       profiles: data || [],
//     },
//   };
// };

// kakao
// const signInWithKakao = async () => {
//   const currentUrl = window.location.href;
//   // const currentUrl = "/";
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "kakao",
//     options: {
//       redirectTo: currentUrl,
//     },
//   });
//   if (error) {
//     console.error("로그인 에러: ", error);
//     return;
//   }
// };

export default function Page() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const sanitizeFileName = (fileName: string): string => {
    // 한글 또는 특수문자가 포함된 경우 파일 이름을 "boardImage"로 대체
    if (/[^a-zA-Z0-9._-]/.test(fileName)) {
      return "boardImage";
    }
    return fileName; // 문제가 없으면 원래 이름 유지
  };

  const uploadFile = async (file: File) => {
    const sanitizedFileName = sanitizeFileName(file.name);

    console.log("file: ", file);
    console.log("file.name: ", file.name);
    const { data, error } = await supabase.storage
      .from("images")
      .upload(sanitizedFileName + Date.now(), file, { upsert: true });

    if (error) {
      console.error("File upload error:", error.message);
      return;
    }
    console.log("Uploaded file data:", data);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files; // 선택된 파일
    if (!files || files.length === 0) return;

    const file = files[0]; // 첫 번째 파일 가져오기
    console.log("Selected file:", file);

    // FormData 생성
    const formData = new FormData();
    formData.append("file", file);

    // 파일 업로드 실행
    await uploadFile(file);
  };

  return (
    <div style={{ maxWidth: "728px", width: "100%" }}>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange} // 파일이 선택될 때 핸들러 실행
      />
      {/* <div onClick={}>File</div> */}
      {/* <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.title}</li>
        ))}
      </ul>
      <div onClick={signInWithKakao}>카카오</div> */}
    </div>
  );
}
