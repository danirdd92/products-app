import { cva, type VariantProps } from "class-variance-authority";
import type { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const button = cva(
  "rounded-md py-2 px-4 font-bold text-white transition-colors",
  {
    variants: {
      variant: {
        edit: "bg-blue-600 hover:bg-blue-800 active:bg-blue-900",
        delete: "bg-red-600 hover:bg-red-800 active:bg-red-900",
        new: "bg-green-600 hover:bg-green-800 active:bg-green-900",
      },
    },
  }
);

interface Props
  extends VariantProps<typeof button>,
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

export const Button = ({ className, variant, children, ...props }: Props) => {
  return (
    <button className={`${button({ variant })} ${className}`} {...props}>
      {children}
    </button>
  );
};
