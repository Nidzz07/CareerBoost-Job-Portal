import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const pageTransition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

interface PageProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export const PageMotion = forwardRef<HTMLDivElement, PageProps>(function PageMotion(
  { children, className, ...rest },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
