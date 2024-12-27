"use client";

import { cn } from "@/lib/utils";
import { languageStates } from "@/app/static/lang-states";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

type props = {
  className?: string;
};

export const Sidebar = ({ className }: props) => {
  const currentLangId = usePathname().split("/")[1];
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 lg:border-r-2 flex-col flex-1 pt-[150px] lg:pt-[50px]",
        className,
      )}
    >
      {languageStates.map((langState) => {
        return (
          <Link href={`/${langState.id}`} key={langState.id} className="p-2">
            <Button
              variant={
                currentLangId === langState.id ? "sidebarOutline" : "sidebar"
              }
              size="lg"
              className="min-w-[192px]"
            >
              <div className="flex items-center justify-center h-full w-full">
                <div className="w-1/3">
                  <Image
                    src={langState.svgPath}
                    alt={langState.name}
                    height={40}
                    width={40}
                    className="rounded-full border-slate-300 border-2"
                  />
                </div>
                <div className="w-2/3">
                  <p className="lg:text-xl text-lg font-bold">
                    {langState.name}
                  </p>
                </div>
              </div>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
