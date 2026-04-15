import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce modern yang ada di HP bisa digunakan untuk belanja online.',
    tags: ['Shopee', 'Lazada', 'Tokopedia', 'Tiktok Shop'],
    image: '🛒',
    color: 'from-blue-500/20 to-cyan-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Learning Platform',
    description: 'Platform pembelajaran online yang mempermudah kamu dalam belajar.',
    tags: ['Ruang Guru', 'Duolingo', 'Zenius', 'Quipper'],
    image: '📚',
    color: 'from-purple-500/20 to-pink-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Social Media Platform',
    description: 'Platform yang sangat berguna untuk social media dan sharing-sharing.',
    tags: ['WhatsApp', 'Instagram', 'TikTok', 'Facebook'],
    image: '📊',
    color: 'from-orange-500/20 to-red-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'AI Platform',
    description: 'Situs atau APK berbasis AI untuk mempermudah mencari informasi.',
    tags: ['Google', 'Gemini', 'ChatGPT', 'Meta AI'],
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Video tutorial yang sudah tersebar di banyak platform yang dapat mempermudah pengerjaan suatu tugas.',
    tags: ['Tiktok', 'Instagram', 'YouTube'],
    image: '🎬',
    color: 'from-red-500/20 to-orange-500/20',
    isContent: true,
    youtube: '#',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Konten tips & tricks dalam melakukan programming atau coding.',
    tags: ['Instagram', 'TikTok', 'YouTube Shorts'],
    image: '💡',
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: '#',
  },
];

// Varian untuk Container (Staggering effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Jeda antar munculnya kartu
    },
  },
};

// Varian untuk Kartu Satuan
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -12,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Animasi Melayang untuk Icon/Emoji
const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section dengan Animasi Slide Down */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ letterSpacing: "0.1em" }}
            whileInView={{ letterSpacing: "0.3em" }}
            className="text-primary font-bold mb-2 block uppercase text-sm"
          >
            Portfolio
          </motion.span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Projects & Karya
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            className="h-1.5 bg-primary mx-auto rounded-full" 
          />
        </motion.div>

        {/* Grid Kartu dengan Stagger Effect */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              <div className="h-full p-6 glass rounded-3xl border border-white/10 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:shadow-primary/20 group-hover:border-primary/30">
                
                {/* Image/Emoji Area dengan Animasi Floating */}
                <div className={`aspect-video rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <motion.span 
                    animate={floatingAnimation}
                    className="text-7xl z-10"
                  >
                    {project.image}
                  </motion.span>
                  
                  {/* Efek Cahaya di belakang emoji */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {project.isContent && (
                      <motion.span 
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-full bg-primary text-primary-foreground font-bold"
                      >
                        Content
                      </motion.span>
                    )}
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-white/5 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Button Group dengan Tap Animation */}
                  <div className="flex gap-3 pt-4">
                    {project.github && (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="rounded-xl h-10 hover:bg-secondary" asChild>
                          <a href={project.github}>
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    {(project.demo || project.youtube) && (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button size="sm" className="rounded-xl h-10 shadow-lg shadow-primary/20" asChild>
                          <a href={project.demo || project.youtube}>
                            {project.youtube ? (
                              <><Play className="h-4 w-4 mr-2 fill-current" /> Watch</>
                            ) : (
                              <><ExternalLink className="h-4 w-4 mr-2" /> Demo</>
                            )}
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}