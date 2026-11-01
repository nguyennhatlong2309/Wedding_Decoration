import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Agentation } from 'agentation';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ToneStudio } from './components/ToneStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { EventTimelineSchedule } from './components/EventTimelineSchedule';
import { CostEstimator } from './components/CostEstimator';
import { ProcessWorkflow } from './components/ProcessWorkflow';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Phone, MessageCircle, CalendarHeart } from 'lucide-react';

export function App() {
  const [selectedToneId, setSelectedToneId] = useState<string>('tone-red');
  const [catalogToneFilter, setCatalogToneFilter] = useState<string>('all');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingInitialTone, setBookingInitialTone] = useState<string | undefined>();
  const [bookingInitialService, setBookingInitialService] = useState<string | undefined>();
  const [bookingInitialPrice, setBookingInitialPrice] = useState<number | undefined>();

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleSmoothNavigate = (href: string) => {
    const target = document.querySelector(href) as HTMLElement | null;
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -70, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenBooking = (toneId?: string, serviceTitle?: string, estimatedPrice?: number) => {
    setBookingInitialTone(toneId || selectedToneId);
    setBookingInitialService(serviceTitle);
    setBookingInitialPrice(estimatedPrice);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleExploreTones = () => {
    handleSmoothNavigate('#tone-studio');
  };

  const handleOpenEstimator = () => {
    handleSmoothNavigate('#du-toan');
  };

  const handleFilterCatalogByTone = (toneId: string) => {
    setCatalogToneFilter(toneId);
    handleSmoothNavigate('#catalog');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans antialiased selection:bg-rose-200 selection:text-rose-900">
      
      {/* Agentation Visual Feedback & Annotation Toolbar */}
      <Agentation />

      {/* Floating Island Header Navigation with Romantic Music Player */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleSmoothNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* 1. Hero Section with Full-Screen Artistic Visual & Typography */}
        <Hero
          onExploreTones={handleExploreTones}
          onOpenEstimator={handleOpenEstimator}
          onSelectToneHero={setSelectedToneId}
        />

        {/* 2. Interactive Tone Studio (5 Sắc Thái Tone Màu Chủ Đạo) */}
        <ToneStudio
          selectedToneId={selectedToneId}
          onSelectTone={setSelectedToneId}
          onOpenBooking={handleOpenBooking}
          onFilterCatalogByTone={handleFilterCatalogByTone}
        />

        {/* 3. Product Catalog (Mâm tráp, Gia tiên & Tiệc cưới, Thôi nôi & Đầy tháng) */}
        <ProductCatalog
          initialToneFilter={catalogToneFilter}
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. XTRA Event Timeline Schedule: Lịch Trình Nghi Lễ Trọn Gói */}
        <EventTimelineSchedule onOpenBooking={handleOpenBooking} />

        {/* 5. Interactive Cost Estimator & Package Planner */}
        <CostEstimator onOpenBooking={handleOpenBooking} />

        {/* 6. 5-Step Process Workflow */}
        <ProcessWorkflow />

        {/* 7. Testimonials & FAQs */}
        <Testimonials />

      </main>

      {/* Luxury Agency Footer */}
      <Footer />

      {/* Booking & Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialToneId={bookingInitialTone}
        initialServiceTitle={bookingInitialService}
        initialPrice={bookingInitialPrice}
      />

      {/* Floating Quick Action Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        
        {/* Hotline Quick Call */}
        <a
          href="tel:0988123456"
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-rose-900 text-white shadow-xl hover:bg-rose-800 transition-all hover:scale-105 active:scale-95"
          title="Gọi Hotline 24/7"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="hidden sm:inline text-xs font-semibold">0988.123.456</span>
        </a>

        {/* Direct Zalo Consultation */}
        <a
          href="https://zalo.me/0988123456"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
          title="Chat Zalo 24/7"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-semibold">Chat Zalo 24/7</span>
        </a>

        {/* Instant Quote Trigger */}
        <button
          onClick={() => handleOpenBooking()}
          className="flex items-center gap-2 p-3 sm:px-5 sm:py-3 rounded-full bg-stone-900 text-amber-300 shadow-2xl hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 border border-amber-300/30 cursor-pointer"
        >
          <CalendarHeart className="w-4 h-4 text-rose-400" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-white">
            Nhận Báo Giá 3D
          </span>
        </button>

      </div>

    </div>
  );
}

export default App;
