import '@udus/notion-renderer/styles/globals.css';
import 'katex/dist/katex.min.css';
import './notion.scss';

import { Client } from '@notionhq/client';
import { convertBreadcrumbResponseToBlock, fetchBlock, fetchBlockList, fetchPage } from '@udus/notion-renderer/libs';
import { BlockList, Breadcrumb, Page } from '@udus/notion-renderer/components';
import { BreadcrumbBlockObject, PageObject, BlockMapper } from '@udus/notion-renderer/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';

const notionToken = process.env.NOTION_API_TOKEN;
const pageId = process.env.NOTION_PAGE_ID;

async function getData() {
  const client = new Client({auth: notionToken});
  const blocks = await fetchBlockList(client, {
    block_id: pageId as string
  });
  const page = await fetchPage(client, {
    page_id: pageId as string
  });
  const block = await fetchBlock(client, {
    block_id: pageId as string
  });

  return {
    blocks: blocks.data as BlockBlockObject[],
    page: page.data as PageObject,
    block: block.data as BreadcrumbBlockObject
  };
}

export default async function HomePage() {
  const {
    blocks,
    page,
  } = await getData();

  return (
    <>
      <Page page={page} blocks={blocks} />
      {/*<Breadcrumb block={block}/>*/}
      {/*<BlockList blocks={blocks}/>*/}
    </>
  );
}
