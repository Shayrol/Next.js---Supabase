// 이미지 아이콘 클릭 시 모달 창 생성 - 설명문

import styled from "@emotion/styled";
import React from "react";
import * as S from "./login.styles";

interface IModal {
  onClose: () => void;
  title: string;
  description: string;
  color: string;
}

const social = ["kakao", "google", "github"];

const Modal = ({ onClose, title, description, color }: IModal) => {
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
            <S.SocialLogoWrap_github>
              <img src={`/images/logo/social-logo/github-mark.png`} />
            </S.SocialLogoWrap_github>
          </S.SocialLogin>
        </S.SectionWrap>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
