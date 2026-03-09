"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Script from "next/script";

declare global {
    interface Window {
        turnstile: {
            render: (element: HTMLElement, options: Record<string, unknown>) => string;
            reset: (widgetId: string) => void;
        };
    }
}

export default function KontaktPageClient() {
    const [heroAnimated, setHeroAnimated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    const renderTurnstile = useCallback(() => {
        if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                sitekey: "0x4AAAAAACobaJAuiLULABP2",
                callback: (token: string) => setTurnstileToken(token),
                "expired-callback": () => setTurnstileToken(null),
                theme: "light",
            });
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        renderTurnstile();
    }, [renderTurnstile]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: null, message: '' });

        if (!turnstileToken) {
            setFormStatus({ type: 'error', message: 'Prosím dokončite overenie.' });
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            service: formData.get("service"),
            message: formData.get("message"),
            turnstileToken,
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
                setTurnstileToken(null);
                if (widgetIdRef.current && window.turnstile) {
                    window.turnstile.reset(widgetIdRef.current);
                }
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
                <div className="container-main grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-[40px] lg:gap-[80px]">

                    {/* LEFT COLUMN: Contact Info + Map */}
                    <div className="flex flex-col gap-[40px]">

                        {/* 1. Companies Section (Side-by-Side within Left Column) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                            {/* ML RESULT */}
                            <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <h3 className="text-[1.3rem] md:text-[1.5rem] font-bold text-[#333] mb-[20px] border-b-2 border-[#b42d20] inline-block pb-2">ML RESULT s.r.o.</h3>
                                <div className="space-y-[12px] text-[#333] text-sm md:text-base">
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">Kancelária:</span>
                                        <span>Niže Mesta 12072, 049 25 Dobšiná</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">Telefón:</span>
                                        <a href="tel:+421908527419" className="text-[#b42d20] hover:underline font-medium">+421 908 527 419</a>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">Doprava:</span>
                                        <a href="mailto:doprava@mlresult.sk" className="text-[#b42d20] hover:underline">doprava@mlresult.sk</a>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">Obchod:</span>
                                        <a href="mailto:obchod@mlresult.sk" className="text-[#b42d20] hover:underline">obchod@mlresult.sk</a>
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 grid grid-cols-1 gap-1">
                                        <div><span className="font-semibold text-gray-700">IČO:</span> 47355743 | <span className="font-semibold text-gray-700">DIČ:</span> 2023864524</div>
                                        <div><span className="font-semibold text-gray-700">IČ DPH:</span> SK2023864524</div>
                                    </div>
                                </div>
                            </div>

                            {/* GRAN */}
                            <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <h3 className="text-[1.3rem] md:text-[1.5rem] font-bold text-[#333] mb-[20px] border-b-2 border-[#b42d20] inline-block pb-2">GRAN s.r.o.</h3>
                                <div className="space-y-[12px] text-[#333] text-sm md:text-base">
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">Kancelária:</span>
                                        <span>SNP 246, 049 24 Vlachovo</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">Telefón:</span>
                                        <a href="tel:+421907456963" className="text-[#b42d20] hover:underline font-medium">+421 907 456 963</a>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="font-bold min-w-[80px] text-gray-500">E-mail:</span>
                                        <a href="mailto:info@gran-stav.sk" className="text-[#b42d20] hover:underline">info@gran-stav.sk</a>
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 grid grid-cols-1 gap-1">
                                        <div><span className="font-semibold text-gray-700">IČO:</span> 36817627 | <span className="font-semibold text-gray-700">DIČ:</span> 2022440189</div>
                                        <div><span className="font-semibold text-gray-700">IČ DPH:</span> SK2022440189</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Map Section (Below Companies in Left Column) */}
                        <div className="w-full h-[300px] md:h-[400px] relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <div
                                className="absolute inset-0 z-10 flex flex-col justify-end items-center pb-4 cursor-pointer transition-opacity duration-500 group"
                                onClick={(e) => {
                                    e.currentTarget.style.pointerEvents = 'none';
                                    e.currentTarget.style.opacity = '0';
                                }}
                            >
                                <span className="text-white text-[10px] uppercase tracking-[1px] [text-shadow:0_2px_4px_rgba(0,0,0,1)] select-none opacity-90 group-hover:opacity-100 transition-opacity font-bold">
                                    Kliknite pre interakciu s mapou
                                </span>
                            </div>
                            <iframe
                                src="https://www.google.com/maps?q=ML+RESULT+sro,+Niže+Mesta+12072,+049+25+Dobšiná&output=embed&hl=sk"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="transition-all duration-500"
                            ></iframe>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Contact Form (Sticky) */}
                    <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 h-fit sticky top-[100px]">
                        <h2 className="text-[1.8rem] font-bold text-gray-900 mb-2">Napíšte nám</h2>
                        <p className="text-gray-500 mb-6 text-sm">Vyplňte formulár a my sa vám ozveme čo najskôr.</p>

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

                            <div ref={turnstileRef} className="flex justify-center"></div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !turnstileToken}
                                className="w-full bg-[#b42d20] text-white py-4 px-8 rounded-lg font-semibold uppercase tracking-wider text-sm shadow-md hover:bg-[#8b2319] hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? "Odosiela sa..." : "Odoslať správu"}
                            </button>
                        </form>
                        <Script
                            src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
                            strategy="afterInteractive"
                            onLoad={() => renderTurnstile()}
                        />
                    </div>

                </div>
            </section>
        </main>
    );
}
