import { Client } from '@notionhq/client';
import { fetchBlockList, fetchPage } from '@udus/notion-renderer/libs';
import { Page } from '@udus/notion-renderer/components';
import { PageObject } from '@udus/notion-renderer/types';
import '@udus/notion-renderer/styles/globals.css';
import 'katex/dist/katex.min.css';
import './notionPageRenderer.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';
import TableOfContents from '@/components/TableContents/TableContents';

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

  return (
    <div className="notion-container">
      <TableOfContents blocks={blocks}/>
      <Page page={page} blocks={blocks}/>
    </div>
  );
}
