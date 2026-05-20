import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export default function LoginComponent() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);


  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:10000/oauth2/authorization/${provider}`;
  };

  const handleLogin = async () => {
    if (!userEmail || !userPassword) {
      setLoginMsg("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    setLoginLoading(true);
    setLoginMsg("");
    try {
      const res = await fetch("http://localhost:10000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userEmail, userPassword, socialUserProvider: "local" }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/";
      } else {
        setLoginMsg(data.message || "로그인에 실패했습니다.");
      }
    } catch {
      setLoginMsg("서버 오류가 발생했습니다.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <S.PageWrap>
      <S.LoginBox>
        <S.BrandLogo>
          <img src="/assets/image/layout/logo.svg" alt="이음" style={{ height: 36 }} />
        </S.BrandLogo>

        <S.InputGroup>
          <S.Input
            placeholder="아이디 (이메일)"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          <S.Input
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </S.InputGroup>

        {loginMsg && (
          <div style={{ fontSize: 12, color: "#e74c3c", marginBottom: 8, textAlign: "center" }}>
            {loginMsg}
          </div>
        )}

        <S.PrimaryBtn onClick={handleLogin} disabled={loginLoading}>
          {loginLoading ? "로그인 중..." : "로그인"}
        </S.PrimaryBtn>

        <S.TextLinkRow>
          <S.TextLink onClick={() => navigate("/join")}>회원가입</S.TextLink>
          <S.TextLink onClick={() => navigate("/find-account", { state: { tab: "password" } })}>비밀번호를 잊으셨나요?</S.TextLink>
        </S.TextLinkRow>

        <S.Divider>또는</S.Divider>
        <S.SocialTitle>다른 계정으로 로그인</S.SocialTitle>
        <S.SocialIconRow>
          <S.SocialIconBtn $bg="#FEE500" $color="#3C1E1E" onClick={() => handleSocialLogin("kakao")}>
            K
          </S.SocialIconBtn>
          <S.SocialIconBtn $bg="#03C75A" $color="#fff" onClick={() => handleSocialLogin("naver")}>
            N
          </S.SocialIconBtn>
          <S.SocialIconBtn $outline $bg="#fff" onClick={() => handleSocialLogin("google")}>
            <img src="https://www.google.com/favicon.ico" alt="" style={{ width: 18, height: 18 }} />
          </S.SocialIconBtn>
        </S.SocialIconRow>

      </S.LoginBox>
    </S.PageWrap>
  );
}
