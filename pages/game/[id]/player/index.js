import Link from "next/link";
import styled from "styled-components";
import { SlArrowLeftCircle, SlGhost } from "react-icons/sl";

export default function PlayerIndex() {
  return (
    <>
      <StyledIcon>
        <SlGhost />
      </StyledIcon>
      <StyledHeading>Oops, you found a useless page.</StyledHeading>
      <StyledP>Please go back and choose a game.</StyledP>

      <Link href="/">
        <StyledBackButton>
          <SlArrowLeftCircle /> Back
        </StyledBackButton>
      </Link>
    </>
  );
}

const StyledIcon = styled.section`
  font-size: 3rem;
  text-align: center;
  margin-top: 50px;
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const StyledP = styled.p`
  text-align: center;
  margin-top: 50px;
`;

const StyledBackButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 20px;
  background-color: #f6f8ff;
  border: none;
  font-size: 1rem;
  font-family: inherit;
`;
