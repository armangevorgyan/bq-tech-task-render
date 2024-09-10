import NotionPageRenderer from '@/components/NotionPageRenderer';

export default function Home() {
  const pageId = process.env.NOTION_TASK_PAGE;

  return (
    <NotionPageRenderer pageId={pageId as string}/>
  );
}
