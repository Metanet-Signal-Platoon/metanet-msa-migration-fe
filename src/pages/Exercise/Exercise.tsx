import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as S from './Exercise.style';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Exercise() {

  const navigation = useNavigate();

  const [reason, setReason] = useState("");
  const [exerciseName, setExerciseName] = useState("오늘의 금융 Quiz");

  useEffect(() => {
    axios
      .get('/ftness/reco_model', {
        headers: {
          access: localStorage.getItem('access')
        },
        params: {
          user_id: localStorage.getItem('user_id')
        }, 
      })
      .then((response) => {
        // 데이터가 성공적으로 돌아오면 상태를 업데이트
        const data = response;
        console.log(response.data.reason);
      })
      .catch((error) => {
        console.error('데이터 로딩 실패:', error);
      });
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  // 시작하기 버튼 클릭 시
  function onClickStartBtn() {
    navigation('/timer-start', { state: { exerciseName } });
  }
  
  return (
    <div>
      <Header text={"오늘의 금융 Quiz"}/>
      <S.Component>
        <S.HeaderTitle>{localStorage.getItem('user_id')}님을 위한 추천 난이도예요!</S.HeaderTitle>

        <S.ExerciseBox>
          <S.ExerciseTitle>뉴비</S.ExerciseTitle>
          <S.Reason>금융과 경제 분야에 관심을 두기 시작한 단계에요!</S.Reason>
          <S.StartBtn onClick={onClickStartBtn}>시작하기</S.StartBtn>
        </S.ExerciseBox>

        <S.ExerciseBox>
          <S.ExerciseTitle>고인물</S.ExerciseTitle>
          <S.Reason>투자 경험 및 금융 경제 분야를 지속적으로 정보를 찾아보고 있어요!</S.Reason>
          <S.StartBtn onClick={onClickStartBtn}>시작하기</S.StartBtn>
        </S.ExerciseBox>

        <S.ExerciseBox>
          <S.ExerciseTitle>프로</S.ExerciseTitle>
          <S.Reason>현재 금융 경제 분야에서 종사하는 현직자에에요!</S.Reason>
          <S.StartBtn onClick={onClickStartBtn}>시작하기</S.StartBtn>
        </S.ExerciseBox>
        <Footer/>
      </S.Component>
    </div>
  )
}

export default Exercise