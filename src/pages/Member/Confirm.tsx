import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography, { TypographyProps } from "@mui/material/Typography";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Member, useMemberStore } from "../../store/memberSlice";

export const Typo = styled((props: TypographyProps) => <Typography component="h4" {...props} />)`
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  padding-bottom: 1.5rem;
  color: #474038;
  text-decoration: underline;
  text-decoration-thickness: 0.1rem;
  text-underline-offset: 0.3rem
`;

const ConfirmContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const FormBox = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 31rem;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.1);
`;

const Field = styled(Box)`
  width: 100%;
  margin-bottom: 1rem;
`;

const AgreementBox = styled(Box)`
  width: 100%;
  margin-top: 1rem;
`;

export default function MemberConfirm() {
  const navigate = useNavigate();
  const { member, setMember, setAgreements } = useMemberStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target; ``
    type === "checkbox" ? setAgreements({ [name]: checked }) : setMember({ ...member, [name]: value });
  };

  const { mutate: memberJoin } = useMutation<{ code: number; msg: string; data: string }, Error, Member>({
    mutationFn: async (newMember) => {
      const res = await axios.post("http://localhost:8080/api/members/join", newMember);
      return res.data;
    },
    onSuccess: (data) => {
      data.code === 1 ? navigate("/member/complete") : console.error("회원가입 실패:", data.msg);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    memberJoin(member);
  };

  return (
    <>
      <ConfirmContainer>
        <Typo>
          회원가입
        </Typo>
        <FormBox noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Field>
            <Field>
              <TextField
                label="이메일"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={member.email}
                onChange={handleChange}
              />
            </Field>
            <TextField
              label="아이디"
              name="memberId"
              type="memberId"
              variant="outlined"
              fullWidth
              required
              value={member.memberId}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="비밀번호"
              name="password"
              type="password"
              variant="outlined"
              helperText="영문, 숫자, 특수문자 2개 조합 8자 이상"
              fullWidth
              required
              value={member.password}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={member.passwordConfirm}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="이름"
              name="username"
              type="username"
              variant="outlined"
              fullWidth
              required
              value={member.username}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="휴대폰번호"
              name="tel"
              variant="outlined"
              fullWidth
              required
              value={member.tel}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="주소"
              name="address"
              variant="outlined"
              fullWidth
              required
              value={member.address}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="상세주소"
              name="detailAddress"
              variant="outlined"
              fullWidth
              required
              value={member.detailAddress}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <TextField
              label="우편번호"
              name="zipcode"
              variant="outlined"
              fullWidth
              required
              value={member.zipcode}
              onChange={handleChange}
            />
          </Field>
          <AgreementBox>
            <Typography variant="h6" gutterBottom>
              동의 항목
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="전체 동의합니다"
                name="allAgree"
                checked={
                  member.agreements.terms &&
                  member.agreements.privacy &&
                  member.agreements.allReceive &&
                  member.agreements.email &&
                  member.agreements.sms &&
                  member.agreements.appNoti
                }
                onChange={(e) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  setAgreements({
                    terms: checked,
                    privacy: checked,
                    email: checked,
                    allReceive: checked,
                    sms: checked,
                    appNoti: checked,
                  });
                }}
              />
              <FormControlLabel
                control={<Checkbox required name="terms" checked={member.agreements.terms} onChange={handleChange} />}
                label="회원 이용약관 동의"
                required
              />
              <FormControlLabel
                control={<Checkbox required name="privacy" checked={member.agreements.privacy} onChange={handleChange} />}
                label="개인정보 처리 방침 동의"
                required
              />
              <FormControlLabel
                control={<Checkbox />}
                label="이메일, SMS, 앱 알림 수신 동의 (선택)"
                name="allReceive"
                checked={
                  member.agreements.allReceive &&
                  member.agreements.email &&
                  member.agreements.sms &&
                  member.agreements.appNoti
                }
                onChange={(e) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  setAgreements({
                    allReceive: checked,
                    email: checked,
                    sms: checked,
                    appNoti: checked,
                  });
                }}
              />
              <Box>
                <FormControlLabel control={<Checkbox name="email" checked={member.agreements.email} onChange={handleChange} />} label="이메일" />
                <FormControlLabel control={<Checkbox name="SMS" checked={member.agreements.sms} onChange={handleChange} />} label="SMS" />
                <FormControlLabel control={<Checkbox name="appNoti" checked={member.agreements.appNoti} onChange={handleChange} />} label="앱 알림" />
              </Box>
            </FormGroup>
          </AgreementBox>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={handleSubmit}
            sx={{
              marginTop: "2rem",
              height: "3rem",
              color: "white",
              backgroundColor: "#776B5D",
            }}
          >
            가입하기
          </Button>
        </FormBox>
      </ConfirmContainer>
    </>
  );
}

// TODO
// [ ] 비밀번호, 아이디 validation
// [ ] 주소 선택시 지도 api 요청
// [ ] 상단 Typography 컴포넌트로 만들기

// [x] member 페이지에 작성한 이메일 저장해서 멤버컨펌에 가져오기
// [x] outlet 해결
// [x] 전체 동의 버튼 누르면 일괄 동의 되도록 처리
// [x] form field id, name 요소 추가 
// [x] 체크 박스 일괄 선택
// [ ] 폰 번호 input 3칸으로 쪼개기
// [ ] 폼 옆에 각각 폼 이름 작성
// [ ] 약관 lorem 텍스트 추가
// [ ] 컬러 변경