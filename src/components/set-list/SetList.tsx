import React from 'react';
import SongListItem from '../song-list-item';
import { songData } from '@/constants/songData';

const SetList: React.FC = () => {
  return (
    <div className='w-full mx-auto bg-white mt-4'>
      <div className='flex flex-col gap-y-2'>
        {songData.map((song, idx) => (
          <SongListItem key={idx} index={song.index} songName={song.songName} />
        ))}
      </div>
    </div>
  );
};

export default SetList;
