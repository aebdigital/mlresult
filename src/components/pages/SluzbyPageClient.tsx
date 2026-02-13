"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const sections = [
    { id: "ocelove-konstrukcie", title: "Oceľové konštrukcie" },
    { id: "nakladna-doprava", title: "Nákladná doprava" },
    { id: "stavebnictvo", title: "Stavebníctvo" },
    { id: "prenajom-techniky", title: "Prenájom techniky" },
];

const equipment = [
    {
        name: "TELESKOPICKÉ MANIPULÁTORY",
        image: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0025.jpg",
        details: [
            { label: "Manitou Privilege 2540 & 2150 (otočný manipulátor)" },
            { label: "Mesačný paušál", value: "9 000 €" },
            { label: "Hodinová sadzba", value: "40 €/hod" },
        ],
    },
    {
        name: "NÁKLADNÉ VOZIDLÁ",
        image: "/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg",
        details: [
            { label: "Iveco Trakker 8x8 & Mercedes Actros 8x6" },
            { label: "Hodinová sadzba", value: "45 €/hod" },
            { label: "Kilometrovná sadzba", value: "1,85 €/km" },
        ],
    },
    {
        name: "ZEMNÉ A VÝKOPOVÉ PRÁCE",
        image: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0027.jpg",
        details: [
            { label: "Traktorbager New Holland 115B" },
            { label: "Hodinová sadzba", value: "35 €/hod" },
            { label: "Liebherr A918 (otočný kolesový bager)" },
            { label: "Hodinová sadzba", value: "48 €/hod" },
        ],
    },
    {
        name: "PRACOVNÉ PLOŠINY",
        image: "/images/gallery/sources/ML Result & Gran - Marketing/Stroje/IMG-20250709-WA0028.jpg",
        details: [
            { label: "Pracovná plošina Genie (výška 15 m)" },
            { label: "Denná sadzba", value: "60 €/deň" },
        ],
    },
];

export default function SluzbyPageClient() {
    const [activeSection, setActiveSection] = useState("ocelove-konstrukcie");
    const [heroAnimated, setHeroAnimated] = useState(false);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    useEffect(() => {
        const timeout = setTimeout(() => setHeroAnimated(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    const [sidebarVisible, setSidebarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 300;

            // Active section logic
            for (const section of sections) {
                const element = sectionRefs.current[section.id];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }

            // Footer collision logic
            const footer = document.querySelector("footer");
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                // If footer is approaching the middle of the screen (where sidebar is)
                // Sidebar is centered, so let's hide it when footer top is within 60% of viewport height
                if (footerRect.top < windowHeight * 0.8) {
                    setSidebarVisible(false);
                } else {
                    setSidebarVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = sectionRefs.current[id];
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="hero-subpage pt-[120px] pb-[80px] min-h-[30vh]">
                <div className="hero-subpage-bg">
                    <Image
                        src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0094.jpg"
                        alt="Služby"
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
                        Služby
                    </h1>
                </div>
            </section>

            {/* Floating Navigation */}
            <nav
                className={`fixed right-[30px] top-1/2 -translate-y-1/2 z-[999] bg-white/70 backdrop-blur-[10px] p-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-500 hidden lg:block ${sidebarVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[20px] pointer-events-none"
                    }`}
            >
                <h4 className="text-[0.9rem] font-semibold text-[#333] mb-[15px] text-center uppercase tracking-[1px] m-0">
                    Služby
                </h4>
                <ul className="list-none p-0 m-0">
                    {sections.map((section) => (
                        <li key={section.id} className="mb-[10px] last:mb-0">
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={`block w-full px-[15px] py-[10px] text-left text-[0.9rem] font-medium  transition-all duration-300 relative overflow-hidden ${activeSection === section.id
                                    ? "bg-[#b42d20] text-white pl-[15px] before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[20px] before:bg-white before:rounded-[2px]"
                                    : "text-[#666] hover:bg-[#b42d20]/10 hover:text-[#b42d20]"
                                    }`}
                            >
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Oceľové konštrukcie Section */}
            <section
                id="ocelove-konstrukcie"
                ref={(el) => { sectionRefs.current["ocelove-konstrukcie"] = el; }}
                className="py-[80px] bg-white"
            >
                <div className="container-main">
                    <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold mb-[30px] text-left text-black">
                        Montované oceľové konštrukcie
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center mb-[70px]">
                        <div className="order-1">
                            <div className="text-[1rem] leading-[1.6] text-[#666] space-y-[20px]">
                                <p className="font-normal">Montovaným oceľovým konštrukciám sa venujeme viac než desať rokov. Za ten čas sme zrealizovali desiatky projektov – od výstavby a opláštenia hál až po demolácie a technicky náročné riešenia na mieru.</p>

                                <p className="mb-0 font-normal"><strong className="text-[#333] font-semibold underline">Naše riešenia v oblasti oceľových konštrukcií sú navrhnuté pre rôzne sektory:</strong></p>
                                <ul className="list-none p-0 m-0 mb-[20px] space-y-[5px]">
                                    {[
                                        { title: "Priemyselné spoločnosti:", text: "Výrobné podniky, logistické centrá či technické závody často potrebujú spoľahlivé montované haly, výrobné priestory alebo skladové objekty." },
                                        { title: "Poľnohospodárstvo:", text: "Poľnohospodárske družstvá využívajú naše oceľové konštrukcie na výstavbu skladov, hospodárskych hál a prevádzkových budov." },
                                        { title: "Stavebné a developerské firmy:", text: "Partneri z oblasti výstavby a developmentu nás oslovujú pri realizácii komerčných a polyfunkčných objektov, ako aj bytových či administratívnych budov." },
                                        { title: "Verejný sektor:", text: "Realizujeme oceľové konštrukcie aj pre mestá, obce, vzdelávacie inštitúcie či iné verejné organizácie." },
                                        { title: "Komerčné podniky:", text: "Pre reťazce, predajcov a podnikateľov v pohostinstve staviame priestory na mieru – obchodné centrá, reštaurácie, showroomy či hotely." }
                                    ].map((item, i) => (
                                        <li key={i} className="relative pl-[20px] text-[#666] pb-[6px]">
                                            <span className="absolute left-0 top-0 text-[#DD1B1B] font-bold">•</span>
                                            <strong className="text-[#333] font-semibold">{item.title}</strong><br />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="order-2">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0099.jpg"
                                    alt="Oceľové konštrukcie"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Klienti Section */}
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center mb-[70px]">
                        <div className="order-2 lg:order-1">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0054.jpg"
                                    alt="Klienti oceľové konštrukcie"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-[2.5rem] font-bold text-[#333] mb-[20px] mt-0 uppercase leading-[1.3]">KLIENTI</h3>
                            <p className="text-[#666] mb-[20px]">Spolupracovali sme s viacerými významnými priemyselnými, poľnohospodárskymi aj komerčnými klientmi po celom Slovensku.</p>

                            <h4 className="text-[#b42d20] text-[1.2rem] font-semibold mb-0 mt-0">Priemyselné Spoločnosti</h4>
                            <p className="text-[#666] mt-0 mb-[15px]">Našimi klientmi boli napr. Lunys Poprad, Continental Puchov, Stiebel Eltron Poprad, Agrostav Levice, HTI- Bratislava, MOSS Revuca, GLASSPORT Trnava, ROŠERO Spisska Nova Ves, FCC Zohor atd...</p>

                            <h4 className="text-[#b42d20] text-[1.2rem] font-semibold mb-0 mt-0">Poľnohospodárske družstvá</h4>
                            <p className="text-[#666] mt-0 mb-[15px]">Našimi klientmi boli napr. Roľnícke družstvo Cerovan, Polnospol Nadok Teply Vrch a množstvo ďalších družtevných podnikov na východnom a strednom slovensku.</p>

                            <h4 className="text-[#b42d20] text-[1.2rem] font-semibold mb-0 mt-0">Komerčné podniky</h4>
                            <p className="text-[#666] mt-0 mb-[15px]">Našimi klientmi boli napr. Miraj Resort - Lučenec</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] mt-[20px] p-[20px] bg-[#f8f9fa]  border border-[#e9ecef]">
                                {[
                                    "logo-continental-ag-vector-graphics-continental-automotive-corporation-portable-network-graphics-png-favpng-L9jRUrSkiksNWYiuNDJzb8ZBq.png",
                                    "Stiebel_Eltron_logo.svg.png",
                                    "miraj-logo.png",
                                    "logo-glassport2.png",
                                    "channels4_profile.jpg"
                                ].map((logo, i) => (
                                    <div key={i} className="bg-white p-[15px]  flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-all min-h-[80px]">
                                        <div className="relative w-full h-[60px]">
                                            <Image
                                                src={`/images/gallery/sources/ML Result & Gran - Marketing/section-ocelove-konstrukcie/${logo}`}
                                                alt="Client Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Galéria Section */}
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-1">
                            <h3 className="text-[2.5rem] font-bold text-[#333] mb-[20px] mt-0 uppercase leading-[1.3]">GALÉRIA</h3>
                            <p className="text-[#666] mb-[20px] text-[1rem] leading-[1.6]">Pozrite si naše realizované projekty oceľových konštrukcií, ktoré zahŕňajú priemyselné haly, skladové objekty, mostné konštrukcie a špecializované stavby.</p>
                            <Link
                                href="/galeria?filter=ocelove-konstrukcie"
                                className="inline-block w-[50%] text-center bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[1px] text-[18px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all rounded-none mt-[20px] no-underline"
                            >
                                ZOBRAZIŤ GALÉRIU
                            </Link>
                        </div>
                        <div className="order-2">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0071.jpg"
                                    alt="Galéria oceľové konštrukcie"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nákladná doprava Section */}
            <section
                id="nakladna-doprava"
                ref={(el) => { sectionRefs.current["nakladna-doprava"] = el; }}
                className="py-[80px] bg-[#f8f9fa]"
            >
                <div className="container-main">
                    <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold mb-[30px] text-left text-black">
                        Nákladná doprava
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center mb-[70px]">
                        <div className="order-1">
                            <div className="text-[1rem] leading-[1.6] text-[#666] space-y-[20px]">
                                <p className="font-normal">Naša spoločnosť poskytuje spoľahlivé riešenia v oblasti vnútroštátnej a medzinárodnej nákladnej dopravy. V tejto oblasti pôsobíme dlhodobo a prepravu tovarov zabezpečujeme v rámci Slovenska aj celej Európskej únie.</p>

                                <h4 className="text-[#b42d20] text-[1.2rem] font-semibold mb-0 mt-0">Vlastný vozový park</h4>
                                <p className="text-[#666] mt-0 mb-[15px]">Disponujeme moderným a flexibilným vozovým parkom, ktorý zahŕňa:</p>
                                <ul className="list-none p-0 m-0 mb-[20px] space-y-[5px]">
                                    {["ťahače s plachtovými návesmi", "ťahače s plató", "ťahače plató s klanicami"].map((item, i) => (
                                        <li key={i} className="relative pl-[20px] text-[#666] pb-[6px]">
                                            <span className="absolute left-0 top-0 text-[#DD1B1B] font-bold">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-normal">Vďaka tejto technike vieme efektívne zvládnuť široké spektrum prepravných požiadaviek.</p>

                                <h4 className="text-[#b42d20] text-[1.2rem] font-semibold mb-0 mt-0">Preprava strojov a materiálu</h4>
                                <p className="text-[#666] mt-0 mb-[15px]">Zabezpečujeme aj:</p>
                                <ul className="list-none p-0 m-0 mb-[20px] space-y-[5px]">
                                    {[
                                        "prepravu stavebných strojov do hmotnosti 24 ton (od 1,75 €/km)",
                                        "dopravu stavebného materiálu, kameniva, štrku či piesku"
                                    ].map((item, i) => (
                                        <li key={i} className="relative pl-[20px] text-[#666] pb-[6px]">
                                            <span className="absolute left-0 top-0 text-[#DD1B1B] font-bold">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-normal">Tieto služby poskytujeme rýchlo, bezpečne a za férových podmienok.</p>
                            </div>
                        </div>
                        <div className="order-2">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486572653_1224539822549029_8311539189029123472_n.jpg"
                                    alt="Nákladná doprava"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Klienti Section */}
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center mb-[70px]">
                        <div className="order-2 lg:order-1">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486403762_1224539732549038_3710134092816489228_n.jpg"
                                    alt="Klienti doprava"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-[2.5rem] font-bold text-[#333] mb-[20px] mt-0 uppercase leading-[1.3]">KLIENTI</h3>

                            <ul className="list-disc pl-[20px] m-0 mb-[10px] w-full text-[#666]">
                                {[
                                    "KOVOSTROJ a.s. Dobšiná",
                                    "M & G Spedition Rožňava, s.r.o.",
                                    "HOCHTIEF SK s.r.o.",
                                    "ERTE Logistics, s.r.o.",
                                    "DOPRASTAV, a.s."
                                ].map((client, i) => (
                                    <li key={i} className="mb-1">{client}</li>
                                ))}
                            </ul>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] mt-[20px] p-[20px] bg-white border border-[#e9ecef]">
                                {[
                                    "HOCHTIEF-Logo.jpg",
                                    "dobrostav.png",
                                    "kovostoj_logo_300px.png",
                                    "unnamed.png"
                                ].map((logo, i) => (
                                    <div key={i} className="bg-white p-[15px]  flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-all min-h-[80px]">
                                        <div className="relative w-full h-[60px]">
                                            <Image
                                                src={`/images/gallery/sources/ML Result & Gran - Marketing/section-nakladna-doprava/${logo}`}
                                                alt="Client Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Galéria Section */}
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-1">
                            <h3 className="text-[2.5rem] font-bold text-[#333] mb-[20px] mt-0 uppercase leading-[1.3]">GALÉRIA</h3>
                            <p className="text-[#666] mb-[20px] text-[1rem] leading-[1.6]">Pozrite si náš moderný vozový park a realizované prepravné projekty. Naše vozidlá sú vybavené najmodernejšími technológiami pre bezpečnú a efektívnu prepravu.</p>
                            <Link
                                href="/galeria?filter=nakladna-doprava"
                                className="inline-block w-[50%] text-center bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[1px] text-[18px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all rounded-none mt-[20px] no-underline"
                            >
                                ZOBRAZIŤ GALÉRIU
                            </Link>
                        </div>
                        <div className="order-2">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Nakladna doprava/486353103_1224539729215705_3581393265876727917_n.jpg"
                                    alt="Galéria doprava"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stavebníctvo Section */}
            <section
                id="stavebnictvo"
                ref={(el) => { sectionRefs.current["stavebnictvo"] = el; }}
                className="py-[80px] bg-white"
            >
                <div className="container-main">
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center mb-[70px]">
                        <div className="order-1">
                            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold mb-[30px] text-left text-black">
                                Stavebníctvo
                            </h2>
                            <div className="text-[1rem] leading-[1.6] text-[#666] space-y-[20px]">
                                <p className="font-normal">V spoločnosti ML Result sme rozšírili naše portfólio o komplexné stavebné práce a inžinierske činnosti v oblasti výstavby infraštruktúry.</p>
                                <p className="font-normal">Aby sme vedeli tieto služby efektívne zastrešiť a ďaler rozvíjať, založili sme materskú spoločnosť s názvom Gran, ktorá sa špecializuje na poskytovanie subdodávateľských riešení v rámci stavebných projektov po celom Slovensku.</p>

                                <h4 className="text-[#b42d20] text-[1.2rem] font-semibold mb-0 mt-0">Zameriavame sa najmä na:</h4>
                                <ul className="list-none p-0 m-0 mb-[20px] space-y-[5px]">
                                    {[
                                        "výstavbu ciest, obchvatov a diaľničných úsekov",
                                        "realizáciu cestných komunikácií a mostných konštrukcií"
                                    ].map((item, i) => (
                                        <li key={i} className="relative pl-[20px] text-[#666] pb-[6px]">
                                            <span className="absolute left-0 top-0 text-[#DD1B1B] font-bold">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-normal">Naše skúsenosti, technické zázemie a dôraz na spoľahlivosť nám pomohli vybudovať si dôveru silných partnerov v rámci slovenského stavebného trhu.</p>
                            </div>
                        </div>
                        <div className="order-2">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0067.jpg"
                                    alt="Stavebníctvo"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Klienti Section */}
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center mb-[70px]">
                        <div className="order-2 lg:order-1">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0058.jpg"
                                    alt="Klienti stavebníctvo"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-[2.5rem] font-bold text-[#333] mb-[20px] mt-0 uppercase leading-[1.3]">KLIENTI</h3>
                            <p className="text-[#666] mb-[20px]">Všetky projekty realizujeme ako subdodávateľ pre najvýznamnejšie stavebné spoločnosti na Slovensku. Medzi našich spokojných partnerov patria renomované firmy ako Doprastav, Strabag, Eurovia, Hochtief a Váhostav, pre ktoré sme úspešne zrealizovali – a naďalej realizujeme – množstvo technicky náročných stavebných projektov po celom území Slovenska.</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px] mt-[20px] p-[20px] bg-[#f8f9fa]  border border-[#e9ecef]">
                                {[
                                    "vahostav.jpg",
                                    "Strabag.svg.png",
                                    "HOCHTIEF-Logo.jpg",
                                    "EUROVIA_Logo.png",
                                    "dobrostav.png"
                                ].map((logo, i) => (
                                    <div key={i} className="bg-white p-[15px]  flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-all min-h-[80px]">
                                        <div className="relative w-full h-[60px]">
                                            <Image
                                                src={`/images/gallery/sources/ML Result & Gran - Marketing/section-stavebnictvo/${logo}`}
                                                alt="Client Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Galéria Section */}
                    <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[120px] items-center">
                        <div className="order-1">
                            <h3 className="text-[2.5rem] font-bold text-[#333] mb-[20px] mt-0 uppercase leading-[1.3]">GALÉRIA</h3>
                            <p className="text-[#666] mb-[20px] text-[1rem] leading-[1.6]">Pozrite si naše realizované projekty v oblasti stavebníctva, ktoré zahŕňajú diaľničné stavby, mostné konštrukcie, inžinierske stavby a infraštruktúrne projekty.</p>
                            <Link
                                href="/galeria?filter=stavebnictvo"
                                className="inline-block w-[50%] text-center bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[1px] text-[18px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all rounded-none mt-[20px] no-underline"
                            >
                                ZOBRAZIŤ GALÉRIU
                            </Link>
                        </div>
                        <div className="order-2">
                            <div className="w-full h-[46vh] lg:h-[55vh] relative shadow-[0_15px_35px_rgba(0,0,0,0.3)] overflow-hidden">
                                <Image
                                    src="/images/gallery/sources/ML Result & Gran - Marketing/Stavebnictvo/IMG-20250709-WA0094.jpg"
                                    alt="Galéria stavebníctvo"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prenájom stavebnej techniky Section */}
            <section
                id="prenajom-techniky"
                ref={(el) => { sectionRefs.current["prenajom-techniky"] = el; }}
                className="py-[80px] bg-[#f8f9fa]"
            >
                <div className="container-main">
                    <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold mb-[30px] text-left text-black">
                        Prenájom stavebnej techniky
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[40px]">
                        {equipment.map((item, index) => (
                            <div
                                key={index}
                                className={`bg-white overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 border border-black/5 hover:-translate-y-[5px] hover:shadow-[0_12px_35px_rgba(0,0,0,0.15)] group ${index === 3 ? "lg:col-start-1 lg:row-start-2" : ""}`}
                            >
                                <div className="h-[200px] relative overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-[25px]">
                                    <h3 className="text-[1rem] font-semibold text-[#333] mb-[15px] border-b-[2px] border-[#b42d20] pb-[8px]">
                                        {item.name}
                                    </h3>
                                    <ul className="list-none p-0 m-0">
                                        {item.details.map((detail, idx) => (
                                            <li key={idx} className="py-[8px] text-[#666] text-[0.95rem] leading-[1.4] border-b border-black/5 last:border-0 flex items-center">
                                                {detail.value ? (
                                                    <>
                                                        {detail.label}: <strong className="text-[#b42d20] font-semibold ml-[25px] relative pl-[20px] before:content-['▶'] before:absolute before:left-0 before:text-[0.8em] before:text-[#b42d20]">{detail.value}</strong>
                                                    </>
                                                ) : (
                                                    detail.label
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
