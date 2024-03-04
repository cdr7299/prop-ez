export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center">{children}</div>
  );
}
