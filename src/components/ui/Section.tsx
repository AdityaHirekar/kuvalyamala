import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    background?: "paper" | "white" | "stone" | "translucent";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, background = "paper", ...props }, ref) => {
        const backgrounds = {
            paper: "bg-paper",
            white: "bg-white",
            stone: "bg-[#EFEBE9]", // Light stone color
            translucent: "bg-white/30 backdrop-blur-md",
        };

        return (
            <section
                ref={ref}
                className={cn(
                    "py-16 md:py-24 px-6 md:px-12 lg:px-24 w-full relative overflow-hidden",
                    backgrounds[background],
                    className
                )}
                {...props}
            >
                {children}
            </section>
        );
    }
);

Section.displayName = "Section";

export default Section;
