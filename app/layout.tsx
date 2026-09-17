import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The OC Universe — One OC. Infinite realities.',
  description: 'A connected canon of numbered OC universes, artists, collectors, and signals.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
