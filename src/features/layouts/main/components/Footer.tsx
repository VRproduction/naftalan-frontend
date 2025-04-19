import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Naftalan</h3>
            <p className="mb-4">Naftalan şəhəri müalicəvi neft ilə tanınan, qədim tarixi olan bir sağlamlıq mərkəzidir.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-pink-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-red-500 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Faydalı linklər</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about/naftalan" className="hover:text-blue-400 transition-colors">
                  Naftalan haqqında
                </Link>
              </li>
              <li>
                <Link href="/sanatoriums/naftalan" className="hover:text-blue-400 transition-colors">
                  Naftalan sanatoriyaları
                </Link>
              </li>
              <li>
                <Link href="/how-to-come" className="hover:text-blue-400 transition-colors">
                  Necə gəlmək?
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Bloq
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Müalicə növləri</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/treatments/naftalan-oil" className="hover:text-blue-400 transition-colors">
                  Naftalan nefti vannaları
                </Link>
              </li>
              <li>
                <Link href="/treatments/paraffin" className="hover:text-blue-400 transition-colors">
                  Parafin müalicəsi
                </Link>
              </li>
              <li>
                <Link href="/treatments/massage" className="hover:text-blue-400 transition-colors">
                  Massaj
                </Link>
              </li>
              <li>
                <Link href="/treatments/physiotherapy" className="hover:text-blue-400 transition-colors">
                  Fizioterapiya
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Əlaqə</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>Naftalan şəhəri, Azərbaycan</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <a href="tel:+994123456789" className="hover:text-blue-400 transition-colors">
                  +994 12 345 67 89
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:info@naftalan.az" className="hover:text-blue-400 transition-colors">
                  info@naftalan.az
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Naftalan. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 