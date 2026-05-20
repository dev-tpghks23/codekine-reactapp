import React from "react";
import S from "../ChatStyle";
import { ThumbnailBox } from "../chatComponents/chatComponentStyle";
import defaultProfileImg from "../../assets/chat/chat_default_profile.svg";
import { useChatContext } from "../../context/ChatContext";

import chatIcon from "../../assets/chat/chat_icon.svg";
import minusIcon from "../../assets/chat/minus_icon.svg";
import closeIcon from "../../assets/chat/close_icon.svg";
import styled from "styled-components";
import { colors } from "../../constants";

const liveVectorUrl =
  "https://www.figma.com/api/mcp/asset/79378b34-81dd-4aef-bc8a-2e9814e941b7";
const closeVUrl =
  "https://www.figma.com/api/mcp/asset/633d41af-e1e1-462a-acec-b1534e4d49ad";

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

const PopupChatHeader = ({ chatRoomInfo }) => {
  const { handleLeave, minimizeChat, closeChat } = useChatContext();

  return (
    <S.Header>
      <S.HeaderLeft>
        <S.ProfileArea>
          <ThumbnailBox
            src={chatRoomInfo?.chatRoomProfile || defaultProfileImg}
            alt="채팅방 프로필"
            onError={(e) => {
              e.target.src = defaultProfileImg;
            }}
          />
          <S.RoomInfo>
            <S.RoomTitle>{chatRoomInfo?.chatRoomName ?? "채팅방"}</S.RoomTitle>
            <S.RoomSubText>
              {chatRoomInfo?.chatRoomUsers ?? 0}명 참여 중
            </S.RoomSubText>
          </S.RoomInfo>
        </S.ProfileArea>
        <S.MessageStatus>
          <S.LiveBadge>
            <S.LiveIcon src={liveVectorUrl} alt="" />
            <S.LiveText>LIVE</S.LiveText>
          </S.LiveBadge>
          <S.TodayMsgRow>
            <img src={chatIcon} alt="" />
            <S.TodayMsgText>오늘 00개 메시지</S.TodayMsgText>
          </S.TodayMsgRow>
        </S.MessageStatus>
      </S.HeaderLeft>
      <S.HeaderRight>
        <S.LeaveBtn onClick={handleLeave}>채팅방 나가기</S.LeaveBtn>
        <HeaderBtn onClick={minimizeChat}>
          <img src={minusIcon} alt="최소화" />
        </HeaderBtn>
        <CloseBtn onClick={closeChat}>
          <img src={closeIcon} alt="닫기" />
        </CloseBtn>
      </S.HeaderRight>
    </S.Header>
  );
};

export default PopupChatHeader;
