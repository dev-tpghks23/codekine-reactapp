const PRIVATE_ROOT_URL = "http://localhost:10000/private";

// 1:1 채팅방 생성 또는 기존 방 반환 (chatRoomId 반환)
export const createDirectChatRoom = async (targetUserId) => {
  const response = await fetch(`${PRIVATE_ROOT_URL}/chat-rooms/direct`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetUserId }),
  });
  if (!response.ok) throw new Error("1:1 채팅방 생성 실패했습니다");
  const { success, message, data } = await response.json();
  return { success, message, data };
};
