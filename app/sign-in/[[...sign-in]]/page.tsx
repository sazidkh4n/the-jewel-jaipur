import { SignIn } from "@clerk/nextjs";
import { Header } from '@/app/components/layout/header';
import { Navigation } from '@/app/components/layout/navigation';
 
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <SignIn appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-[440px]",
            card: "shadow-none",
          }
        }} />
      </main>
      <Navigation />
    </div>
  );
}