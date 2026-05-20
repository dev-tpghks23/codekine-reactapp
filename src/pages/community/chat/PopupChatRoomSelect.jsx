import React from "react";
import S from "./ChatStyle";
import SelectRoomListPanel from "./popupChat/SelectRoomListPanel";
import SelectOngoingPanel from "./popupChat/SelectOngoingPanel";
import { useChatContext } from "../context/ChatContext";

import minusIcon from "../assets/chat/minus_icon.svg";
import closeIcon from "../assets/chat/close_icon.svg";
import styled from "styled-components";
import { colors } from "../constants";

// 채팅방 헤더 임시 버튼
const HeaderBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: ${colors.textWhite};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 10px;
  flex-shrink: 0;
`;

const CloseBtn = styled(HeaderBtn)`
  background: rgba(255, 80, 80, 0.5);
`;

const PopupChatRoomSelect = () => {
  const { handleSelectMinimize, handleSelectClose } = useChatContext();

  return (
    <S.SelectPageBg>
      <S.SelectPopup>
        <S.SelectHeader>
          <S.HeaderTitle>채팅방 선택</S.HeaderTitle>
          <S.HeaderBtns>
            <HeaderBtn onClick={handleSelectMinimize}>
              <img src={minusIcon} alt="최소화" />
            </HeaderBtn>
            <CloseBtn onClick={handleSelectClose}>
              <img src={closeIcon} alt="닫기" />
            </CloseBtn>
          </S.HeaderBtns>
        </S.SelectHeader>

        <S.SelectBody>
          <SelectRoomListPanel />
          <SelectOngoingPanel />
        </S.SelectBody>
      </S.SelectPopup>
    </S.SelectPageBg>
  );
};

export default PopupChatRoomSelect;
