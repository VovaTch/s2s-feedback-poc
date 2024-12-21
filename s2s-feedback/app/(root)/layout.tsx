const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex-col flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
