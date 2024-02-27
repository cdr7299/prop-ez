import DotLoader from "~/components/dot-loader";

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center">
      <DotLoader dotHeight={10} dotWidth={10} />
    </div>
  );
}
