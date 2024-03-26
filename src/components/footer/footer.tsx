import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex min-h-14 w-full items-center justify-center border-t-[1px] border-primary">
      <div className="flex w-full max-w-screen-2xl flex-col gap-4  px-4 py-6">
        <div className="flex max-w-screen-2xl flex-col">
          <h2 className="w-full text-2xl font-extrabold text-accent">Trakr</h2>
        </div>
        <div className="flex w-full gap-6 md:gap-12">
          <p className="cursor-pointer text-sm underline-offset-2 hover:underline">
            <Link href="/terms-of-use">Terms of Use</Link>
          </p>
          <p className="cursor-pointer text-sm underline-offset-2 hover:underline">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
