"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const heroImages = [
    "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0067.jpg",
    "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg",
    "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0025.jpg",
    "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0058.jpg",
    "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0028.jpg",
];

const galleryImages = [
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0067.jpg", alt: "Stavebné práce", title: "STAVEBNÍCTVO" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0058.jpg", alt: "Stavebníctvo", title: "STAVEBNÍCTVO" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg", alt: "Nákladná doprava", title: "NÁKLADNÁ DOPRAVA" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0025.jpg", alt: "Prenájom techniky", title: "PRENÁJOM TECHNIKY" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0099.jpg", alt: "Stavebníctvo", title: "STAVEBNÍCTVO" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0094.jpg", alt: "Stavebníctvo", title: "STAVEBNÍCTVO" },
    { src: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0017.jpg", alt: "Prenájom techniky", title: "PRENÁJOM TECHNIKY" },
];

export default function HomePageClient() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [heroAnimated, setHeroAnimated] = useState(false);
    const [sectionTitleAnimated, setSectionTitleAnimated] = useState(false);
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const galleryRef = useRef<HTMLElement>(null);
    const heroBgRef = useRef<HTMLDivElement>(null);

    // Hero image rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Hero animation on load
    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    // Parallax scroll effect for hero background
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            // Move background up by 15% of scroll within the hero section
            const offset = Math.min(scrollY * 0.15, windowHeight * 0.15);
            setParallaxOffset(offset);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Section title animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setSectionTitleAnimated(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <main>
            {/* Hero Section */}
            <section className="relative h-screen overflow-visible text-white">
                {/* Background Images - Fixed with Parallax */}
                <div
                    ref={heroBgRef}
                    className="fixed inset-0 bg-black -z-20 h-[115vh]"
                    style={{ transform: `translateY(-${parallaxOffset}px)` }}
                >
                    {heroImages.map((img, index) => (
                        <Image
                            key={img}
                            src={img}
                            alt={`Hero background ${index + 1}`}
                            fill
                            className={`object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100 animate-ken-burns" : "opacity-0"}`}
                            priority={index === 0}
                        />
                    ))}
                    <div className="absolute inset-0 bg-black/30 z-10"></div>
                </div>

                {/* Hero Content - Fixed */}
                <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
                    <div className="container-main pb-[60px] flex flex-col md:flex-row justify-between items-end gap-[60px] pointer-events-auto">
                        {/* Left Bottom - Text */}
                        <div className="flex-1 max-w-[900px] text-left">
                            <h1 className="text-[2.25rem] md:text-[4rem] font-bold leading-[1.2] mb-5 shadow-black/50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] max-w-[850px]">
                                Spoľahlivý partner pre dopravu, výstavbu a technické riešenia
                            </h1>
                            <p className="text-[1rem] md:text-[1.2rem] mb-[30px] opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                Sme stabilná slovenská spoločnosť s dlhoročnou praxou v doprave, stavebníctve a prenájme techniky. Naše riešenia spájajú skúsenosti, spoľahlivosť a moderné vybavenie.
                            </p>
                            <div className="flex flex-row gap-3 md:gap-5 w-full md:w-auto">
                                <Link
                                    href="/galeria"
                                    className="flex-1 md:flex-none bg-[#b42d20] text-white px-[20px] md:px-[40px] py-[15px] md:py-[18px] font-semibold uppercase tracking-[1px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all text-center text-[13px] md:text-[15px]"
                                >
                                    PROJEKTY
                                </Link>
                                <Link
                                    href="/sluzby"
                                    className="flex-1 md:flex-none bg-black text-white px-[20px] md:px-[40px] py-[15px] md:py-[18px] font-semibold uppercase tracking-[1px] hover:bg-[#333] transition-all text-center text-[13px] md:text-[15px]"
                                >
                                    NAŠE SLUŽBY
                                </Link>
                            </div>
                        </div>

                        {/* Right Bottom - Stats */}
                        <div className="flex-1 max-w-[500px] flex flex-col gap-[30px] md:self-end">
                            <div className="flex gap-[30px]">
                                <div className="text-left">
                                    <div className="text-[3rem] font-bold leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-white">
                                        200<span className="text-[#DD1B1B]">+</span>
                                    </div>
                                    <div className="text-[0.9rem] opacity-80 uppercase tracking-[0.5px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-white">
                                        Dokončených projektov
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="text-[3rem] font-bold leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-white">
                                        25<span className="text-[#DD1B1B]">+</span>
                                    </div>
                                    <div className="text-[0.9rem] opacity-80 uppercase tracking-[0.5px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-white">
                                        Rokov skúseností
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Companies Section */}
            <section id="companies" className="relative z-20 py-[60px] bg-[#f8f9fa]">
                <div className="container-main grid md:grid-cols-2 gap-[60px] min-h-[600px]">
                    {/* ML Result Section */}
                    <div className="relative flex items-center justify-center p-[40px] md:p-[60px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] group">
                        <div className="absolute inset-0 z-10">
                            <Image
                                src="/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg"
                                alt="ML Result Background"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 z-20"></div>
                        </div>
                        <div className="relative z-30 text-center text-white max-w-[700px]">
                            <div className="mb-[40px] flex justify-center">
                                <div className="relative w-auto h-[80px]">
                                    <Image src="/images/logos/image.png" alt="ML RESULT" width={300} height={100} className="object-contain h-full w-auto" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[40px]">
                                {[
                                    { title: "Oceľové konštrukcie", desc: "Montáž a výroba oceľových konštrukcií", iconPath: "M5 35h30V5H5v30zM8 8h24v6H8V8zM8 18h24v6H8v-6zM8 28h24v4H8v-4z" },
                                    { title: "Nákladná doprava", desc: "Medzinárodná a vnútroštátna doprava", iconPath: "M5 15h30v20H5V15zM8 25h6v5H8v-5zM26 25h6v5h-6v-5zM5 15l5-10h20l5 10H5z" },
                                    { title: "Logistické služby", desc: "Skladovanie a správa vozového parku", iconPath: "M5 5h30v8H5V5zM5 17h30v8H5v-8zM5 29h30v6H5v-6z" }
                                ].map((service, i) => (
                                    <div key={i} className="bg-white/15 backdrop-blur-[10px] border border-white/10  p-[25px] text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-[5px] min-h-[150px] flex flex-col items-center justify-start">
                                        <div className="mb-[15px] opacity-90 text-white">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <path d={service.iconPath} fill="currentColor" />
                                            </svg>
                                        </div>
                                        <h3 className="text-[1.1rem] font-semibold mb-[8px] leading-[1.2]">{service.title}</h3>
                                        <p className="text-[0.9rem] opacity-80 leading-[1.3] m-0">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <Link href="/sluzby" className="inline-block bg-[#b42d20] text-white px-[40px] py-[15px] font-semibold uppercase tracking-[1px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all no-underline">
                                Zistiť viac
                            </Link>
                        </div>
                    </div>

                    {/* Gran Section */}
                    <div className="relative flex items-center justify-center p-[40px] md:p-[60px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] group">
                        <div className="absolute inset-0 z-10">
                            <Image
                                src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0067.jpg"
                                alt="Gran Background"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 z-20"></div>
                        </div>
                        <div className="relative z-30 text-center text-white max-w-[700px]">
                            <div className="mb-[40px] flex justify-center">
                                <div className="relative w-auto h-[80px]">
                                    <Image src="/images/logos/gran.png" alt="GRAN" width={300} height={100} className="object-contain h-full w-auto" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[40px]">
                                {[
                                    { title: "Stavebníctvo", desc: "Výstavba diaľníc a infraštruktúra", iconPath: "M5 35h30V18L20 8 5 18v17zM12 30v-8h6v8h-6zM22 30v-8h6v8h-6z" },
                                    { title: "Prenájom techniky", desc: "Manitou, Liebherr, New Holland", iconPath: "M8 28h24v7H8v-7zM15 25V15h10v10h-10zM12 12h16v8H12v-8zM5 5h30v4H5V5z" },
                                    { title: "Kvalifikovaní pracovníci", desc: "Odborní pracovníci pre stavebníctvo", iconPath: "M20 5L35 12L20 19 5 12L20 5zM5 16l15 7 15-7v8l-15 7-15-7v-8zM5 26l15 7 15-7v8l-15 7-15-7v-8z" }
                                ].map((service, i) => (
                                    <div key={i} className="bg-white/15 backdrop-blur-[10px] border border-white/10  p-[25px] text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-[5px] min-h-[150px] flex flex-col items-center justify-start">
                                        <div className="mb-[15px] opacity-90 text-white">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <path d={service.iconPath} fill="currentColor" />
                                            </svg>
                                        </div>
                                        <h3 className="text-[1.1rem] font-semibold mb-[8px] leading-[1.2]">{service.title}</h3>
                                        <p className="text-[0.9rem] opacity-80 leading-[1.3] m-0">{service.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <Link href="/sluzby" className="inline-block bg-[#b42d20] text-white px-[40px] py-[15px] font-semibold uppercase tracking-[1px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all no-underline">
                                Zistiť viac
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" ref={galleryRef} className="relative z-20 py-[100px] bg-white overflow-hidden w-full">
                <div className="container-main">
                    <h2
                        className={`text-[2.5rem] lg:text-[3.5rem] font-bold mb-[40px] text-left text-black transition-all duration-800 transform ${sectionTitleAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
                            }`}
                    >
                        Galéria
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] w-full">
                        {galleryImages.map((img, index) => (
                            <div key={index} className="gallery-item w-full relative group">
                                <Link href="/galeria" className="block text-inherit no-underline">
                                    <div className="relative overflow-hidden h-[250px] cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover transition-transform duration-600 group-hover:scale-110"
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}

                        {/* All Projects Link Block */}
                        <div className="gallery-item w-full relative">
                            <Link href="/galeria" className="block w-full h-full text-white no-underline">
                                <div className="flex items-center justify-center h-[250px] bg-[#b42d20] transition-all duration-300 hover:scale-[1.03] group">
                                    <div className="text-center flex flex-col items-center gap-[15px]">
                                        <h3 className="text-[18px] font-bold uppercase tracking-[1px] m-0">GALÉRIA</h3>
                                        <div className="opacity-80 transition-transform duration-300 group-hover:translate-x-[5px]">
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                <path d="M10 24L38 24M30 16L38 24L30 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
