import { Header } from '@/components/layout/Header';
import { AppShell } from '@/components/layout/AppShell';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AppShell />
    </div>
  );
}

