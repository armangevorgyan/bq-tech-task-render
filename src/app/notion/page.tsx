import NotionPageRenderer from '@/components/NotionPageRenderer';

export default function NotionPage() {
  const pageId = process.env.NOTION_PAGE_ID;

  return (
    <NotionPageRenderer pageId={pageId as string}/>
  );
}
