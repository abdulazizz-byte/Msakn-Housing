import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سكن القوى العاملة | Sakan Workforce',
  description:
    "منصة سكن العمال الأولى في المملكة العربية السعودية - Saudi Arabia's Premier Worker Housing Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
