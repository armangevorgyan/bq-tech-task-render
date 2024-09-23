import { Client } from '@notionhq/client';
import { fetchBlockList, fetchPage } from '@udus/notion-renderer/libs';
// import { BlockList } from '@udus/notion-renderer/components';
import '@udus/notion-renderer/styles/globals.css';
import 'katex/dist/katex.min.css';
import './notionPageRenderer.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';
import TableOfContents from '@/components/TableContents/TableContents';
import Cover from '@/components/Cover/Cover';
import { PageObject } from '@udus/notion-renderer/types';
import PageHeader from '@/components/PageHeader/PageHeader';
import { TitleProps } from '@/components/Title/Title';
import BlockList from '@/components/BlockList/BlockList';

const notionToken = process.env.NOTION_API_TOKEN;

async function getData(pageId: string) {
  const client = new Client({auth: notionToken});
  const blocks = await fetchBlockList(client, {
    block_id: pageId as string
  });
  const page = await fetchPage(client, {
    page_id: pageId as string
  });

  return {
    blocks: blocks.data as BlockBlockObject[],
    page: page.data as PageObject
  };
}

export default async function NotionPageRenderer({pageId}: { pageId: string }) {
  const {
    blocks,
    page
  } = await getData(pageId);

  const TableOfContent = structuredClone(blocks);

  return (
    <div className='notion-container'>
      <Cover cover={page.cover}/>
      <div className='content'>
        <TableOfContents blocks={TableOfContent}/>
        <div className='page-content'>
          <PageHeader icon={page.icon} title={page.properties.title as TitleProps}/>
          <BlockList blocks={blocks}/>
        </div>
      </div>
    </div>
  );
}
