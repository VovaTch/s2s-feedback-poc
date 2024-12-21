import FlagButton from "@/components/custom/flag-button";
import FlagButtonOutline from "@/components/custom/flag-button-outline";
import { Button } from "@/components/ui/button";
import React from "react";

/**
 * A page for testing all flag types
 * @returns Flag test page
 */
const ButtonsPage = () => {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <h1>Buttons</h1>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryOutline">Primary Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryOutline">Secondary Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">Sidebar Outline</Button>
      <FlagButton path="flags/germany.svg">Flag</FlagButton>
      <FlagButtonOutline path="flags/china.svg">Flag Outline</FlagButtonOutline>
    </div>
  );
};

export default ButtonsPage;
