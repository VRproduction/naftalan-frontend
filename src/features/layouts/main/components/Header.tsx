import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useUIStore } from '@/store/useUIStore';

const Header = () => {
  const { isMenuOpen, toggleMenu, setMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

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

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };
  
  return (
    <header className={`fixed top-0 w-full z-[50] transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 shadow-md py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500" onClick={() => setMenuOpen(false)}>
          Naftalan
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="group relative">
            <button className="py-2 flex items-center gap-1 hover:text-blue-500 transition-colors font-medium">
              Haqqımızda
              <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute left-0 top-full mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <Link href="/about" className="block px-4 py-3 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500">
                Naftalan
              </Link>
              <Link href="/about/history" className="block px-4 py-3 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500">
                Naftalan neftinin tarixi
              </Link>
              <Link href="/about/treatments" className="block px-4 py-3 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500">
                Müalicə olunan xəstəliklər
              </Link>
            </div>
          </div>
          
          <div className="group relative">
            <button className="py-2 flex items-center gap-1 hover:text-blue-500 transition-colors font-medium">
              Sanatoriyalar
              <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute left-0 top-full mt-1 w-64 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <Link href="/sanatoriums/naftalan" className="block px-4 py-3 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500">
                Naftalan sanatoriyaları
              </Link>
              <Link href="/sanatoriums/other" className="block px-4 py-3 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500">
                Digər şəhərlərdəki sanatoriyalar
              </Link>
            </div>
          </div>
          
          <Link href="/how-to-come" className="py-2 font-medium hover:text-blue-500 transition-colors">
            Necə gəlmək?
          </Link>
          
          <Link href="/reservation" className="py-2 font-medium hover:text-blue-500 transition-colors">
            Rezervasiya
          </Link>
          
          <Link href="/blog" className="py-2 font-medium hover:text-blue-500 transition-colors">
            Bloq
          </Link>
          
          <Link href="/contact" className="py-2 font-medium hover:text-blue-500 transition-colors">
            Əlaqə
          </Link>
          
          <Link 
            href="/ask-doctor" 
            className="py-2.5 px-5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Həkimə sual verin
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-xl p-2 z-[1000] relative"
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
      
      {/* Mobile Menu - Slides from right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-[900]"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white shadow-2xl z-[999] overflow-y-auto"
            >
              <div className="flex flex-col p-6">
                <div className="flex justify-between items-center mb-8 pb-4 border-b">
                  <Link 
                    href="/" 
                    className="text-2xl font-bold text-blue-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    Naftalan
                  </Link>
                </div>
                
                {/* Menu Items */}
                <div className="flex flex-col space-y-1">
                  {/* Haqqımızda dropdown */}
                  <div className="py-2">
                    <button 
                      className={`w-full flex justify-between items-center py-2 px-3 rounded-lg font-medium ${activeSubmenu === 'about' ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-50'}`}
                      onClick={() => toggleSubmenu('about')}
                    >
                      <span>Haqqımızda</span>
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
                          <div className="pl-3 py-2 ml-2 border-l-2 border-blue-100 flex flex-col space-y-1 mt-1">
                            <Link 
                              href="/about/naftalan" 
                              className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg flex items-center transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              Naftalan
                            </Link>
                            <Link 
                              href="/about/history" 
                              className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg flex items-center transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              Naftalan neftinin tarixi
                            </Link>
                            <Link 
                              href="/about/treatments" 
                              className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg flex items-center transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              Müalicə olunan xəstəliklər
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Sanatoriyalar dropdown */}
                  <div className="py-2">
                    <button 
                      className={`w-full flex justify-between items-center py-2 px-3 rounded-lg font-medium ${activeSubmenu === 'sanatoriums' ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-50'}`}
                      onClick={() => toggleSubmenu('sanatoriums')}
                    >
                      <span>Sanatoriyalar</span>
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
                          <div className="pl-3 py-2 ml-2 border-l-2 border-blue-100 flex flex-col space-y-1 mt-1">
                            <Link 
                              href="/sanatoriums/naftalan" 
                              className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg flex items-center transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              Naftalan sanatoriyaları
                            </Link>
                            <Link 
                              href="/sanatoriums/other" 
                              className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg flex items-center transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              <FaChevronRight className="mr-2 text-xs text-blue-400" />
                              Digər şəhərlərdəki sanatoriyalar
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Regular links */}
                  <Link 
                    href="/how-to-come" 
                    className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg font-medium transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Necə gəlmək?
                  </Link>
                  
                  <Link 
                    href="/reservation" 
                    className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg font-medium transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Rezervasiya
                  </Link>
                  
                  <Link 
                    href="/blog" 
                    className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg font-medium transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Bloq
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg font-medium transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Əlaqə
                  </Link>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <Link 
                    href="/ask-doctor" 
                    className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg text-center font-medium hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Həkimə sual verin
                  </Link>
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