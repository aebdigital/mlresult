import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-30 bg-black text-white pt-[60px] pb-[20px]">
      {/* CTA Section */}
      <div className="container-main flex flex-col md:flex-row justify-between items-start md:items-center mb-[60px] gap-[40px]">
        <div className="flex-1">
          <h2 className="text-[1.8rem] md:text-[3rem] font-bold mb-[20px] text-white">Porozprávajme sa!</h2>
          <p className="text-[1.1rem] text-[#ccc] leading-[1.4]">
            Pripravení urobiť prvý krok k realizácii vášho vysnívaného projektu?
            <br />
            Kontaktujte nás ešte dnes a spoločne zmeníme vašu víziu na realitu.
          </p>
        </div>
        <Link
          href="/kontakt"
          className="bg-[#b42d20] text-white px-[30px] py-[15px] font-semibold uppercase tracking-[1px] hover:bg-[#a02316] hover:-translate-y-[2px] transition-all flex-shrink-0"
        >
          KONTAKTUJTE NÁS
        </Link>
      </div>

      {/* Divider */}
      <div className="container-main">
        <div className="w-full h-px bg-[#333] mb-[60px]"></div>
      </div>

      {/* Footer Content */}
      <div className="container-main grid grid-cols-1 md:grid-cols-[1fr_1fr_2.5fr] gap-[40px] mb-[40px]">
        {/* ML Result Info */}
        <div className="min-w-0">
          <h3 className="text-[1.5rem] font-semibold mb-[20px] text-white">ML RESULT s. r. o.</h3>
          <div className="text-[#ccc]">
            <h4 className="text-[1.2rem] font-semibold text-white mb-[15px]">Kancelária:</h4>
            <p className="mb-[10px] leading-[1.4]">Niže Mesta 12072, 049 25 Dobšiná</p>
            <div className="flex mb-[10px] flex-wrap sm:flex-nowrap">
              <span className="min-w-[70px] flex-shrink-0">E-mail:</span>
              <div className="flex flex-col">
                <a href="mailto:doprava@mlresult.sk" className="text-[#DD1B1B] hover:underline transition-colors">
                  doprava@mlresult.sk
                </a>
                <a href="mailto:obchod@mlresult.sk" className="text-[#DD1B1B] hover:underline transition-colors">
                  obchod@mlresult.sk
                </a>
              </div>
            </div>
            <p className="leading-[1.4]">
              Telefón:{" "}
              <a href="tel:+421908527419" className="text-[#DD1B1B] hover:underline transition-colors">
                +421 908 527 419
              </a>
            </p>
          </div>
        </div>

        {/* Gran Info */}
        <div className="min-w-0">
          <h3 className="text-[1.5rem] font-semibold mb-[20px] text-white">GRAN s. r. o.</h3>
          <div className="text-[#ccc]">
            <h4 className="text-[1.2rem] font-semibold text-white mb-[15px]">Kancelária:</h4>
            <p className="mb-[10px] leading-[1.4]">SNP 246, 049 24 Vlachovo</p>
            <div className="flex mb-[10px] flex-wrap sm:flex-nowrap">
              <span className="min-w-[70px] flex-shrink-0">E-mail:</span>
              <a href="mailto:info@gran-stav.sk" className="text-[#DD1B1B] hover:underline transition-colors">
                info@gran-stav.sk
              </a>
            </div>
            <p className="leading-[1.4]">
              Telefón:{" "}
              <a href="tel:+421907456963" className="text-[#DD1B1B] hover:underline transition-colors">
                +421 907 456 963
              </a>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-[20px] w-full">
          <div className="flex-1">
            <h4 className="text-[1.2rem] font-semibold mb-[15px] text-white">SLUŽBY</h4>
            <ul className="list-none p-0">
              <li className="mb-[10px]">
                <Link href="/sluzby#ocelove-konstrukcie" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Oceľové konštrukcie
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/sluzby#nakladna-doprava" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Nákladná doprava
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/sluzby#stavebnictvo" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Stavebníctvo
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/sluzby#prenajom-techniky" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Prenájom stavebnej techniky
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="text-[1.2rem] font-semibold mb-[15px] text-white">SPOLOČNOSŤ</h4>
            <ul className="list-none p-0">
              <li className="mb-[10px]">
                <Link href="/o-nas" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  O nás
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/sluzby" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Služby
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/galeria" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Naše práce
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/kontakt" className="text-[#ccc] hover:text-white transition-colors no-underline">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="text-[1.2rem] font-semibold mb-[15px] text-white">DÔLEŽITÉ</h4>
            <ul className="list-none p-0">
              <li className="mb-[10px]">
                <Link
                  href="/ochrana-osobnych-udajov"
                  className="text-[#ccc] hover:text-white transition-colors no-underline"
                >
                  Ochrana osobných údajov
                </Link>
              </li>
              <li className="mb-[10px]">
                <a
                  href="/assets/cennik-areal-Dobsina-ML-RESULT.pdf"
                  target="_blank"
                  className="text-[#ccc] hover:text-white transition-colors no-underline"
                >
                  Cenník areálu
                </a>
              </li>
              <li className="mb-[10px]">
                <a
                  href="/assets/ml-result-prepravny-poriadku.pdf"
                  target="_blank"
                  className="text-[#ccc] hover:text-white transition-colors no-underline"
                >
                  Prepravný poriadok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container-main pt-[20px] border-t border-[#333] flex flex-col md:flex-row justify-between items-start md:items-center gap-[20px]">
        <a
          href="https://aebdigital.sk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ccc] underline hover:text-white transition-colors"
        >
          Tvorba stránky - AEB Digital
        </a>
        <p className="text-[#999] text-[0.9rem] m-0">
          &copy; 2025 ML RESULT s.r.o. Všetky práva vyhradené.
        </p>
      </div>
    </footer>
  );
}
