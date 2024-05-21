import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export default function Hero() {
  return (
    <div className="container mt-[4.5rem] flex min-h-[calc(100vh-4.5rem)] max-w-screen-2xl flex-col items-center justify-center gap-12 px-4 py-8 ">
      <div className="flex basis-1/2 flex-col items-center justify-center gap-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-accent">PropEZ</span>
        </h1>
        <h3 className="text-center font-bold sm:text-xl">
          Track Real estate with <span className="text-accent">Ease.</span>
        </h3>
      </div>
      <Button
        className="absolute bottom-8 flex gap-2 rounded-full px-6 py-3 font-bold"
        variant="ghost"
      >
        See how it can help your business
        <DoubleArrowDownIcon className="size-4" />
      </Button>
    </div>
  );
}
