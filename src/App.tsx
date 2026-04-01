/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Menu as MenuIcon,
  X,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Globe,
  Calendar,
  Users,
  UtensilsCrossed,
  Download,
  Maximize2,
  ArrowRight,
} from "lucide-react";
import { translations, menuData } from "./constants";
import { Language } from "./types";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = translations[lang];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "es" : "en"));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleDownloadMenu = () => {
    // Create a dummy PDF content
    const content = "Lorenzo's Trattoria Moderna - Menu Demo Content";
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Lorenzos_Menu_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen selection:bg-trattoria-gold selection:text-white">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-trattoria-ink/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled ? "bg-trattoria-beige/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl md:text-2xl tracking-tight transition-colors duration-500 ${isScrolled ? "text-trattoria-ink" : "text-white"}`}
            >
              Lorenzo’s Trattoria Moderna
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${isScrolled ? "text-trattoria-gold" : "text-trattoria-gold"}`}
            >
              Demo Concept
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <div
              className={`flex space-x-6 text-sm font-medium uppercase tracking-widest transition-colors duration-500 ${isScrolled ? "text-trattoria-ink" : "text-white"}`}
            >
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-trattoria-gold transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="hover:text-trattoria-gold transition-colors"
              >
                {t.nav.menu}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="hover:text-trattoria-gold transition-colors"
              >
                {t.nav.gallery}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-trattoria-gold transition-colors"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-trattoria-gold transition-colors"
              >
                {t.nav.contact}
              </button>
            </div>

            <div className="h-4 w-[1px] bg-trattoria-gold/30"></div>

            <button
              onClick={toggleLang}
              className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isScrolled ? "text-trattoria-ink" : "text-white"} hover:text-trattoria-gold`}
            >
              <Globe size={14} />
              <span>{lang === "en" ? "ES" : "EN"}</span>
            </button>

            <button
              onClick={() => scrollToSection("booking")}
              className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm border ${isScrolled ? "bg-trattoria-wine border-trattoria-wine text-white hover:bg-trattoria-ink hover:border-trattoria-ink" : "bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-trattoria-ink"}`}
            >
              {t.nav.book}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden transition-colors duration-500 ${isScrolled ? "text-trattoria-ink" : "text-white"}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-trattoria-beige flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-xl text-trattoria-ink">
                Lorenzo’s
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-trattoria-ink"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col space-y-8 text-2xl font-serif text-trattoria-ink">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="text-left"
              >
                {t.nav.menu}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left"
              >
                {t.nav.gallery}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left"
              >
                {t.nav.contact}
              </button>
            </div>
            <div className="mt-auto pt-8 border-t border-trattoria-ink/10 flex flex-col space-y-6">
              <button
                onClick={() => {
                  toggleLang();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-trattoria-ink"
              >
                <Globe size={18} />
                <span>{lang === "en" ? "Español" : "English"}</span>
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="w-full py-4 bg-trattoria-wine text-white font-bold uppercase tracking-widest text-sm rounded-sm"
              >
                {t.nav.book}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1533777324565-a040eb52fac2?auto=format&fit=crop&q=80&w=1920"
            alt="Italian Restaurant Ambiance"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=1920";
            }}
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block text-trattoria-gold uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6">
              Estepona, Spain
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-[1.1] text-balance">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12 text-white/90 text-balance">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => scrollToSection("booking")}
                className="w-full sm:w-auto px-10 py-5 bg-trattoria-wine text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-trattoria-gold transition-all duration-300 shadow-xl shadow-black/20 group"
              >
                <span className="flex items-center justify-center">
                  {t.hero.ctaBook}
                  <ArrowRight
                    size={14}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white hover:text-trattoria-ink transition-all duration-300"
              >
                {t.hero.ctaMenu}
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 md:py-32 bg-trattoria-cream overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1529692236671-f1eac1806421?auto=format&fit=crop&q=80&w=1000"
                  alt="Chef preparing pasta"
                  className="w-full h-full object-cover rounded-sm shadow-2xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=1000";
                  }}
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-trattoria-olive/10 rounded-sm -z-0"></div>
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-20 h-20 border-l border-t border-trattoria-gold/40"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-trattoria-gold uppercase tracking-widest text-xs font-bold">
                  {t.about.title}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight text-trattoria-ink">
                  {t.about.subtitle}
                </h2>
              </div>
              <div className="space-y-6 text-trattoria-ink/70 leading-relaxed text-lg font-light">
                <p>{t.about.text1}</p>
                <p>{t.about.text2}</p>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-trattoria-gold"></div>
                <span className="font-serif italic text-trattoria-ink text-xl">
                  Lorenzo Rossi
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-32 bg-trattoria-beige">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <span className="text-trattoria-gold uppercase tracking-widest text-xs font-bold">
              Lorenzo’s Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-trattoria-ink">
              {t.menu.title}
            </h2>
            <div className="w-24 h-[1px] bg-trattoria-gold/30 mx-auto"></div>
          </div>

          <div className="space-y-24">
            {Object.entries(menuData[lang]).map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <h3 className="text-2xl font-serif text-trattoria-wine mb-10 border-b border-trattoria-wine/10 pb-4 uppercase tracking-widest">
                  {
                    t.menu.categories[
                      category as keyof typeof t.menu.categories
                    ]
                  }
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  {(items as any[]).map((item, i) => (
                    <div key={i} className="group cursor-default">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-lg font-serif text-trattoria-ink group-hover:text-trattoria-gold transition-colors duration-300">
                          {item.name}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-trattoria-ink/20 mx-4"></div>
                        <span className="font-medium text-trattoria-ink">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-sm text-trattoria-ink/60 font-light italic">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={handleDownloadMenu}
              className="px-12 py-5 border border-trattoria-ink/20 text-trattoria-ink uppercase tracking-widest text-xs font-bold hover:bg-trattoria-ink hover:text-white transition-all duration-300 rounded-sm flex items-center mx-auto space-x-3"
            >
              <Download size={16} />
              <span>Download Full Menu (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="py-24 md:py-32 bg-trattoria-ink text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-trattoria-gold uppercase tracking-widest text-xs font-bold">
                Visual Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-serif">
                {t.nav.gallery}
              </h2>
            </div>
            <p className="text-white/50 max-w-md font-light italic">
              "A feast for the eyes before the first bite."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedImage(img)}
                className="aspect-square overflow-hidden group relative cursor-zoom-in"
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-trattoria-wine/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section
        id="booking"
        className="py-24 md:py-32 bg-trattoria-cream relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-trattoria-olive/5 -skew-x-12 translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-white p-10 md:p-16 shadow-2xl rounded-sm border border-trattoria-beige">
            <div className="text-center mb-12 space-y-4">
              <UtensilsCrossed
                className="mx-auto text-trattoria-gold mb-4"
                size={32}
              />
              <h2 className="text-4xl font-serif text-trattoria-ink">
                {t.reservation.title}
              </h2>
              <p className="text-trattoria-ink/60 font-light">
                {t.reservation.subtitle}
              </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/50 flex items-center">
                  <ChevronRight
                    size={12}
                    className="mr-1 text-trattoria-gold"
                  />
                  {t.reservation.name}
                </label>
                <input
                  type="text"
                  className="w-full bg-trattoria-beige/30 border-b border-trattoria-ink/10 py-3 px-0 focus:border-trattoria-gold outline-none transition-colors font-light"
                  placeholder="Lorenzo Rossi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/50 flex items-center">
                  <Users size={12} className="mr-1 text-trattoria-gold" />
                  {t.reservation.guests}
                </label>
                <select className="w-full bg-trattoria-beige/30 border-b border-trattoria-ink/10 py-3 px-0 focus:border-trattoria-gold outline-none transition-colors font-light appearance-none">
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                  <option>5+ People</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/50 flex items-center">
                  <Calendar size={12} className="mr-1 text-trattoria-gold" />
                  {t.reservation.date}
                </label>
                <input
                  type="date"
                  className="w-full bg-trattoria-beige/30 border-b border-trattoria-ink/10 py-3 px-0 focus:border-trattoria-gold outline-none transition-colors font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/50 flex items-center">
                  <Clock size={12} className="mr-1 text-trattoria-gold" />
                  {t.reservation.time}
                </label>
                <select className="w-full bg-trattoria-beige/30 border-b border-trattoria-ink/10 py-3 px-0 focus:border-trattoria-gold outline-none transition-colors font-light appearance-none">
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                </select>
              </div>
              <div className="md:col-span-2 pt-6">
                <button
                  type="button"
                  className="w-full py-5 bg-trattoria-wine text-white font-bold uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-trattoria-ink transition-all duration-300 shadow-lg shadow-trattoria-wine/20"
                >
                  {t.reservation.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="bg-trattoria-beige">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[500px] lg:h-auto relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12860.846464646464!2d-5.146464646464646!3d36.42646464646464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73264646464646%3A0x6464646464646464!2sEstepona%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1646464646464!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <div className="absolute top-8 left-8 p-6 bg-white shadow-2xl rounded-sm max-w-xs hidden md:block">
              <MapPin className="text-trattoria-wine mb-4" size={24} />
              <h4 className="font-serif text-lg text-trattoria-ink mb-2">
                Visit Lorenzo's
              </h4>
              <p className="text-sm text-trattoria-ink/60 font-light leading-relaxed">
                Calle Real, 12, 29680 Estepona, Málaga, Spain
              </p>
            </div>
          </div>

          <div className="p-16 md:p-24 space-y-12">
            <div className="space-y-4">
              <span className="text-trattoria-gold uppercase tracking-widest text-xs font-bold">
                {t.location.title}
              </span>
              <h2 className="text-4xl font-serif text-trattoria-ink">
                {t.location.hours}
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <Clock className="text-trattoria-wine mt-1" size={24} />
                <div>
                  <h4 className="font-serif text-xl text-trattoria-ink mb-1">
                    Dinner Service
                  </h4>
                  <p className="text-trattoria-ink/60 font-light">
                    {t.location.monSun}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <Phone className="text-trattoria-wine mt-1" size={24} />
                <div>
                  <h4 className="font-serif text-xl text-trattoria-ink mb-1">
                    Reservations
                  </h4>
                  <p className="text-trattoria-ink/60 font-light">
                    +34 951 234 567
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <Mail className="text-trattoria-wine mt-1" size={24} />
                <div>
                  <h4 className="font-serif text-xl text-trattoria-ink mb-1">
                    Events
                  </h4>
                  <p className="text-trattoria-ink/60 font-light">
                    ciao@lorenzotrattoria.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-24 bg-trattoria-cream">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12 space-y-4">
            <Instagram className="mx-auto text-trattoria-gold" size={32} />
            <h2 className="text-3xl font-serif text-trattoria-ink">
              {t.instagram.title}
            </h2>
            <p className="text-trattoria-ink/50 font-light">
              @LorenzoTrattoriaModerna
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-12">
            {[
              "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=300",
              "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=300",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square bg-trattoria-beige overflow-hidden"
              >
                <img
                  src={src}
                  alt="Insta"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          <button className="px-8 py-4 bg-trattoria-ink text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-trattoria-gold transition-colors">
            {t.instagram.follow}
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 md:py-32 bg-trattoria-beige border-t border-trattoria-ink/5"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-trattoria-gold uppercase tracking-widest text-xs font-bold">
              Inquiries
            </span>
            <h2 className="text-4xl font-serif text-trattoria-ink">
              {t.contact.title}
            </h2>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/40">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-trattoria-ink/10 py-3 outline-none focus:border-trattoria-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/40">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-trattoria-ink/10 py-3 outline-none focus:border-trattoria-gold transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-trattoria-ink/40">
                {t.contact.message}
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-trattoria-ink/10 py-3 outline-none focus:border-trattoria-gold transition-colors resize-none"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="px-12 py-5 bg-trattoria-wine text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-trattoria-ink transition-all"
              >
                {t.contact.send}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-trattoria-ink text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-tight">
                  Lorenzo’s
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-trattoria-gold">
                  Trattoria Moderna
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                {t.footer.desc}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-trattoria-gold hover:border-trattoria-gold transition-all"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-trattoria-gold hover:border-trattoria-gold transition-all"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-trattoria-gold">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.home}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("menu")}
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.menu}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("gallery")}
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.gallery}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.about}
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-trattoria-gold">
                {t.footer.contact}
              </h4>
              <ul className="space-y-4 text-sm text-white/60 font-light">
                <li className="flex items-center space-x-3">
                  <MapPin size={14} className="text-trattoria-gold" />
                  <span>Estepona, Spain</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={14} className="text-trattoria-gold" />
                  <span>+34 951 234 567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={14} className="text-trattoria-gold" />
                  <span>ciao@lorenzotrattoria.com</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-trattoria-gold">
                Language
              </h4>
              <button
                onClick={toggleLang}
                className="flex items-center space-x-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Globe size={18} className="text-trattoria-gold" />
                <span>
                  {lang === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
                </span>
              </button>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/30 font-bold">
            <p>© 2026 Lorenzo’s Trattoria Moderna. All Rights Reserved.</p>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
