"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Image data derived from original HTML
const allImages = [
    // Stavebnictvo
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0067.jpg", category: "stavebnictvo", alt: "Stavebné práce" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0058.jpg", category: "stavebnictvo", alt: "Diaľničné stavby" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0094.jpg", category: "stavebnictvo", alt: "Infraštruktúrne projekty" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0061.jpg", category: "stavebnictvo", alt: "Infraštruktúrne práce" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0071.jpg", category: "stavebnictvo", alt: "Diaľničné stavby" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0054.jpg", category: "stavebnictvo", alt: "Stavebné práce" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0019.jpg", category: "stavebnictvo", alt: "Stavebníctvo" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0038.jpg", category: "stavebnictvo", alt: "Stavebníctvo" },

    // Ocelove konstrukcie
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0099.jpg", category: "ocelove-konstrukcie", alt: "Oceľové konštrukcie" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0053.jpg", category: "ocelove-konstrukcie", alt: "Oceľové konštrukcie" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0055.jpg", category: "ocelove-konstrukcie", alt: "Oceľové konštrukcie" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0056.jpg", category: "ocelove-konstrukcie", alt: "Oceľové konštrukcie" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0078.jpg", category: "ocelove-konstrukcie", alt: "Oceľové konštrukcie" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0095.jpg", category: "ocelove-konstrukcie", alt: "Oceľové konštrukcie" },

    // Nakladna doprava
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg", category: "nakladna-doprava", alt: "Nákladná doprava" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486403762_1224539732549038_3710134092816489228_n.jpg", category: "nakladna-doprava", alt: "Logistické riešenia" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486353103_1224539729215705_3581393265876727917_n.jpg", category: "nakladna-doprava", alt: "Špedičné služby" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/IMG-20250709-WA0030.jpg", category: "nakladna-doprava", alt: "Nákladná doprava" },

    // Prenajom techniky
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0025.jpg", category: "prenajom-techniky", alt: "Prenájom stavebnej techniky" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0028.jpg", category: "prenajom-techniky", alt: "Nákladné vozidlá" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0027.jpg", category: "prenajom-techniky", alt: "Špecializovaná technika" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0022.jpg", category: "prenajom-techniky", alt: "Ťažká technika" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0017.jpg", category: "prenajom-techniky", alt: "Stavebné stroje" },
];

const filters = [
    { id: "stavebnictvo", label: "Stavebníctvo" },
    { id: "nakladna-doprava", label: "Nákladná doprava" },
    { id: "ocelove-konstrukcie", label: "Oceľové konštrukcie" },
    { id: "prenajom-techniky", label: "Prenájom techniky" },
];

export default function GaleriaPageClient() {
    const [activeFilter, setActiveFilter] = useState("stavebnictvo");
    const [heroAnimated, setHeroAnimated] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [filteredImages, setFilteredImages] = useState(allImages.filter(img => img.category === "stavebnictvo"));

    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    // Update filtered images when filter changes
    useEffect(() => {
        const newFiltered = allImages.filter(img => img.category === activeFilter);
        setFilteredImages(newFiltered);
    }, [activeFilter]);

    // Handle URL query param for filter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const filter = params.get("filter");
        if (filter && filters.some(f => f.id === filter)) {
            setActiveFilter(filter);
        }
    }, []);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "auto";
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="hero-subpage pt-[120px] pb-[80px] min-h-[30vh]">
                <div className="hero-subpage-bg">
                    <Image
                        src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0107.jpg"
                        alt="Galéria"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container-main relative z-10">
                    <h1
                        className={`text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-bold text-white leading-[1.1] transition-all duration-800 transform text-left ${heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
                            }`}
                    >
                        Galéria
                    </h1>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-[40px] bg-white">
                <div className="container-main">
                    <div className="flex flex-wrap justify-center gap-[20px] mb-[40px]">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`relative px-[30px] py-[12px] font-bold uppercase tracking-[1px] border-[2px] transition-all duration-300 ${activeFilter === filter.id
                                    ? "bg-[#b42d20] border-[#b42d20] text-white filter-btn-active"
                                    : "bg-transparent border-[#333] text-[#333] hover:bg-[#b42d20] hover:border-[#b42d20] hover:text-white"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((img, index) => (
                                <motion.div
                                    layout
                                    key={img.src} // Use src as key for reliable identification
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }} // Staggered delay
                                    onClick={() => openLightbox(index)}
                                    className="group relative overflow-hidden aspect-[16/10] cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.03] z-10 hover:z-20"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-600 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-[10px] z-[10000] flex items-center justify-center p-5"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-[20px] right-[20px] text-white text-[3rem] leading-none hover:text-[#DD1B1B] transition-colors z-[10002]"
                            onClick={closeLightbox}
                        >
                            &times;
                        </button>

                        <button
                            className="absolute left-[20px] top-1/2 -translate-y-1/2 text-white text-[2rem] p-[15px] bg-white/10 hover:bg-white/20 hover:text-[#DD1B1B] rounded transition-all z-[10002]"
                            onClick={prevImage}
                        >
                            &#10094;
                        </button>

                        <button
                            className="absolute right-[20px] top-1/2 -translate-y-1/2 text-white text-[2rem] p-[15px] bg-white/10 hover:bg-white/20 hover:text-[#DD1B1B] rounded transition-all z-[10002]"
                            onClick={nextImage}
                        >
                            &#10095;
                        </button>

                        <div className="relative w-full h-full pointer-events-none flex items-center justify-center p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex} // Key on index to trigger animation on switch
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative max-w-[90vw] max-h-[90vh] aspect-[16/10] w-full pointer-events-auto shadow-2xl"
                                >
                                    <Image
                                        src={filteredImages[currentImageIndex].src}
                                        alt={filteredImages[currentImageIndex].alt}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
