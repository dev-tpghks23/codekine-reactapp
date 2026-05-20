import styled, { css, keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-7px); }
  40%       { transform: translateX(7px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
`;

const PRIMARY = "#4359fc";

export const PageWrap = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e8ecff 0%, #eef0ff 100%);
  font-family: 'Pretendard', sans-serif;
`;

export const Hero = styled.div`
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 48px 0 36px;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin: 0 0 20px;
  letter-spacing: -0.5px;
`;

export const StepBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
`;

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const StepCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? PRIMARY : "#e0e0e0")};
  color: ${({ $active }) => ($active ? "#fff" : "#aaa")};
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepName = styled.div`
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active }) => ($active ? PRIMARY : "#aaa")};
`;

export const StepLine = styled.div`
  width: 48px;
  height: 1px;
  background: #e0e0e0;
  margin-bottom: 18px;
`;

export const ContentArea = styled.div`
  max-width: 600px;
  margin: 40px auto 0;
  padding: 0 20px 120px;
`;

export const FormCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 36px 32px;
`;

export const SectionTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${PRIMARY};
  margin-bottom: 12px;
`;

export const SectionBlock = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 4px;
  display: block;
`;

export const RequiredMark = styled.span`
  font-weight: 700;
  color: ${PRIMARY};
  margin-left: 2px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
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

  ${({ $shake }) => $shake && css`
    border-color: #e74c3c;
    animation: ${shake} 0.4s ease;
  `}
`;

export const InlineRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const SmallBtn = styled.button`
  padding: 11px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background: ${({ $green }) => ($green ? "#03C75A" : PRIMARY)};
  color: #fff;
  flex-shrink: 0;
`;

export const AgreeAll = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #111;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const AgreeItem = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  margin-bottom: 6px;
`;

export const AgreeLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ViewLink = styled.span`
  font-size: 13px;
  color: #aaa;
  text-decoration: underline;
  cursor: pointer;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: ${PRIMARY};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 24px;
`;

export const AnimatedField = styled.div`
  animation: ${fadeInUp} 0.3s ease;
`;

export const SkipLink = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #aaa;
  cursor: pointer;
  padding: 4px 0;
  margin-top: 4px;
  text-decoration: underline;
`;

export const FieldHint = styled.div`
  font-size: 13px;
  margin-top: 4px;
  color: ${({ $ok }) => ($ok ? "#03C75A" : "#e74c3c")};
`;

export const InputHint = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-top: 4px;
`;

/* ── 가입완료 화면 ── */

export const CompleteCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 20px;
  overflow: hidden;
`;

export const CompleteHeader = styled.div`
  background: #fff;
  padding: 48px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const popIn = keyframes`
  0%   { transform: scale(0); opacity: 0; }
  65%  { transform: scale(1.12); }
  100% { transform: scale(1);   opacity: 1; }
`;

const checkDraw = keyframes`
  from { stroke-dashoffset: 62; }
  to   { stroke-dashoffset: 0; }
`;

export const CheckSVGWrapper = styled.div`
  width: 72px;
  height: 72px;
  background: ${PRIMARY};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(67, 89, 252, 0.35);
  animation: ${popIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

export const AnimatedCheckSVG = styled.svg`
  .check-path {
    stroke-dasharray: 62;
    stroke-dashoffset: 62;
    animation: ${checkDraw} 0.4s ease 0.3s forwards;
  }
`;

export const CompleteHeaderTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.3px;
  opacity: 0;
  animation: ${fadeInUp} 0.4s ease 0.75s forwards;
`;

export const FadeUp = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.45s ease ${({ $delay }) => $delay || '0s'} forwards;
`;

export const CompleteBody = styled.div`
  padding: 32px 32px 36px;
  text-align: center;
`;

export const CompleteTitle = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
`;

export const CompleteSub = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 28px;
`;

export const CompleteFeatures = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
`;

export const CompleteFeatureItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
  background: #f5f7ff;
  border-radius: 14px;
`;

export const FeatureIcon = styled.div`
  font-size: 26px;
`;

export const FeatureLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${PRIMARY};
`;

/* ── 회원가입 방식 선택 화면 ── */

export const MethodPageWrap = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  padding: 60px 20px;
`;

export const MethodBox = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WelcomeIllust = styled.div`
  margin-bottom: 20px;
`;

export const WelcomeTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111;
  text-align: center;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

export const WelcomeSub = styled.p`
  font-size: 15px;
  color: #888;
  text-align: center;
  margin: 0 0 32px;
`;

export const MethodEmailBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  transition: background 0.15s;

  &:hover { background: #333; }
`;

export const MethodDivider = styled.div`
  text-align: center;
  font-size: 13px;
  color: #bbb;
  position: relative;
  margin: 20px 0;
  width: 100%;

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

export const MethodSocialLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
`;

export const MethodSocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
`;

export const MethodSocialBtn = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1.5px solid ${({ $outline }) => ($outline ? '#e0e0e0' : 'transparent')};
  background: ${({ $bg }) => $bg || '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 800;
  color: ${({ $color }) => $color || '#111'};
  font-family: 'Pretendard', sans-serif;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
