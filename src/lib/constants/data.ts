import { Sanatorium, Treatment, Package, Testimonial, FAQ, BlogPost, Location } from '../types';

// Locations for search form
export const LOCATIONS: Location[] = [
  { id: 'naftalan', name: 'Naftalan' },
  { id: 'baku', name: 'Bakı' },
  { id: 'ganja', name: 'Gəncə' },
  { id: 'gabala', name: 'Qəbələ' }
];

// Hero slider data
export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    title: 'Naftalan Müalicəvi Nefti',
    description: 'Naftalan nefti ilə müalicə olunaraq sağlamlığınıza qovuşun'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8',
    title: 'Naftalan Sanatoriyaları',
    description: 'Ən müasir sanatoriyalarda rahat və sağlam istirahət'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    title: 'Müalicəvi Prosedurlar',
    description: 'Peşəkar həkimlərin nəzarəti altında müalicə və sağlamlıq'
  }
];

// Sanatoriums sample data
export const SANATORIUMS: Sanatorium[] = [
  {
    id: '1',
    name: 'Qaşaltı Sanatoriyası',
    location: 'Naftalan',
    description: 'Qaşaltı Sanatoriyası Naftalanda yerləşən, təbii naftalan nefti ilə müalicə xidmətləri təklif edən bir sağlamlıq mərkəzidir. 2013-cü ildə tamamilə yenidən təmir edilmiş bu sanatoriya, müasir tibbi avadanlıqları və peşəkar həkim heyəti ilə xidmət göstərir.',
    rating: 4.8,
    price: 120,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef'
    ],
    facilities: [
      'Pulsuz Wi-Fi',
      'Restoran',
      'Üzgüçülük hovuzu',
      'Spa və sağlamlıq mərkəzi'
    ]
  },
  {
    id: '2',
    name: 'Chinar Hotel & Spa',
    location: 'Naftalan',
    description: 'Chinar Hotel & Spa Naftalanın mərkəzində yerləşən müasir bir mehmanxana və sağlamlıq mərkəzidir. Naftalan nefti ilə müalicə və istirahət üçün ideal mühit təklif edir.',
    rating: 4.7,
    price: 150,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
    ],
    facilities: [
      'Pulsuz Wi-Fi',
      'Restoran',
      'Spa mərkəzi',
      'Fitness mərkəzi'
    ]
  },
  {
    id: '3',
    name: 'Naftalan Hotel',
    location: 'Naftalan',
    description: 'Naftalan Hotel şəhərin ən populyar müalicə mərkəzlərindən biridir. Burada müxtəlif növ müalicə paketləri və yüksək keyfiyyətli xidmət təklif olunur.',
    rating: 4.5,
    price: 95,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945'
    ],
    facilities: [
      'Pulsuz Wi-Fi',
      'Restoran',
      '24/7 resepşn',
      'Park yeri'
    ]
  }
];

// Treatments data
export const TREATMENTS: Treatment[] = [
  {
    id: '1',
    title: 'Naftalan nefti vannaları',
    description: 'Naftalan nefti ilə doldurulmuş vannalarda aparılan müalicə, dəri xəstəlikləri və oynaq ağrıları üçün əla müalicə üsuludur.',
    image: '/images/treatment-oil-bath.jpg',
    icon: 'bath'
  },
  {
    id: '2',
    title: 'Parafin müalicəsi',
    description: 'Parafin ilə müalicə, xüsusilə artrit və əzələ ağrıları üçün effektiv bir üsuldur.',
    image: '/images/treatment-paraffin.jpg',
    icon: 'spa'
  },
  {
    id: '3',
    title: 'Massaj terapiyası',
    description: 'Peşəkar massaj terapistləri tərəfindən aparılan massaj, gərginliyi azaldır və qan dövranını yaxşılaşdırır.',
    image: '/images/treatment-massage.jpg',
    icon: 'massage'
  },
  {
    id: '4',
    title: 'Balneoterapiya',
    description: 'Mineral sular və palçıqlar ilə aparılan balneoterapiya, orqanizmin detoksifikasiyasına kömək edir.',
    image: '/images/treatment-balneo.jpg',
    icon: 'water'
  }
];

// Packages data
export const PACKAGES: Package[] = [
  {
    id: '1',
    title: '7 günlük sağlamlıq paketi',
    hotel: 'Qaşaltı Sanatoriyası',
    price: 840,
    duration: '7 gün',
    image: '/images/packages/package-1.jpg',
    description: 'Qısa müddətli istirahət və müalicə üçün ideal olan paket. Naftalan nefti vannaları və massaj seansları daxildir.',
    features: [
      'Gündə 2 dəfə naftalan nefti vannaları',
      'Tam pansion qidalanma',
      'Gündəlik massaj seansı',
      'Spa və hovuz istifadəsi'
    ]
  },
  {
    id: '2',
    title: '10 günlük müalicə paketi',
    hotel: 'Chinar Hotel & Spa',
    price: 1350,
    duration: '10 gün',
    image: '/images/packages/package-2.jpg',
    description: 'Daha əhatəli müalicə üçün nəzərdə tutulmuş paket. Həkim nəzarəti və müxtəlif prosedurlar daxildir.',
    features: [
      'Gündə 2 dəfə naftalan nefti vannaları',
      'Tam pansion qidalanma',
      'Həkim müayinəsi və nəzarəti',
      'Parafin müalicəsi',
      'Spa və hovuz istifadəsi'
    ]
  },
  {
    id: '3',
    title: '14 günlük intensiv müalicə',
    hotel: 'Naftalan Hotel',
    price: 1680,
    duration: '14 gün',
    image: '/images/packages/package-3.jpg',
    description: 'Ətraflı və tam müalicə kursu istəyənlər üçün ideal seçim. Bu paket ən geniş müalicə seçimləri təqdim edir.',
    popular: true,
    features: [
      'Gündə 2 dəfə naftalan nefti vannaları',
      'Tam pansion qidalanma',
      'Gündəlik massaj seansı',
      'Fizioterapiya seansları',
      'Həkim müayinəsi və nəzarəti',
      'Spa və hovuz istifadəsi'
    ]
  }
];

// Testimonials data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Aynur Məmmədova',
    role: 'Bakı, Azərbaycan',
    content: '15 ildir artrit ağrılarından əziyyət çəkirdim. Naftalana gələndən sonra 2 həftə ərzində ağrılarım demək olar ki, yox oldu. İndii daha rahat hərəkət edə bilirəm. Bütün komandaya təşəkkür edirəm!',
    rating: 5
  },
  {
    id: 2,
    name: 'Elşən Hüseynov',
    role: 'Gəncə, Azərbaycan',
    content: 'Psoriaz xəstəliyindən əziyyət çəkirdim. Müxtəlif müalicələr sınasam da, Naftalan nefti qədər effektiv nəticə vermədi. Artıq dərimdəki xəstəlik demək olar ki, tamamilə keçdi.',
    rating: 5
  },
  {
    id: 3,
    name: 'Leyla Qasımova',
    role: 'Sumqayıt, Azərbaycan',
    content: 'İdmançı olaraq əzələ ağrılarım var idi. Naftalan nefti vannaları və massajlar sayəsində bədənim yenidən canlandı. İndi daha güclü və enerjili hiss edirəm. Buradakı peşəkar personal üçün təşəkkürlər!',
    rating: 4
  },
  {
    id: 4,
    name: 'Rəşad Əliyev',
    role: 'Şəki, Azərbaycan',
    content: 'Revmatizm ağrılarım üçün gəldim və nəticələr inanılmaz oldu. Naftalan müalicəvi neftinin effekti həqiqətən möcüzəvidir. Otelin xidməti də çox yüksək səviyyədədir. Mütləq yenə gələcəyəm!',
    rating: 5
  }
];

// FAQ data
export const FAQS: FAQ[] = [
  {
    id: 1,
    question: 'Naftalan nefti nədir?',
    answer: 'Naftalan nefti, Azərbaycanın Naftalan şəhərində çıxarılan, tərkibində bioloji aktiv komponentlər olan xüsusi növ neftdir. Bu neft, müalicəvi xüsusiyyətləri ilə tanınır və bir çox xəstəliklərin müalicəsində istifadə olunur.'
  },
  {
    id: 2,
    question: 'Naftalan müalicəsi hansı xəstəliklərə kömək edir?',
    answer: 'Naftalan nefti ilə müalicə əsasən dəri xəstəlikləri (psoriaz, ekzema), oynaq xəstəlikləri (artrit, revmatizm), əzələ ağrıları, nevroloji problemlər və qadın xəstəlikləri üçün effektivdir. Həmçinin, ümumi immunitet sistemini gücləndirərək bir çox sağlamlıq problemlərinə müsbət təsir göstərir.'
  },
  {
    id: 3,
    question: 'Naftalan müalicəsinin yan təsirləri varmı?',
    answer: 'Peşəkar həkimlərin nəzarəti altında aparılan müalicələr zamanı ciddi yan təsirlər demək olar ki, müşahidə olunmur. Lakin bəzi hallarda dəridə qızartı, qaşınma kimi keçici reaksiyalar ola bilər. Müalicəyə başlamazdan əvvəl həkim məsləhəti almaq vacibdir, çünki bəzi xəstəliklər (məsələn, onkoloji, ağır ürək-damar xəstəlikləri) zamanı Naftalan müalicəsi əks göstəriş ola bilər.'
  },
  {
    id: 4,
    question: 'Naftalan müalicəsi üçün optimal müddət nə qədərdir?',
    answer: 'Naftalan müalicəsi üçün optimal müddət xəstəliyin növündən və şiddətindən asılıdır, lakin ümumiyyətlə 7-14 gün arasındadır. Daha ciddi xəstəliklər və xroniki problemlər üçün daha uzun müalicə kursları tövsiyə oluna bilər. Dəqiq müddəti həkim sizin fərdi vəziyyətinizə görə təyin edəcək.'
  },
  {
    id: 5,
    question: 'Naftalana necə gələ bilərəm?',
    answer: 'Naftalan şəhəri Bakıdan təxminən 320 km məsafədə, Gəncədən isə 48 km məsafədə yerləşir. Bakıdan Gəncəyə təyyarə və ya avtobusla gəlib, oradan Naftalana taksi və ya ictimai nəqliyyatla getmək mümkündür. Həmçinin, bir çox sanatoriya və otel transfer xidməti də təklif edir.'
  },
  {
    id: 6,
    question: 'Müalicə qəbulu üçün öncədən rezervasiya etmək lazımdır?',
    answer: 'Bəli, Naftalan sanatoriyaları və müalicə mərkəzlərində yer təmin etmək üçün öncədən rezervasiya etmək tövsiyə olunur, xüsusilə yay və qış tətil mövsümlərində. Rezervasiya veb saytımız, e-poçt və ya telefon vasitəsilə edilə bilər.'
  }
];

// Blog post categories
export const BLOG_CATEGORIES = ['Hamısı', 'Sağlamlıq', 'Müalicə', 'Tarix', 'Tədqiqat', 'Qidalanma'];

// Blog posts data
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Naftalan neftinin sağlamlıq üçün 5 faydası',
    slug: 'naftalan-neftinin-saglamliq-ucun-5-faydasi',
    excerpt: 'Naftalan neftinin dəri xəstəlikləri, oynaq ağrıları və digər sağlamlıq problemləri üçün əsas faydalarını kəşf edin.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    date: '2023-06-12',
    author: 'Dr. Əli Hüseynov',
    category: 'Sağlamlıq',
    tags: ['naftalan nefti', 'müalicə', 'sağlamlıq', 'faydalar']
  },
  {
    id: 2,
    title: 'Naftalan müalicəsindən əvvəl bilməli olduğunuz məqamlar',
    slug: 'naftalan-mualicesinden-evvel-bilmeli-oldugunuz-meqamlar',
    excerpt: 'Naftalan müalicəsinə başlamazdan əvvəl nəzərə almalı olduğunuz vacib məqamlar və hazırlıq mərhələləri.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
    date: '2023-05-28',
    author: 'Dr. Aygün Məmmədova',
    category: 'Müalicə',
    tags: ['naftalan', 'hazırlıq', 'məsləhətlər']
  },
  {
    id: 3,
    title: 'Naftalanın tarixi: keçmişdən bu günə',
    slug: 'naftalanin-tarixi-kecmisden-bu-gune',
    excerpt: 'Naftalan neftinin kəşfindən müasir zamana qədər olan tarixi və Naftalan şəhərinin inkişaf mərhələləri.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b',
    date: '2023-04-15',
    author: 'Cavid Əliyev',
    category: 'Tarix',
    tags: ['naftalan', 'tarix', 'azərbaycan']
  }
];

// Treatment placeholder images
export const TREATMENT_PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
  'https://images.unsplash.com/photo-1620733723572-11c53fc809a9',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35',
  'https://images.unsplash.com/photo-1544161497-d2c2e2936a81'
]; 