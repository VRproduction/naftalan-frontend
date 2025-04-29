import { Link } from '@/i18n/navigation';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaWhatsapp, FaTelegram, FaTiktok, FaPinterest } from 'react-icons/fa';
import { SiteSettings } from '@/lib/types/core.type';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface FooterProps {
  siteSettings: SiteSettings;
}

const Footer = ({ siteSettings }: FooterProps) => {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image 
                src={siteSettings.footer_logo || siteSettings.logo || '/logo.png'} 
                alt={siteSettings.site_name} 
                width={150} 
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mb-6 text-gray-400">{siteSettings.about_short || t('about_short_default')}</p>
            {siteSettings.show_social_in_footer && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-300">{t('follow_us')}</h4>
                <div className="flex space-x-4">
                  {siteSettings.social_facebook && (
                    <a 
                      href={siteSettings.social_facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    >
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {siteSettings.social_instagram && (
                    <a 
                      href={siteSettings.social_instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                  {siteSettings.social_twitter && (
                    <a 
                      href={siteSettings.social_twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {siteSettings.social_youtube && (
                    <a 
                      href={siteSettings.social_youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    >
                      <FaYoutube size={20} />
                    </a>
                  )}
                  {siteSettings.social_linkedin && (
                    <a 
                      href={siteSettings.social_linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                 
                  {siteSettings.social_tiktok && (
                    <a 
                      href={siteSettings.social_tiktok} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-black transition-colors"
                    >
                      <FaTiktok size={20} />
                    </a>
                  )}
                  {siteSettings.social_pinterest && (
                    <a 
                      href={siteSettings.social_pinterest} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="min-w-10 min-h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                    >
                      <FaPinterest size={20} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('useful_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about/naftalan" className="hover:text-blue-400 transition-colors">
                  {t('about_naftalan')}
                </Link>
              </li>
              <li>
                <Link href="/sanatoriums/naftalan" className="hover:text-blue-400 transition-colors">
                  {t('naftalan_sanatoriums')}
                </Link>
              </li>
              <li>
                <Link href="/how-to-come" className="hover:text-blue-400 transition-colors">
                  {t('how_to_come')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('treatment_types')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/treatments/naftalan-oil" className="hover:text-blue-400 transition-colors">
                  {t('naftalan_oil_baths')}
                </Link>
              </li>
              <li>
                <Link href="/treatments/paraffin" className="hover:text-blue-400 transition-colors">
                  {t('paraffin_treatment')}
                </Link>
              </li>
              <li>
                <Link href="/treatments/massage" className="hover:text-blue-400 transition-colors">
                  {t('massage')}
                </Link>
              </li>
              <li>
                <Link href="/treatments/physiotherapy" className="hover:text-blue-400 transition-colors">
                  {t('physiotherapy')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{siteSettings.address || t('default_address')}</span>
              </li>
              {
                siteSettings.contact_phones.map((phone, index) => (
                  <li key={index} className="flex items-center">
                    <FaPhoneAlt className="mr-2" />
                    <a href={`tel:${phone.phone}`} className="hover:text-blue-400 transition-colors">
                      {phone.phone}
                    </a>
                  </li>
                ))
              }
              {
                siteSettings.contact_emails.map((email, index) => (
                  <li key={index} className="flex items-center">
                    <FaEnvelope className="mr-2" />
                    <a href={`mailto:${email.email}`} className="hover:text-blue-400 transition-colors">
                      {email.email}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            {t('copyright')} {new Date().getFullYear()}
            {
              siteSettings.copyright_link && 
              <Link href={siteSettings.copyright_link} className="hover:text-blue-400 transition-colors ml-1">
                {siteSettings.company_name || siteSettings.site_name}
              </Link>
            }
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 