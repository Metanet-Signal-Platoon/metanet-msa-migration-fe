import React from 'react'
import * as S from "./SignIn.style.ts";
import { useNavigate } from "react-router-dom";

function SignIn5() {

    const navigate = useNavigate();

    // 다음 버튼 클릭 시
    function onClickNextBtn() {
        navigate("/login");
    }

  return (
    <S.Component>
      <S.ServiceText>저희와 함께<br/>맞춤형 금융 활동을<br/>시작해보세요!</S.ServiceText>
      <S.NextBtn onClick={onClickNextBtn}>시작하기</S.NextBtn>
    </S.Component>
  )
}

export default SignIn5