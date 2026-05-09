import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin, Phone, Mail, Instagram, MessageCircle, Utensils, Wifi, Waves, Car, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663455328347/LvN86sDA4gFLHqajcNoFiU/sanmarino-logo-62bYwfMmtZwboUnad3CiFa.webp';

// Translation data
const translations = {
  ru: {
    nav_home: 'Главная',
    nav_rooms: 'Номера',
    nav_gallery: 'Галерея',
    nav_restaurant: 'Ресторан',
    nav_contacts: 'Контакты',
    nav_book: 'Забронировать',
    hero_title: 'San Marino',
    hero_subtitle: 'Гостинично-ресторанный комплекс',
    hero_desc: 'В сердце Астаны — комфорт европейского уровня и казахское гостеприимство',
    hero_cta: 'Забронировать номер',
    hero_scroll: 'Прокрутить вниз',
    booking_title: 'Онлайн-бронирование',
    booking_checkin: 'Заезд',
    booking_checkout: 'Выезд',
    booking_room: 'Тип номера',
    booking_guests: 'Гости',
    booking_name: 'Имя',
    booking_phone: 'Телефон',
    booking_submit: 'Забронировать',
    adv_title: 'Наши преимущества',
    adv_breakfast: 'Завтрак включён',
    adv_breakfast_desc: 'Начните день с полноценного завтрака',
    adv_wifi: 'Бесплатный Wi-Fi',
    adv_wifi_desc: 'Высокоскоростной интернет',
    adv_sauna: 'Сауна и баня',
    adv_sauna_desc: 'Расслабьтесь в уютной атмосфере',
    adv_parking: 'Парковка и трансфер',
    adv_parking_desc: 'Бесплатные услуги для гостей',
    rooms_title: 'Наши номера',
    room_standard: 'Стандарт',
    room_standard_price: 'от 10 000 тнг/ночь',
    room_superior: 'Улучшенный',
    room_superior_price: 'от 11 000 тнг/ночь',
    room_lux: 'Люкс/Дипломат',
    room_lux_price: 'от 13 000 тнг/ночь',
    gallery_title: 'Галерея',
    restaurant_title: 'Ресторан San Marino',
    restaurant_desc: 'Европейская кухня, уютная атмосфера, идеально для деловых встреч и романтических ужинов',
    restaurant_book: 'Забронировать стол',
    faq_title: 'Часто задаваемые вопросы',
    faq_q1: 'Какое время заезда и выезда?',
    faq_a1: 'Стандартное время заезда — 12:00, выезда — 10:30. По запросу возможны ранний заезд или поздний выезд при наличии свободных номеров.',
    faq_q2: 'Включён ли завтрак в стоимость номера?',
    faq_a2: 'Да, полноценный завтрак включён в стоимость всех типов номеров. Завтрак подаётся с 7:00 до 10:00 в ресторане отеля.',
    faq_q3: 'Есть ли парковка для гостей?',
    faq_a3: 'Да, на территории отеля есть бесплатная парковка для всех гостей. Также доступна услуга трансфера до аэропорта и центра города.',
    faq_q4: 'Какие способы оплаты вы принимаете?',
    faq_a4: 'Мы принимаем наличные, банковские карты (Visa, Mastercard), а также переводы через мобильные приложения (Kaspi, Halyk Bank).',
    faq_q5: 'Есть ли Wi-Fi в номерах?',
    faq_a5: 'Да, во всех номерах и общественных зонах отеля доступен бесплатный высокоскоростной Wi-Fi.',
    faq_q6: 'Можно ли провести корпоративное мероприятие в отеле?',
    faq_a6: 'Да, в отеле есть конференц-залы и ресторан, где можно провести деловые встречи, презентации и банкеты. Свяжитесь с нами для уточнения деталей.',
        contacts_title: 'Контакты',
    contacts_address: 'г. Астана, ул. Жумабека Ташенова, 17Б',
    contacts_phone: '+7 (7172) 41-92-92',
    contacts_phone2: '+7 707 808 04 33',
    contacts_email: '17sanmarino@mail.ru',
    contacts_checkin: 'Заезд: 12:00',
    contacts_checkout: 'Выезд: 10:30',
  },
  kz: {
    nav_home: 'Басты бет',
    nav_rooms: 'Нөмірлер',
    nav_gallery: 'Галерея',
    nav_restaurant: 'Мейрамхана',
    nav_contacts: 'Байланыс',
    nav_book: 'Брондау',
    hero_title: 'San Marino',
    hero_subtitle: 'Қонақ үй-мейрамхана кешені',
    hero_desc: 'Астананың жүрегінде — еуропалық деңгейдегі ыңғайлылық және қазақ қонақжайлығы',
    hero_cta: 'Нөмірді брондау',
    hero_scroll: 'Төмен айналдыру',
    booking_title: 'Онлайн брондау',
    booking_checkin: 'Келу',
    booking_checkout: 'Кету',
    booking_room: 'Нөмір түрі',
    booking_guests: 'Қонақтар',
    booking_name: 'Аты',
    booking_phone: 'Телефон',
    booking_submit: 'Брондау',
    adv_title: 'Біздің артықшылықтары',
    adv_breakfast: 'Таңғы ас қосылған',
    adv_breakfast_desc: 'Күнді толық таңғы асымен бастаңыз',
    adv_wifi: 'Тегін Wi-Fi',
    adv_wifi_desc: 'Жоғары жылдамдықты интернет',
    adv_sauna: 'Сауна және ванна',
    adv_sauna_desc: 'Ыңғайлы атмосферада демалыңыз',
    adv_parking: 'Тұрақты орын және трансфер',
    adv_parking_desc: 'Қонақтар үшін тегін қызметтер',
    rooms_title: 'Біздің нөмірлер',
    room_standard: 'Стандарт',
    room_standard_price: '10 000 тнг/түнде',
    room_superior: 'Жақсартылған',
    room_superior_price: '11 000 тнг/түнде',
    room_lux: 'Люкс/Дипломат',
    room_lux_price: '13 000 тнг/түнде',
    gallery_title: 'Галерея',
    restaurant_title: 'San Marino мейрамханасы',
    restaurant_desc: 'Еуропалық тағамдар, ыңғайлы атмосфера, іскери кездесулер және романтикалық кешкі ас үшін идеалды',
    restaurant_book: 'Үстел брондау',
    faq_title: 'Жиі қойылатын сұрақтар',
    faq_q1: 'Келу және кету уақыты қандай?',
    faq_a1: 'Стандартты келу уақыты — 12:00, кету уақыты — 10:30. Сұраныс бойынша ерте келу немесе кеш кету мүмкін.',
    faq_q2: 'Таңғы ас нөмірінің құнына қосылған ба?',
    faq_a2: 'Иә, толық таңғы ас барлық нөмір түрлеріне қосылған. Таңғы ас 7:00-ден 10:00-ге дейін ресторанда беріледі.',
    faq_q3: 'Қонақтар үшін тұрақты орын бар ма?',
    faq_a3: 'Иә, отельде барлық қонақтар үшін тегін тұрақты орын бар. Аэропортқа және қалалық орталығына трансфер қызметі де қол жетімді.',
    faq_q4: 'Қандай төлем әдістерін қабылдайсыз?',
    faq_a4: 'Біз наличные, банк карталарын (Visa, Mastercard) және мобильді қосымшалар арқылы төлемді (Kaspi, Halyk Bank) қабылдаймыз.',
    faq_q5: 'Нөмірлерде Wi-Fi бар ма?',
    faq_a5: 'Иә, барлық нөмірлер мен ортақ аймақтарда тегін жоғары жылдамдықты Wi-Fi қол жетімді.',
    faq_q6: 'Отельде корпоративтік іс-шара өткізуге болады ма?',
    faq_a6: 'Иә, отельде конференц-залдары және ресторан бар. Ұйымдастыру бөлігімен байланысыңыз.',
        contacts_title: 'Байланыс',
    contacts_address: 'Астана қ., Жұмабека Ташенова көш., 17Б',
    contacts_phone: '+7 (7172) 41-92-92',
    contacts_phone2: '+7 707 808 04 33',
    contacts_email: '17sanmarino@mail.ru',
    contacts_checkin: 'Келу: 12:00',
    contacts_checkout: 'Кету: 10:30',
  },
  en: {
    nav_home: 'Home',
    nav_rooms: 'Rooms',
    nav_gallery: 'Gallery',
    nav_restaurant: 'Restaurant',
    nav_contacts: 'Contacts',
    nav_book: 'Book',
    hero_title: 'San Marino',
    hero_subtitle: 'Hotel & Restaurant Complex',
    hero_desc: 'In the heart of Astana — European comfort and Kazakh hospitality',
    hero_cta: 'Book a Room',
    hero_scroll: 'Scroll Down',
    booking_title: 'Online Booking',
    booking_checkin: 'Check-in',
    booking_checkout: 'Check-out',
    booking_room: 'Room Type',
    booking_guests: 'Guests',
    booking_name: 'Name',
    booking_phone: 'Phone',
    booking_submit: 'Book Now',
    adv_title: 'Our Advantages',
    adv_breakfast: 'Breakfast Included',
    adv_breakfast_desc: 'Start your day with a full breakfast',
    adv_wifi: 'Free Wi-Fi',
    adv_wifi_desc: 'High-speed internet',
    adv_sauna: 'Sauna & Bath',
    adv_sauna_desc: 'Relax in a cozy atmosphere',
    adv_parking: 'Parking & Transfer',
    adv_parking_desc: 'Free services for guests',
    rooms_title: 'Our Rooms',
    room_standard: 'Standard',
    room_standard_price: 'from 10,000 KZT/night',
    room_superior: 'Superior',
    room_superior_price: 'from 11,000 KZT/night',
    room_lux: 'Lux/Diplomat',
    room_lux_price: 'from 13,000 KZT/night',
    gallery_title: 'Gallery',
    restaurant_title: 'San Marino Restaurant',
    restaurant_desc: 'European cuisine, cozy atmosphere, perfect for business meetings and romantic dinners',
    restaurant_book: 'Book a Table',
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'What are the check-in and check-out times?',
    faq_a1: 'Standard check-in time is 12:00 PM, check-out is 10:30 AM. Early check-in or late check-out is available upon request, subject to room availability.',
    faq_q2: 'Is breakfast included in the room rate?',
    faq_a2: 'Yes, a full breakfast is included in all room types. Breakfast is served from 7:00 AM to 10:00 AM in our restaurant.',
    faq_q3: 'Is there parking available for guests?',
    faq_a3: 'Yes, free parking is available for all guests on the hotel grounds. We also offer airport and city center transfer services.',
    faq_q4: 'What payment methods do you accept?',
    faq_a4: 'We accept cash, bank cards (Visa, Mastercard), and mobile payments (Kaspi, Halyk Bank).',
    faq_q5: 'Is Wi-Fi available in the rooms?',
    faq_a5: 'Yes, high-speed Wi-Fi is available in all rooms and public areas of the hotel at no charge.',
    faq_q6: 'Can we host a corporate event at the hotel?',
    faq_a6: 'Yes, we have conference halls and a restaurant suitable for business meetings, presentations, and banquets. Contact us for details.',
        contacts_title: 'Contacts',
    contacts_address: 'Astana, Zhumabeka Tashenova St., 17B',
    contacts_phone: '+7 (7172) 41-92-92',
    contacts_phone2: '+7 707 808 04 33',
    contacts_email: '17sanmarino@mail.ru',
    contacts_checkin: 'Check-in: 12:00',
    contacts_checkout: 'Check-out: 10:30',
  }
};

const galleryImages = [
  'https://i7.photo.2gis.com/photo-gallery/d1a3dcfe-068f-4631-89e1-76863b6a71be_1920x.jpg',
  'https://i8.photo.2gis.com/photo-gallery/97d2d33c-c0c7-4145-9cea-def4b3a67870_1920x.jpg',
  'https://i9.photo.2gis.com/photo-gallery/298cc665-f0ec-47be-8b1e-7541fbced922_1920x.jpg',
  'https://i2.photo.2gis.com/images/branch/68/9570149224743823_9085_1920x.jpg',
  'https://i7.photo.2gis.com/photo-gallery/d1a3dcfe-068f-4631-89e1-76863b6a71be_1920x.jpg',
  'https://i8.photo.2gis.com/photo-gallery/97d2d33c-c0c7-4145-9cea-def4b3a67870_1920x.jpg'
];

export default function Home() {
  const [language, setLanguage] = useState<'ru' | 'kz' | 'en'>('ru');
  const [bookingData, setBookingData] = useState({
    checkin: '',
    checkout: '',
    room: 'Standard',
    guests: '1',
    name: '',
    phone: ''
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => {
            const newSet = new Set(prev);
            newSet.add(entry.target.id);
            return newSet;
          });
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const t = (key: keyof typeof translations.ru) => {
    const dict = translations[language];
    return dict[key as keyof typeof dict];
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Новая бронь:\nИмя: ${bookingData.name}\nТелефон: ${bookingData.phone}\nЗаезд: ${bookingData.checkin}\nВыезд: ${bookingData.checkout}\nНомер: ${bookingData.room}\nГостей: ${bookingData.guests}`;
    window.open(`https://wa.me/77078080433?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getAnimationClass = (elementId: string, defaultAnimation: string) => {
    return visibleElements.has(elementId) ? defaultAnimation : 'opacity-0';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={LOGO_URL} alt="San Marino" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
            <span className="hidden sm:inline text-lg md:text-xl font-bold text-primary">SAN MARINO</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition text-sm">{t('nav_home')}</button>
            <button onClick={() => scrollToSection('rooms')} className="text-foreground hover:text-primary transition text-sm">{t('nav_rooms')}</button>
            <button onClick={() => scrollToSection('gallery')} className="text-foreground hover:text-primary transition text-sm">{t('nav_gallery')}</button>
            <button onClick={() => scrollToSection('restaurant')} className="text-foreground hover:text-primary transition text-sm">{t('nav_restaurant')}</button>
            <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-primary transition text-sm">{t('nav_contacts')}</button>
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button onClick={() => setLanguage('ru')} className={`text-xs md:text-sm font-medium px-2 py-1 rounded transition ${language === 'ru' ? 'bg-accent text-white' : 'text-foreground hover:bg-gray-100'}`}>RU</button>
            <button onClick={() => setLanguage('kz')} className={`text-xs md:text-sm font-medium px-2 py-1 rounded transition ${language === 'kz' ? 'bg-accent text-white' : 'text-foreground hover:bg-gray-100'}`}>KZ</button>
            <button onClick={() => setLanguage('en')} className={`text-xs md:text-sm font-medium px-2 py-1 rounded transition ${language === 'en' ? 'bg-accent text-white' : 'text-foreground hover:bg-gray-100'}`}>EN</button>
            <button onClick={() => scrollToSection('booking')} className="bg-accent text-white px-2 md:px-4 py-2 rounded-lg font-medium hover:opacity-90 transition text-xs md:text-sm whitespace-nowrap ml-1 md:ml-2">{t('nav_book')}</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{backgroundImage: 'url(https://i7.photo.2gis.com/photo-gallery/d1a3dcfe-068f-4631-89e1-76863b6a71be_1920x.jpg)', backgroundAttachment: 'fixed'}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif animate-fade-in">{t('hero_title')}</h1>
          <p className="text-xl md:text-2xl mb-4 font-light animate-fade-in" style={{animationDelay: '0.2s'}}>{t('hero_subtitle')}</p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>{t('hero_desc')}</p>
          <button onClick={() => scrollToSection('booking')} className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition text-lg animate-fade-in" style={{animationDelay: '0.6s'}}>
            {t('hero_cta')}
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <h2 id="booking-title" data-animate className={`text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-serif ${getAnimationClass('booking-title', 'animate-slide-up')}`}>{t('booking_title')}</h2>
          <div id="booking-form" data-animate className={`max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg ${getAnimationClass('booking-form', 'animate-scale-in')}`}>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('booking_checkin')}</label>
                  <input
                    type="date"
                    value={bookingData.checkin}
                    onChange={(e) => setBookingData({...bookingData, checkin: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('booking_checkout')}</label>
                  <input
                    type="date"
                    value={bookingData.checkout}
                    onChange={(e) => setBookingData({...bookingData, checkout: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('booking_room')}</label>
                  <select
                    value={bookingData.room}
                    onChange={(e) => setBookingData({...bookingData, room: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="Standard">{t('room_standard')}</option>
                    <option value="Superior">{t('room_superior')}</option>
                    <option value="Lux">{t('room_lux')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('booking_guests')}</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('booking_name')}</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('booking_phone')}</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
                {t('booking_submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <h2 id="adv-title" data-animate className={`text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-serif ${getAnimationClass('adv-title', 'animate-slide-up')}`}>{t('adv_title')}</h2>
          <div id="advantages" data-animate className={`grid md:grid-cols-4 gap-8 ${visibleElements.has('advantages') ? 'animate-stagger' : ''}`}>
            <div className="text-center">
              <Utensils className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('adv_breakfast')}</h3>
              <p className="text-foreground/70">{t('adv_breakfast_desc')}</p>
            </div>
            <div className="text-center">
              <Wifi className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('adv_wifi')}</h3>
              <p className="text-foreground/70">{t('adv_wifi_desc')}</p>
            </div>
            <div className="text-center">
              <Waves className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('adv_sauna')}</h3>
              <p className="text-foreground/70">{t('adv_sauna_desc')}</p>
            </div>
            <div className="text-center">
              <Car className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('adv_parking')}</h3>
              <p className="text-foreground/70">{t('adv_parking_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <h2 id="rooms-title" data-animate className={`text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-serif ${getAnimationClass('rooms-title', 'animate-slide-up')}`}>{t('rooms_title')}</h2>
          <div id="rooms-grid" data-animate className={`grid md:grid-cols-3 gap-8 ${visibleElements.has('rooms-grid') ? 'animate-stagger' : ''}`}>
            {[
              { title: t('room_standard'), price: t('room_standard_price'), img: 'https://i8.photo.2gis.com/photo-gallery/97d2d33c-c0c7-4145-9cea-def4b3a67870_1920x.jpg' },
              { title: t('room_superior'), price: t('room_superior_price'), img: 'https://i9.photo.2gis.com/photo-gallery/298cc665-f0ec-47be-8b1e-7541fbced922_1920x.jpg' },
              { title: t('room_lux'), price: t('room_lux_price'), img: 'https://i2.photo.2gis.com/images/branch/68/9570149224743823_9085_1920x.jpg' }
            ].map((room, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <img src={room.img} alt={room.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                  <p className="text-accent font-semibold mb-4">{room.price}</p>
                  <button onClick={() => scrollToSection('booking')} className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
                    {t('booking_submit')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-20 bg-background">
        <div className="container">
          <h2 id="gallery-title" data-animate className={`text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-serif ${getAnimationClass('gallery-title', 'animate-slide-up')}`}>{t('gallery_title')}</h2>
          <div id="gallery-grid" data-animate className={`grid md:grid-cols-3 gap-4 ${visibleElements.has('gallery-grid') ? 'animate-stagger' : ''}`}>
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                className="gallery-item aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="gallery-overlay">
                  <Maximize2 className="gallery-icon w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="lightbox-overlay fixed inset-0 bg-black/80" onClick={closeLightbox}></div>
          <div className="relative z-10 max-w-4xl max-h-screen w-full mx-4">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-accent transition"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={galleryImages[lightboxIndex]}
                alt="Gallery"
                className="lightbox-image w-full h-auto max-h-96 md:max-h-screen object-contain"
              />
              
              <button
                onClick={prevImage}
                className="lightbox-nav absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="lightbox-nav absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="lightbox-nav absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Section */}
      <section id="restaurant" className="py-16 md:py-20 bg-primary text-white">
        <div id="restaurant-content" data-animate className={`container text-center ${getAnimationClass('restaurant-content', 'animate-slide-up')}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{t('restaurant_title')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">{t('restaurant_desc')}</p>
          <button onClick={() => window.open('https://wa.me/77078080433', '_blank')} className="bg-accent text-primary px-8 py-3 rounded-lg font-medium hover:opacity-90 transition text-lg">
            {t('restaurant_book')}
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div id="faq-content" data-animate className={`container ${getAnimationClass('faq-content', 'animate-fade-in')}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-serif text-primary">{t('faq_title')}</h2>
          <div className="max-w-3xl mx-auto space-y-0">
            {[
              { id: 'q1', q: 'faq_q1', a: 'faq_a1' },
              { id: 'q2', q: 'faq_q2', a: 'faq_a2' },
              { id: 'q3', q: 'faq_q3', a: 'faq_a3' },
              { id: 'q4', q: 'faq_q4', a: 'faq_a4' },
              { id: 'q5', q: 'faq_q5', a: 'faq_a5' },
              { id: 'q6', q: 'faq_q6', a: 'faq_a6' },
            ].map((item) => (
              <div key={item.id} className="accordion-item">
                <button
                  onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                  className="accordion-button"
                >
                  <span className="text-left">{t(item.q as keyof typeof translations.ru)}</span>
                  <ChevronDown className={`accordion-icon ${openFaqId === item.id ? 'open' : ''}`} size={20} />
                </button>
                <div className={`accordion-content ${openFaqId === item.id ? 'open' : 'closed'}`}>
                  <div className="px-4 pb-4 text-gray-700">
                    {t(item.a as keyof typeof translations.ru)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* Contacts Section */}
      <section id="contacts" className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <h2 id="contacts-title" data-animate className={`text-3xl md:text-4xl font-bold text-center mb-12 text-primary font-serif ${getAnimationClass('contacts-title', 'animate-slide-up')}`}>{t('contacts_title')}</h2>
          <div id="contacts-grid" data-animate className={`grid md:grid-cols-2 gap-8 ${getAnimationClass('contacts-grid', 'animate-scale-in')}`}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">{t('contacts_address')}</h3>
                  <p className="text-foreground/70">Байконыр район</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold">{t('contacts_phone')}</p>
                  <p className="font-bold">{t('contacts_phone2')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold">{t('contacts_email')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-bold">{t('contacts_checkin')}</p>
                  <p className="font-bold">{t('contacts_checkout')}</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="https://instagram.com/sanmarino_hotel" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://wa.me/77078080433" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2722.5789123456!2d71.4!3d51.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38a1a1a1a1a1a1a1%3A0x1a1a1a1a1a1a1a1a!2sSan%20Marino%20Hotel!5e0!3m2!1sen!2skz!4v1234567890"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 text-center">
        <p>&copy; 2026 San Marino Hotel & Restaurant Complex. All rights reserved.</p>
      </footer>
    </div>
  );
}
