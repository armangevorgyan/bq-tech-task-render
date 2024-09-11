import React from 'react';

export interface TitleProps {
  title: Array<any>; // Replace 'any' with a more specific type if// possible,
}

const Title: React.FC<TitleProps> = ({title}) => {
  return <span className={`notion-color-${title[0]?.annotations?.color || 'default'}`}>{title[0]?.plain_text || ''}</span>;
};
export default Title;
