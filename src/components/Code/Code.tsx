'use client';
import { FC, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as languages from 'react-syntax-highlighter/src/languages/hljs/supported-languages';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';

interface CodeBlockProps {
  block: BlockBlockObject;
}

export const Code: FC<CodeBlockProps> = ({block}) => {
  const availableLanguages: string[] | [] = languages.default || [];
  const [selectedLanguage, setSelectedLanguage] = useState(block.code.language || 'javascript');
  return (
    <div id={block.id} className='notion-block notion-code'>
      <div className='notion-code-header'>
        <div className='notion-code-langage'>
          <select
            className='select'
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
          >
            {availableLanguages.map((language: string, index: number) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
      <pre className='notion-code-body'>
           <SyntaxHighlighter language={selectedLanguage} style={docco}>
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
