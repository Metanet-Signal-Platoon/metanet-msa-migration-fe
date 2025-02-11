import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as S from './Main.style';
import { ReactComponent as ArrowIcon } from '../../assets/ArrowIcon.svg';

function Main() {

  const navigate = useNavigate();

  function onClickMenu1(){
    navigate('/exercise');
  }

  function onClickMenu2(){
    navigate('/map');
  }

  function onClickMenu3(){
    navigate('/community');
  }

  return (
    <div>
      <S.Header>

      </S.Header>

      <S.SubHeader>
        <S.HeaderText1>안녕하세요! {localStorage.getItem('user_id')}님,</S.HeaderText1>
        <S.HeaderText2>원하시는 금융 서비스를 확인해 주세요.</S.HeaderText2>
      </S.SubHeader>

      <S.MainContainer>
        <S.Service1 onClick={onClickMenu1}>
          <S.ServiceTitle>오늘의 금융 Quiz</S.ServiceTitle>
          <S.ServiceText>오늘의 금융 Quiz를 풀고<br/>금융 상식을 키워보세요!</S.ServiceText>
          <S.ServiceIcon><ArrowIcon/></S.ServiceIcon>
        </S.Service1>

        <S.Service3 onClick={onClickMenu2}>
          <S.ServiceTitle>은행과 부동산 위치</S.ServiceTitle>
          <S.ServiceText>전세 대출이 가능한 은행 위치와 근처 부동산의 위치를 검색할 수 있어요.</S.ServiceText>
          <S.ServiceIcon><ArrowIcon/></S.ServiceIcon>
        </S.Service3>

        <S.Service2 onClick={onClickMenu3}>
          <S.ServiceTitle>전세 매물</S.ServiceTitle>
          <S.ServiceText>다양한 전세 매물이 있어<br/>원하는 매물을 찾을 수 있어요.</S.ServiceText>
          <S.ServiceIcon><ArrowIcon/></S.ServiceIcon>
        </S.Service2>
      </S.MainContainer>
    </div>
  )
}

export default Main