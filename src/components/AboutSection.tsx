import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, GraduationCap, Briefcase, Heart, Trophy } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: "Pendidikan",
    content: "Siswa MAN 1 Banda Aceh - Kelas X-11 Persiapan Kedinasan.",
    quote: "Pendidikan adalah tiket ke masa depan, hari esok dimiliki oleh orang-orang yang mempersiapkan diri hari ini.",
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    color: "border-blue-500/50"
  },
  {
    id: 2,
    title: "Cita-cita",
    content: "Menjadi Pegawai Negeri Sipil (PNS) yang berdedikasi.",
    quote: "Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaanlah kunci kesuksesan. Jika Anda mencintai apa yang Anda lakukan, Anda akan berhasil.",
    icon: <Briefcase className="w-8 h-8 text-green-500" />,
    color: "border-green-500/50"
  },
  {
    id: 3,
    title: "Hobi",
    content: "Gemar berolahraga untuk menjaga kebugaran dan kedisiplinan.",
    quote: "Tubuh yang sehat adalah tempat tinggal yang baik bagi jiwa yang kuat. Teruslah bergerak!",
    icon: <Heart className="w-8 h-8 text-red-500" />,
    color: "border-red-500/50"
  },
  {
    id: 4,
    title: "Visi",
    content: "Membangun Aceh yang lebih baik melalui integritas diri.",
    quote: "Jangan menunggu kesempatan datang, buatlah kesempatan itu sendiri dengan kerja keras.",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    color: "border-yellow-500/50"
  }
];

export default function InteractiveCarousel() {
  const [index, setIndex] = useState(0);

  // Fungsi untuk ke kartu berikutnya
  const nextCard = useCallback(() => {
    setIndex((prev) => (prev + 1) % cards.length);
  }, []);

  // Fitur Autoplay: Gerak otomatis setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      nextCard();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextCard]);

  // Handle Drag: Geser kartu dengan kursor
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      nextCard();
    } else if (info.offset.x > 50) {
      setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
          
          {/* SISI KIRI: KATA MOTIVASI */}
          <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="glass p-8 rounded-3xl relative"
              >
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20" />
                <h4 className="text-primary font-bold mb-2 uppercase tracking-widest text-sm">
                  Motivation for {cards[index].title}
                </h4>
                <p className="text-2xl md:text-3xl font-display font-medium italic leading-relaxed text-foreground">
                  "{cards[index].quote}"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-1 w-12 bg-primary rounded-full" />
                  <p className="font-medium text-muted-foreground">Fathan Al Zahran</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SISI KANAN: STACKED CARDS (DRAGGABLE) */}
          <div className="w-full lg:w-1/2 relative h-[450px] flex items-center justify-center order-1 lg:order-2">
            <p className="absolute top-0 text-xs text-muted-foreground animate-pulse">
              ← Geser kartu dengan kursor →
            </p>
            
            <div className="relative w-[300px] md:w-[350px] h-[400px]">
              <AnimatePresence>
                {cards.map((card, i) => {
                  const isFront = i === index;
                  const isNext = i === (index + 1) % cards.length;
                  const isBack = i === (index + 2) % cards.length;

                  if (!isFront && !isNext && !isBack) return null;

                  return (
                    <motion.div
                      key={card.id}
                      drag={isFront ? "x" : false} // Hanya kartu depan yang bisa ditarik
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isFront ? 1 : isNext ? 0.6 : 0.2,
                        scale: isFront ? 1 : isNext ? 0.9 : 0.8,
                        zIndex: isFront ? 30 : isNext ? 20 : 10,
                        y: isFront ? 0 : isNext ? -25 : -50,
                        x: isFront ? 0 : 15, // Sedikit geser ke kanan untuk efek 3D
                      }}
                      exit={{ opacity: 0, scale: 0.5, x: -200, rotate: -15 }}
                      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                      className={`absolute inset-0 rounded-[2.5rem] p-8 glass border-t-4 shadow-2xl flex flex-col items-center justify-center text-center cursor-grab ${card.color} bg-background/80 backdrop-blur-xl`}
                    >
                      <div className="mb-6 p-4 rounded-2xl bg-muted/50">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-display">{card.title}</h3>
                      <p className="text-muted-foreground">{card.content}</p>
                      
                      {/* Indikator Slide */}
                      <div className="absolute bottom-8 flex gap-2">
                        {cards.map((_, dotIndex) => (
                          <div 
                            key={dotIndex}
                            className={`h-1.5 w-1.5 rounded-full transition-all ${index === dotIndex ? "bg-primary w-4" : "bg-primary/20"}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}