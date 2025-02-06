import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Community.style';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ReactComponent as InsertBtn } from '../../assets/InsertBtn.svg';
import { ReactComponent as Time } from '../../assets/Time.svg';
import { ReactComponent as Running } from '../../assets/Running.svg';
import { realEstateApi } from '../../api/axios';

function Community() {
  const navigate = useNavigate();

  // 동호회 리스트 상태 변수
  const [clubList, setClubList] = useState([]);

  const imageList = [
    '/image/house1.jpg',
    '/image/house2.jpg',
    '/image/house3.jpg',
    // 필요한 만큼 이미지 추가
  ];

  // 동호회 리스트 조회 API 호출
  useEffect(() => {
    realEstateApi
      .get('/real-estates', {
        params: {
          limit: 50,
          offset: 20,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setClubList(data);
      })
      .catch((error) => {
        console.error('데이터 로딩 실패:', error);
      });
  }, []);

  // 등록 버튼 클릭 시
  function onClickInsertBtn() {
    navigate('/community-insert');
  }

  return (
    <S.Component>
      <Header text={"운동 동호회"} />

      {/* 동호회 리스트 출력 */}
      <S.ListContainer>
        {Array.isArray(clubList) && clubList.length > 0 ? (
          clubList.map((club, index) => (
            <S.ListItem
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              {/* 이미지 선택: imageList 배열에서 index에 따라 선택하거나, 모듈로 연산을 사용 */}
              <img
                src={imageList[index % imageList.length]}
                alt="매물 이미지"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '10px',
                  }}
                >
                  {club.location} - {club.price}
                </div>
                <div style={{ fontSize: '17px', marginBottom: '10px' }}>
                  {club.additionalInfo}
                </div>
                <div style={{ fontSize: '15px', marginBottom: '10px' }}>
                  Broker: {club.brokerName}
                </div>
                <div style={{ fontSize: '15px' }}>
                  Phone: {club.phoneNumber}
                </div>
              </div>
            </S.ListItem>
          ))
        ) : (
          <p>동호회 목록을 불러오는 중입니다…</p>
        )}
        </S.ListContainer>

      {/* 등록 버튼 */}
      <S.InsertBtn onClick={onClickInsertBtn}>
        <InsertBtn />
      </S.InsertBtn>

      <Footer />
    </S.Component>
  );
}

export default Community;

