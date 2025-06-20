'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaGlobe } from 'react-icons/fa';
import { useUIStore } from '@/lib/store/useUIStore';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, Link as IntlLink, usePathname } from '@/i18n/navigation';
import { SupportedLocale } from '@/lib/utils/apiClient';
import CurrencySelector from '@/components/common/CurrencySelector';
import { SiteSettings } from '@/lib/types/core.type';
import Image from 'next/image';

interface HeaderProps {
  siteSettings: SiteSettings;
}

const Header = ({ siteSettings }: HeaderProps) => {
  const { isMenuOpen, toggleMenu, setMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();

  const locale = useLocale() as SupportedLocale;
  const router = useRouter();
  const t = useTranslations('header');
  const tLang = useTranslations('languages');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isLangMenuOpen && !(e.target as Element).closest('.lang-menu-container')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isLangMenuOpen]);

  // Update active submenu based on pathname
  useEffect(() => {
    if (pathname.startsWith('/sanatoriums')) {
      setActiveSubmenu('sanatoriums');
    } else if (pathname.startsWith('/about')) {
      setActiveSubmenu('about');
    } else if (pathname.startsWith('/help') || pathname.startsWith('/how-to-come') || pathname.startsWith('/ask-doctor') || pathname.startsWith('/contact')) {
      setActiveSubmenu('help');
    } else {
      setActiveSubmenu(null);
    }
  }, [pathname]);

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const changeLanguage = (lang: SupportedLocale) => {
    if (lang === locale) return;
    
    setIsLangMenuOpen(false);
    const params = new URLSearchParams(window.location.search);
    const searchParams = params.toString();
    const newPath = searchParams ? `${pathname}?${searchParams}` : pathname;
    router.push(newPath, { locale: lang, scroll: false });
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.endsWith(path);
  };

  const renderDesktopMenu = () => (
    <nav className="hidden md:flex items-center space-x-2 lg:space-x-2">
      <IntlLink 
        href="/" 
        className={`py-2 px-2.5 font-medium transition-colors ${
          isActive('/') ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
        }`}
      >
        {t('home')}
      </IntlLink>

      {/* Sanatoriums Dropdown */}
      <div className="group relative">
        <button 
          className={`py-2 px-2.5 flex items-center gap-1.5 transition-colors font-medium ${
            isActive('/sanatoriums') ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
          }`}
        >
          <span>{t('sanatoriums')}</span>
          <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="absolute left-0 top-full mt-1 w-64 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border border-gray-100">
          <IntlLink 
            href="/sanatoriums/naftalan" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/sanatoriums/naftalan') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('naftalan_sanatoriums')}
          </IntlLink>
          <IntlLink 
            href="/sanatoriums/other" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/sanatoriums/other') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('other_sanatoriums')}
          </IntlLink>
        </div>
      </div>

      {/* Packages */}
      <IntlLink 
        href="/packages" 
        className={`py-2 px-2.5 font-medium transition-colors ${
          isActive('/packages') ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
        }`}
      >
        {t('packages')}
      </IntlLink>

      {/* About Dropdown */}
      <div className="group relative">
        <button 
          className={`py-2 px-2.5 flex items-center gap-1.5 transition-colors font-medium ${
            isActive('/about') ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
          }`}
        >
          <span>{t('about')}</span>
          <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="absolute left-0 top-full mt-1 w-64 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border border-gray-100">
          <IntlLink 
            href="/about" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/about') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('about_naftalan')}
          </IntlLink>
          <IntlLink 
            href="/about/history" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/about/history') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('naftalan_history')}
          </IntlLink>
          <IntlLink 
            href="/about/indications" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/about/indications') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('indications')}
          </IntlLink>
          <IntlLink 
            href="/about/contraindications" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/about/contraindications') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('contraindications')}
          </IntlLink>
        </div>
      </div>

      {/* Blog */}
      <IntlLink 
        href="/blog" 
        className={`py-2 px-2.5 font-medium transition-colors ${
          isActive('/blog') ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
        }`}
      >
        {t('blog')}
      </IntlLink>

      {/* Help Dropdown */}
      <div className="group relative">
        <button 
          className={`py-2 px-2.5 flex items-center gap-1.5 transition-colors font-medium ${
            isActive('/help') ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
          }`}
        >
          <span>{t('help')}</span>
          <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="absolute left-0 top-full mt-1 w-64 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border border-gray-100">
          <IntlLink 
            href="/how-to-come" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/how-to-come') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('how_to_come')}
          </IntlLink>
          <IntlLink 
            href="/ask-doctor" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/ask-doctor') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('ask_doctor')}
          </IntlLink>
          <IntlLink 
            href="/contact" 
            className={`block px-4 py-2.5 transition-colors border-l-2 ${
              isActive('/contact') 
                ? 'bg-blue-50 text-blue-600 border-blue-500' 
                : 'border-transparent hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            {t('contact')}
          </IntlLink>
        </div>
      </div>

      <div className="h-5 w-px bg-gray-200 mx-1"></div>

      {/* Language Switcher */}
      <div className="relative lang-menu-container">
        <button 
          className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsLangMenuOpen(!isLangMenuOpen);
          }}
        >
          <FaGlobe className="text-blue-500" />
          <span className="uppercase font-medium">{locale}</span>
          <FaChevronDown className={`text-xs transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isLangMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-1 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden z-50 border border-gray-100 w-40"
            >
              <button 
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center ${locale === 'az' ? 'bg-blue-50 text-blue-500' : ''}`}
                onClick={() => changeLanguage('az')}
              >
                <span className="w-6 text-center mr-2 uppercase font-bold">Az</span>
                <span>{tLang('az')}</span>
              </button>
            
              <button 
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center ${locale === 'ru' ? 'bg-blue-50 text-blue-500' : ''}`}
                onClick={() => changeLanguage('ru')}
              >
                <span className="w-6 text-center mr-2 uppercase font-bold">Ru</span>
                <span>{tLang('ru')}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Currency Selector */}
      <CurrencySelector />

      {/* Reservation Button */}
      <IntlLink 
        href="/reservation" 
        className={`py-2 px-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-sm font-medium ${
          isActive('/reservation') 
            ? 'bg-blue-600 text-white' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {t('reservation')}
      </IntlLink>
    </nav>
  );

  const renderMobileMenu = () => (
    <div className="md:hidden flex items-center gap-3">
      <button 
        className="text-lg p-1.5 z-[999] relative bg-gray-100 rounded-lg active:scale-95 transition-all"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-gray-800"
            >
              <FaTimes />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <FaBars />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );

  return (
    <header className={`fixed top-0 w-full z-[50] flex items-center h-[65px] transition-all duration-300 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-md border-b border-gray-100 shadow-md ${
      scrolled ? 'py-2' : 'py-2.5'
    }`}>
      <div className="container mx-auto px-3 md:px-4 flex justify-between items-center">
        <IntlLink 
          href="/" 
          onClick={() => setMenuOpen(false)}
        >
          <Image className='h-12 w-auto hidden md:block' src={siteSettings.logo || '/logo.png'} alt="Naftalan" width={100} height={100} />
          <Image className='h-10 w-auto block md:hidden' src={siteSettings.mobile_app_icon || '/logo.png'} alt="Naftalan" width={100} height={100} />
        </IntlLink>

        {renderDesktopMenu()}
        {renderMobileMenu()}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[900]"
              onClick={() => setMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-[999] overflow-y-auto"
            >
              <div className="flex flex-col p-4">
                <div className="flex justify-between items-center mb-6 pb-3 border-b">
                  <IntlLink 
                    href="/" 
                    className="text-xl font-bold text-blue-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Image className='h-12 w-auto hidden md:block' src={siteSettings.logo || '/logo.png'} alt="Naftalan" width={100} height={100} />
                    <Image className='h-10 w-auto block md:hidden' src={siteSettings.mobile_app_icon || '/logo.png'} alt="Naftalan" width={100} height={100} />
                  </IntlLink>

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center justify-center gap-2 text-sm mb-5">
                  <button 
                    className={`flex-1 py-2 rounded-md transition-colors ${locale === 'az' ? 'bg-blue-100 text-blue-600 font-medium' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => changeLanguage('az')}
                  >
                    Azərbaycan
                  </button>
                
                  <button 
                    className={`flex-1 py-2 rounded-md transition-colors ${locale === 'ru' ? 'bg-blue-100 text-blue-600 font-medium' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => changeLanguage('ru')}
                  >
                    Русский
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col space-y-1">
                  <IntlLink 
                    href="/" 
                    className={`py-2.5 px-3 rounded-lg font-medium transition-colors ${
                      isActive('/') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('home')}
                  </IntlLink>

                  {/* Sanatoriums */}
                  <div className="py-1">
                    <button 
                      className={`w-full flex justify-between items-center py-2.5 px-3 rounded-lg font-medium ${
                        isActive('/sanatoriums') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSubmenu('sanatoriums')}
                    >
                      <span>{t('sanatoriums')}</span>
                      <FaChevronDown className={`transform transition-transform duration-300 ${activeSubmenu === 'sanatoriums' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeSubmenu === 'sanatoriums' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 py-1 ml-2 border-l-2 border-blue-100 flex flex-col space-y-0.5 mt-1">
                            <IntlLink 
                              href="/sanatoriums/naftalan" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/sanatoriums/naftalan') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('naftalan_sanatoriums')}
                            </IntlLink>
                            <IntlLink 
                              href="/sanatoriums/other" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/sanatoriums/other') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('other_sanatoriums')}
                            </IntlLink>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Packages */}
                  <IntlLink 
                    href="/packages" 
                    className={`py-2.5 px-3 rounded-lg font-medium transition-colors ${
                      isActive('/packages') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('packages')}
                  </IntlLink>

                  {/* About */}
                  <div className="py-1">
                    <button 
                      className={`w-full flex justify-between items-center py-2.5 px-3 rounded-lg font-medium ${
                        isActive('/about') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSubmenu('about')}
                    >
                      <span>{t('about')}</span>
                      <FaChevronDown className={`transform transition-transform duration-300 ${activeSubmenu === 'about' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeSubmenu === 'about' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 py-1 ml-2 border-l-2 border-blue-100 flex flex-col space-y-0.5 mt-1">
                            <IntlLink 
                              href="/about" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/about') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('about_naftalan')}
                            </IntlLink>
                            <IntlLink 
                              href="/about/history" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/about/history') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('naftalan_history')}
                            </IntlLink>
                            <IntlLink 
                              href="/about/treatments" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/about/treatments') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('treated_conditions')}
                            </IntlLink>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Blog */}
                  <IntlLink 
                    href="/blog" 
                    className={`py-2.5 px-3 rounded-lg font-medium transition-colors ${
                      isActive('/blog') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('blog')}
                  </IntlLink>

                  {/* Help */}
                  <div className="py-1">
                    <button 
                      className={`w-full flex justify-between items-center py-2.5 px-3 rounded-lg font-medium ${
                        isActive('/help') ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSubmenu('help')}
                    >
                      <span>{t('help')}</span>
                      <FaChevronDown className={`transform transition-transform duration-300 ${activeSubmenu === 'help' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeSubmenu === 'help' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 py-1 ml-2 border-l-2 border-blue-100 flex flex-col space-y-0.5 mt-1">
                            <IntlLink 
                              href="/how-to-come" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/how-to-come') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('how_to_come')}
                            </IntlLink>
                            <IntlLink 
                              href="/ask-doctor" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/ask-doctor') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('ask_doctor')}
                            </IntlLink>
                            <IntlLink 
                              href="/contact" 
                              className={`py-2 px-3 rounded-lg flex items-center transition-colors ${
                                isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              {t('contact')}
                            </IntlLink>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Currency Selector */}
                <CurrencySelector />

                {/* Reservation Button */}
                <div className="mt-4 pt-4 border-t">
                  <IntlLink 
                    href="/reservation" 
                    className={`w-full py-2.5 px-3 rounded-lg text-center font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center ${
                      isActive('/reservation') 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('reservation')}
                  </IntlLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 