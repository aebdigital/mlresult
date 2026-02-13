"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isSubPage = pathname !== "/";
      const triggerPoint = isSubPage ? window.innerHeight * 0.05 : 100;
      setIsScrolled(window.scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const navLinks = [
    { href: "/", label: "Domov" },
    { href: "/sluzby", label: "Služby" },
    { href: "/o-nas", label: "O nás" },
    { href: "/galeria", label: "Galéria" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "mobile-open" : ""
        }`}
    >
      <div className="container-main py-4 flex justify-between items-center">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/images/logos/whole.png"
            alt="ML Result & Gran"
            width={160}
            height={64}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`no-underline font-medium text-base uppercase tracking-wide py-3 px-6 rounded transition-all relative group ${isActive(link.href)
                  ? "text-white after:content-[''] after:absolute after:bottom-1 after:left-6 after:right-6 after:h-[2px] after:bg-[#DD1B1B] after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                  : "text-white after:content-[''] after:absolute after:bottom-1 after:left-6 after:right-6 after:h-[2px] after:bg-[#DD1B1B] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                  } ${!isScrolled && !isMobileMenuOpen
                    ? "[text-shadow:0_2px_4px_rgba(0,0,0,0.3)]"
                    : ""
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu */}
        <button
          className={`hamburger md:hidden flex flex-col cursor-pointer gap-1.5 ${isMobileMenuOpen ? "active" : ""
            }`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="w-8 h-0.5 bg-white transition-transform"></span>
          <span className="w-6 h-0.5 bg-white transition-opacity ml-auto"></span>
          <span className="w-8 h-0.5 bg-white transition-transform"></span>
        </button>

        {/* Mobile Navigation */}
        <ul
          className={`nav-menu md:hidden fixed top-[88px] w-full h-[calc(100vh-88px)] bg-white/95 backdrop-blur-lg flex-col items-start pt-12 ${isMobileMenuOpen ? "!left-0" : ""
            }`}
        >
          {navLinks.map((link) => (
            <li key={link.href} className="w-full border-b border-black/10">
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                className={`block w-full py-4 px-8 text-[2rem] font-semibold uppercase font-inter ${isActive(link.href)
                  ? "text-[#b42d20]"
                  : "text-black hover:text-[#DD1B1B]"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
