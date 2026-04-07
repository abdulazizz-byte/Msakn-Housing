import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import './globals.css';

export const metadata: Metadata = {
  title: 'سكن القوى العاملة | Sakan Workforce',
  description:
    "منصة سكن الافراد الأولى في المملكة العربية السعودية - Saudi Arabia's Premier Worker Housing Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#faf8f5]">{children}</body>
    </html>
  );
}
