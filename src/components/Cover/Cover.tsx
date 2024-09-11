import React from 'react';
import Image from 'next/image';

interface ExternalCover {
  type: 'external';
  external: {
    url: string;
  };
}

interface FileCover {
  type: 'file';
  file: {
    url: string;
  };
}

type CoverProps = {
  cover: ExternalCover | FileCover | null;
};

const Cover: React.FC<CoverProps> = ({cover}) => {
  if (!cover) {
    return null;
  }

  let imageUrl: string;

  if (cover.type === 'external') {
    imageUrl = cover.external.url;
  } else if (cover.type === 'file') {
    imageUrl = cover.file.url;
  } else {
    console.warn('Unknown cover type');
    return null;
  }
  // Check if the image is from an allowed domain
  const isAllowedDomain = imageUrl.startsWith('https://www.notion.so/');

  return (
    <div className='notion-page-cover'>
      {isAllowedDomain ? <Image
        className='notion-cover'
        src={imageUrl}
        alt='Notion cover'
        width={1200}
        height={630}
        priority
      /> : <img
        className='notion-cover'
        src={imageUrl}
        alt='Notion cover'
        style={{
          width: '1200px',
          height: '630px'
        }}
      />}
    </div>

  );
};

export default Cover;
