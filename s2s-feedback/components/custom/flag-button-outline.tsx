import { Button } from "@/components/ui/button";
import React from "react";

type FlagButtonProps = {
  path?: string;
};

/**
 * `FlagButton` is a React functional component that renders a button with a flag style.
 * The button can optionally display a background image specified by the `path` prop.
 *
 * @param {FlagButtonProps} props - The properties for the `FlagButton` component.
 * @param {string} props.path - The URL of the background image to be displayed on the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 *
 * @returns {JSX.Element} A button component with the specified flag style and optional background image.
 */
const FlagButtonOutline: React.FC<React.PropsWithChildren<FlagButtonProps>> = ({
  path,
  children,
}) => {
  return (
    <Button
      variant="flagOutline"
      size="flag"
      style={{
        backgroundImage: `url('${path}')`,
      }}
    >
      <div
        className="h-full w-full bg-gradient-to-b from-violet-600 to-transparent\
            active:bg-gradient-to-b active:from-violet-700 bg-no-repeat bg-center bg-cover \
            hover:text-violet-900 text-violet-800 font-extrabold flex items-center justify-center rounded-xl"
      >
        {children}
      </div>
    </Button>
  );
};

export default FlagButtonOutline;
