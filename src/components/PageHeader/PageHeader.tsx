import React from 'react';
import Icon, { IconType } from '@/components/Icon/Icon';
import Title from '@/components/Title/Title';
import './pageHeader.scss';

interface PageHeaderProps {
  icon: IconType;
  title: {
    title?: Array<any>; // Replace 'any' with a more specific type if possible
  } | null;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title
}) => {

  return (
    <div className='notion-page-header'>
      <div className='notion-page-icon'>
        <Icon icon={icon}/>
      </div>
      <div className='notion-page-title'>
        <Title title={title?.title ?? []}/>
      </div>
    </div>
  );
};

export default PageHeader;
