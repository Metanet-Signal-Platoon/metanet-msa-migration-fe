import React, { useState, useEffect, useMemo } from 'react';
import * as S from './Map.style';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LocationBtn from '../../assets/LocationBtn.svg'; // 현위치 버튼
import Marker from '../../assets/Marker.svg'; // 현위치 아이콘
import { Map as KakaoMap, useMap, MapMarker } from 'react-kakao-maps-sdk';
import debounce from 'lodash/debounce';
import Papa from 'papaparse';
import {backApi} from "../../api/axios";

const { kakao } = window;

const EventMarkerContainer = ({ position, info, onMarkerClick }) => {
  const map = useMap();

  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      map: map,
    });

    const handleMarkerClick = () => {
      map.panTo(marker.getPosition());
      onMarkerClick(info); // 클릭 시 정보를 상위 컴포넌트로 전달
      console.log(info);
    };

    kakao.maps.event.addListener(marker, 'click', handleMarkerClick);

    return () => {
      marker.setMap(null);
    };
  }, [map, position, info, onMarkerClick]);

  return null; // 마커는 DOM에 표시되지 않으므로 null 반환
};

function Map() {
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); // 선택된 스팟 정보 상태 추가
  const [selectedOption, setSelectedOption] = useState('bank'); // 선택된 옵션 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (selectedOption === "bank") {
          url = `/api/locations`;
        } else {
          url = `/api/real-estate`;
        }
        const baseurl = backApi();
        const fullurl = `${baseurl}${url}`;
        const response = await fetch(fullurl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // ✅ latlng 속성이 없을 경우 추가
        const formattedData = result.map(item => ({
          ...item,
          latlng: { lat: item.latitude, lng: item.longitude }  // ✅ latlng 추가
        }));

        setData(formattedData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [selectedOption]);



  useEffect(() => {
    const handlePosition = (pos) => {
      const { latitude, longitude } = pos.coords;
      setCenter({ lat: latitude, lng: longitude });
      setPosition({ lat: latitude, lng: longitude });
      getAddressFromCoords(latitude, longitude); // 주소 가져오기
    };

    const handleError = (error) => {
      console.error('위치 정보를 가져오는 데 실패했습니다:', error);
      alert('실시간 위치 정보를 활성화 해주세요.');
    };

    navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    const watchId = navigator.geolocation.watchPosition(handlePosition, handleError);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const getAddressFromCoords = (latitude, longitude) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(latitude, longitude);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const addressName = result[0].address.address_name;
        setAddress(addressName); // 주소 상태 업데이트
      }
    });
  };

  const setCenterToMyPosition = () => {
    setCenter(position);
  };

  const updateCenterWhenMapMoved = useMemo(
    () => debounce((map) => {
      const newCenter = map.getCenter();
      const latitude = newCenter.getLat();
      const longitude = newCenter.getLng();
      setCenter({ lat: latitude, lng: longitude });
    }, 500),
    []
  );

  return (
    <div>
      <Header text="전세 대출 저희가 도와드릴께요 !!!" />
      <div style={{ display: 'flex', padding: '80px 0px 0px 20px' }}>
        <S.Select
          onClick={() => setSelectedOption('bank')}
          selected={selectedOption === 'bank'}
        >
          은행 위치
        </S.Select>
        <S.Select
          onClick={() => setSelectedOption('mount')}
          selected={selectedOption === 'mount'}
        >
          부동산 위치
        </S.Select>
      </div>
      <S.MapTitle>
        {selectedOption === 'mount' ? (
          <>
            <text style={{ fontSize: '25px', fontWeight: '600' }}>{address}</text>
            <br />
            중심으로 부동산 위치를 찾았어요!
          </>
        ) : (
          <>
            {address ? (
              <>
                <text style={{ fontSize: '25px', fontWeight: '600' }}>{address}</text>
                <br />
                중심으로 필요한 정보가 있는 은행을 찾았어요!
              </>
            ) : (
              '주소를 가져오는 중입니다!'
            )}
          </>
        )}
      </S.MapTitle>
      <S.MapContainer>
        <KakaoMap
          id="map"
          center={center}
          style={{ width: '100%', height: '370px' }}
          level={4}
          onCenterChanged={updateCenterWhenMapMoved}
        >
          <MapMarker
            image={{
              src: Marker,
              size: { width: 30, height: 30 },
            }}
            position={position}
          />
          {data.map((item, index) => (
              <EventMarkerContainer
                  key={index}
                  position={item.latlng}
                  info={item} // 마커에 해당하는 정보 전달
                  onMarkerClick={() => setSelectedSpot(item)} // 마커 클릭 시 상태 업데이트
              />
          ))}

        </KakaoMap>
        <S.LoctionBtn src={LocationBtn} onClick={setCenterToMyPosition} />
      </S.MapContainer>
      <div style={{ paddingBottom: '120px' }}>
        {selectedSpot ? (
            <S.SpotBox>
              <div style={{ display: 'flex' }}>
                <div style={{ fontWeight: '700', fontSize: '22px', marginTop: '6px' }}>
                  {selectedSpot.name || selectedSpot.propertyName}
                </div>

                {/* ✅ 은행인 경우 카테고리 표시 */}
                {selectedOption === 'bank' && (
                    <S.Region>{selectedSpot.category}</S.Region>
                )}
              </div>

              {/* ✅ 주소 정보 처리 */}
              <div style={{ fontSize: '17px', marginTop: '13px' }}>
                {selectedSpot.address}
              </div>

              {/* ✅ 부동산인 경우 상세 주소 표시 */}
              {selectedOption === 'mount' && selectedSpot.detailAddress && (
                  <div style={{ fontSize: '17px', marginTop: '8px' }}>
                    {selectedSpot.detailAddress}
                  </div>
              )}

              {/* ✅ 전화번호 공통 표시 */}
              <div style={{ fontSize: '17px', marginTop: '8px' }}>
                전화번호 | {selectedSpot.phone || '정보 없음'}
              </div>

              {/* ✅ 은행인 경우 운영시간 표시 */}
              {selectedOption === 'bank' && selectedSpot.operatingHours && (
                  <div style={{ fontSize: '17px', marginTop: '8px' }}>
                    운영시간 | {selectedSpot.operatingHours}
                  </div>
              )}

              {/* ✅ 부동산인 경우 부동산 유형(propertyType) 표시 */}
              {selectedOption === 'mount' && selectedSpot.propertyType && (
                  <div style={{ fontSize: '17px', marginTop: '8px' }}>
                    부동산 유형 | {selectedSpot.propertyType}
                  </div>
              )}
            </S.SpotBox>
        ) : (
            <S.NoneSpot>
              지도 위 마커를 클릭하면<br />정보가 출력돼요!
            </S.NoneSpot>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Map;
