import { motion } from "framer-motion";
import {
  Hero,
  Features,
  Glimpse,
  Testimonials,
  About,
  Download,
} from "../components";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 bg-blue-600/4 rounded-full blur-[120px]" />
        <div className="absolute top-[60vh] left-[20%] w-100 h-100 bg-teal-500/3 rounded-full blur-[100px]" />
        <div className="absolute top-[120vh] right-[15%] w-125 h-100 bg-indigo-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Features />
        <Glimpse />
        <Testimonials />
        <About />
        <Download />
      </div>
    </motion.div>
  );
}
