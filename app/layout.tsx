import type { Metadata } from 'next';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import './globals.css';
import { BackgroundMusic } from '../components/BackgroundMusic';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap'
});

const script = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Al & Joan | Wedding Invitation',
  description: 'A cinematic wedding invitation experience for Al and Joan.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${script.variable}`}>
        <BackgroundMusic>{children}</BackgroundMusic>
      </body>
    </html>
  );
}
