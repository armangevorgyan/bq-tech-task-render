import './page.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={'page'}>
      <main className={'main'}>
        <h1>Tech Task</h1>
        <Link href={'notion'}>Rendered Notion</Link>
        <Link href='https://bluequbit.notion.site/Sample-notion-page-575d3ec590204c938adc349bef9cabc9'><h3>Original Page Link</h3></Link>
      </main>
      <footer className={'footer'}>
      </footer>
    </div>
  );
}
