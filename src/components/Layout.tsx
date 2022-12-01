interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <header className="mx-auto flex h-12 w-full max-w-[1200px]  border-b border-b-white bg-slate-600">
        <nav className="ml-4 font-serif font-bold text-white">
          PRODUCTS LIST
        </nav>
      </header>

      <main className="mx-auto max-w-[1200px]">{children}</main>
    </>
  );
};
