// 이미지 아이콘 클릭 시 모달 창 생성 - 설명문

import React, { useEffect } from "react";
import * as S from "./login.styles";
import { supabase } from "../../Supabase";

interface IModal {
  onClose: () => void;
}

const social = ["kakao", "google", "github"];

const Modal = ({ onClose }: IModal) => {
  const signInWithGithub = async () => {
    // 현재 페이지 URL을 가져옵니다.
    const currentUrl = window.location.href;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        // 현재 URL로 리디렉션 설정
        redirectTo: currentUrl,
      },
    });
    if (error) {
      console.error("로그인 에러: ", error);
      return;
    }
  };

  // useEffect(() => {
  //   if (window.location.hash) {
  //     // 페이지를 새로고침하지 않고 해시를 제거
  //     window.history.pushState(
  //       {},
  //       document.title,
  //       window.location.pathname + window.location.search
  //     );
  //   }
  //   console.log("#삭제 실행");
  // }, []);

  return (
    // <ModalOverlay onClick={onClose}>
    <S.ModalOverlay>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.SectionWrap>
          <S.LoginTitle>로그인</S.LoginTitle>
          <S.Form>
            <S.LoginWrap>
              <S.InputWrap>
                <S.InputID type="text" placeholder=" " id="userID" />
                <S.Label htmlFor="userID">ID</S.Label>
              </S.InputWrap>
              <S.InputWrap>
                <S.InputID type="password" placeholder=" " id="userPW" />
                <S.Label htmlFor="userPW">PASSWORD</S.Label>
              </S.InputWrap>
            </S.LoginWrap>
            <S.LoginButtonWrap>
              <S.FormButton onClick={onClose}>로그인</S.FormButton>
              <S.FormButton onClick={onClose}>회원가입</S.FormButton>
            </S.LoginButtonWrap>
          </S.Form>
          <S.LineWrap>
            <S.Line />
            <S.Or>OR</S.Or>
            <S.Line />
          </S.LineWrap>
          <S.SocialLogin>
            <S.SocialLogoWrap_kakao>
              <img src={`/images/logo/social-logo/kakao-mark.png`} />
            </S.SocialLogoWrap_kakao>
            <S.SocialLogoWrap_google>
              <img
                src={`/images/logo/social-logo/google-mark.png`}
                style={{ width: "35px" }}
              />
            </S.SocialLogoWrap_google>
            <S.SocialLogoWrap_github onClick={signInWithGithub}>
              <img src={`/images/logo/social-logo/github-mark.png`} />
            </S.SocialLogoWrap_github>
          </S.SocialLogin>
        </S.SectionWrap>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
