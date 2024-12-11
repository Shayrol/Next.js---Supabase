import styled from "@emotion/styled";

export const Wrap = styled.main`
  /* border: 1px solid red; */
  max-width: 728px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 10px;
  margin-top: 10px;
  box-sizing: border-box;

  @media (max-width: 1040px) {
    max-width: 100%;
  }
`;

export const WriteWrap = styled.article`
  /* border: 1px solid red; */
  box-shadow: 0px 0px 10px -5px #a3a3a3;
  /* max-width: 728px; */
  width: 100%;
  padding: 25px 20px;
`;

// title
export const BoardTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 10px 0;
`;

// form wrap
export const FormWrap = styled.form`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 제목
export const TitleWrap = styled.div``;

export const Title = styled.input`
  border: 1px solid #dddfe4;
  border-radius: 5px;
  width: 100%;
  font-size: 18px;
  padding: 5px 10px;
  color: #87898c;
  outline: none;
`;

// tag 선택
export const OptionWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
`;

export const Option = styled.select`
  border: 1px solid #dddfe4;
  border-radius: 5px;
  font-size: 18px;
  color: #87898c;
  padding: 5px 10px;
  margin-bottom: 4px;
  align-self: flex-start;
`;

// editor
export const EditorWrap = styled.div`
  height: 500px;
  margin-bottom: 30px;
`;

export const Error = styled.label`
  color: red;
  font-size: 12px;
  margin-left: 5px;
`;

// Button
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

export const Button = styled.button`
  border: 1px solid #dddfe4;
  border-radius: 5px;
  padding: 10px 60px;
  color: #87898c;
  white-space: nowrap;

  :hover {
    border: 1px solid #87898c;
    background-color: #00000011;
  }

  &:nth-of-type(2) {
    background-color: #46cfa7;
    color: #fff;
    :hover {
      background-color: #3bb08e;
    }
  }
`;
