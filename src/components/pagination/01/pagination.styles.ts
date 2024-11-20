import styled from "@emotion/styled";

interface IPage {
  currentPage: number;
  pageNum: number;
}

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const Button = styled.button`
  padding: 4px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: transparent;
  color: #4b5563;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #16ae81;
    color: white;
  }

  &:disabled {
    background-color: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const PageNum = styled.button<IPage>`
  padding: 4px 12px;
  border: 1px solid
    ${(props) => (props.currentPage === props.pageNum ? "#16ae81" : "#d1d5db")};
  border-radius: 4px;
  background-color: ${(props) =>
    props.currentPage === props.pageNum ? "#16ae81" : "white"};
  color: ${(props) =>
    props.currentPage === props.pageNum ? "white" : "#4b5563"};
  font-weight: ${(props) =>
    props.currentPage === props.pageNum ? "600" : "400"};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  pointer-events: ${(props) =>
    props.currentPage === props.pageNum ? "none" : "auto"};

  &:hover {
    background-color: #16ae81;
    color: white;
  }
`;
