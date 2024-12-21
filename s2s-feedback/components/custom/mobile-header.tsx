import { cn } from "@/lib/utils";

type props = {
  className?: string;
};

export const MobileHeader = ({ className }: props) => {
  return (
    <nav
      className={cn(
        "lg:hidden px-4 h-[50px] flex-center bg-violet-800 fixed top-0 w-full z-50 text-white",
        className,
      )}
    >
      Mobile Header
    </nav>
  );
};
