import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import
import Cookies from 'js-cookie'; // js-cookie import
import * as S from './Login.style';
import { backApi } from '../../api/axios';

function Login() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 클릭 시
  function onClickLoginBtn() {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append('username', nickname); // nickname 추가
    formData.append('password', password); // password 추가

    // 로그인 요청
      backApi
      .post('/login', formData)
      .then((response) => {
        const accessToken = response.headers['access']; // 예시: "Bearer token"
        // localStorage에 access token 저장
        localStorage.setItem('access', accessToken);

        //user index 가져오기
      backApi
        .get('/user/user_index', {
          headers: {
            access: localStorage.getItem('access'), // Bearer 토큰 포함
          },
          params: {
            user_id: nickname, // Query Parameter 추가
          },
        })
        .then((response) => {
          localStorage.setItem('user_index', response.data.user_index);
          localStorage.setItem('user_id', response.data.id);
          console.log(response.data.user_index);
          console.log(response.data.id);
          navigate('/main');
        })
        .catch((error) => {
          console.error('데이터 로딩 실패:', error);
        });
        
      })
      .catch((error) => {
        // 로그인 실패 시
        alert('계정이 없습니다. 회원가입을 진행해주세요!');
      });
  };

  // 회원가입 버튼 클릭 시
  function onClickSigninBtn() {
    navigate('/signin-1');
  }

  return (
    <S.Component>
      <S.LoginTitle>
        서비스 이용을 위해 <text style={{ color: '#5061ff' }}>닉네임</text>과
        <br />
        <text style={{ color: '#5061ff' }}>비밀번호</text>를 입력해 주세요.
      </S.LoginTitle>
      <S.InputBox>
        <S.LoginInput
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)} // 닉네임 상태 업데이트
        />
      </S.InputBox>
      <S.InputBox>
        <S.LoginInput
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
        />
      </S.InputBox>
      <S.LoginBtn onClick={onClickLoginBtn}>로그인</S.LoginBtn>
      <S.SigninBtn onClick={onClickSigninBtn}>회원가입</S.SigninBtn>
    </S.Component>
  );
}

export default Login;
