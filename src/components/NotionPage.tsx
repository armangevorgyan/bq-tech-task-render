import type { InferGetStaticPropsType, NextPage } from 'next';
// Load the CSS to be used with the Notion Renderer.
import '@udus/notion-components/styles/globals.scss';
// Load the CSS used for rendering equations
import 'katex/dist/katex.min.css';
import { Client } from '@notionhq/client';

import { fetchBlockList } from '@udus/notion-renderer/libs';
import { BlockList } from '@udus/notion-renderer/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';

const client = new Client({auth: 'secret_hPjb5EAeVTptyLwoAbB71ifkvswWCWKipB5TBsvCqFN'});

export const getStaticProps = async () => {
  const blocks = await fetchBlockList(client, {
    block_id: 'b60c0f1c-64fe-4ea0-8e19-68d02dd4f01a'
  });
  return {
    props: {
      blocks
    }
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<Props> = ({blocks}) => {
  return <BlockList blocks={blocks.data as BlockBlockObject[]}/>;
};

export default Index;
