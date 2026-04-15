import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-obsidian-900"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <p className="font-display text-[140px] sm:text-[200px] font-bold gold-text leading-none opacity-20 select-none">404</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="-mt-10 sm:-mt-16">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500 mb-4 block">Page Not Found</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
            This Page Doesn't Exist
          </h1>
          <p className="text-obsidian-200 font-light text-lg mb-10 max-w-md mx-auto">
            The page you're looking for may have been moved, removed, or never existed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/"><Button variant="gold" size="lg">Back to Home</Button></Link>
            <Link to="/shop"><Button variant="outline" size="lg">Shop Collection</Button></Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}