import { Button } from "@/components/ui/button";
import React from "react";

const ButtonsPage = () => {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <h1>Buttons</h1>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">Primary Outline</Button>
      <Button></Button>
    </div>
  );
};

export default ButtonsPage;
