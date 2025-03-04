import { PaletteIcon } from "lucide-react";
import { ColorChangeHandler, Color, TwitterPicker } from "react-color";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface ColorPickerProps {
    color: Color | undefined;
    onChange: ColorChangeHandler;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
    const[showPopover, setShowPopover] = useState(false);
    return <Popover open={showPopover} onOpenChange={setShowPopover}>
        <PopoverTrigger asChild>
            <Button variant="outline" size="icon" title="Change Resume Color"
            onClick={() => setShowPopover(true)}>
                <PaletteIcon className="size-5" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="border-none shadow-none bg-transparent" align="end">
            <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
        </PopoverContent>
    </Popover>
}
