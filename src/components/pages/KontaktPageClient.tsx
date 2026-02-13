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
            {/* Combined Contact Info and Form Section */}
            <section className="py-[80px] bg-white">
                <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-[60px] mb-[80px]">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-[60px]">
                        <div>
                            <h3 className="text-[1.8rem] font-bold text-[#333] mb-[30px] border-b-2 border-[#b42d20] inline-block pb-2">ML RESULT s.r.o.</h3>
                            <div className="space-y-[15px] text-[#333] text-lg">
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">Kancelária:</span>
                                    <span>Niže Mesta 12072, 049 25 Dobšiná</span>
                                </p>
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">Telefón:</span>
                                    <a href="tel:+421908527419" className="text-[#b42d20] hover:underline font-semibold">+421 908 527 419</a>
                                </p>
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">Doprava:</span>
                                    <a href="mailto:doprava@mlresult.sk" className="text-[#b42d20] hover:underline">doprava@mlresult.sk</a>
                                </p>
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">Obchod:</span>
                                    <a href="mailto:obchod@mlresult.sk" className="text-[#b42d20] hover:underline">obchod@mlresult.sk</a>
                                </p>
                                <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 grid grid-cols-3 gap-4">
                                    <div><span className="font-semibold block text-gray-700">IČO:</span> 47355743</div>
                                    <div><span className="font-semibold block text-gray-700">DIČ:</span> 2023864524</div>
                                    <div><span className="font-semibold block text-gray-700">IČ DPH:</span> SK2023864524</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[1.8rem] font-bold text-[#333] mb-[30px] border-b-2 border-[#b42d20] inline-block pb-2">GRAN s.r.o.</h3>
                            <div className="space-y-[15px] text-[#333] text-lg">
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">Kancelária:</span>
                                    <span>SNP 246, 049 24 Vlachovo</span>
                                </p>
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">Telefón:</span>
                                    <a href="tel:+421907456963" className="text-[#b42d20] hover:underline font-semibold">+421 907 456 963</a>
                                </p>
                                <p className="flex items-start gap-4">
                                    <span className="font-bold min-w-[100px]">E-mail:</span>
                                    <a href="mailto:info@gran-stav.sk" className="text-[#b42d20] hover:underline">info@gran-stav.sk</a>
                                </p>
                                <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 grid grid-cols-3 gap-4">
                                    <div><span className="font-semibold block text-gray-700">IČO:</span> 36817627</div>
                                    <div><span className="font-semibold block text-gray-700">DIČ:</span> 2022440189</div>
                                    <div><span className="font-semibold block text-gray-700">IČ DPH:</span> SK2022440189</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-[#f8f9fa] p-[40px] rounded shadow-lg h-fit sticky top-[100px]">
                        <h2 className="text-[2rem] font-bold text-[#333] mb-[30px] text-center uppercase">Napíšte nám</h2>

                        {formStatus.message && (
                            <div className={`mb-5 p-4 rounded ${formStatus.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                {formStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-[20px]">
                            <div className="form-group">
                                <label htmlFor="fullName" className="block font-semibold text-[#333] mb-[8px] text-[0.9rem] uppercase tracking-[0.5px]">Meno a priezvisko</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    className="w-full p-[15px] border border-[#e8e8e8] bg-white text-[1rem] focus:outline-none focus:border-[#b42d20] focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                                <div className="form-group">
                                    <label htmlFor="email" className="block font-semibold text-[#333] mb-[8px] text-[0.9rem] uppercase tracking-[0.5px]">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full p-[15px] border border-[#e8e8e8] bg-white text-[1rem] focus:outline-none focus:border-[#b42d20] focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="block font-semibold text-[#333] mb-[8px] text-[0.9rem] uppercase tracking-[0.5px]">Telefón</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full p-[15px] border border-[#e8e8e8] bg-white text-[1rem] focus:outline-none focus:border-[#b42d20] focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="service" className="block font-semibold text-[#333] mb-[8px] text-[0.9rem] uppercase tracking-[0.5px]">Služba</label>
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    className="w-full p-[15px] border border-[#e8e8e8] bg-white text-[1rem] focus:outline-none focus:border-[#b42d20] focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all appearance-none"
                                >
                                    <option value="">Vyberte službu</option>
                                    <option value="stavebnictvo">Stavebníctvo</option>
                                    <option value="nakladna-doprava">Nákladná doprava</option>
                                    <option value="ocelove-konstrukcie">Oceľové konštrukcie</option>
                                    <option value="prenajom-techniky">Prenájom techniky</option>
                                    <option value="ine">Iné</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="block font-semibold text-[#333] mb-[8px] text-[0.9rem] uppercase tracking-[0.5px]">Správa</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Popíšte svoj projekt alebo požiadavku..."
                                    required
                                    className="w-full p-[15px] border border-[#e8e8e8] bg-white text-[1rem] min-h-[120px] focus:outline-none focus:border-[#b42d20] focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#b42d20] text-white p-[18px_40px] font-semibold uppercase tracking-[0.5px] shadow-[0_4px_16px_rgba(180,45,32,0.2)] hover:bg-[#8b2319] hover:shadow-[0_8px_24px_rgba(180,45,32,0.3)] hover:-translate-y-[2px] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                            >
                                {isSubmitting ? "Odosiela sa..." : "Odoslať správu"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[500px] relative">
                    <div
                        className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center cursor-pointer transition-opacity group"
                        onClick={(e) => {
                            e.currentTarget.style.pointerEvents = 'none';
                            e.currentTarget.style.opacity = '0';
                        }}
                    >
                        <div className="text-center">
                            <span className="text-white text-xl font-bold uppercase tracking-wider border-2 border-white px-6 py-3 bg-black/40 hover:bg-[#b42d20] hover:border-[#b42d20] transition-colors">
                                Kliknite pre interakciu s mapou
                            </span>
                        </div>
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
            </section>
        </main>
    );
}
