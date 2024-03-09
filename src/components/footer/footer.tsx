export default function Footer() {
  return (
    <div className="flex min-h-14 w-full items-center justify-center border-t-[1px] border-primary">
      <div className="flex w-full max-w-screen-2xl flex-col gap-4  px-4 py-6">
        <div className="flex max-w-screen-2xl flex-col">
          <h2 className="w-full text-2xl font-extrabold text-accent">Trakr</h2>
        </div>
        <div className="flex w-full gap-6 md:gap-12">
          <h4 className="cursor-pointer text-sm underline-offset-2 hover:underline">
            Terms of use
          </h4>
          <h4 className="cursor-pointer text-sm underline-offset-2 hover:underline">
            Privacy Policy123123
          </h4>
        </div>
      </div>
    </div>
  );
}
