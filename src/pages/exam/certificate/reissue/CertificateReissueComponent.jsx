import { useState } from "react";
import * as S from "./style";
import { formatBirth, formatPhone, formatCertNo } from "../../inputFormat";

const CertificateReissueComponent = () => {
  const [certNo, setCertNo] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <S.Wrapper>
      <S.SectionTitle style={{ marginBottom: 6 }}>수료증 재발급 신청</S.SectionTitle>
      <S.Subtitle>발급 기간(180일)이 만료된 수료증의 재발급을 신청합니다.</S.Subtitle>

      <S.FormWrap>
        <S.Grid>
          <div>
            <S.Label>수료번호 *</S.Label>
            <S.Input
              placeholder="예: CL-2025-00456"
              value={certNo}
              onChange={e => setCertNo(formatCertNo(e.target.value))}
            />
          </div>
          <div>
            <S.Label>이름 *</S.Label>
            <S.Input placeholder="홍길동" />
          </div>
          <div>
            <S.Label>생년월일 *</S.Label>
            <S.Input
              placeholder="YYYY-MM-DD"
              value={birth}
              onChange={e => setBirth(formatBirth(e.target.value))}
            />
          </div>
          <div>
            <S.Label>연락처 *</S.Label>
            <S.Input
              placeholder="010-0000-0000"
              value={phone}
              onChange={e => setPhone(formatPhone(e.target.value))}
            />
          </div>
        </S.Grid>

        <div>
          <S.Label>재발급 사유 *</S.Label>
          <S.Textarea placeholder="사유를 입력하세요 (예: 출력 기간 만료, 분실 등)" />
        </div>

        <S.FeeText>
          재발급 수수료: 5,000원
          <S.FeeNote>(재발급 후 180일간 출력 가능)</S.FeeNote>
        </S.FeeText>

        <S.SubmitBtn>재발급 신청하기</S.SubmitBtn>
      </S.FormWrap>
    </S.Wrapper>
  );
};

export default CertificateReissueComponent;
