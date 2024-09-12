import React from 'react';
import Block from '@/components/Block/Block';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';

interface BlockListProps {
  blocks: BlockBlockObject[];
}

const BlockList: React.FC<BlockListProps> = ({ blocks }) => {
  return (
    <div className="notion-block-list">
      <div>
        {blocks.map((block) => (
          block !== null && <Block key={block?.id || undefined} block={block} />
        ))}
      </div>
    </div>
  );
};

export default BlockList;
