export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full flex-col items-center gap-2 px-4 py-4">
      {children}
    </div>
  );
}
