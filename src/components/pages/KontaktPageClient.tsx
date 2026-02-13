"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function KontaktPageClient() {
    const [heroAnimated, setHeroAnimated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: null, message: '' });

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            service: formData.get("service"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setFormStatus({ type: 'success', message: 'Správa bola úspešne odoslaná.' });
                (e.target as HTMLFormElement).reset();
            } else {
                setFormStatus({ type: 'error', message: result.error || 'Nastala chyba pri odosielaní.' });
            }
        } catch (error) {
            setFormStatus({ type: 'error', message: 'Nastala chyba pri odosielaní. Skúste to prosím neskôr.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="hero-subpage pt-[120px] pb-[80px] min-h-[30vh]">
                <div className="hero-subpage-bg">
                    <Image
                        src="/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0025.jpg"
                        alt="Kontakt"
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
                        Kontakt
                    </h1>
                </div>
            </section>

            {/* Contact Info & Map Section */}
            {/* Layout Container */}
            <section className="py-[60px] md:py-[80px] bg-white">
                <div className="container-main">

                    {/* 1. Companies Section (Side-by-Side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] mb-[80px]">
                        {/* ML RESULT */}
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <h3 className="text-[1.5rem] font-bold text-[#333] mb-[25px] border-b-2 border-[#b42d20] inline-block pb-2">ML RESULT s.r.o.</h3>
                            <div className="space-y-[12px] text-[#333]">
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">Kancelária:</span>
                                    <span>Niže Mesta 12072, 049 25 Dobšiná</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">Telefón:</span>
                                    <a href="tel:+421908527419" className="text-[#b42d20] hover:underline font-medium">+421 908 527 419</a>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">Doprava:</span>
                                    <a href="mailto:doprava@mlresult.sk" className="text-[#b42d20] hover:underline">doprava@mlresult.sk</a>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">Obchod:</span>
                                    <a href="mailto:obchod@mlresult.sk" className="text-[#b42d20] hover:underline">obchod@mlresult.sk</a>
                                </p>
                                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div><span className="font-semibold text-gray-700">IČO:</span> 47355743</div>
                                    <div><span className="font-semibold text-gray-700">DIČ:</span> 2023864524</div>
                                    <div><span className="font-semibold text-gray-700">IČ DPH:</span> SK2023864524</div>
                                </div>
                            </div>
                        </div>

                        {/* GRAN */}
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <h3 className="text-[1.5rem] font-bold text-[#333] mb-[25px] border-b-2 border-[#b42d20] inline-block pb-2">GRAN s.r.o.</h3>
                            <div className="space-y-[12px] text-[#333]">
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">Kancelária:</span>
                                    <span>SNP 246, 049 24 Vlachovo</span>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">Telefón:</span>
                                    <a href="tel:+421907456963" className="text-[#b42d20] hover:underline font-medium">+421 907 456 963</a>
                                </p>
                                <p className="flex items-start gap-3">
                                    <span className="font-bold min-w-[90px] text-gray-500">E-mail:</span>
                                    <a href="mailto:info@gran-stav.sk" className="text-[#b42d20] hover:underline">info@gran-stav.sk</a>
                                </p>
                                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <div><span className="font-semibold text-gray-700">IČO:</span> 36817627</div>
                                    <div><span className="font-semibold text-gray-700">DIČ:</span> 2022440189</div>
                                    <div><span className="font-semibold text-gray-700">IČ DPH:</span> SK2022440189</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Map & Form Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-[40px] items-start">

                        {/* Map (Left/Top) */}
                        <div className="w-full h-[500px] lg:h-[700px] relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 order-2 lg:order-1">
                            <div
                                className="absolute inset-0 z-10 flex flex-col justify-end items-center pb-4 cursor-pointer transition-opacity duration-500 group"
                                onClick={(e) => {
                                    e.currentTarget.style.pointerEvents = 'none';
                                    e.currentTarget.style.opacity = '0';
                                }}
                            >
                                <span className="text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-[2px] bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none select-none">
                                    Kliknite pre interakciu s mapou
                                </span>
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10419.2!2d20.3887671!3d48.8111279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473fb500bfeb77f1:0x200bab4632c5aa8f!2zTmnFvmUgTWVzdGEgMTIwNzIsIDA0OSAyNSBEb2LFoWluw6E!5e0!3m2!1ssk!2ssk!4v1620000000000!5m2!1ssk!2ssk"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>

                        {/* Modern Contact Form (Right/Bottom) */}
                        <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 order-1 lg:order-2 sticky top-[100px]">
                            <h2 className="text-[1.8rem] font-bold text-gray-900 mb-2">Napíšte nám</h2>
                            <p className="text-gray-500 mb-8 text-sm">Vyplňte formulár a my sa vám ozveme čo najskôr.</p>

                            {formStatus.message && (
                                <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${formStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                    {formStatus.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="group">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            required
                                            placeholder=" "
                                            className="peer w-full pt-6 pb-2 px-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:border-[#b42d20] transition-colors"
                                        />
                                        <label
                                            htmlFor="fullName"
                                            className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#b42d20] peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                                        >
                                            Meno a priezvisko
                                        </label>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder=" "
                                            className="peer w-full pt-6 pb-2 px-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:border-[#b42d20] transition-colors"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#b42d20] peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                                        >
                                            E-mail
                                        </label>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder=" "
                                            className="peer w-full pt-6 pb-2 px-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-transparent focus:outline-none focus:border-[#b42d20] transition-colors"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#b42d20] peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
                                        >
                                            Telefón
                                        </label>
                                    </div>
                                </div>

                                <div className="group pt-2">
                                    <label htmlFor="service" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Služba</label>
                                    <div className="relative">
                                        <select
                                            id="service"
                                            name="service"
                                            required
                                            className="w-full py-3 pl-4 pr-10 border border-gray-200 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:border-[#b42d20] focus:ring-1 focus:ring-[#b42d20] transition-all appearance-none cursor-pointer hover:bg-white"
                                        >
                                            <option value="">Vyberte typ služby</option>
                                            <option value="stavebnictvo">Stavebníctvo</option>
                                            <option value="nakladna-doprava">Nákladná doprava</option>
                                            <option value="ocelove-konstrukcie">Oceľové konštrukcie</option>
                                            <option value="prenajom-techniky">Prenájom techniky</option>
                                            <option value="ine">Iné</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="group pt-2">
                                    <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Správa</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Povedzte nám viac o vašom projekte..."
                                        required
                                        className="w-full p-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-900 min-h-[120px] focus:outline-none focus:border-[#b42d20] focus:ring-1 focus:ring-[#b42d20] focus:bg-white transition-all resize-y"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#b42d20] text-white py-4 px-8 rounded-lg font-semibold uppercase tracking-wider text-sm shadow-md hover:bg-[#8b2319] hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? "Odosiela sa..." : "Odoslať správu"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
