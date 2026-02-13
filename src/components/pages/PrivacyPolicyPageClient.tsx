"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PrivacyPolicyPageClient() {
    const [heroAnimated, setHeroAnimated] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="hero-subpage pt-[120px] pb-[40px] min-h-[30vh]">
                <div className="hero-subpage-bg">
                    <Image
                        src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0071.jpg"
                        alt="Ochrana osobných údajov"
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
                        Ochrana osobných údajov
                    </h1>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-[80px] bg-white">
                <div className="container-main">
                    <div className="max-w-[900px]">
                        {/* Company Info */}
                        <div className="mb-[40px] p-[30px] bg-[#f8f9fa] rounded-[8px]">
                            <h2 className="text-[1.5rem] font-bold text-[#333] mb-[20px]">ML RESULT s. r. o.</h2>
                            <div className="text-[#666] space-y-[8px]">
                                <p>Niže Mesta 12072, 049 25 Dobšiná</p>
                                <p>Slovenská republika</p>
                                <p><strong>IČO:</strong> 47355743, <strong>DIČ:</strong> 2023864524</p>
                                <p><strong>IČ DPH:</strong> SK2023864524, podľa §4, registrácia od 1.7.2015</p>
                                <p><strong>E-mail:</strong> <a href="mailto:obchod@mlresult.sk" className="text-[#b42d20] hover:underline">obchod@mlresult.sk</a></p>
                                <p><strong>Tel.:</strong> <a href="tel:+421908527419" className="text-[#b42d20] hover:underline">+421 908 527 419</a></p>
                            </div>
                        </div>

                        <p className="text-[1.1rem] leading-[1.8] text-[#666] mb-[40px]">
                            Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
                        </p>

                        {/* Section I */}
                        <div className="mb-[40px]">
                            <h2 className="text-[1.8rem] font-bold text-[#333] mb-[20px]">I. Kontaktný formulár</h2>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666] mb-[20px]">
                                Na stránke www.mlresult.sk prevádzkujeme kontaktný formulár ktorého účelom je umožniť vám:
                            </p>
                            <ul className="list-none p-0 mb-[20px] space-y-[10px]">
                                <li className="relative pl-[25px] text-[1.1rem] text-[#666]">
                                    <span className="absolute left-0 text-[#b42d20] font-bold">•</span>
                                    Položiť otázku k našim produktom a službám
                                </li>
                                <li className="relative pl-[25px] text-[1.1rem] text-[#666]">
                                    <span className="absolute left-0 text-[#b42d20] font-bold">•</span>
                                    Požiadať o cenovú ponuku
                                </li>
                            </ul>

                            <h3 className="text-[1.3rem] font-semibold text-[#333] mt-[30px] mb-[15px]">Rozsah spracúvaných údajov:</h3>
                            <ul className="list-none p-0 mb-[20px] space-y-[10px]">
                                {["Meno a priezvisko", "E-mailová adresa", "Telefónne číslo", "Správu"].map((item, i) => (
                                    <li key={i} className="relative pl-[25px] text-[1.1rem] text-[#666]">
                                        <span className="absolute left-0 text-[#b42d20] font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-[1.3rem] font-semibold text-[#333] mt-[30px] mb-[15px]">Účel spracovania:</h3>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666] mb-[20px]">
                                Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
                            </p>

                            <h3 className="text-[1.3rem] font-semibold text-[#333] mt-[30px] mb-[15px]">Právny základ:</h3>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666] mb-[20px]">
                                Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
                            </p>

                            <h3 className="text-[1.3rem] font-semibold text-[#333] mt-[30px] mb-[15px]">Doba uchovávania:</h3>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666]">
                                Osobné údaje budeme uchovať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
                            </p>
                        </div>

                        {/* Section II */}
                        <div className="mb-[40px]">
                            <h2 className="text-[1.8rem] font-bold text-[#333] mb-[20px]">II. Súbory cookies</h2>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666] mb-[20px]">
                                Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
                            </p>
                            <ul className="list-none p-0 mb-[20px] space-y-[10px]">
                                <li className="relative pl-[25px] text-[1.1rem] text-[#666]">
                                    <span className="absolute left-0 text-[#b42d20] font-bold">•</span>
                                    <strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).
                                </li>
                                <li className="relative pl-[25px] text-[1.1rem] text-[#666]">
                                    <span className="absolute left-0 text-[#b42d20] font-bold">•</span>
                                    <strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).
                                </li>
                            </ul>

                            <h3 className="text-[1.3rem] font-semibold text-[#333] mt-[30px] mb-[15px]">Správa súhlasov:</h3>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666]">
                                Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
                            </p>
                        </div>

                        {/* Section III */}
                        <div className="mb-[40px]">
                            <h2 className="text-[1.8rem] font-bold text-[#333] mb-[20px]">III. Práva dotknutej osoby</h2>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666] mb-[20px]">
                                Podľa nariadenia GDPR máte nasledujúce práva:
                            </p>
                            <ul className="list-none p-0 mb-[20px] space-y-[10px]">
                                {[
                                    "Prístup k osobným údajom, ktoré spracúvame",
                                    "Oprava nepresných alebo neúplných údajov",
                                    'Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ',
                                    "Obmedzenie spracovania",
                                    "Prenosnosť údajov",
                                    "Odvolanie súhlasu – stane sa účinným dňom odvolania",
                                    "Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)"
                                ].map((item, i) => (
                                    <li key={i} className="relative pl-[25px] text-[1.1rem] text-[#666]">
                                        <span className="absolute left-0 text-[#b42d20] font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-[1.1rem] leading-[1.8] text-[#666]">
                                V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na{" "}
                                <a href="mailto:obchod@mlresult.sk" className="text-[#b42d20] hover:underline">obchod@mlresult.sk</a>{" "}
                                alebo telefónnom čísle{" "}
                                <a href="tel:+421908527419" className="text-[#b42d20] hover:underline">+421 908 527 419</a>.
                            </p>
                        </div>

                        {/* Effective Date */}
                        <div className="pt-[30px] border-t border-[#e9ecef]">
                            <p className="text-[1rem] text-[#999]">
                                Tieto Zásady nadobúdajú účinnosť dňom 25. 7. 2025.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
