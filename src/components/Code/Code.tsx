import { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import prismLanguages from 'react-syntax-highlighter/dist/cjs/languages/hljs/supported-languages';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';

interface CodeBlockProps {
  block: BlockBlockObject;
}

export const Code: FC<CodeBlockProps> = ({block}) => {
  return (
    <div id={block.id} className='notion-block notion-code'>
      <div className='notion-code-header'>
        <div className='notion-code-langage'>
          {block.code.language}
        </div>
      </div>
      <pre className='notion-code-body'>
           <SyntaxHighlighter language={block.code.language} style={docco}>
             {block.code.rich_text.map((text: any) => text.plain_text)}
           </SyntaxHighlighter>
      </pre>
      {block.code.caption && (
        <div className='notion-caption notion-code-caption'>
          {/*<RichText richText={block.code.caption}/>*/}
        </div>
      )}
    </div>
  );
};
