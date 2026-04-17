import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DotLottiePlayer } from '@dotlottie/react-player';
import { motion, AnimatePresence } from 'framer-motion';

// Import halaman
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// --- Komponen Loading Screen Anti-Delay ---
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }} // Efek zoom out sedikit saat selesai
      transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Spinner tipis sebagai cadangan jika koneksi internet lambat saat download Lottie */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-12 h-12 border-2 border-sky-100 border-t-sky-500 rounded-full animate-spin" />
        </div>

        <DotLottiePlayer
          src="https://lottie.host/6b872949-4ab2-42e3-8a6d-de9094a23964/EcMZOyKEID.lottie"
          autoplay
          loop
          speed={1.5} // Kecepatan ditambah agar langsung merespon
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Teks Loading yang Elegan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-sky-500 font-black text-[10px] tracking-[0.3em] uppercase">
          Loading Component ...
        </span>
        <div className="flex gap-1">
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }} 
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            className="w-1.5 h-1.5 rounded-full bg-sky-400" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }} 
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-sky-300" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }} 
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-1.5 h-1.5 rounded-full bg-sky-200" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading 2.5 detik (waktu ideal agar user tidak bosan tapi tetap dapet feel-nya)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Logic untuk menampilkan Loader */}
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>

        {/* Notifikasi Sistem */}
        <Toaster />
        <Sonner />
        
        {/* Router Utama */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;