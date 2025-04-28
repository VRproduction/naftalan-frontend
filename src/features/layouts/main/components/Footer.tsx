import { Link } from '@/i18n/navigation';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiteSettings } from '@/lib/types/core.type';
import { useTranslations } from 'next-intl';

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
            <h3 className="text-xl font-bold mb-4">{siteSettings.site_name}</h3>
            <p className="mb-4">{siteSettings.about_short || t('about_short_default')}</p>
            {siteSettings.show_social_in_footer && (
              <div className="flex space-x-4">
                {siteSettings.social_facebook && (
                  <a href={siteSettings.social_facebook} className="text-white hover:text-blue-400 transition-colors">
                    <FaFacebook size={20} />
                  </a>
                )}
                {siteSettings.social_instagram && (
                  <a href={siteSettings.social_instagram} className="text-white hover:text-pink-400 transition-colors">
                    <FaInstagram size={20} />
                  </a>
                )}
                {siteSettings.social_twitter && (
                  <a href={siteSettings.social_twitter} className="text-white hover:text-blue-400 transition-colors">
                    <FaTwitter size={20} />
                  </a>
                )}
                {siteSettings.social_youtube && (
                  <a href={siteSettings.social_youtube} className="text-white hover:text-red-500 transition-colors">
                    <FaYoutube size={20} />
                  </a>
                )}
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
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <a href={`tel:${siteSettings.contact_phone}`} className="hover:text-blue-400 transition-colors">
                  {siteSettings.contact_phone}
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href={`mailto:${siteSettings.contact_email}`} className="hover:text-blue-400 transition-colors">
                  {siteSettings.contact_email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{siteSettings.copyright_text || t('copyright', {year: new Date().getFullYear(), name: siteSettings.company_name || siteSettings.site_name})}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 