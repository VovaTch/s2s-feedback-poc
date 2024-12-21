import { MobileHeader } from "@/components/custom/mobile-header";
import { Sidebar } from "@/components/custom/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <div className="min-h-screen flex flex-col lg:pl-[256px] pt-[50px] lg:pt-0">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
