import { Button, type ButtonProps } from "../ui/button";
import { cn } from "@/tailwind/utils";

export default function SelectingButton({ children, className, ...props }: ButtonProps) {
    return (
        <Button
            {...props}
            className={cn("w-20 h-20 p-4 text-wrap", className)}
        >
            {children}
        </Button>
    )
}