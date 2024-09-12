'use client';
import React from 'react';
import Link from 'next/link';
import { extractHeadingsAndTOC } from '@/utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';
import '@/styles/notionColors.scss';

const TableOfContents = ({blocks}: { blocks: BlockBlockObject[] }) => {
  const headings = extractHeadingsAndTOC(blocks);
  return headings ? (
    <div id={headings[0].id} className={`notion-block notion-table-of-contents  notion-color-${headings[0].color}`}>
      {headings &&
        headings.map((heading: any) => (
          <div key={heading.id} className='notion-table-of-contents-item'>
            <div className={`notion-table-of-contents-item-${heading.type}`}>
              <Link href={`#${heading.id}`}>
                {heading.text}
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  ) : null;
};

export default TableOfContents;
