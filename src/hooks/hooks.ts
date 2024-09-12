'use client';
import { createContext, useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { BlockBlockObject } from '@udus/notion-renderer/dist/types/notion/block/block';

// import { Link } from '@udus/notion-renderer/dist/components/Common/Link.js';


export const AnnotationContext = createContext({});
export const BlockContext = createContext({});
export const LinkContext = createContext({});
export const PropertyItemContext = createContext({});
export const RichTextItemContext = createContext({});

export const useMapper = () => {
  const annotationMapper = useContext(AnnotationContext);
  const blockMapper = useContext(BlockContext);
  const Link = useContext(LinkContext);
  const propertyItemMapper = useContext(PropertyItemContext);
  const richTextItemMapper = useContext(RichTextItemContext);
  return {
    annotationMapper,
    blockMapper,
    Link,
    propertyItemMapper,
    richTextItemMapper
  };
};

export const BlocksContext = createContext<BlockBlockObject[]>([]);
export const useBlocks = () => {
  return useContext(BlocksContext);
};
