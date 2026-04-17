import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform belanja online modern dengan optimasi mobile-first untuk pengalaman belanja yang mulus.',
    tags: ['React', 'Tailwind', 'Redux'],
    image: '🛒',
    color: 'bg-sky-100',
    github: 'https://github.com/alimtiazii/kocak-epep.git',
    demo: 'https://www.tokopedia.com/',
  },
  {
    title: 'Learning Platform',
    description: 'Sistem manajemen pembelajaran interaktif untuk mempermudah akses pendidikan jarak jauh.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: '📚',
    color: 'bg-blue-100',
    github: 'https://github.com/alimtiazii/kocak-epep.git',
    demo: 'https://app.ruangguru.com/',
  },
  {
    title: 'Social Media Platform',
    description: 'Aplikasi berbagi konten real-time dengan fitur interaksi sosial yang dinamis.',
    tags: ['Firebase', 'React Native'],
    image: '📊',
    color: 'bg-sky-100',
    github: 'https://github.com/alimtiazii/kocak-epep.git',
    demo: 'https://www.instagram.com/',
  },
  {
    title: 'AI Platform',
    description: 'Integrasi kecerdasan buatan untuk membantu pengolahan data dan pencarian informasi cerdas.',
    tags: ['OpenAI', 'Python', 'FastAPI'],
    image: '🤖',
    color: 'bg-blue-100',
    github: 'https://github.com/alimtiazii/kocak-epep.git',
    demo: 'https://chatgpt.com/',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Edukasi konten video yang tersebar di berbagai platform untuk meningkatkan skill editing.',
    tags: ['Production', 'Creative'],
    image: '🎬',
    color: 'bg-sky-100',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Panduan praktis dan teknik efisien dalam menulis kode bagi para pengembang.',
    tags: ['Algorithms', 'Best Practices'],
    image: '💡',
    color: 'bg-blue-100',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
];

const TiltCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col h-full bg-white border border-sky-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-sky-200/50 transition-all duration-500 overflow-hidden"
    >
      {/* Visual Header */}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="p-5">
        <div className={`relative h-48 rounded-[1.8rem] flex items-center justify-center overflow-hidden shadow-inner ${project.color}`}>
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-400 rounded-full blur-3xl" />
          </div>

          <motion.div
            animate={{ y: ["0%", "-10%", "0%"], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(80px)" }}
            className="text-8xl drop-shadow-2xl z-10 select-none"
          >
            {project.image}
          </motion.div>
        </div>
      </div>

      {/* Konten Teks */}
      <div style={{ transform: "translateZ(50px)" }} className="px-8 pb-10 pt-2 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-sky-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3">
          {project.github && (
            <Button 
              variant="outline" 
              className="group/btn flex-[1.2] h-12 rounded-2xl border-sky-200 text-sky-700 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 flex items-center justify-center gap-0 hover:gap-2 px-4 shadow-sm" 
              asChild
            >
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 shrink-0" />
                <span className="max-w-0 overflow-hidden opacity-0 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-[10px] uppercase tracking-wider">
                  Github Code
                </span>
              </a>
            </Button>
          )}
          
          <Button 
            className="group/btn flex-1 h-12 rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-200/50 hover:bg-sky-600 transition-all duration-300 flex items-center justify-center gap-0 hover:gap-2 px-4" 
            asChild
          >
            <a 
              href={project.demo || project.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {project.youtube ? <Play className="w-5 h-5 shrink-0 fill-current" /> : <ExternalLink className="w-5 h-5 shrink-0" />}
              <span className="max-w-0 overflow-hidden opacity-0 group-hover/btn:max-w-[100px] group-hover/btn:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-[10px] uppercase tracking-wider">
                {project.youtube ? "Watch" : "Visit"}
              </span>
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-sky-50/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-500 text-[10px] font-black uppercase tracking-widest shadow-sm mb-6">
            <Cloud className="w-4 h-4" /> My Work
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
            Digital <span className="text-sky-500">Portfolio</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" style={{ perspective: "1500px" }}>
          {projects.map((project, index) => (
            <TiltCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}