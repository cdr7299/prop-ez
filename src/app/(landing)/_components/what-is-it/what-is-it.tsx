import Introduction from "~/app/(landing)/_components/what-is-it/propez_intro";
import MainContent from "~/app/(landing)/_components/what-is-it/why_choose_propez";
export default function WhatIsIt() {
  return (
    <div className="container flex w-full max-w-screen-2xl flex-col items-center justify-center gap-12 bg-gray-50 px-4 py-8 pt-16 dark:bg-gray-800  sm:min-h-[calc(100vh-4.5rem)]">
      <Introduction />
      <MainContent />
    </div>
  );
}
