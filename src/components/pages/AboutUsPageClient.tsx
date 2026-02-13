"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsPageClient() {
    const [heroAnimated, setHeroAnimated] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="hero-subpage pt-[120px] pb-[80px] min-h-[30vh]">
                <div className="hero-subpage-bg">
                    <Image
                        src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0071.jpg"
                        alt="O nás"
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
                        O nás
                    </h1>
                </div>
            </section>

            {/* Main About Section */}
            <section className="py-[80px] bg-white">
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-1 lg:order-1">
                            <div className="mb-[30px]">
                                <span className="text-[#b42d20] font-semibold uppercase tracking-[1px] text-[0.9rem] mb-[10px] block">
                                    — O nás
                                </span>
                                <h2 className="text-[2.5rem] font-bold text-[#333] leading-[1.3] m-0">
                                    VAŠA SPOĽAHLIVÁ SPOLOČNOSŤ
                                </h2>
                            </div>
                            <div className="text-[1.1rem] leading-[1.7] text-[#666] space-y-[20px]">
                                <p>
                                    Naša spoločnosť pôsobí v rôznych oblastiach podnikania a poskytuje široké spektrum profesionálnych služieb. Medzi hlavné oblasti našej činnosti patria montované oceľové konštrukcie, stavebníctvo, predovšetkým výstavbu diaľnic, prenájom stavebnej techniky, poskytovanie kvalifikovaných pracovníkov pre stavebné projekty ako aj medzinárodná a vnútroštátna nákladná doprava.
                                </p>
                                <p>
                                    V roku 2022 sme získali areál určený na skladovanie, služby súvisiace s automobilovým priemyslom, správu vozového parku a parkovanie, čo výrazne rozšírilo naše kapacity a možnosti.
                                </p>
                            </div>
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center gap-[10px] bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[0.5px] hover:bg-[#8b2319] transition-all duration-300 hover:-translate-y-[2px] mt-[20px] no-underline"
                            >
                                Kontaktujte nás
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </Link>
                        </div>
                        <div className="order-2 lg:order-2">
                            <div className="w-full h-[46vh] lg:h-[58vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg"
                                    alt="ML Result & Gran spoločnosť"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Expansion Section */}
            <section className="py-[80px] bg-[#f8f9fa]">
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-2 lg:order-1">
                            <div className="w-full h-[46vh] lg:h-[58vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0025.jpg"
                                    alt="Stavebná technika"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="mb-[30px]">
                                <span className="text-[#b42d20] font-semibold uppercase tracking-[1px] text-[0.9rem] mb-[10px] block">
                                    — Služby
                                </span>
                                <h2 className="text-[2.5rem] font-bold text-[#333] leading-[1.3] m-0">
                                    ROZŠÍRENIE AKTIVÍT
                                </h2>
                            </div>
                            <div className="text-[1.1rem] leading-[1.7] text-[#666] space-y-[20px]">
                                <p>
                                    V spoločnosti <strong>ML Result</strong> sme rozšírili naše portfólio o komplexné stavebné práce a inžinierske činnosti v oblasti výstavby infraštruktúry.
                                </p>
                                <p>
                                    Aby sme vedeli tieto služby efektívne zastrešiť a ďalej rozvíjať, založili sme materskú spoločnosť <strong>Gran</strong>, ktorá sa špecializuje na subdodávateľské riešenia v rámci stavebných projektov po celom Slovensku.
                                </p>
                                <p className="font-bold text-[#333]">Zameriavame sa najmä na:</p>
                                <ul className="list-none p-0 m-0 space-y-[6px]">
                                    {[
                                        "výstavbu ciest, obchvatov a diaľničných úsekov",
                                        "realizáciu cestných komunikácií a mostných konštrukcií",
                                        "prenájom stavebnej techniky značiek ako Manitou, Iveco Trakker, Liebherr či New Holland",
                                        "poskytovanie kvalifikovaných pracovníkov pre stavebné projekty"
                                    ].map((item, i) => (
                                        <li key={i} className="relative pl-[20px] text-[#666]">
                                            <span className="absolute left-0 top-0 text-[#DD1B1B] font-bold">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p>
                                    Naše dlhoročné skúsenosti, kvalitné technické zázemie a profesionálny prístup nám pomohli vybudovať si dôveru medzi poprednými hráčmi slovenského stavebného trhu.
                                </p>
                            </div>
                            <Link
                                href="/sluzby"
                                className="inline-flex items-center gap-[10px] bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[0.5px] hover:bg-[#8b2319] transition-all duration-300 hover:-translate-y-[2px] mt-[20px] no-underline"
                            >
                                Služby
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Established Company Section */}
            <section className="py-[80px] bg-white">
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-1 lg:order-1">
                            <div className="mb-[30px]">
                                <span className="text-[#b42d20] font-semibold uppercase tracking-[1px] text-[0.9rem] mb-[10px] block">
                                    — Firemný profil
                                </span>
                                <h2 className="text-[2.5rem] font-bold text-[#333] leading-[1.3] m-0">
                                    ETABLOVANÁ SPOLOČNOSŤ
                                </h2>
                            </div>
                            <div className="text-[1.1rem] leading-[1.7] text-[#666] space-y-[20px]">
                                <h3 className="text-[1.4rem] font-semibold text-[#333] mt-[25px] mb-[15px]">Kto sme</h3>
                                <p>
                                    Sme etablovaná spoločnosť s viac ako 25-ročnými skúsenosťami v oblasti výstavby a technických riešení. Počas nášho pôsobenia sme si vybudovali silnú pozíciu na trhu a dôveru mnohých klientov vďaka nášmu profesionálnemu prístupu, flexibilite a dôrazu na kvalitu.
                                </p>

                                <h3 className="text-[1.4rem] font-semibold text-[#333] mt-[25px] mb-[15px]">História</h3>
                                <p>
                                    Začínali sme ako rodinná firma s jasnou víziou – ponúkať spoľahlivé riešenia v oblasti stavebníctva. Vďaka neustálemu rozvoju a adaptácii na potreby trhu sme vyrástli na komplexného partnera schopného zastrešiť projekty rôznych rozsahov na Slovensku.
                                </p>
                                <p>
                                    Rastúci dopyt po špecializovaných stavebných službách nás viedol k založeniu dcérskej spoločnosti, ktorá sa zameriava čisto na výstavbu diaľnic, prenájom stavebných strojov a pracovnej sily pre stavebný sektor.
                                </p>
                            </div>
                            <Link
                                href="/galeria"
                                className="inline-flex items-center gap-[10px] bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[0.5px] hover:bg-[#8b2319] transition-all duration-300 hover:-translate-y-[2px] mt-[20px] no-underline"
                            >
                                Naše projekty
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </Link>
                        </div>
                        <div className="order-2 lg:order-2">
                            <div className="w-full h-[46vh] lg:h-[58vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0094.jpg"
                                    alt="Naša história"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Values Section */}
            <section className="py-[80px] bg-[#f8f9fa]">
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-2 lg:order-1">
                            <div className="w-full h-[46vh] lg:h-[58vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0061.jpg"
                                    alt="Naše hodnoty"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="mb-[30px]">
                                <span className="text-[#b42d20] font-semibold uppercase tracking-[1px] text-[0.9rem] mb-[10px] block">
                                    — Naše princípy
                                </span>
                                <h2 className="text-[2.5rem] font-bold text-[#333] leading-[1.3] m-0">
                                    NAŠE HODNOTY
                                </h2>
                            </div>
                            <div className="text-[1.1rem] leading-[1.7] text-[#666] space-y-[20px]">
                                {[
                                    { title: "Spoľahlivosť", text: "Stojíme si za každým záväzkom. Klienti sa na nás môžu kedykoľvek obrátiť s dôverou." },
                                    { title: "Kvalita", text: "Neuznávame kompromisy. Pracujeme s profesionálnym vybavením, overenými technológiami a kvalifikovaným personálom." },
                                    { title: "Flexibilita", text: "Prispôsobujeme sa požiadavkám zákazníkov a vieme reagovať na špecifiká každého projektu." },
                                    { title: "Partnerstvo", text: "Záleží nám na dlhodobých vzťahoch. Budujeme ich férovým a otvoreným prístupom." }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <h3 className="text-[1.4rem] font-semibold text-[#333] mt-[25px] mb-[15px]">{item.title}</h3>
                                        <p className="m-0">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Mission Section */}
            <section className="py-[80px] bg-white">
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-1 lg:order-1">
                            <div className="mb-[30px]">
                                <span className="text-[#b42d20] font-semibold uppercase tracking-[1px] text-[0.9rem] mb-[10px] block">
                                    — Naša vízia
                                </span>
                                <h2 className="text-[2.5rem] font-bold text-[#333] leading-[1.3] m-0">
                                    MISIA
                                </h2>
                            </div>
                            <div className="text-[1.1rem] leading-[1.7] text-[#666] space-y-[20px]">
                                <h3 className="text-[1.4rem] font-semibold text-[#333] mt-[25px] mb-[15px]">Náš cieľ</h3>
                                <p>
                                    Našou misiou je byť stabilným a profesionálnym partnerom pre každého, kto hľadá efektívne, moderné a kvalitné riešenia v oblasti stavebníctva a dopravy.
                                </p>

                                <h3 className="text-[1.4rem] font-semibold text-[#333] mt-[25px] mb-[15px]">Naše ambície</h3>
                                <p>
                                    Chceme podporovať rozvoj infraštruktúry na Slovensku s dôrazom na udržateľnosť, bezpečnosť a vysokú odbornú úroveň.
                                </p>
                            </div>
                        </div>
                        <div className="order-2 lg:order-2">
                            <div className="w-full h-[46vh] lg:h-[58vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0052.jpg"
                                    alt="Naša misia"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
