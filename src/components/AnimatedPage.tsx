import { ReactNode } from "react";
import { motion } from "framer-motion";

type OpacityAnimation = {
  initial: { opacity: number };
  animate: { opacity: number };
};

type PositionAnimation = {
  initial: { x: number };
  animate: { x: number };
};

export const fadeInAnimation: OpacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const bringFromLeftAnimation: PositionAnimation = {
  initial: { x: -100 },
  animate: { x: 0 },
};

type AnimatedPageProps = {
  animation: OpacityAnimation | PositionAnimation;
  children: ReactNode;
};

export default function AnimatedPage(props: AnimatedPageProps) {
  return <motion.div {...props.animation}>{props.children}</motion.div>;
}
