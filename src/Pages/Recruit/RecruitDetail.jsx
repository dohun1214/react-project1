import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, SalaryCalculatorModal, DeleteConfirmModal } from '../../components';
import { jobPostContext, loginContext, userContext } from '../../contexts'
import usePageTitle from '../../hooks/usePageTitle'

const RecruitDetail = () => {
  const { id } = useParams();
  const { jobPosts, setJobPosts } = useContext(jobPostContext);
  const nav = useNavigate();
  const post = jobPosts.find((p) => p.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { userDispatch } = useContext(userContext);
  const { currentUser } = useContext(loginContext);

  usePageTitle(`${post.title} `)

  const KAKAO_API_KEY = 'ba4865428f815d907f9818a916f716e9';

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    if (!post?.coordinates) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;

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
  }, [post]);

  // 지도 초기화
  const initMap = () => {
    if (!mapLoaded || !window.kakao?.maps || !post?.coordinates) {
      alert('지도를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const container = document.getElementById('detail-map');
    const options = {
      center: new window.kakao.maps.LatLng(post.coordinates.lat, post.coordinates.lng),
      level: 3
    };

    const map = new window.kakao.maps.Map(container, options);

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(post.coordinates.lat, post.coordinates.lng)
    });
    marker.setMap(map);

    // 인포윈도우 생성
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding:10px; text-align:center; font-size:12px; min-width:150px;">
          <div style="font-weight:bold; margin-bottom:5px;">${post.company}</div>
          <div style="color:#666;">${post.address || '상세 주소 미등록'}</div>
        </div>
      `
    });

    // 마커 클릭시 인포윈도우 표시
    window.kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
    });

    // 초기에 인포윈도우 열어두기
    infowindow.open(map, marker);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
    if (!showMap) {
      setTimeout(initMap, 100);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-500">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">존재하지 않는 공고입니다</h2>
          <p className="text-slate-600 mb-6">요청하신 채용 공고를 찾을 수 없습니다.</p>
          <Button onClick={() => nav('/recruit')} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const time = new Date(post.createdAt).toLocaleString();

  const handleApply = () => {
    if (!currentUser) {
      alert('로그인 후 지원 가능합니다.');
      return;
    }
    userDispatch({
      type: 'APPLY_JOB',
      payload: { userId: currentUser, job: post }
    });
    alert('지원 완료되었습니다!');
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updatedPosts = jobPosts.filter((p) => p.id !== post.id);
    setJobPosts(updatedPosts);
    setShowDeleteConfirm(false);
    alert('공고가 삭제되었습니다.');
    nav('/recruit');
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // 길찾기 링크
  const getDirectionsUrl = () => {
    if (!post.coordinates) return '#';
    const { lat, lng } = post.coordinates;
    return `https://map.kakao.com/link/to/${encodeURIComponent(post.company)},${lat},${lng}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    {post.company}
                  </span>
                  <span className="text-slate-400 text-sm">•</span>
                  <span className="text-slate-500 text-sm">{post.region}</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>👤 작성자: {post.author}</span>
                  <span>📅 작성일: {time}</span>
                </div>
              </div>
              <Button
                onClick={() => nav('/recruit')}
                className="bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                ← 목록
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">📋 근무 조건</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-600 mb-1">⏰ 근무시간</div>
                  <p className="text-slate-800 font-medium">{post.time}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-600 mb-1">📅 근무요일</div>
                  <p className="text-slate-800 font-medium">{post.condition}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-600 mb-1">📍 지역</div>
                  <p className="text-slate-800 font-medium">{post.region}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-600 mb-1">💰 급여</div>
                  <p className="text-lg font-bold text-green-600">
                    {parseInt(post.pay.replace(/[,원]/g, '')).toLocaleString()}원
                  </p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-600 mb-1">🏢 카테고리</div>
                  <p className="text-slate-800 font-medium">{post.category}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-slate-600 mb-1">⭐ 우대사항</div>
                  <p className="text-slate-800 font-medium">{post.preference}</p>
                </div>
              </div>
            </div>

            {post.address && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">🗺️ 근무 위치</h2>

                <div className="bg-white/50 rounded-xl p-4 mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-600 mb-1">📍 주소</div>
                      <p className="text-slate-800 font-medium">{post.address}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {post.coordinates && (
                        <Button
                          onClick={toggleMap}
                          disabled={!mapLoaded}
                          className={`text-sm px-3 py-2 rounded-lg ${!mapLoaded
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : showMap
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                          {showMap ? '지도 닫기' : '지도 보기'}
                        </Button>
                      )}
                      {post.coordinates && (
                        <a
                          href={getDirectionsUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg">
                            길찾기
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {showMap && post.coordinates && (
                  <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm text-slate-600">
                        📍 {post.company}의 정확한 위치
                      </p>
                      <div className="text-xs text-slate-500">
                        마커를 클릭하면 상세 정보 표시
                      </div>
                    </div>
                    <div
                      id="detail-map"
                      className="w-full h-80 rounded-lg border border-slate-300"
                    ></div>
                  </div>
                )}

                {!mapLoaded && post.coordinates && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-orange-800 text-sm">
                      ⚠️ 지도 기능을 사용하려면 API 키 설정이 필요합니다.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">📝 상세 내용</h2>
              <div className="bg-white/50 rounded-xl p-6">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {post.content}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">🚀 지원하기</h3>
              <p className="text-slate-600 text-sm mb-4">
                이 공고에 관심이 있으시나요?
              </p>
              <Button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-xl font-medium"
              >
                ✨ 지원하기
              </Button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">🧮 급여 계산기</h3>
              <p className="text-slate-600 text-sm mb-4">
                예상 급여를 계산해보세요
              </p>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl font-medium"
                onClick={openModal}
              >
                계산기 열기
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">⚙️ 관리</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => nav(`/recruit/edit/${post.id}`)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  ✏️ 수정하기
                </Button>
                <Button
                  onClick={handleDelete}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                >
                  🗑️ 삭제하기
                </Button>
                <Link to="/recruit" className="block">
                  <Button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700">
                    📋 목록으로
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          title={post.title}
          company={post.company}
          region={post.region}
        />

        {isModalOpen && (
          <SalaryCalculatorModal
            isOpen={isModalOpen}
            onClose={closeModal}
            {...post}
          />
        )}
      </div>
    </div>
  );
};

export default RecruitDetail;