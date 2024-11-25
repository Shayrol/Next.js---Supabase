import styled from "@emotion/styled";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100dvh;
`;

export const LoginHeaderWrap = styled.header`
  border-bottom: 1px solid #c3cbd1;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  min-height: 80px;
  padding: 0 16px;
`;

// Logo Wrap
export const LogoWrap = styled.div`
  width: 160px;
  cursor: pointer;
`;

// Logo
export const Logo = styled.img`
  height: 3rem;
`;

export const SectionWrap = styled.section`
  /* border: 2px solid blue; */
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  max-width: 460px;
  width: 100%;
  height: 530px;
`;

export const LoginTitle = styled.h1`
  font-size: 36px;
  color: #44515c;
`;

// 아이디 입력 및 버튼 / 로그인 공간
export const Form = styled.form`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 340px;
  width: 100%;
`;

export const LoginWrap = styled.div`
  /* border: 1px solid red; */
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const InputWrap = styled.div`
  /* border: 1px solid red; */
  position: relative;
  min-height: 40px;
`;

export const InputID = styled.input`
  border: 1px solid #c3cbd1;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.45rem 1rem;
  width: 100%;

  /* 크기 고정 */
  box-sizing: border-box;
  min-height: 49px; /* 고정된 높이 */

  &:focus {
    /* border 두께 고정 */
    border-color: #b4d5ff;
    outline: 2px solid #83b6fa;
    outline-offset: 0px;
  }

  &:focus + label {
    color: #83b6fa;
  }

  &:not(:focus):not(:placeholder-shown) + label {
    color: #aaa;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0;
    font-size: 12px;
    background-color: #ffffff;
    padding: 0px 5px;
  }
`;

export const Label = styled.label`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #aaa;
  pointer-events: none;
  transition: all 0.2s;
`;

// 로그인 버튼 (로그인 / 회원가입)
export const LoginButtonWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

// export const LoginButton = styled.button`
//   /* border: 1px solid blue; */
//   border: 1px solid #c3cbd1;
//   border-radius: 5px;
//   font-size: 1rem;
//   padding: 0.45rem 1rem;
//   width: 100%;
// `;

export const FormButton = styled.button`
  /* border: 1px solid blue; */
  border: 1px solid #c3cbd1;
  background-color: #c3cbd1;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.45rem 1rem;
  width: 100%;
  min-height: 49px;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 600;

  :hover {
    border: 1px solid #4c8cff;
    background-color: #4c8cff;
    color: #ffffff;
  }
`;

// or 라인 - 로그인과 쇼셜로그인 구분 선
export const LineWrap = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  /* width: 230px; */
  max-width: 340px;
  width: 100%;
  box-sizing: border-box;
`;

export const Line = styled.div`
  width: 230px;
  height: 1px;
  /* margin-top: 12px; */
  background-color: #ebeef1;
`;

export const Or = styled.div`
  padding: 0 20px;
  color: #44515c;
  font-size: 12px;
`;

// 소셜 로그인
export const SocialLogin = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 230px; */
  max-width: 340px;
  width: 100%;
  box-sizing: border-box;
`;

export const SocialLogoWrap_kakao = styled.div`
  /* border: 1px solid #c3cbd1; */
  border-radius: 50%;
  background-color: #fee500;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SocialLogoWrap_google = styled.div`
  border: 1px solid #c3cbd1;
  border-radius: 50%;
  background-color: #ffffff;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SocialLogoWrap_github = styled.div`
  /* border: 1px solid #c3cbd1; */
  border-radius: 50%;
  background-color: #ffffff;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
