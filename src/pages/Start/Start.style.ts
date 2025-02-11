import styled from 'styled-components';

export const ServiceText = styled.div`
    font-size: 30px;
    padding: 60px 0px 10px 0px;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
`;

export const ImageBox = styled.div`
    position: fixed;
    left: 42%;
    bottom: 70%;
    transform: translateX(-50%);
    cursor: pointer;
    width: 50px;  /* 원하는 크기로 조정 */
    height: 50px; /* 원하는 크기로 조정 */
`;


// 로그인 버튼
export const LoginBtn = styled.div`
    position: fixed;
    width: 340px;
    background-color: #5061ff;
    color: white;
    text-align: center;  
    left: 50%;
    bottom: 18%;
    transform: translateX(-50%);
    padding: 20px 0px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 0.3초 동안 부드럽게 변함 */

    &:hover {
        background-color: #6a78ff; /* 기존 색상보다 연한 색상 */
    }
`;

// 회원가입 버튼
export const SigninBtn = styled.div`
    position: fixed;
    width: 340px;
    background-color: white;
    border: 2px solid #5061ff;
    color: #5061ff;
    text-align: center;  
    left: 50%;
    bottom: 8%;
    transform: translateX(-50%);
    padding: 20px 0px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
`;