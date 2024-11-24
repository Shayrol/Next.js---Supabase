// import { createClient } from "@/utils/supabase/server-props";
import { createClient } from "@/utils/supabase/component";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

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

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { data, error } = await supabase.from("page").select("*");
  if (error) {
    console.error("Error fetching profiles:", error);
  }

  return {
    props: {
      profiles: data || [],
    },
  };
};

// kakao
const signInWithKakao = async () => {
  const currentUrl = window.location.href;
  // const currentUrl = "/";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: currentUrl,
    },
  });
  if (error) {
    console.error("로그인 에러: ", error);
    return;
  }
};

export default function Page({ profiles }: PageProps) {
  return (
    <div>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>{profile.title}</li>
        ))}
      </ul>
      <div onClick={signInWithKakao}>카카오</div>
    </div>
  );
}
