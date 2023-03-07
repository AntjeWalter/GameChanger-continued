import Notes from "./Notes";
import Rules from "./Rules";
import styled from "styled-components";
import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export default function NotesAndRules({
  onAddNotes,
  onAddRules,
  gameId,
  notes,
  rules,
}) {
  const [showInfo, setShowInfo] = useState(false);

  function hideInfo() {
    setShowInfo(!showInfo);
  }

  return (
    <>
      <StyledInfoBox>
        <StyledHideButton onClick={() => hideInfo()}>
          {showInfo ? <SlArrowUp /> : <SlArrowDown />}
        </StyledHideButton>
        <StyledHeadline>How to use this app</StyledHeadline>
        {showInfo ? (
          <StyledInfo>
            Add players and contestants in the different tabs. Then click on a
            player and assign contestants the player wants to bet on. <br />
            Giving contestants points will automatically update the points of
            the players who chose those contestants. <br />
            Deleting contestants from the overall list does not affect the
            individual list of chosen contestants.
          </StyledInfo>
        ) : null}
      </StyledInfoBox>
      <hr />
      <Rules onAddRules={onAddRules} rules={rules} gameId={gameId} />
      <hr />
      <Notes gameId={gameId} onAddNotes={onAddNotes} notes={notes} />
    </>
  );
}

const StyledInfoBox = styled.section`
  background-color: #e6ebff;
  padding: 10px;
  position: relative;
  border-radius: 5px;
`;

const StyledHideButton = styled.button`
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding-top: 5px;
`;

const StyledHeadline = styled.h4`
  font-size: 0.9rem;
  margin-bottom: 5px;
  margin-top: 5px;
  font-style: italic;
`;

const StyledInfo = styled.p`
  font-size: 0.9rem;
  font-style: italic;
`;
