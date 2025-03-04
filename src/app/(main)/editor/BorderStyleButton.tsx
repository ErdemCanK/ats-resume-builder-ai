import { Button } from "@/components/ui/button";
import { Squircle, Circle, Square } from "lucide-react";


export const BorderStyles ={
    SQUARE: "square",
    CIRCLE: "circle",
    SQUIRCLE: "squircle",
}

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

const Icon = borderStyle=== BorderStyles.SQUARE ? Square : borderStyle=== BorderStyles.CIRCLE ? Circle : Squircle;
  return (
    <Button
    variant="outline"
    size="icon"
    title="Change Resume Border Style"
    onClick={handleClick}
  >
      <Icon className="size-5" />
    </Button>
  );
}

