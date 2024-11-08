import { Nunito } from 'next/font/google';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/components/shared/providers';

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <link rel="icon" href="/logo.png" data-rh='true'/>
      <body className={nunito.className}>
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  );
}
