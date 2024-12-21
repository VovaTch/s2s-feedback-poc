"use client";

import React, { useState } from "react";

import { langState, languageStates } from "./langStates";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [langState, setLangState] = useState<langState>(languageStates[0]);

  return (
    <div
      style={{
        backgroundImage: `url(${langState.bgPath})`,
      }}
      className="flex-1 flex-col flex items-center justify-center bg-cover bg-center bg-blend-multiply bg-indigo-300"
    >
      <div className='bg-gradient-to-tr from-violet-300 to-transparent flex-1 flex-col w-full flex items-center justify-center'>
        <p className="text-lg lg:text-2xl font-bold text-center text-white">
          Score your {langState.name} translation from English!
        </p>
        <Input></Input>
      </div>
      
    </div>
  );
}
