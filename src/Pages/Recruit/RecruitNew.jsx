import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { jobPostContext } from '../../contexts/jobPostContext';
import usePageTitle from '../../hooks/usePageTitle'

const timeOptions = ['오전', '오후', '풀타임', '협의 후 결정'];
const daysOptions = ['평일', '주말', '야간', '주휴'];
const categoryOptions = ['편의점', '음식점', '사무직', '서비스업', '기술직', '기타'];
const regionOptions = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
const payOptions = ['10,000원', '10,500원', '11,000원', '12,000원', '12,500원', '협의 후 결정'];
const preferenceOptions = ['경력자 우대', '초보 가능', '급구', '친절', '장기 근무 가능', '시간 협의 가능', '즉시 출근', '주말 근무 가능', '유니폼 제공', '식사 제공'];

const RecruitNew = () => {
  const { jobPosts, setJobPosts } = useContext(jobPostContext);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(timeOptions[0]);
  const [days, setDays] = useState(daysOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [pay, setPay] = useState(payOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [preference, setPreference] = useState(preferenceOptions[0]);
  const [content, setContent] = useState('');
  const [author] = useState('익명');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 37.5665, lng: 126.9780 });
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  usePageTitle("채용공고 작성 - JOBBLE")

  const KAKAO_API_KEY = 'ba4865428f815d907f9818a916f716e9';

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapLoaded(true);
        console.log('카카오맵 로드 완료');
      });
    };

    script.onerror = () => {
      console.error('카카오맵 로드 실패');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 지도 초기화
  const initMap = () => {
    if (!mapLoaded || !window.kakao?.maps) {
      alert('지도를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const container = document.getElementById('map');
      if (!container) {
        console.error('지도 컨테이너를 찾을 수 없습니다');
        return;
      }

      const options = {
        center: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng),
        level: 3
      };

      const map = new window.kakao.maps.Map(container, options);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng)
      });
      marker.setMap(map);

      // 지도 클릭 이벤트
      window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        const latlng = mouseEvent.latLng;

        // 마커 위치 변경
        marker.setPosition(latlng);

        // 좌표 저장
        setCoordinates({
          lat: latlng.getLat(),
          lng: latlng.getLng()
        });

        // 주소 검색 (services가 있을 때만)
        if (window.kakao.maps.services) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result[0].address.address_name;
              setAddress(addr);
              alert(`주소: ${addr}`);
            } else {
              console.log('주소 변환 실패');
            }
          });
        } else {
          console.log('주소 변환 서비스를 사용할 수 없습니다');
        }
      });

    } catch (error) {
      console.error('지도 초기화 오류:', error);
      alert('지도 초기화 중 오류가 발생했습니다.');
    }
  };

  // 주소로 검색
  const searchAddress = () => {
    if (!address.trim()) {
      alert('주소를 입력해주세요.');
      return;
    }

    if (!mapLoaded || !window.kakao?.maps) {
      alert('지도를 불러오는 중입니다.');
      return;
    }

    // services 라이브러리 체크
    if (!window.kakao.maps.services) {
      alert('지도 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newCoords = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x)
        };
        setCoordinates(newCoords);
        alert('주소를 찾았습니다!');

        // 지도가 열려있으면 위치 이동
        if (showMap) {
          setTimeout(initMap, 100);
        }
      } else {
        alert('주소를 찾을 수 없습니다.');
      }
    });
  };

  const toggleMap = () => {
    setShowMap(!showMap);
    if (!showMap) {
      setTimeout(initMap, 100);
    }
  };

  const handleSubmit = () => {
    if (!company.trim()) return alert('회사명을 입력해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');

    const newItem = {
      id: Date.now(),
      company: company.trim(),
      title: title.trim(),
      time, days, region, pay, category, preference,
      content, author,
      address: address || '주소 미입력',
      coordinates,
      createdAt: new Date().toISOString(),
    };
    setJobPosts([newItem, ...jobPosts]);
    navigate('/recruit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              새 채용공고 작성
            </h1>
            <p className="text-slate-600">새로운 채용 공고를 작성하여 인재를 모집하세요</p>

          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="회사명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  채용 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="채용 제목을 입력하세요"
                />
              </div>
            </div>

            {/* 근무 조건 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">근무 조건</h3>
              <div className="grid lg:grid-cols-3 gap-4">
                {[
                  ['근무시간', time, setTime, timeOptions],
                  ['근무요일', days, setDays, daysOptions],
                  ['지역', region, setRegion, regionOptions],
                  ['급여', pay, setPay, payOptions],
                  ['카테고리', category, setCategory, categoryOptions],
                  ['우대사항', preference, setPreference, preferenceOptions],
                ].map(([label, value, setter, opts]) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {label}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {opts.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* 위치 설정 */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">🗺️ 근무 위치</h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="주소를 입력하세요 (예: 서울 강남구 테헤란로)"
                    onKeyPress={(e) => e.key === 'Enter' && searchAddress()}
                  />
                  <Button
                    onClick={searchAddress}
                    disabled={!mapLoaded}
                    className={`px-6 py-3 rounded-xl whitespace-nowrap ${mapLoaded
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }`}
                  >
                    검색
                  </Button>
                  <Button
                    onClick={toggleMap}
                    disabled={!mapLoaded}
                    className={`px-6 py-3 rounded-xl whitespace-nowrap ${!mapLoaded
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : showMap
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                  >
                    {showMap ? '지도 닫기' : '지도 열기'}
                  </Button>
                </div>

                {/* 지도 */}
                {showMap && (
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <div className="mb-3">
                      <p className="text-sm text-slate-600">
                        📍 지도를 클릭하여 정확한 위치를 선택하세요
                      </p>
                      {address && (
                        <p className="text-sm font-medium text-slate-800 mt-1">
                          현재 주소: {address}
                        </p>
                      )}
                    </div>
                    <div
                      id="map"
                      className="w-full h-80 rounded-lg border border-slate-300"
                    ></div>
                  </div>
                )}

                {!mapLoaded && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-orange-800 text-sm">
                      ⚠️ 지도 기능을 사용하려면 코드의 KAKAO_API_KEY를 실제 키로 교체해주세요.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 상세 내용 */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                상세 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="채용 공고의 상세 내용을 입력하세요"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <Button
                onClick={() => navigate('/recruit')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3"
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3"
              >
                📝 공고 등록
              </Button>
            </div>
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-6 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/30 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 사용 안내</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div className="space-y-1">
              <p>• 주소 입력 후 검색 버튼을 클릭하세요</p>
              <p>• 지도에서 클릭하여 정확한 위치 선택</p>
              <p>• 모든 필수 항목을 입력해주세요</p>
            </div>
            <div className="space-y-1">
              <p>• API 키 설정이 필요합니다</p>
              <p>• 카카오 개발자 콘솔에서 도메인 등록</p>
              <p>• JavaScript 키를 사용하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitNew;