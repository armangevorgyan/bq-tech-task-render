import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'BQ Notion Tech Task',
  description: 'Notion Like Page',
  openGraph: {
    title: 'BQ Notion Tech Task',
    description: 'Notion Like Page',
    images: [
      {
        url: './favicon.ico',
        width: 32,
        height: 32,
        alt: 'BQ Notion image'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    {children}
    </body>
    </html>
  );
}
