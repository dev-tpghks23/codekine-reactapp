import styled from "styled-components";

const PRIMARY = "#4359fc";

export const PageWrap = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  padding: 60px 20px;
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const BrandLogo = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 4px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  color: #111;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${PRIMARY};
  }

  &::placeholder {
    color: #bbb;
  }
`;

export const PrimaryBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 12px;
  font-family: 'Pretendard', sans-serif;
  transition: background 0.15s;

  &:hover { background: #333; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const TextLinkRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 28px;
`;

export const TextLink = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  padding: 0;
  font-family: 'Pretendard', sans-serif;

  &:hover {
    color: #444;
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  text-align: center;
  font-size: 13px;
  color: #bbb;
  position: relative;
  margin: 0 0 16px;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background: #eee;
  }
  &::before { left: 0; }
  &::after { right: 0; }
`;

export const SocialTitle = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
`;

export const SocialIconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 8px;
`;

export const SocialIconBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid ${({ $outline }) => ($outline ? '#e0e0e0' : 'transparent')};
  background: ${({ $bg }) => $bg || '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 17px;
  font-weight: 800;
  color: ${({ $color }) => $color || '#111'};
  font-family: 'Pretendard', sans-serif;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const FindPwCard = styled.div`
  margin-top: 24px;
  background: #f9f9fc;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 24px;
`;

export const CardTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #111;
  margin: 0 0 20px;
`;

export const StepLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${PRIMARY};
  margin-bottom: 8px;
`;

export const StepSection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const InlineRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const SmallInput = styled(Input)`
  flex: 1;
  padding: 10px 14px;
  font-size: 14px;
`;

export const SmallBtn = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background: ${({ $green }) => ($green ? '#03C75A' : PRIMARY)};
  color: #fff;
  font-family: 'Pretendard', sans-serif;
`;

export const ChangeBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: ${PRIMARY};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;
  font-family: 'Pretendard', sans-serif;

  &:hover { background: #2e47e0; }
`;
