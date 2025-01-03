import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GlobalListProps {
  title: string; // 제목
  subtitle?: string; // 부제목 (선택적)
  rightText?: string; // 오른쪽 텍스트 (선택적)
  artistId?: string; // 아티스트 ID (선택적)
}

const GlobalList: React.FC<GlobalListProps> = ({ title, subtitle, rightText, artistId }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleRightTextClick = () => {
    if (rightText && artistId) {
      navigate(`/board/${artistId}`); // '/board/:artistId' 경로로 이동
    }
  };

  return (
    <div className="px-7 py-2">
      {/* 제목, 가운데 텍스트, 오른쪽 텍스트를 flex로 배치 */}
      <div className="flex items-center justify-between">
        {/* 왼쪽: 제목과 부제목 */}
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && (
            <span className="text-sm text-gray-500 ml-2">{subtitle}</span> // 부제목은 제목 옆에 표시
          )}
        </div>

        {/* 오른쪽: 텍스트 (예: 더보기) */}
        {rightText && (
          <span
            className="text-lg text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={handleRightTextClick} // 클릭 이벤트 추가
          >
            {rightText}
          </span>
        )}
      </div>
      <hr className="border-t-1 border-gray-400 mt-5" />
    </div>
  );
};

export default GlobalList;
