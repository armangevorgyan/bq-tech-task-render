'use client';
import { FC, useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
  const [selectedTheme, setSelectedTheme] = useState(docco);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        setSelectedTheme(a11yDark);
      } else {
        setSelectedTheme(docco);
      }

      const handleChange = ({matches}: MediaQueryListEvent) => {
        if (matches) {
          setSelectedTheme(a11yDark);
          console.log('change to dark mode!');
        } else {
          setSelectedTheme(docco);
          console.log('change to light mode!');
        }
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);

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
           <SyntaxHighlighter language={selectedLanguage} style={selectedTheme}>
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
