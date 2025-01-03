import React, { useEffect, useState } from 'react';
import MyItem from '../my-item';
import { getUserFavorites } from '@/apis/favorites.api'; // 즐겨찾기 API 가져오기
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';

interface MyArtistProps {
  isExpanded: boolean; // 더보기 상태를 받아옴
}

const MyArtist: React.FC<MyArtistProps> = ({ isExpanded }) => {
  const [favoriteArtists, setFavoriteArtists] = useState<any[]>([]); // 즐겨찾기 데이터를 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const token = useSelector((state: RootState) => state.auth.token); // Redux에서 토큰 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }

      setLoading(true);
      try {
        const favorites = await getUserFavorites({ token });
        setFavoriteArtists(favorites);
        setError(null);
      } catch (err) {
        setError('즐겨찾기 데이터를 불러오지 못했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // artistName이 null인 데이터를 제거
  const filteredArtists = favoriteArtists.filter((artist) => artist.artistName);

  // isExpanded가 true면 모든 데이터, false면 2개만 표시
  const visibleData = isExpanded
    ? filteredArtists
    : filteredArtists.slice(0, 2);

  const handleItemClick = (artistId: string) => {
    navigate(`/artist/${artistId}`); // artist/artistId로 이동
  };

  return (
    <div className="w-full">
      {visibleData.map((artist) => (
        <div
          key={artist.artistId} // 여기서 artistId를 사용
          onClick={() => handleItemClick(artist.artistId)} // artistId를 클릭 이벤트로 사용
          className="cursor-pointer" // 클릭 가능한 UI 표시를 위한 스타일
        >
          <MyItem 
            name={artist.artistName} 
            imgurl={artist.imgUrl} // 이미지 URL 전달
          />
        </div>
      ))}
    </div>
  );
};

export default MyArtist;
