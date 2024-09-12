import React from 'react';
// import { TableRow } from '@udus/notion-renderer/dist/components/Blocks/TableRow';

// import { Template } from '@udus/notion-renderer/dist/components/Blocks/Template';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';
import { Code } from '@/components/Code/Code';
import { ColumnList } from '@/components/ColumnList/ColumnList';  // Import everything from hooks
import TableOfContents from '@/components/TableContents/TableContents';
import {
  AnnotationItemProvider,
  BlockProvider,
  Bookmark,
  Breadcrumb,
  BulletedList,
  BulletedListItem,
  Callout,
  ChildDatabase,
  ChildPage,
  Divider,
  Embed,
  Equation,
  Heading1,
  Heading2,
  Heading3,
  LinkPreview,
  LinkProvider, LinkToPage, NumberedList, NumberedListItem, Paragraph, Pdf, Quote,
  RichTextItemProvider, SyncedBlock, Table, ToDo, Toggle, Unsupported, Video
} from '@udus/notion-renderer/components';

interface BlockProps {
  block: BlockBlockObject;
  blockMapper?: Record<string, React.ComponentType<any>>;
  richTextItemMapper?: any;
  annotationMapper?: any;
  LinkComponent?: React.ComponentType<any>;
}

const Block: React.FC<BlockProps> = ({
  block,
  blockMapper,
  richTextItemMapper,
  annotationMapper,
  LinkComponent
}) => {
  return (
    <BlockProvider mapper={blockMapper}>
      <RichTextItemProvider mapper={richTextItemMapper}>
        <AnnotationItemProvider mapper={annotationMapper}>
          <LinkProvider link={LinkComponent}>
            <BlockSwitcher block={block}/>
          </LinkProvider>
        </AnnotationItemProvider>
      </RichTextItemProvider>
    </BlockProvider>
  );
};

const BlockSwitcher: React.FC<{ block: BlockBlockObject }> = ({block}) => {
  if (!block) return null;

  const mapper: Record<string, React.ComponentType<any>> = {
    audio: () => null,
    bookmark: Bookmark,
    breadcrumb: Breadcrumb,
    bulleted_list: BulletedList,
    bulleted_list_item: BulletedListItem,
    callout: Callout,
    child_database: ChildDatabase,
    child_page: ChildPage,
    code: Code,
    column: () =>null,
    column_list: ColumnList,
    divider: Divider,
    embed: Embed,
    equation: Equation,
    file: () => null,
    heading_1: Heading1,
    heading_2: Heading2,
    heading_3: Heading3,
    image: () => null,
    link_preview: LinkPreview,
    link_to_page: LinkToPage,
    numbered_list: NumberedList,
    numbered_list_item: NumberedListItem,
    paragraph: Paragraph,
    pdf: Pdf,
    quote: Quote,
    synced_block: SyncedBlock,
    table: Table,
    table_of_contents: TableOfContents,
    table_row: ()=>null,
    template: () => null,
    to_do: ToDo,
    toggle: Toggle,
    unsupported: Unsupported,
    video: Video,
  };

  const BlockComponent = mapper[block.type];

  if (!BlockComponent) {
    console.warn(`${block.type} is not supported.`);
    return null;
  }

  // Special cases
  if (block.type === 'column') {
    console.warn(`Top level column block is not supported. Column block must be child of column_list block.`);
  } else if (block.type === 'table_row') {
    console.warn(`Top level table_row block is not supported. Table_row block must be child of table block.`);
  }
  return <BlockComponent block={block}/>;
};

export default Block;
