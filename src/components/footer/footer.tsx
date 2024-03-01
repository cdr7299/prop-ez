export default function Footer() {
  return (
    <div className="flex min-h-14 w-full max-w-screen-2xl flex-col justify-center gap-4 border-t-[1px] border-primary px-4 py-6">
      <div className="flex flex-col">
        <h2 className="w-full text-2xl font-extrabold text-accent">Trakr</h2>
      </div>
      <div className="flex w-full gap-6 md:gap-16">
        <h4 className="cursor-pointer text-sm underline-offset-2 hover:underline">
          Terms of use
        </h4>
        <h4 className="cursor-pointer text-sm underline-offset-2 hover:underline">
          Privacy Policy
        </h4>
      </div>
    </div>
  );
}
