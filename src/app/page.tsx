import Hero from "./(landing)/_components/hero/hero";
import WhatIsIt from "./(landing)/_components/what-is-it/what-is-it";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Hero />
      <WhatIsIt />
    </main>
  );
}
