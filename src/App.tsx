import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Music, Mic, Guitar, Heart, Sparkles, Star, AudioLines, Headphones } from 'lucide-react';

const characters = [
  {
    id: 'mafuyu',
    name: 'Mafuyu Sato',
    season: 'Invierno',
    role: 'Voz y Guitarra',
    theme: 'from-blue-300 to-cyan-500',
    accent: 'text-cyan-300',
    bgGradient: 'from-cyan-600/40 to-blue-900/40',
    shadowColor: 'shadow-cyan-500/20',
    quote: '"No puedo expresarlo bien... pero quiero cantar."',
    desc: 'Como una cuerda rota en medio del invierno, encontraste tu voz. Tu canción derritió la nieve y trajo la primavera. Así como Mafuyu encontró a alguien que reparara su guitarra, yo te encontré a ti.',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
    icon: Mic
  },
  {
    id: 'ritsuka',
    name: 'Ritsuka Uenoyama',
    season: 'Verano',
    role: 'Guitarra',
    theme: 'from-blue-500 to-indigo-600',
    accent: 'text-indigo-300',
    bgGradient: 'from-indigo-600/40 to-blue-900/40',
    shadowColor: 'shadow-indigo-500/20',
    quote: '"Esa cuerda rota... yo la arreglaré."',
    desc: 'La pasión que creías perdida volvió a arder. Reparaste sus cuerdas y él reparó tu corazón. Eres mi verano, la chispa que enciende mi mundo todos los días.',
    img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=1000',
    icon: Guitar
  },
  {
    id: 'haruki',
    name: 'Haruki Nakayama',
    season: 'Primavera',
    role: 'Bajo',
    theme: 'from-yellow-300 to-amber-500',
    accent: 'text-yellow-300',
    bgGradient: 'from-amber-500/30 to-yellow-700/30',
    shadowColor: 'shadow-yellow-500/20',
    quote: '"Solo quiero que nuestra música llegue a todos."',
    desc: 'El ritmo constante, el hermano mayor, la primavera cálida. A veces el amor duele, pero siempre florece de nuevo. Gracias por ser mi refugio y mi paz.',
    img: 'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?auto=format&fit=crop&q=80&w=1000',
    icon: Music
  },
  {
    id: 'akihiko',
    name: 'Akihiko Kaji',
    season: 'Otoño',
    role: 'Batería y Violín',
    theme: 'from-orange-400 to-red-600',
    accent: 'text-orange-400',
    bgGradient: 'from-red-600/30 to-orange-800/30',
    shadowColor: 'shadow-orange-500/20',
    quote: '"La música no es algo con lo que se pueda jugar a medias."',
    desc: 'Dejar atrás el pasado para abrazar un nuevo comienzo. El otoño trae cambios, y tú me has enseñado a ser mejor cada día, a tocar nuestra propia melodía.',
    img: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles
  }
];

// Cinematic easing curve
const cinematicEase = [0.16, 1, 0.3, 1];

function FloatingNotes() {
  const icons = [Music, Star, Sparkles, Heart];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {[...Array(20)].map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{
              y: '110vh',
              x: `${Math.random() * 100}vw`,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{
              y: '-10vh',
              rotate: Math.random() * 360 + 180
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10
            }}
          >
            <Icon size={Math.random() * 16 + 16} />
          </motion.div>
        );
      })}
    </div>
  );
}

function CharacterSection({ char, index }: { key?: string | number, char: typeof characters[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yImage = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const Icon = char.icon;
  const isEven = index % 2 === 0;

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: cinematicEase } 
    }
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24 relative z-10">
      <div className={`max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        
        {/* Image Side */}
        <motion.div 
          className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          initial={{ opacity: 0, scale: 0.8, rotate: isEven ? -5 : 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: cinematicEase }}
        >
          <div className={`aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden relative glass-panel p-3 shadow-2xl ${char.shadowColor}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 rounded-[2.2rem] mix-blend-multiply pointer-events-none" />
            
            {/* Parallax Image */}
            <motion.div className="w-full h-full rounded-[2.2rem] overflow-hidden" style={{ scale: scaleImage }}>
              <motion.img 
                style={{ y: yImage }}
                src={char.img} 
                alt={char.name}
                className="w-full h-[120%] object-cover filter saturate-150 contrast-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              className="absolute bottom-10 left-10 right-10 z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: cinematicEase }}
            >
              <p className="font-serif italic text-2xl md:text-3xl text-white drop-shadow-lg leading-relaxed">
                {char.quote}
              </p>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className={`absolute -z-10 w-[120%] h-[120%] -top-[10%] ${isEven ? '-left-[10%]' : '-right-[10%]'} rounded-full bg-gradient-to-br ${char.bgGradient} blur-3xl opacity-70 animate-pulse`} style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* Text Side */}
        <motion.div 
          className={`flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          style={{ y: yText }}
        >
          <motion.div variants={textItemVariants} className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-full glass-panel ${char.accent}`}>
              <Icon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
                {char.season} • {char.role}
              </span>
            </div>
          </motion.div>
          
          <motion.h2 variants={textItemVariants} className={`font-serif text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r ${char.theme}`}>
            {char.name}
          </motion.h2>
          
          <motion.div variants={textItemVariants} className="w-16 h-[2px] bg-white/20 mb-8 rounded-full" />
          
          <motion.p variants={textItemVariants} className="font-sans text-lg md:text-xl text-white/80 leading-relaxed font-light">
            {char.desc}
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const yHero = useTransform(scrollYProgress, [0, 0.1], [0, 100]);

  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const heroItem = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 1.2, ease: cinematicEase } 
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-purple-500/30">
      <div className="atmosphere" />
      <FloatingNotes />

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale, y: yHero }}
        className="h-screen flex flex-col items-center justify-center relative px-6 text-center z-10"
      >
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto w-full"
        >
          <motion.div variants={heroItem} className="flex justify-center mb-8">
            <div className="relative">
              <Heart className="text-red-500 animate-pulse relative z-10" size={40} fill="currentColor" />
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse" />
            </div>
          </motion.div>
          
          <motion.h1 variants={heroItem} className="font-serif text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8 leading-tight drop-shadow-2xl">
            Felices 20,<br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Mi Amor
            </span>
          </motion.h1>
          
          <motion.div
            variants={heroItem}
            className="glass-panel mt-6 p-6 md:p-8 rounded-[2rem] relative overflow-hidden border-white/10 bg-white/5 shadow-2xl max-w-3xl mx-auto group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70" />
            
            <motion.div 
              animate={{ rotate: [12, 15, 12] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4"
            >
              <AudioLines className="text-white/5" size={120} />
            </motion.div>
            
            <motion.div 
              animate={{ rotate: [-12, -15, -12] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4"
            >
              <Headphones className="text-white/5" size={120} />
            </motion.div>
            
            <p className="font-sans text-xl md:text-3xl text-white/90 tracking-wide font-light leading-relaxed relative z-10">
              "Una melodía dedicada a ti, inspirada en la historia que tanto amas.
              <br/>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Nuestra propia canción de invierno a verano.</span>"
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, ease: cinematicEase }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-semibold mb-1">Desliza para nuestra historia</span>
          <motion.div 
            className="w-[2px] h-12 bg-gradient-to-b from-white/60 to-transparent rounded-full origin-top"
            animate={{ scaleY: [0, 1, 0], translateY: [0, 10, 20] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.section>

      {/* Character Arcs */}
      <div className="relative z-10 pb-32">
        {characters.map((char, index) => (
          <CharacterSection key={char.id} char={char} index={index} />
        ))}
      </div>

      {/* Final Message Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={heroContainer}
        className="min-h-screen flex items-center justify-center relative px-6 py-24 text-center z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        
        <motion.div 
          variants={heroItem}
          className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-purple-500/10"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 opacity-50" />
          
          <motion.div variants={heroItem}>
            <Music className="mx-auto text-white/20 mb-8" size={48} />
          </motion.div>
          
          <motion.h2 variants={heroItem} className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Feliz Cumpleaños, <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              Mi Persona Favorita
            </span>
          </motion.h2>
          
          <motion.p variants={heroItem} className="font-sans text-lg md:text-2xl text-white/80 leading-relaxed font-light max-w-2xl mx-auto mb-12">
            Llegar a los 20 es como empezar un nuevo acorde en la canción de tu vida. 
            Así como las cuerdas de una guitarra necesitan tensión para crear música hermosa, 
            cada momento que vivimos juntos nos afina y nos hace más fuertes.
            <br /><br />
            Gracias por ser mi melodía constante. Te amo.
          </motion.p>
          
          <motion.div variants={heroItem} className="flex justify-center gap-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.5, type: "spring", stiffness: 200, damping: 10 }}
              >
                <Heart className="text-red-500" size={24} fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
