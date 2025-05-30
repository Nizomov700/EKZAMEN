import styled from "styled-components";

export const Header = () => {
  return (
    <StyledHeader>
      <p>Electro World</p>
    </StyledHeader>
  );
};
const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: #36d7b7;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    font-size: 30px;
  }
`;
