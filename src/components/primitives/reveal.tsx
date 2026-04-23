"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({ children, delay = 0, y = 16, once = true, className, ...rest }: Props) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
