import { FC } from 'react';
import BlockList from '@/components/BlockList/BlockList';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';
interface ColumnListProps {
  block: BlockBlockObject
}

export const ColumnList: FC<ColumnListProps> = ({ block }) => {
  return (
    <div id={block.id} className="notion-block notion-column-list">
      {block.column_list.columns &&
        block.column_list.columns.map((column: BlockBlockObject) =>
            column.column.children && (
              <div className="notion-column" key={column.id}>
                <BlockList blocks={column.column.children} />
              </div>
            )
        )}
    </div>
  );
};
