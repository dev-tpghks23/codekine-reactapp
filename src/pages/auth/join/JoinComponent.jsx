import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

const steps = ["약관동의", "회원정보 입력", "가입완료"];

const handleSocialJoin = (provider) => {
  window.location.href = `http://localhost:10000/oauth2/authorization/${provider}`;
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

const isValidBirth = (v) => {
  if (v.length !== 10) return false;
  const [y, m, d] = v.split('-').map(Number);
  if (!y || !m || !d) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  return true;
};

const formatBirth = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

const formatPhone = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

const AGREE_ITEMS = [
  { id: "terms", label: "[필수] 이음 서비스 이용약관에 동의합니다." },
  { id: "privacy", label: "[필수] 개인정보 수집 및 이용에 동의합니다." },
  { id: "marketing", label: "[선택] 마케팅 정보 수신에 동의합니다." },
];

export default function JoinComponent() {
  const navigate = useNavigate();
  const [joinMethod, setJoinMethod] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [shakeField, setShakeField] = useState(null);
  const advanceTo = (step) => setFormStep(prev => Math.max(prev, step));

  const triggerShake = (field, msg) => {
    setShakeField(field);
    if (msg) setSubmitMsg(msg);
  };

  const [birth, setBirth] = useState("");

  // 1단계: 약관동의
  const [agreeAll, setAgreeAll] = useState(false);
  const [agrees, setAgrees] = useState({ terms: false, privacy: false, marketing: false });

  // 2단계: 회원정보
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [phone, setPhone] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const [smsMsg, setSmsMsg] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const handleAgreeAll = (checked) => {
    setAgreeAll(checked);
    setAgrees({ terms: checked, privacy: checked, marketing: checked });
  };

  const handleAgreeItem = (id, checked) => {
    const next = { ...agrees, [id]: checked };
    setAgrees(next);
    setAgreeAll(Object.values(next).every(Boolean));
  };

  const handleForm = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSendCode = async () => {
    const memberPhone = phone.replace(/\D/g, "");
    if (!memberPhone) return;
    setSmsLoading(true);
    setSmsMsg("");
    try {
      const res = await fetch("http://localhost:10000/api/sms/phone/verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberPhone }),
      });
      const data = await res.json();
      if (data.success) {
        setCodeSent(true);
        setSmsMsg("인증번호가 발송되었습니다.");
      } else {
        setSmsMsg(data.message || "발송에 실패했습니다.");
      }
    } catch {
      setSmsMsg("서버 오류가 발생했습니다.");
    } finally {
      setSmsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const memberPhone = phone.replace(/\D/g, "");
    if (!memberPhone || !verifyCode) return;
    setSmsLoading(true);
    setSmsMsg("");
    try {
      const res = await fetch("http://localhost:10000/api/sms/phone/verification-code/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberPhone, code: verifyCode }),
      });
      const data = await res.json();
      if (data.success) {
        setCodeVerified(true);
        setSmsMsg("인증이 완료되었습니다.");
      } else {
        setSmsMsg(data.message || "인증번호가 올바르지 않습니다.");
      }
    } catch {
      setSmsMsg("서버 오류가 발생했습니다.");
    } finally {
      setSmsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.userName) {
      triggerShake('userName', "이름을 입력해주세요.");
      return;
    }
    if (!birth || !isValidBirth(birth)) {
      triggerShake('birth', "올바른 생년월일을 입력해주세요.");
      return;
    }
    if (!form.userEmail) {
      triggerShake('userEmail', "이메일을 입력해주세요.");
      return;
    }
    if (!EMAIL_REGEX.test(form.userEmail)) {
      triggerShake('userEmail', "이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!form.userPassword) {
      triggerShake('userPassword', "비밀번호를 입력해주세요.");
      return;
    }
    if (!PASSWORD_REGEX.test(form.userPassword)) {
      triggerShake('userPassword', "비밀번호 형식이 올바르지 않습니다.");
      return;
    }
    if (form.userPassword !== form.confirmPassword) {
      triggerShake('confirmPassword', "비밀번호가 일치하지 않습니다.");
      return;
    }
    setSubmitLoading(true);
    setSubmitMsg("");
    try {
      const res = await fetch("http://localhost:10000/api/users/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.userName,
          userEmail: form.userEmail,
          userPassword: form.userPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentStep(2);
      } else {
        const raw = data.message || "";
        if (raw.includes("ORA-00001") || raw.toLowerCase().includes("duplicate") || raw.toLowerCase().includes("unique")) {
          setSubmitMsg("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
        } else {
          setSubmitMsg(raw || "회원가입에 실패했습니다.");
        }
      }
    } catch {
      setSubmitMsg("서버 오류가 발생했습니다.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (joinMethod === null) {
    return (
      <S.MethodPageWrap>
        <S.MethodBox>
          <S.WelcomeIllust>
            <img src="/assets/image/layout/logo.svg" alt="이음" style={{ height: 48, marginBottom: 8 }} />
          </S.WelcomeIllust>
          <S.WelcomeTitle>이음에 오신 것을 환영합니다!</S.WelcomeTitle>
          <S.WelcomeSub>이음 회원가입 방식을 선택해주세요.</S.WelcomeSub>

          <S.MethodEmailBtn onClick={() => setJoinMethod("email")}>
            이메일로 회원가입
          </S.MethodEmailBtn>

          <S.MethodDivider>또는</S.MethodDivider>

          <S.MethodSocialLabel>다른 방법으로 회원가입</S.MethodSocialLabel>
          <S.MethodSocialRow>
            <S.MethodSocialBtn $bg="#FEE500" $color="#3C1E1E" onClick={() => handleSocialJoin("kakao")}>
              K
            </S.MethodSocialBtn>
            <S.MethodSocialBtn $bg="#03C75A" $color="#fff" onClick={() => handleSocialJoin("naver")}>
              N
            </S.MethodSocialBtn>
            <S.MethodSocialBtn $outline $bg="#fff" onClick={() => handleSocialJoin("google")}>
              <img src="https://www.google.com/favicon.ico" alt="" style={{ width: 20, height: 20 }} />
            </S.MethodSocialBtn>
          </S.MethodSocialRow>
        </S.MethodBox>
      </S.MethodPageWrap>
    );
  }

  return (
    <S.PageWrap>
      <S.Hero>
        <S.HeroTitle>이음과 함께<br />새로운 소통을 시작해보세요</S.HeroTitle>
        <S.StepBar>
          {steps.map((name, i) => (
            <div key={name} style={{ display: "flex", alignItems: "center" }}>
              <S.StepItem>
                <S.StepCircle $active={i <= currentStep}>{i + 1}</S.StepCircle>
                <S.StepName $active={i <= currentStep}>{name}</S.StepName>
              </S.StepItem>
              {i < steps.length - 1 && <S.StepLine />}
            </div>
          ))}
        </S.StepBar>
      </S.Hero>

      <S.ContentArea>

        {/* 1단계: 약관동의 */}
        {currentStep === 0 && (
          <S.FormCard>
            <S.SectionTitle>서비스 이용약관</S.SectionTitle>
            <S.SectionBlock>
              <S.AgreeAll>
                <input
                  type="checkbox"
                  checked={agreeAll}
                  onChange={e => handleAgreeAll(e.target.checked)}
                />
                전체 동의
              </S.AgreeAll>
              <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
                {AGREE_ITEMS.map(item => (
                  <S.AgreeItem key={item.id}>
                    <S.AgreeLeft>
                      <input
                        type="checkbox"
                        checked={agrees[item.id]}
                        onChange={e => handleAgreeItem(item.id, e.target.checked)}
                      />
                      {item.label}
                    </S.AgreeLeft>
                    <S.ViewLink>보기</S.ViewLink>
                  </S.AgreeItem>
                ))}
              </div>
            </S.SectionBlock>

            <S.SubmitBtn
              onClick={() => setCurrentStep(1)}
              disabled={!agrees.terms || !agrees.privacy}
              style={{ opacity: (!agrees.terms || !agrees.privacy) ? 0.4 : 1 }}
            >
              다음
            </S.SubmitBtn>
          </S.FormCard>
        )}

        {/* 2단계: 회원정보 입력 및 핸드폰 인증 */}
        {currentStep === 1 && (
          <S.FormCard>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* 이름 */}
              <S.AnimatedField>
                <S.Label>이름 <S.RequiredMark>*</S.RequiredMark></S.Label>
                <S.Input
                  name="userName"
                  placeholder="이름을 입력하세요"
                  value={form.userName}
                  $shake={shakeField === 'userName'}
                  onAnimationEnd={() => setShakeField(null)}
                  onChange={e => {
                    handleForm(e);
                    if (e.target.value.trim().length >= 2) advanceTo(1);
                  }}
                />
              </S.AnimatedField>

              {/* 생년월일 */}
              {formStep >= 1 && (
                <S.AnimatedField>
                  <S.Label>생년월일 <S.RequiredMark>*</S.RequiredMark></S.Label>
                  <S.Input
                    placeholder="YYYY-MM-DD"
                    style={{ letterSpacing: "1px" }}
                    value={birth}
                    $shake={shakeField === 'birth'}
                    onAnimationEnd={() => setShakeField(null)}
                    onChange={e => {
                      const v = formatBirth(e.target.value);
                      setBirth(v);
                      if (v.length === 10 && isValidBirth(v)) advanceTo(2);
                    }}
                  />
                  {birth.length === 10 && !isValidBirth(birth) && (
                    <S.FieldHint $ok={false}>올바른 생년월일을 입력해주세요.</S.FieldHint>
                  )}
                </S.AnimatedField>
              )}

              {/* 이메일 */}
              {formStep >= 2 && (
                <S.AnimatedField>
                  <S.Label>아이디 (이메일) <S.RequiredMark>*</S.RequiredMark></S.Label>
                  <S.Input
                    name="userEmail"
                    placeholder="example@email.com"
                    value={form.userEmail}
                    $shake={shakeField === 'userEmail'}
                    onAnimationEnd={() => setShakeField(null)}
                    onChange={e => {
                      handleForm(e);
                      if (EMAIL_REGEX.test(e.target.value)) advanceTo(3);
                    }}
                  />
                  {form.userEmail && !EMAIL_REGEX.test(form.userEmail) && (
                    <S.FieldHint $ok={false}>이메일 형식이 올바르지 않습니다.</S.FieldHint>
                  )}
                </S.AnimatedField>
              )}

              {/* 비밀번호 */}
              {formStep >= 3 && (
                <S.AnimatedField>
                  <S.Label>비밀번호 <S.RequiredMark>*</S.RequiredMark></S.Label>
                  <S.Input
                    type="password"
                    name="userPassword"
                    placeholder="8자 이상 입력하세요"
                    value={form.userPassword}
                    $shake={shakeField === 'userPassword'}
                    onAnimationEnd={() => setShakeField(null)}
                    onChange={e => {
                      handleForm(e);
                      if (PASSWORD_REGEX.test(e.target.value)) advanceTo(4);
                    }}
                  />
                  <S.InputHint>8자 이상, 영문·숫자·특수문자(!@#$%^&*) 사용 가능</S.InputHint>
                  {form.userPassword && !PASSWORD_REGEX.test(form.userPassword) && (
                    <S.FieldHint $ok={false}>8자 이상, 허용된 특수문자(!@#$%^&*)만 사용 가능합니다.</S.FieldHint>
                  )}
                </S.AnimatedField>
              )}

              {/* 비밀번호 확인 */}
              {formStep >= 4 && (
                <S.AnimatedField>
                  <S.Label>비밀번호 확인 <S.RequiredMark>*</S.RequiredMark></S.Label>
                  <S.Input
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={form.confirmPassword}
                    $shake={shakeField === 'confirmPassword'}
                    onAnimationEnd={() => setShakeField(null)}
                    onChange={e => {
                      handleForm(e);
                      if (e.target.value && form.userPassword === e.target.value) advanceTo(5);
                    }}
                  />
                  {form.confirmPassword && (
                    <S.FieldHint $ok={form.userPassword === form.confirmPassword}>
                      {form.userPassword === form.confirmPassword ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
                    </S.FieldHint>
                  )}
                </S.AnimatedField>
              )}

              {/* 핸드폰 인증 — 테스트 시 아래 주석 해제 */}
              {/* {formStep >= 5 && (
                <S.AnimatedField>
                  <S.Label>핸드폰 번호 <S.RequiredMark>*</S.RequiredMark></S.Label>
                  <S.InlineRow>
                    <S.Input
                      placeholder="010-0000-0000"
                      style={{ flex: 1, letterSpacing: "1px" }}
                      value={phone}
                      onChange={e => setPhone(formatPhone(e.target.value))}
                      disabled={codeVerified}
                    />
                    <S.SmallBtn onClick={handleSendCode} disabled={smsLoading || codeVerified}>
                      {codeSent ? "재발송" : "인증 발송"}
                    </S.SmallBtn>
                  </S.InlineRow>
                  {codeSent && !codeVerified && (
                    <div style={{ marginTop: 8 }}>
                      <S.Label>인증번호 <S.RequiredMark>*</S.RequiredMark></S.Label>
                      <S.InlineRow>
                        <S.Input
                          placeholder="인증번호를 입력하세요"
                          style={{ flex: 1 }}
                          value={verifyCode}
                          onChange={e => setVerifyCode(e.target.value)}
                        />
                        <S.SmallBtn $green onClick={handleVerifyCode} disabled={smsLoading}>
                          확인
                        </S.SmallBtn>
                      </S.InlineRow>
                    </div>
                  )}
                  {smsMsg && (
                    <S.FieldHint $ok={codeVerified}>{smsMsg}</S.FieldHint>
                  )}
                </S.AnimatedField>
              )} */}

            </div>

            {submitMsg && (
              <div style={{ fontSize: 13, color: "#e74c3c", marginTop: 12, textAlign: "center" }}>
                {submitMsg}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <S.SubmitBtn
                onClick={() => setCurrentStep(0)}
                style={{ background: "#fff", color: "#4359fc", border: "1.5px solid #4359fc", flex: 1 }}
              >
                이전
              </S.SubmitBtn>
              {/* 테스트 시: formStep >= 4 / 실서비스: formStep >= 5 (문자인증 완료 후) */}
              {formStep >= 4 && (
                <S.SubmitBtn onClick={handleSubmit} disabled={submitLoading} style={{ flex: 2 }}>
                  {submitLoading ? "처리 중..." : "이음 시작하기"}
                </S.SubmitBtn>
              )}
            </div>
          </S.FormCard>
        )}

        {/* 3단계: 가입완료 */}
        {currentStep === 2 && (
          <S.CompleteCard>
            <S.CompleteHeader>
              <S.CheckSVGWrapper>
                <S.AnimatedCheckSVG viewBox="0 0 70 70" width="60" height="60">
                  <path
                    className="check-path"
                    d="M16 36 L29 49 L54 20"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </S.AnimatedCheckSVG>
              </S.CheckSVGWrapper>
              <S.CompleteHeaderTitle>가입이 완료되었어요!</S.CompleteHeaderTitle>
            </S.CompleteHeader>
            <S.CompleteBody>
              <S.FadeUp $delay="0.95s">
                <S.CompleteTitle>이음 회원이 되신 것을 환영합니다 🎊</S.CompleteTitle>
              </S.FadeUp>
              <S.FadeUp $delay="1.1s">
                <S.CompleteSub>이음의 모든 서비스를 자유롭게 이용하세요.</S.CompleteSub>
              </S.FadeUp>
              <S.FadeUp $delay="1.25s">
                <S.CompleteFeatures>
                  <S.CompleteFeatureItem>
                    <S.FeatureIcon>🤟</S.FeatureIcon>
                    <S.FeatureLabel>수어 학습</S.FeatureLabel>
                  </S.CompleteFeatureItem>
                  <S.CompleteFeatureItem>
                    <S.FeatureIcon>🏆</S.FeatureIcon>
                    <S.FeatureLabel>자격증 취득</S.FeatureLabel>
                  </S.CompleteFeatureItem>
                  <S.CompleteFeatureItem>
                    <S.FeatureIcon>💬</S.FeatureIcon>
                    <S.FeatureLabel>커뮤니티</S.FeatureLabel>
                  </S.CompleteFeatureItem>
                </S.CompleteFeatures>
              </S.FadeUp>
              <S.FadeUp $delay="1.4s">
                <S.SubmitBtn onClick={() => navigate("/login")} style={{ maxWidth: 260, margin: "0 auto" }}>
                  로그인하러 가기
                </S.SubmitBtn>
              </S.FadeUp>
            </S.CompleteBody>
          </S.CompleteCard>
        )}

      </S.ContentArea>
    </S.PageWrap>
  );
}
