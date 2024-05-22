export default function WhatIsIt() {
  return (
    <div className="container flex min-h-[calc(100vh-4.5rem)] max-w-screen-2xl flex-col items-start justify-center gap-12 bg-gray-50 px-4 py-8 pt-16 dark:bg-gray-800 sm:flex-row">
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">
          <span className="mr-2 text-accent">PropEZ</span>
          is an easy and effective way to deal with your Real Estate.
        </h1>
        <div className="flex gap-2">
          <h2 className="text-xl font-bold">
            Take your properties with you, wherever you go.
          </h2>
        </div>
      </div>
    </div>
  );
}
