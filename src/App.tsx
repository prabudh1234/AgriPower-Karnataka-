import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Truck, 
  Plane, 
  Bell, 
  User, 
  ChevronRight, 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  MessageSquare,
  ArrowRight,
  Zap,
  Droplets,
  Wind,
  Navigation,
  Mic,
  MessageCircle,
  WifiOff,
  Settings,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Globe,
  Lock,
  HelpCircle,
  LogOut,
  Languages,
  Filter,
  Calendar,
  CreditCard,
  FileText,
  LayoutGrid,
  Activity,
  HardHat,
  Box,
  Map,
  Info,
  MoreVertical,
  Minus,
  Plus,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 
  | 'home' 
  | 'equipment' 
  | 'drones' 
  | 'logistics' 
  | 'assistant' 
  | 'profile' 
  | 'alerts' 
  | 'voice' 
  | 'chat' 
  | 'offline' 
  | 'settings' 
  | 'language'
  | 'tractor-list'
  | 'jcb-booking'
  | 'tracking'
  | 'categories'
  | 'equipment-detail'
  | 'truck-search'
  | 'truck-results'
  | 'drone-booking'
  | 'drone-operators'
  | 'invoice'
  | 'payment'
  | 'login'
  | 'otp'
  | 'market-prices'
  | 'community'
  | 'weather-detail'
  | 'news'
  | 'location-select'
  | 'import-export'
  | 'find-buyers'
  | 'trade-tracking'
  | 'place-order';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
}

interface Equipment {
  id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  location: string;
  availability: boolean;
}

interface DroneService {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  duration: string;
}

// --- Mock Data ---
const EQUIPMENT: Equipment[] = [
  {
    id: '1',
    name: 'Mahindra Novo 755 DI',
    type: 'Tractor',
    price: 3500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594488651083-023c93df6343?auto=format&fit=crop&q=80&w=800',
    location: '2.4 km away',
    availability: true
  },
  {
    id: '2',
    name: 'John Deere W70',
    type: 'Combine Harvester',
    price: 8500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592919016381-f07ece63f671?auto=format&fit=crop&q=80&w=800',
    location: '5.1 km away',
    availability: true
  },
  {
    id: '3',
    name: 'Sonalika Tiger DI 65',
    type: 'Tractor',
    price: 2800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&q=80&w=800',
    location: '1.2 km away',
    availability: false
  }
];

const DRONE_SERVICES: DroneService[] = [
  {
    id: 'd1',
    name: 'Crop Health Mapping',
    description: 'Multispectral imaging to detect early signs of stress and disease in your fields.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    duration: 'per 5 acres'
  },
  {
    id: 'd2',
    name: 'Precision Spraying',
    description: 'Targeted application of fertilizers and pesticides with zero soil compaction.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800',
    duration: 'per 2 acres'
  }
];

const TRACTORS = [
  { id: 't1', name: 'Mahindra Arjun 605', hp: '57 HP', price: 800, rating: 4.8, image: 'https://images.unsplash.com/photo-1594488651083-023c93df6343?auto=format&fit=crop&q=80&w=400', location: '2.4 km away' },
  { id: 't2', name: 'John Deere 5310', hp: '55 HP', price: 850, rating: 4.9, image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&q=80&w=400', location: '3.1 km away' },
  { id: 't3', name: 'Sonalika Tiger DI 65', hp: '65 HP', price: 900, rating: 4.7, image: 'https://images.unsplash.com/photo-1592919016381-f07ece63f671?auto=format&fit=crop&q=80&w=400', location: '1.8 km away' },
];

const TRUCKS = [
  { id: 'tr1', name: 'Tata Ace Gold', capacity: '1.5 Ton', price: 1200, rating: 4.6, image: 'https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&q=80&w=400' },
  { id: 'tr2', name: 'Ashok Leyland Dost', capacity: '2.0 Ton', price: 1500, rating: 4.7, image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400' },
  { id: 'tr3', name: 'Eicher Pro 2045', capacity: '4.5 Ton', price: 2500, rating: 4.8, image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400' },
];

const DRONE_OPERATORS = [
  { id: 'do1', name: 'SkyFarm Solutions', experience: '3+ Years', price: 2500, rating: 4.9, image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=400' },
  { id: 'do2', name: 'AgriDrone Pro', experience: '2+ Years', price: 2200, rating: 4.7, image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=400' },
];

const MARKET_RATES = [
  { id: 'm1', crop: 'Wheat', mandi: 'Khanna Mandi', price: '₹2,275', change: '+₹15', trend: 'up' },
  { id: 'm2', crop: 'Rice (Basmati)', mandi: 'Karnal Mandi', price: '₹4,500', change: '-₹50', trend: 'down' },
  { id: 'm3', crop: 'Cotton', mandi: 'Abohar Mandi', price: '₹7,200', change: '+₹100', trend: 'up' },
  { id: 'm4', crop: 'Mustard', mandi: 'Alwar Mandi', price: '₹5,450', change: '+₹25', trend: 'up' },
];

const COMMUNITY_POSTS = [
  { id: 'p1', author: 'Sukhwinder Singh', location: 'Sangrur', content: 'What is the best time to sow Moong dal after Wheat harvest?', likes: 24, comments: 12, time: '2h ago' },
  { id: 'p2', author: 'Baldev Raj', location: 'Moga', content: 'Seeing yellowing leaves in my cotton crop. Any suggestions for fertilizer?', likes: 15, comments: 8, time: '5h ago' },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Tractor Booking Confirmed',
    message: 'Your Mahindra Novo 755 DI is scheduled for tomorrow at 8:00 AM.',
    time: '2 mins ago',
    type: 'success',
    read: false
  },
  {
    id: 'n2',
    title: 'Payment Successful',
    message: 'Payment of ₹3,500 for Booking #AP-9821 has been received.',
    time: '1 hour ago',
    type: 'success',
    read: true
  },
  {
    id: 'n3',
    title: 'Reminder: JCB Service',
    message: 'Your scheduled service for the Backhoe Loader is in 2 days.',
    time: '5 hours ago',
    type: 'info',
    read: true
  },
  {
    id: 'n4',
    title: 'New Listing Approved',
    message: 'Your Sonalika Tiger listing is now live and visible to others.',
    time: 'Yesterday',
    type: 'success',
    read: true
  }
];

// --- Components ---

const Navbar = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'categories', icon: Search, label: 'Rent' },
    { id: 'voice', icon: Mic, label: 'Voice', special: true },
    { id: 'logistics', icon: Truck, label: 'Logistics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-container-highest border-t border-outline-variant px-2 pb-safe pt-2 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              item.special 
                ? 'bg-primary text-white rounded-full -mt-8 w-14 h-14 shadow-lg border-4 border-background' 
                : activeScreen === item.id ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <item.icon size={item.special ? 28 : 24} strokeWidth={activeScreen === item.id || item.special ? 2.5 : 2} />
            {!item.special && <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
};

const Header = ({ 
  title, 
  showProfile = true, 
  onProfileClick, 
  onBack,
  onAlertsClick
}: { 
  title: string, 
  showProfile?: boolean, 
  onProfileClick?: () => void,
  onBack?: () => void,
  onAlertsClick?: () => void
}) => (
  <header className="sticky top-0 bg-background/80 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center border-b border-outline-variant">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-surface-container transition-colors">
          <ArrowLeft size={20} className="text-on-surface" />
        </button>
      )}
      <h1 className="text-xl font-headline font-bold text-primary tracking-tight">{title}</h1>
    </div>
    <div className="flex gap-2 items-center">
      <button 
        onClick={onAlertsClick}
        className="p-2 rounded-full hover:bg-surface-container transition-colors relative"
      >
        <Bell size={20} className="text-on-surface-variant" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-background"></span>
      </button>
      {showProfile && (
        <button 
          onClick={onProfileClick}
          className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-fixed overflow-hidden border-2 border-primary/20"
        >
          <User size={18} />
        </button>
      )}
    </div>
  </header>
);const HomeScreen = ({ setScreen, location }: { setScreen: (s: Screen) => void, location: string }) => {
  const quickServices = [
    { id: 'tractor-list', name: 'Tractor Rental', icon: Search, color: 'bg-orange-100 text-orange-600' },
    { id: 'jcb-booking', name: 'JCB Booking', icon: HardHat, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'truck-search', name: 'Truck Transport', icon: Truck, color: 'bg-blue-100 text-blue-600' },
    { id: 'drone-booking', name: 'Drone Spraying', icon: Plane, color: 'bg-green-100 text-green-600' },
    { id: 'market-prices', name: 'Market Rates', icon: Activity, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'community', name: 'Kisan Forum', icon: MessageCircle, color: 'bg-purple-100 text-purple-600' },
    { id: 'news', name: 'Agri News', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { id: 'assistant', name: 'AI Expert', icon: Zap, color: 'bg-red-100 text-red-600' },
    { id: 'logistics', name: 'Logistics', icon: Navigation, color: 'bg-indigo-100 text-indigo-600' },
  ];

  const nearbyServices = [
    { id: '1', name: 'Mahindra Arjun 605', type: 'Tractor', price: '₹800/hr', rating: 4.8, image: 'https://images.unsplash.com/photo-1594488651083-023c93df6343?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'JCB 3DX Eco', type: 'Backhoe Loader', price: '₹1200/hr', rating: 4.9, image: 'https://images.unsplash.com/photo-1579412691525-288f0006a621?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="pb-24">
      <div className="px-6 py-4">
        {/* Location Bar */}
        <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-2xl mb-6 border border-outline-variant">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <button 
            onClick={() => setScreen('location-select')}
            className="text-xs font-bold text-primary"
          >
            Change
          </button>
        </div>

        {/* Weather Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setScreen('weather-detail')}
          className="bg-primary-container rounded-3xl p-6 text-on-primary-fixed relative overflow-hidden mb-8 shadow-lg min-h-[160px] flex flex-col justify-end cursor-pointer active:scale-[0.98] transition-transform"
        >
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
            alt="Weather background"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Today's Forecast</span>
                <h2 className="text-4xl font-headline font-extrabold mt-1">24°C</h2>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">Mostly Sunny</p>
                <p className="text-[10px] opacity-80">H: 28° L: 18°</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Droplets size={14} />
                <span className="text-xs font-bold">45%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Wind size={14} />
                <span className="text-xs font-bold">12 km/h</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Services */}
        <section className="mb-8">
          <h3 className="text-lg font-headline font-bold mb-4">Quick Services</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickServices.map((service) => (
              <button 
                key={service.id}
                onClick={() => setScreen(service.id as Screen)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-transform`}>
                  <service.icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-center leading-tight">{service.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Nearby Services */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-headline font-bold">Nearby Services</h3>
            <button className="text-xs font-bold text-primary uppercase tracking-wider">See All</button>
          </div>
          <div className="space-y-4">
            {nearbyServices.map((item) => (
              <div 
                key={item.id} 
                className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant shadow-sm flex cursor-pointer hover:border-primary transition-colors"
                onClick={() => setScreen('equipment-detail')}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-28 h-28 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.type}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="fill-tertiary text-tertiary" />
                        <span className="text-[10px] font-bold">{item.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm mt-1">{item.name}</h4>
                    <div className="flex items-center gap-1 text-on-surface-variant mt-1">
                      <MapPin size={10} />
                      <span className="text-[10px]">2.4 km away</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-extrabold text-primary">{item.price}</span>
                    <button className="bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold">Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const EquipmentScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Tractors', 'Harvesters', 'Plows', 'Seeders'];

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder="Search equipment..." 
            className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-surface-container border border-outline-variant text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {EQUIPMENT.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-sm group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={12} className="fill-tertiary text-tertiary" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
                {!item.availability && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-error text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Currently Rented</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.type}</span>
                    <h4 className="text-lg font-headline font-bold mt-1">{item.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-primary">₹{item.price}</span>
                    <p className="text-[10px] text-on-surface-variant font-medium">per day</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 py-4 border-t border-outline-variant">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <MapPin size={14} />
                    <span className="text-xs font-medium">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <Shield size={14} />
                    <span className="text-xs font-medium">Insured</span>
                  </div>
                </div>
                <button 
                  disabled={!item.availability}
                  onClick={() => setScreen('equipment-detail')}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${
                    item.availability 
                      ? 'bg-primary text-white hover:bg-primary-container' 
                      : 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
                  }`}
                >
                  {item.availability ? 'Reserve Now' : 'Join Waitlist'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DroneScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <div className="bg-secondary-container rounded-3xl p-8 text-on-secondary-container mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-headline font-extrabold leading-tight">Next-Gen Farming with Drones</h2>
            <p className="text-sm mt-2 opacity-90 max-w-[200px]">Boost your yield with precision data and automated spraying.</p>
            <button className="mt-6 bg-secondary text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg">Learn More</button>
          </div>
          <Plane className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-12" />
        </div>

        <h3 className="text-lg font-headline font-bold mb-6">Available Services</h3>
        <div className="space-y-6">
          {DRONE_SERVICES.map((service) => (
            <div key={service.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-sm">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-40 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6">
                <h4 className="text-lg font-headline font-bold">{service.name}</h4>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant">
                  <div>
                    <span className="text-xl font-extrabold text-primary">₹{service.price}</span>
                    <span className="text-[10px] text-on-surface-variant font-medium ml-1">{service.duration}</span>
                  </div>
                  <button 
                    onClick={() => setScreen('drone-booking')}
                    className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md active:scale-95"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LogisticsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant mb-8">
          <h3 className="text-lg font-headline font-bold mb-4">Track Your Shipment</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-outline-variant"></div>
            <div className="space-y-8 relative">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10 shadow-sm">
                  <Zap size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">In Transit</h4>
                  <p className="text-[10px] text-on-surface-variant">Estimated arrival: Today, 4:30 PM</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center z-10">
                  <MapPin size={14} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Left Warehouse</h4>
                  <p className="text-[10px] text-on-surface-variant">Regional Hub, Sector 4</p>
                </div>
              </div>
              <div className="flex gap-4 items-start opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center z-10">
                  <Clock size={14} className="text-on-surface-variant" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Order Confirmed</h4>
                  <p className="text-[10px] text-on-surface-variant">March 15, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-headline font-bold mb-6">Logistics Services</h3>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => setScreen('truck-search')}
            className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant text-left hover:border-primary transition-all overflow-hidden group"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1586191582151-f73872dfd183?auto=format&fit=crop&q=80&w=400" 
                alt="Bulk Transport"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Bulk Transport</h4>
              <p className="text-[10px] text-on-surface-variant">Move large quantities of grain or produce</p>
            </div>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
          
          <button 
            onClick={() => setScreen('import-export')}
            className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant text-left hover:border-primary transition-all overflow-hidden group"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-secondary-container flex items-center justify-center text-secondary">
              <Globe size={32} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Import & Export</h4>
              <p className="text-[10px] text-on-surface-variant">Trade goods globally and check market prices</p>
            </div>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>

          <button className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant text-left hover:border-primary transition-all overflow-hidden group">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" 
                alt="Route Optimization"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Route Optimization</h4>
              <p className="text-[10px] text-on-surface-variant">Find the most efficient path for your fleet</p>
            </div>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AssistantScreen = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AgriPower AI assistant. How can I help you optimize your farm today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "That's a great question. Based on current soil moisture levels and the 5-day forecast, I recommend starting the irrigation cycle in Sector 3 tomorrow morning." 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-surface-container-low text-on-surface border border-outline-variant rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 bg-background border-t border-outline-variant">
        <div className="flex gap-2 max-w-md mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crops, weather, or equipment..." 
            className="flex-1 bg-surface-container-low border border-outline-variant rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary"
          />
          <button 
            onClick={handleSend}
            className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-md active:scale-90 transition-transform"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AlertsScreen = () => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-headline font-bold">Recent Alerts</h3>
          <button className="text-xs font-bold text-primary">Mark all as read</button>
        </div>
        <div className="space-y-4">
          {NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-2xl border transition-all ${
                notif.read ? 'bg-surface-container-lowest border-outline-variant' : 'bg-primary-container/10 border-primary/20 shadow-sm'
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  notif.type === 'success' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary-container'
                }`}>
                  {notif.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-bold text-sm ${!notif.read ? 'text-primary' : ''}`}>{notif.title}</h4>
                    <span className="text-[10px] text-on-surface-variant font-medium">{notif.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VoiceScreen = () => {
  const [isListening, setIsListening] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center px-8 text-center">
      <motion.div 
        animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 mb-8"
      >
        <Mic size={48} className="text-white" />
      </motion.div>
      
      <h2 className="text-2xl font-headline font-bold mb-2">
        {isListening ? 'Listening...' : 'Tap to speak'}
      </h2>
      <p className="text-on-surface-variant text-sm mb-12">"Book a tractor for tomorrow morning"</p>

      <div className="w-full max-w-xs space-y-4">
        <div className="flex gap-2 justify-center mb-8">
          {['English', 'Kannada', 'Hindi'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                language === lang ? 'bg-primary text-white' : 'bg-surface-container border border-outline-variant'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        
        <div className="text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Try saying</p>
          <div className="space-y-3">
            {['"Check my booking status"', '"Find drone services near me"', '"What is the weather today?"'].map((text, i) => (
              <button key={i} className="w-full text-left p-4 bg-surface-container-low rounded-2xl border border-outline-variant text-xs font-medium hover:border-primary transition-all">
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatScreen = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-surface-container-low px-6 py-3 flex items-center gap-3 border-b border-outline-variant">
        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
          <User size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm">Agent Sarah</h4>
          <p className="text-[10px] text-tertiary font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-tertiary rounded-full"></span> Online
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="flex justify-start">
          <div className="max-w-[85%] p-4 bg-surface-container-low border border-outline-variant rounded-2xl rounded-tl-none text-sm shadow-sm">
            Hi Rajesh! I see you're looking for a tractor. How can I assist you with your booking today?
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="max-w-[85%] p-4 bg-primary text-white rounded-2xl rounded-tr-none text-sm shadow-md">
            I need a Mahindra tractor for 3 days starting from Friday. Is it available?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] space-y-4">
            <div className="p-4 bg-surface-container-low border border-outline-variant rounded-2xl rounded-tl-none text-sm shadow-sm">
              Yes, it is available! Here are the details for your request:
            </div>
            <div className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-md">
              <div className="bg-primary-container p-4 flex justify-between items-center">
                <span className="text-xs font-bold text-on-primary-container">Booking Summary</span>
                <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-primary">DRAFT</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Equipment</span>
                  <span className="font-bold">Mahindra Novo 755 DI</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Duration</span>
                  <span className="font-bold">3 Days (Mar 20 - Mar 22)</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-outline-variant">
                  <span className="font-bold">Total Price</span>
                  <span className="font-bold text-primary">₹10,500</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-white text-xs font-bold">Confirm & Pay</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-background border-t border-outline-variant">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 bg-surface-container-low border border-outline-variant rounded-2xl px-5 py-3 text-sm"
          />
          <button className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-md">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const OfflineScreen = () => {
  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <div className="bg-error-container/20 border border-error/20 rounded-3xl p-6 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-error-container text-on-error-container rounded-2xl flex items-center justify-center shrink-0">
            <WifiOff size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Offline Mode Active</h3>
            <p className="text-[10px] text-on-surface-variant">Your requests will be queued and sent once you're back online.</p>
          </div>
        </div>

        <h3 className="text-lg font-headline font-bold mb-6">Queue a Request</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Service Type</label>
            <select className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-sm focus:outline-none focus:border-primary appearance-none">
              <option>Equipment Rental</option>
              <option>Drone Service</option>
              <option>Logistics</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Details</label>
            <textarea 
              placeholder="Describe what you need..." 
              rows={4}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl p-4 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">
            Add to Queue
          </button>
        </div>

        <div className="mt-12">
          <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
            Pending Requests <span className="bg-primary-container text-primary px-2 py-0.5 rounded-full text-[10px]">2</span>
          </h4>
          <div className="space-y-3">
            {[
              { title: 'Tractor Rental', desc: 'Mahindra Novo for 2 days', time: '10 mins ago' },
              { title: 'Drone Spraying', desc: '5 acres in Sector 4', time: '1 hour ago' }
            ].map((req, i) => (
              <div key={i} className="p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl flex justify-between items-center">
                <div>
                  <h5 className="text-xs font-bold">{req.title}</h5>
                  <p className="text-[10px] text-on-surface-variant">{req.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant opacity-60 italic">{req.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-primary-container border-4 border-background shadow-xl flex items-center justify-center text-primary mb-4 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
              alt="Rajesh Kumar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-background shadow-md z-10">
              <Star size={12} fill="white" />
            </button>
          </div>
          <h2 className="text-xl font-headline font-bold">Rajesh Kumar</h2>
          <p className="text-xs text-on-surface-variant font-medium">Farmer • Punjab, India</p>
          <div className="mt-4 flex gap-2">
            <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <Shield size={10} /> Aadhaar Verified
            </span>
            <span className="bg-primary-container text-primary px-3 py-1 rounded-full text-[10px] font-bold">Gold Member</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant text-center">
            <span className="text-2xl font-headline font-extrabold text-primary">120</span>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">Acres Covered</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant text-center">
            <span className="text-2xl font-headline font-extrabold text-secondary">94%</span>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">Efficiency Score</p>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setScreen('alerts')}
            className="w-full flex items-center gap-4 p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:border-primary transition-all"
          >
            <div className="w-10 h-10 bg-primary-container text-primary rounded-xl flex items-center justify-center">
              <Bell size={20} />
            </div>
            <span className="flex-1 text-left font-bold text-sm">Notifications</span>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
          <button 
            onClick={() => setScreen('chat')}
            className="w-full flex items-center gap-4 p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:border-primary transition-all"
          >
            <div className="w-10 h-10 bg-secondary-container text-secondary rounded-xl flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <span className="flex-1 text-left font-bold text-sm">Support Chat</span>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
          <button 
            onClick={() => setScreen('settings')}
            className="w-full flex items-center gap-4 p-4 bg-surface-container-lowest border border-outline-variant rounded-2xl hover:border-primary transition-all"
          >
            <div className="w-10 h-10 bg-surface-container-highest text-on-surface-variant rounded-xl flex items-center justify-center">
              <Settings size={20} />
            </div>
            <span className="flex-1 text-left font-bold text-sm">Settings</span>
            <ChevronRight size={18} className="text-on-surface-variant" />
          </button>
          <button className="w-full flex items-center gap-4 p-4 bg-error-container/10 border border-error/10 rounded-2xl text-error">
            <div className="w-10 h-10 bg-error-container text-on-error-container rounded-xl flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <span className="flex-1 text-left font-bold text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsScreen = () => {
  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <section className="mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 ml-1">App Preferences</h3>
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 border-b border-outline-variant hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <Globe size={20} className="text-primary" />
                <div className="text-left">
                  <p className="font-bold text-sm">App Language</p>
                  <p className="text-[10px] text-on-surface-variant">English (India)</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant" />
            </button>
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div className="flex items-center gap-4">
                <Mic size={20} className="text-primary" />
                <p className="font-bold text-sm">Voice Support</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <WifiOff size={20} className="text-primary" />
                <p className="font-bold text-sm">Offline Mode</p>
              </div>
              <div className="w-12 h-6 bg-surface-container-highest rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 ml-1">Security & Privacy</h3>
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 border-b border-outline-variant hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <Lock size={20} className="text-secondary" />
                <p className="font-bold text-sm">Biometric / PIN Lock</p>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant" />
            </button>
            <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <Shield size={20} className="text-secondary" />
                <p className="font-bold text-sm">Privacy Policy</p>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant" />
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4 ml-1">Support</h3>
          <div className="bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 border-b border-outline-variant hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <HelpCircle size={20} className="text-tertiary" />
                <p className="font-bold text-sm">Help Center</p>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant" />
            </button>
            <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <MessageCircle size={20} className="text-tertiary" />
                <p className="font-bold text-sm">Contact Support</p>
              </div>
              <ChevronRight size={18} className="text-on-surface-variant" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const LanguageSelectScreen = ({ onSelect }: { onSelect: () => void }) => {
  const languages = [
    { name: 'English', native: 'English' },
    { name: 'Hindi', native: 'हिन्दी' },
    { name: 'Kannada', native: 'ಕನ್ನಡ' },
    { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { name: 'Marathi', native: 'मराठी' },
    { name: 'Telugu', native: 'తెలుగు' },
    { name: 'Tamil', native: 'தமிழ்' },
    { name: 'Bengali', native: 'বাংলা' },
    { name: 'Gujarati', native: 'ગુજરાતી' }
  ];

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-8 py-12 text-white relative overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        referrerPolicy="no-referrer"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative z-10"
      >
        <Languages size={48} />
      </motion.div>
      
      <h1 className="text-4xl font-headline font-extrabold mb-2 relative z-10">Namaste!</h1>
      <p className="text-white/80 text-sm mb-12 text-center relative z-10">Choose your preferred language to continue</p>

      <div className="grid grid-cols-2 gap-4 w-full relative z-10">
        {languages.map((lang) => (
          <button
            key={lang.name}
            onClick={onSelect}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white hover:text-primary transition-all group shadow-lg"
          >
            <p className="text-lg font-bold">{lang.native}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">{lang.name}</p>
          </button>
        ))}
      </div>

      <p className="mt-12 text-[10px] font-bold uppercase tracking-widest opacity-40 relative z-10">AgriPower v2.4.0</p>
    </div>
  );
};

// --- New Screens ---

const TractorListScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
          {['Price', 'Mini Tractor', 'High HP', 'Nearby'].map((filter) => (
            <button key={filter} className="px-4 py-2 bg-surface-container border border-outline-variant rounded-full text-xs font-bold whitespace-nowrap">
              {filter}
            </button>
          ))}
          <button className="p-2 bg-primary text-white rounded-full">
            <Filter size={16} />
          </button>
        </div>

        <div className="bg-primary-container/20 p-4 rounded-2xl mb-8 border border-primary/10">
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Editor's Choice</h4>
          <div className="flex gap-4">
            <img 
              src="https://images.unsplash.com/photo-1594488651083-023c93df6343?auto=format&fit=crop&q=80&w=200" 
              className="w-20 h-20 rounded-xl object-cover"
              alt="Tractor"
              referrerPolicy="no-referrer"
            />
            <div>
              <h5 className="font-bold text-sm">Mahindra Arjun 605</h5>
              <p className="text-[10px] text-on-surface-variant mt-1">Best for heavy plowing and tilling in clay soil.</p>
              <button className="mt-2 text-xs font-bold text-primary flex items-center gap-1">
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {TRACTORS.map((tractor) => (
            <div key={tractor.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant shadow-sm flex">
              <img src={tractor.image} className="w-28 h-28 object-cover" alt={tractor.name} referrerPolicy="no-referrer" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{tractor.hp}</span>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="fill-tertiary text-tertiary" />
                      <span className="text-[10px] font-bold">{tractor.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-sm mt-1">{tractor.name}</h4>
                  <p className="text-[10px] text-on-surface-variant mt-1 flex items-center gap-1">
                    <MapPin size={10} /> {tractor.location}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-extrabold text-primary">₹{tractor.price}<span className="text-[10px] font-medium text-on-surface-variant">/hr</span></span>
                  <button 
                    onClick={() => setScreen('jcb-booking')}
                    className="bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JCBBookingScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [selectedDate, setSelectedDate] = useState('2026-03-20');
  const [startTime, setStartTime] = useState('08:00');
  const [hours, setHours] = useState(4);
  const [workType, setWorkType] = useState('Digging');
  const pricePerHour = 1200;

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant mb-6">
          <img 
            src="https://images.unsplash.com/photo-1579412691525-288f0006a621?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-48 object-cover"
            alt="JCB"
            referrerPolicy="no-referrer"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-headline font-bold">JCB 3DX Eco</h3>
                <p className="text-xs text-on-surface-variant">Backhoe Loader • 4.9 Rating</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-primary">₹{pricePerHour}</p>
                <p className="text-[10px] text-on-surface-variant font-medium">per hour</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-surface-container rounded-2xl border border-outline-variant">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-bold">Amit Singh</p>
                <p className="text-[10px] text-on-surface-variant">Verified Operator • 500+ Hours</p>
              </div>
              <button className="ml-auto p-2 bg-white rounded-full shadow-sm">
                <MessageSquare size={16} className="text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Type of Work</label>
            <div className="grid grid-cols-2 gap-3">
              {['Digging', 'Land Leveling', 'Demolition', 'Loading'].map((type) => (
                <button 
                  key={type} 
                  onClick={() => setWorkType(type)}
                  className={`p-3 border rounded-2xl text-xs font-bold text-left transition-all ${workType === type ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface-container-low border-outline-variant'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-2xl text-xs font-bold focus:outline-none focus:border-primary"
                />
                <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Start Time</label>
              <div className="relative">
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-2xl text-xs font-bold focus:outline-none focus:border-primary"
                />
                <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Estimated Hours</label>
            <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-2xl p-2">
              <button 
                onClick={() => setHours(Math.max(1, hours - 1))}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm active:scale-90 transition-all"
              >
                <Minus size={18} />
              </button>
              <span className="text-lg font-bold">{hours} Hours</span>
              <button 
                onClick={() => setHours(hours + 1)}
                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-all"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="bg-primary-container/10 p-4 rounded-2xl border border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium">Estimated Total ({hours} hrs)</span>
              <span className="text-lg font-extrabold text-primary">₹{(hours * pricePerHour).toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-on-surface-variant">*Includes operator and fuel charges</p>
          </div>

          <button 
            onClick={() => setScreen('tracking')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

const TrackingScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="relative h-[400px] bg-surface-container-highest">
        {/* Mock Map */}
        <div className="absolute inset-0 bg-emerald-50 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
          {/* Farm Area */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-200/50 border-2 border-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">My Farm</span>
          </div>
          {/* Vehicle Path */}
          <svg className="absolute inset-0 w-full h-full">
            <path d="M 350 350 Q 300 300 200 200" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="8 4" />
          </svg>
          {/* Vehicle Icon */}
          <motion.div 
            animate={{ x: [350, 200], y: [350, 200] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute p-2 bg-primary text-white rounded-full shadow-lg z-10"
          >
            <Truck size={20} />
          </motion.div>
          {/* Farm Icon */}
          <div className="absolute top-[200px] left-[200px] -translate-x-1/2 -translate-y-1/2 p-2 bg-secondary text-white rounded-full shadow-lg z-10">
            <MapPin size={20} />
          </div>
        </div>
        
        <button className="absolute top-4 left-4 p-3 bg-white rounded-full shadow-lg">
          <Navigation size={20} className="text-primary" />
        </button>
      </div>

      <div className="px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-outline-variant p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-headline font-bold">On the Way</h3>
              <p className="text-xs text-on-surface-variant">Arriving in approx. 12 mins</p>
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Live</div>
          </div>

          <div className="flex justify-between mb-8">
            {['Booked', 'Dispatched', 'Arrived', 'Work'].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= 1 ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                  {i <= 1 ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 bg-current rounded-full"></div>}
                </div>
                <span className="text-[10px] font-bold">{step}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary">
              <User size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Amit Singh</h4>
              <p className="text-xs text-on-surface-variant">Mahindra Arjun 605 • PB 10 AX 1234</p>
            </div>
            <button className="p-3 bg-primary text-white rounded-full shadow-md">
              <Mic size={20} />
            </button>
          </div>
          
          <button 
            onClick={() => setScreen('home')}
            className="w-full mt-6 py-4 bg-surface-container-highest text-on-surface font-bold text-sm rounded-2xl active:scale-95 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoriesScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const categories = [
    { name: 'Harvesting', icon: Zap, color: 'bg-yellow-100 text-yellow-600', count: 12 },
    { name: 'Sowing', icon: Droplets, color: 'bg-blue-100 text-blue-600', count: 8 },
    { name: 'Irrigation', icon: Wind, color: 'bg-emerald-100 text-emerald-600', count: 15 },
    { name: 'Tilling', icon: Search, color: 'bg-orange-100 text-orange-600', count: 24 },
  ];

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-primary rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Seasonal Essential</span>
            <h2 className="text-2xl font-headline font-extrabold mt-1">Tilling & Plowing</h2>
            <p className="text-xs mt-2 opacity-90">Get up to 20% off on bulk rotavator bookings this week.</p>
            <button className="mt-6 bg-white text-primary px-6 py-2.5 rounded-full text-xs font-bold shadow-lg">View Offers</button>
          </div>
          <Search className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-12" />
        </div>

        <h3 className="text-lg font-headline font-bold mb-6">Equipment Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => setScreen('tractor-list')}
              className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant hover:border-primary transition-all text-left group"
            >
              <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <h4 className="font-bold text-sm">{cat.name}</h4>
              <p className="text-[10px] text-on-surface-variant mt-1">{cat.count} items available</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const EquipmentDetailScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [selectedDay, setSelectedDay] = useState(20);
  const [hours, setHours] = useState(4);
  const [startTime, setStartTime] = useState('09:00');
  const pricePerHour = 500;
  const serviceCharge = 150;

  const totalPayable = (hours * pricePerHour) + serviceCharge;

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant mb-6">
          <img 
            src="https://images.unsplash.com/photo-1592919016381-f07ece63f671?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-56 object-cover"
            alt="Rotavator"
            referrerPolicy="no-referrer"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-headline font-bold">Mahindra Rotavator</h3>
                <p className="text-xs text-on-surface-variant">Model: Gyrovator ZLX • 2024</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-primary">₹{pricePerHour}</p>
                <p className="text-[10px] text-on-surface-variant font-medium">per hour</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-outline-variant">
              <div className="text-center">
                <Activity size={18} className="mx-auto text-primary mb-1" />
                <p className="text-[10px] font-bold">98%</p>
                <p className="text-[8px] text-on-surface-variant uppercase">Efficiency</p>
              </div>
              <div className="text-center">
                <LayoutGrid size={18} className="mx-auto text-primary mb-1" />
                <p className="text-[10px] font-bold">42 Blades</p>
                <p className="text-[8px] text-on-surface-variant uppercase">Capacity</p>
              </div>
              <div className="text-center">
                <Navigation size={18} className="mx-auto text-primary mb-1" />
                <p className="text-[10px] font-bold">1.8m</p>
                <p className="text-[8px] text-on-surface-variant uppercase">Width</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold">Availability Calendar</h4>
            <div className="grid grid-cols-7 gap-2">
              {[18, 19, 20, 21, 22, 23, 24].map((day, i) => (
                <button 
                  key={day} 
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 rounded-xl text-center border transition-all ${selectedDay === day ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface-container-low border-outline-variant'}`}
                >
                  <p className="text-[8px] uppercase font-bold">{['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'][i]}</p>
                  <p className="text-xs font-bold">{day}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Start Time</label>
              <div className="relative">
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-2xl text-xs font-bold focus:outline-none focus:border-primary"
                />
                <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Estimated Hours</label>
              <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-2xl p-2">
                <button 
                  onClick={() => setHours(Math.max(1, hours - 1))}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold">{hours} hrs</span>
                <button 
                  onClick={() => setHours(hours + 1)}
                  className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-md active:scale-90 transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <User size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Gurpreet Singh</h4>
              <p className="text-xs text-on-surface-variant">Owner • 4.8 Rating</p>
            </div>
            <button className="p-3 bg-white rounded-full shadow-sm">
              <MessageSquare size={20} className="text-primary" />
            </button>
          </div>

          <div className="bg-surface-container-highest/30 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">Rental Fee ({hours} hrs)</span>
              <span className="font-bold">₹{(hours * pricePerHour).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">Service Charge</span>
              <span className="font-bold">₹{serviceCharge}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-outline-variant">
              <span className="font-bold">Total Payable</span>
              <span className="font-bold text-primary">₹{totalPayable.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => setScreen('invoice')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

const TruckSearchScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-blue-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-2xl font-headline font-extrabold leading-tight">Reliable Transport for Your Harvest</h2>
            <p className="text-sm mt-2 opacity-90">Book verified trucks for local and long-distance transport.</p>
          </div>
          <Truck className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-12" />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input type="text" placeholder="Enter pickup point" className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Drop-off Location</label>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input type="text" placeholder="Enter destination" className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Load Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Grains', 'Fertilizers', 'Machinery'].map((load) => (
                <button key={load} className="p-3 bg-surface-container-low border border-outline-variant rounded-2xl text-[10px] font-bold text-center hover:border-primary transition-all">
                  {load}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Schedule Date</label>
            <button className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-2xl text-xs font-bold flex items-center justify-between">
              Select Date <Calendar size={18} className="text-primary" />
            </button>
          </div>

          <button 
            onClick={() => setScreen('truck-results')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            Search Available Trucks
          </button>
        </div>
      </div>
    </div>
  );
};

const TruckResultsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-headline font-bold">Available Trucks</h3>
          <button className="p-2 bg-surface-container border border-outline-variant rounded-full">
            <Filter size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {TRUCKS.map((truck) => (
            <div key={truck.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-sm p-4 flex gap-4">
              <img src={truck.image} className="w-24 h-24 rounded-2xl object-cover" alt={truck.name} referrerPolicy="no-referrer" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm">{truck.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="fill-tertiary text-tertiary" />
                      <span className="text-[10px] font-bold">{truck.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Capacity: {truck.capacity}</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">Available Now</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-extrabold text-primary">₹{truck.price}</span>
                  <button 
                    onClick={() => setScreen('payment')}
                    className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DroneBookingScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-8 bg-primary' : 'w-4 bg-surface-container-highest'}`}></div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Step 1 of 3</span>
        </div>

        <h3 className="text-xl font-headline font-bold mb-6">Land & Crop Details</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Land Size (Acres)</label>
            <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-2xl p-2">
              <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><Minus size={18} /></button>
              <span className="text-lg font-bold">5.0 Acres</span>
              <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-md"><Plus size={18} /></button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Crop Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Wheat', 'Rice', 'Cotton', 'Maize', 'Sugarcane', 'Other'].map((crop) => (
                <button key={crop} className="p-3 bg-surface-container-low border border-outline-variant rounded-2xl text-[10px] font-bold text-center hover:border-primary transition-all">
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Type of Spraying</label>
            <div className="space-y-3">
              {[
                { name: 'Pesticide', desc: 'Protect from pests and insects' },
                { name: 'Fertilizer', desc: 'Boost growth with liquid nutrients' },
                { name: 'Fungicide', desc: 'Prevent fungal infections' }
              ].map((type) => (
                <button key={type.name} className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-2xl text-left hover:border-primary transition-all">
                  <p className="text-sm font-bold">{type.name}</p>
                  <p className="text-[10px] text-on-surface-variant">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setScreen('drone-operators')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            Continue to Operators
          </button>
        </div>
      </div>
    </div>
  );
};

const DroneOperatorsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <h3 className="text-lg font-headline font-bold mb-6">Verified Drone Operators</h3>
        
        <div className="space-y-4">
          {DRONE_OPERATORS.map((op) => (
            <div key={op.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-sm p-5">
              <div className="flex gap-4 mb-4">
                <img src={op.image} className="w-16 h-16 rounded-2xl object-cover" alt={op.name} referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm">{op.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="fill-tertiary text-tertiary" />
                      <span className="text-[10px] font-bold">{op.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1">Experience: {op.experience}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase">DGCA Certified</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase">Insured</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                <div>
                  <span className="text-lg font-extrabold text-primary">₹{op.price}</span>
                  <span className="text-[10px] text-on-surface-variant font-medium ml-1">per acre</span>
                </div>
                <button 
                  onClick={() => setScreen('invoice')}
                  className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold shadow-md"
                >
                  Select & Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InvoiceScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <div className="bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden shadow-lg">
          <div className="bg-primary p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-headline font-bold">Booking Summary</h3>
                <p className="text-xs opacity-80 mt-1">ID: #AP-2026-8821</p>
              </div>
              <FileText size={32} className="opacity-40" />
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Service</span>
                <span className="text-xs font-bold">Tractor Rental (Mahindra Arjun)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Duration</span>
                <span className="text-xs font-bold">4 Hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Date</span>
                <span className="text-xs font-bold">March 20, 2026</span>
              </div>
            </div>

            <div className="h-px bg-outline-variant"></div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Base Rate (₹800 x 4)</span>
                <span className="font-bold">₹3,200</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Driver Fees</span>
                <span className="font-bold">₹500</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Fuel Surcharge</span>
                <span className="font-bold">₹300</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">GST (18%)</span>
                <span className="font-bold">₹720</span>
              </div>
            </div>

            <div className="bg-primary-container/20 p-4 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-bold text-primary">Total Amount</span>
              <span className="text-xl font-extrabold text-primary">₹4,720</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant">
            <Info size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-on-surface-variant leading-relaxed">
              By proceeding, you agree to our <span className="text-primary font-bold">Terms of Service</span> and <span className="text-primary font-bold">Cancellation Policy</span>.
            </p>
          </div>
          
          <button 
            onClick={() => setScreen('payment')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [method, setMethod] = useState('upi');

  return (
    <div className="pb-24">
      <div className="px-6 py-8">
        <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-on-surface-variant">Amount to Pay</span>
            <span className="text-2xl font-headline font-extrabold text-primary">₹4,720</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            <Shield size={12} /> Secure 256-bit SSL Encryption
          </div>
        </div>

        <h3 className="text-sm font-bold mb-4 ml-1">Select Payment Method</h3>
        <div className="space-y-3">
          {[
            { id: 'upi', name: 'UPI (GPay, PhonePe, Paytm)', icon: Zap },
            { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
            { id: 'net', name: 'Net Banking', icon: Globe },
            { id: 'cash', name: 'Cash on Service', icon: Box }
          ].map((m) => (
            <button 
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                method === m.id ? 'bg-primary-container/10 border-primary shadow-sm' : 'bg-surface-container-lowest border-outline-variant'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method === m.id ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                <m.icon size={20} />
              </div>
              <span className={`flex-1 text-left font-bold text-sm ${method === m.id ? 'text-primary' : ''}`}>{m.name}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'border-primary' : 'border-outline-variant'}`}>
                {method === m.id && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <button 
            onClick={() => setScreen('tracking')}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Lock size={18} /> Pay ₹4,720 Securely
          </button>
          <p className="text-center text-[10px] text-on-surface-variant mt-4 font-medium">
            Powered by Razorpay • Trusted by 10M+ Farmers
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 bg-background">
      <button 
        onClick={() => setScreen('language')}
        className="self-start p-2 -ml-2 mb-8 rounded-full hover:bg-surface-container transition-colors"
      >
        <ArrowLeft size={24} className="text-on-surface" />
      </button>

      <div className="mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
          <Smartphone size={32} className="text-primary" />
        </div>
        <h2 className="text-3xl font-headline font-bold text-on-surface">Welcome to AgriPower</h2>
        <p className="text-on-surface-variant mt-2">Enter your mobile number to get started</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">+91</span>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="00000 00000"
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-14 pr-4 text-lg font-medium focus:outline-none focus:border-primary transition-colors tracking-widest"
            />
          </div>
        </div>

        <button 
          onClick={() => setScreen('otp')}
          disabled={phone.length !== 10}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
            phone.length === 10 
              ? 'bg-primary text-white' 
              : 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
          }`}
        >
          Send OTP <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-auto pt-12 text-center">
        <p className="text-xs text-on-surface-variant leading-relaxed">
          By continuing, you agree to AgriPower's <br />
          <span className="text-primary font-bold">Terms of Service</span> and <span className="text-primary font-bold">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

const OTPScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 bg-background">
      <button 
        onClick={() => setScreen('login')}
        className="self-start p-2 -ml-2 mb-8 rounded-full hover:bg-surface-container transition-colors"
      >
        <ArrowLeft size={24} className="text-on-surface" />
      </button>

      <div className="mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
          <Lock size={32} className="text-primary" />
        </div>
        <h2 className="text-3xl font-headline font-bold text-on-surface">Verify Identity</h2>
        <p className="text-on-surface-variant mt-2">We've sent a 4-digit code to your mobile number</p>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between gap-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="number"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-16 h-16 bg-surface-container-low border border-outline-variant rounded-2xl text-center text-2xl font-bold focus:outline-none focus:border-primary transition-colors"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-on-surface-variant">
            Didn't receive code? <button className="text-primary font-bold">Resend in 30s</button>
          </p>
        </div>

        <button 
          onClick={() => setScreen('home')}
          disabled={otp.some(d => !d)}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
            !otp.some(d => !d)
              ? 'bg-primary text-white' 
              : 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
          }`}
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
};

const MarketPricesScreen = () => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-emerald-600 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-2xl font-headline font-extrabold">Mandi Bhav</h2>
            <p className="text-xs mt-1 opacity-90">Live market rates from across India</p>
            <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
              <Clock size={12} />
              <span className="text-[10px] font-bold">Updated: 10 mins ago</span>
            </div>
          </div>
          <Activity className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-12" />
        </div>

        <div className="space-y-4">
          {MARKET_RATES.map((rate) => (
            <div key={rate.id} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{rate.crop}</h4>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {rate.mandi}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-primary">{rate.price}</p>
                  <p className={`text-[10px] font-bold flex items-center justify-end gap-1 mt-1 ${rate.trend === 'up' ? 'text-emerald-600' : 'text-error'}`}>
                    {rate.trend === 'up' ? <Plus size={10} /> : <Minus size={10} />} {rate.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommunityScreen = () => {
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-headline font-bold">Kisan Forum</h3>
          <button className="bg-primary text-white p-3 rounded-2xl shadow-lg">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {COMMUNITY_POSTS.map((post) => (
            <div key={post.id} className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{post.author}</h4>
                  <p className="text-[10px] text-on-surface-variant">{post.location} • {post.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-on-surface mb-4">{post.content}</p>
              <div className="flex gap-6 pt-4 border-t border-outline-variant">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <Star size={16} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <MessageCircle size={16} />
                  <span className="text-xs font-bold">{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WeatherDetailScreen = () => {
  const forecast = [
    { day: 'Tomorrow', temp: '26°C', icon: Wind, desc: 'Sunny' },
    { day: 'Thursday', temp: '25°C', icon: Droplets, desc: 'Cloudy' },
    { day: 'Friday', temp: '22°C', icon: Zap, desc: 'Storm' },
    { day: 'Saturday', temp: '24°C', icon: Wind, desc: 'Clear' },
  ];

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-primary-container rounded-3xl p-8 text-on-primary-fixed mb-8 relative overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
            alt="Weather"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10">
            <h2 className="text-5xl font-headline font-extrabold">24°C</h2>
            <p className="text-lg font-bold mt-2">Mostly Sunny</p>
            <p className="text-xs opacity-80">Ludhiana, Punjab • Updated 5m ago</p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <Droplets size={20} className="mx-auto mb-2" />
                <p className="text-xs font-bold">45%</p>
                <p className="text-[8px] uppercase opacity-70">Humidity</p>
              </div>
              <div className="text-center">
                <Wind size={20} className="mx-auto mb-2" />
                <p className="text-xs font-bold">12 km/h</p>
                <p className="text-[8px] uppercase opacity-70">Wind</p>
              </div>
              <div className="text-center">
                <Zap size={20} className="mx-auto mb-2" />
                <p className="text-xs font-bold">10%</p>
                <p className="text-[8px] uppercase opacity-70">Rain</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-headline font-bold mb-6">7-Day Forecast</h3>
        <div className="space-y-4">
          {forecast.map((item) => (
            <div key={item.day} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-container/20 text-primary rounded-xl flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{item.day}</p>
                  <p className="text-[10px] text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
              <p className="text-lg font-extrabold text-primary">{item.temp}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-secondary-container rounded-3xl text-on-secondary-container">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Shield size={16} /> Farmer's Advice
          </h4>
          <p className="text-xs leading-relaxed opacity-90">
            Conditions are ideal for harvesting wheat today. Expect light rain on Friday, so ensure your storage is ready.
          </p>
        </div>
      </div>
    </div>
  );
};

const NewsScreen = () => {
  const news = [
    { id: 'n1', title: 'New Subsidy for Solar Pumps Announced', source: 'Agri News', time: '1h ago', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400' },
    { id: 'n2', title: 'Punjab Farmers Adopt New Wheat Variety', source: 'Kisan Patrika', time: '4h ago', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400' },
    { id: 'n3', title: 'Drone Technology to Revolutionize Spraying', source: 'Tech Agri', time: '1d ago', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <h3 className="text-xl font-headline font-bold mb-6">Agriculture News</h3>
        <div className="space-y-6">
          {news.map((item) => (
            <div key={item.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-sm">
              <img src={item.image} className="w-full h-40 object-cover" alt={item.title} referrerPolicy="no-referrer" />
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.source}</span>
                  <span className="text-[10px] text-on-surface-variant">{item.time}</span>
                </div>
                <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1">
                  Read Full Story <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImportExportScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  
  const goods = [
    { id: 'g1', name: 'Coconuts', price: '₹45/unit', type: 'export', origin: 'Mysuru, KA', image: 'https://images.unsplash.com/photo-1550077404-944c5072f752?auto=format&fit=crop&q=80&w=400' },
    { id: 'g2', name: 'Organic Tomatoes', price: '₹30/kg', type: 'export', origin: 'Kolar, KA', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400' },
    { id: 'g3', name: 'Alphonso Mangoes', price: '₹800/box', type: 'export', origin: 'Ratnagiri, MH', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400' },
    { id: 'g7', name: 'Grapes (Thompson)', price: '₹120/kg', type: 'export', origin: 'Vijayapura, KA', image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&q=80&w=400' },
    { id: 'g8', name: 'Pomegranates', price: '₹150/kg', type: 'export', origin: 'Bagalkot, KA', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400' },
    { id: 'g9', name: 'Arabica Coffee', price: '₹450/kg', type: 'export', origin: 'Chikkamagaluru, KA', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400' },
    { id: 'g4', name: 'Fertilizers', price: '₹1200/bag', type: 'import', origin: 'Global', image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400' },
    { id: 'g5', name: 'Hybrid Seeds', price: '₹500/pkt', type: 'import', origin: 'Netherlands', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400' },
    { id: 'g6', name: 'Green Chilies', price: '₹60/kg', type: 'export', origin: 'Haveri, KA', image: 'https://images.unsplash.com/photo-1588253584673-c70118a3f729?auto=format&fit=crop&q=80&w=400' },
  ];

  const filteredGoods = goods.filter(g => g.type === activeTab);

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="flex bg-surface-container-low p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'export' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant'}`}
          >
            Exports (Sell)
          </button>
          <button 
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'import' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant'}`}
          >
            Imports (Buy)
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredGoods.map((item) => (
            <div key={item.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-sm flex">
              <img src={item.image} className="w-32 h-32 object-cover" alt={item.name} referrerPolicy="no-referrer" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                    <span className="text-[10px] font-bold text-primary">{item.price}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 flex items-center gap-1">
                    <MapPin size={10} /> {item.origin}
                  </p>
                </div>
                <button 
                  onClick={() => activeTab === 'export' ? setScreen('find-buyers') : setScreen('place-order')}
                  className="w-full py-2 bg-primary-container/20 text-primary text-[10px] font-bold rounded-lg mt-2"
                >
                  {activeTab === 'export' ? 'Find Buyers' : 'Order Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-secondary-container rounded-3xl text-on-secondary-container">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Globe size={16} /> Global Trade Info
          </h4>
          <p className="text-xs leading-relaxed opacity-90">
            Export demand for Coconuts is up by 15% in the Middle East. Consider bulk shipping for better margins.
          </p>
        </div>
      </div>
    </div>
  );
};

const FindBuyersScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [quantity, setQuantity] = useState(100);
  const buyers = [
    { id: 'b1', name: 'Global Fruits Ltd', location: 'Dubai, UAE', demand: 'High', price: '₹140/kg', rating: 4.9 },
    { id: 'b2', name: 'Fresh Mart Europe', location: 'London, UK', demand: 'Medium', price: '₹155/kg', rating: 4.7 },
    { id: 'b3', name: 'Reliance Retail', location: 'Mumbai, India', demand: 'High', price: '₹110/kg', rating: 4.8 },
  ];

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-surface-container-low p-6 rounded-3xl mb-8 border border-outline-variant">
          <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-on-surface-variant">Set Your Quantity</h3>
          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => setQuantity(Math.max(0, quantity - 50))}
              className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xl"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-headline font-bold text-primary">{quantity}</span>
              <span className="text-xs font-bold text-on-surface-variant ml-2">kg</span>
            </div>
            <button 
              onClick={() => setQuantity(quantity + 50)}
              className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xl"
            >
              +
            </button>
          </div>
        </div>

        <h3 className="text-lg font-headline font-bold mb-6">Verified Buyers</h3>
        <div className="space-y-4">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-sm">{buyer.name}</h4>
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-1">
                    <Globe size={10} /> {buyer.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <Star size={10} fill="currentColor" /> {buyer.rating}
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-y border-outline-variant/50 mb-4">
                <div className="text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold">Offer Price</p>
                  <p className="text-sm font-bold text-primary">{buyer.price}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold">Demand</p>
                  <p className="text-sm font-bold text-emerald-600">{buyer.demand}</p>
                </div>
              </div>

              <button 
                onClick={() => setScreen('trade-tracking')}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Accept Offer & Ship
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TradeTrackingScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pb-24">
      <div className="relative h-[400px] bg-surface-container-highest">
        <div className="absolute inset-0 bg-blue-50 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Global Map Mock */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <path d="M 50 200 Q 150 100 250 200 T 450 200" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="50" cy="200" r="4" fill="#3b82f6" />
            <circle cx="450" cy="200" r="4" fill="#3b82f6" />
          </svg>

          {/* Moving Ship/Truck */}
          <motion.div 
            animate={{ x: [50, 250], y: [200, 150] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute p-3 bg-secondary text-white rounded-full shadow-xl z-10"
          >
            <Truck size={24} />
          </motion.div>

          {/* Destination Marker */}
          <div className="absolute top-[150px] left-[250px] -translate-x-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full shadow-lg z-10">
            <Globe size={20} />
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-outline-variant">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</p>
          <p className="text-xs font-bold text-primary">In Transit (Sea)</p>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-outline-variant p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-headline font-bold">Shipment Tracking</h3>
              <p className="text-xs text-on-surface-variant">Order ID: #EXP-99281</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Global</div>
          </div>

          <div className="space-y-6 mb-8">
            {[
              { label: 'Port Clearance', time: 'Today, 10:00 AM', done: true },
              { label: 'Loaded on Vessel', time: 'Today, 2:30 PM', done: true },
              { label: 'In Transit', time: 'Expected in 4 days', done: false },
              { label: 'Destination Arrival', time: 'March 22, 2026', done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex gap-4 items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500 text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                  {step.done ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 bg-current rounded-full"></div>}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${step.done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.label}</h4>
                  <p className="text-[10px] text-on-surface-variant">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <Truck size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xs">Maersk Line</h4>
              <p className="text-[10px] text-on-surface-variant">Container: MSKU-129384</p>
            </div>
            <button className="p-2 text-primary">
              <Mic size={18} />
            </button>
          </div>
          
          <button 
            onClick={() => setScreen('home')}
            className="w-full mt-6 py-4 bg-surface-container-highest text-on-surface font-bold text-sm rounded-2xl active:scale-95 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const PlaceOrderScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('Bags');
  
  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 mb-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap size={40} className="text-primary" />
          </div>
          <h3 className="text-xl font-headline font-bold text-primary">Order as per Need</h3>
          <p className="text-xs text-on-surface-variant mt-2">Select the exact quantity required for your farm</p>
        </div>

        <div className="bg-surface-container-low p-6 rounded-3xl mb-8 border border-outline-variant">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Select Quantity</h3>
            <select 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)}
              className="bg-surface-container-highest text-xs font-bold px-3 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-primary"
            >
              <option>Bags</option>
              <option>kg</option>
              <option>Litres</option>
              <option>Packets</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary font-bold text-2xl shadow-sm active:scale-90 transition-all"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <span className="text-4xl font-headline font-bold text-primary">{quantity}</span>
              <p className="text-xs font-bold text-on-surface-variant mt-1">{unit}</p>
            </div>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary font-bold text-2xl shadow-sm active:scale-90 transition-all"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant">
            <span className="text-xs text-on-surface-variant">Estimated Delivery</span>
            <span className="text-xs font-bold">2-3 Business Days</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant">
            <span className="text-xs text-on-surface-variant">Shipping Method</span>
            <span className="text-xs font-bold">Express Agri-Logistics</span>
          </div>
        </div>

        <button 
          onClick={() => setScreen('trade-tracking')}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Confirm Order <ChevronRight size={18} />
        </button>
        
        <p className="text-[10px] text-center text-on-surface-variant mt-4 px-8">
          By confirming, you agree to the regional trade terms and quality assurance protocols.
        </p>
      </div>
    </div>
  );
};

const LocationSelectScreen = ({ onSelect }: { onSelect: (loc: string) => void }) => {
  const popularCities = [
    // Karnataka Focus
    'Bengaluru, Karnataka', 'Mysuru, Karnataka', 'Hubballi-Dharwad, Karnataka', 
    'Belagavi, Karnataka', 'Kalaburagi, Karnataka', 'Mangaluru, Karnataka', 
    'Davanagere, Karnataka', 'Ballari, Karnataka', 'Vijayapura, Karnataka', 
    'Shivamogga, Karnataka', 'Tumakuru, Karnataka', 'Raichur, Karnataka', 
    'Bidar, Karnataka', 'Hassan, Karnataka', 'Gadag, Karnataka', 
    'Udupi, Karnataka', 'Bagalkot, Karnataka', 'Chikkamagaluru, Karnataka',
    'Mandya, Karnataka', 'Chamarajanagar, Karnataka', 'Chitradurga, Karnataka',
    'Haveri, Karnataka', 'Koppal, Karnataka', 'Yadgir, Karnataka',
    'Kolar, Karnataka', 'Chikkaballapur, Karnataka', 'Ramanagara, Karnataka',
    
    // Major India
    'Ludhiana, Punjab', 'Amritsar, Punjab', 'Bathinda, Punjab', 'Jalandhar, Punjab', 
    'Patiala, Punjab', 'Chandigarh', 'Delhi', 'Jaipur, Rajasthan', 'Jodhpur, Rajasthan',
    'Ahmedabad, Gujarat', 'Surat, Gujarat', 'Rajkot, Gujarat',
    'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Nagpur, Maharashtra', 'Nashik, Maharashtra',
    'Hyderabad, Telangana', 'Warangal, Telangana',
    'Chennai, Tamil Nadu', 'Coimbatore, Tamil Nadu', 'Madurai, Tamil Nadu',
    'Kochi, Kerala', 'Thiruvananthapuram, Kerala',
    'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Varanasi, Uttar Pradesh',
    'Patna, Bihar', 'Gaya, Bihar',
    'Kolkata, West Bengal', 'Siliguri, West Bengal',
    'Bhopal, Madhya Pradesh', 'Indore, Madhya Pradesh',
    'Guwahati, Assam', 'Bhubaneswar, Odisha'
  ];
  const [search, setSearch] = useState('');

  const filtered = popularCities.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-24">
      <div className="px-6 py-6">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text"
            placeholder="Search city or village..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <button className="w-full flex items-center gap-3 p-4 bg-primary-container/20 rounded-2xl mb-8 text-primary border border-primary/10">
          <Navigation size={18} />
          <span className="text-sm font-bold">Use Current Location</span>
        </button>

        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Popular Locations</h3>
        <div className="space-y-2">
          {filtered.map((city) => (
            <button 
              key={city}
              onClick={() => onSelect(city)}
              className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant hover:border-primary transition-colors"
            >
              <span className="text-sm font-medium">{city}</span>
              <ChevronRight size={16} className="text-on-surface-variant" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('language');
  const [history, setHistory] = useState<Screen[]>([]);
  const [location, setLocation] = useState('Bengaluru, Karnataka');

  const navigateTo = (newScreen: Screen) => {
    setHistory([...history, screen]);
    setScreen(newScreen);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setScreen(prev);
    }
  };

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    goBack();
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen setScreen={navigateTo} location={location} />;
      case 'equipment': return <EquipmentScreen setScreen={navigateTo} />;
      case 'drones': return <DroneScreen setScreen={navigateTo} />;
      case 'logistics': return <LogisticsScreen setScreen={navigateTo} />;
      case 'assistant': return <AssistantScreen />;
      case 'profile': return <ProfileScreen setScreen={navigateTo} />;
      case 'alerts': return <AlertsScreen />;
      case 'voice': return <VoiceScreen />;
      case 'chat': return <ChatScreen />;
      case 'offline': return <OfflineScreen />;
      case 'settings': return <SettingsScreen />;
      case 'language': return <LanguageSelectScreen onSelect={() => setScreen('home')} />;
      case 'tractor-list': return <TractorListScreen setScreen={navigateTo} />;
      case 'jcb-booking': return <JCBBookingScreen setScreen={navigateTo} />;
      case 'tracking': return <TrackingScreen setScreen={navigateTo} />;
      case 'categories': return <CategoriesScreen setScreen={navigateTo} />;
      case 'equipment-detail': return <EquipmentDetailScreen setScreen={navigateTo} />;
      case 'truck-search': return <TruckSearchScreen setScreen={navigateTo} />;
      case 'truck-results': return <TruckResultsScreen setScreen={navigateTo} />;
      case 'drone-booking': return <DroneBookingScreen setScreen={navigateTo} />;
      case 'drone-operators': return <DroneOperatorsScreen setScreen={navigateTo} />;
      case 'invoice': return <InvoiceScreen setScreen={navigateTo} />;
      case 'payment': return <PaymentScreen setScreen={navigateTo} />;
      case 'login': return <LoginScreen setScreen={navigateTo} />;
      case 'otp': return <OTPScreen setScreen={navigateTo} />;
      case 'market-prices': return <MarketPricesScreen />;
      case 'community': return <CommunityScreen />;
      case 'weather-detail': return <WeatherDetailScreen />;
      case 'news': return <NewsScreen />;
      case 'location-select': return <LocationSelectScreen onSelect={handleLocationSelect} />;
      case 'import-export': return <ImportExportScreen setScreen={navigateTo} />;
      case 'find-buyers': return <FindBuyersScreen setScreen={navigateTo} />;
      case 'trade-tracking': return <TradeTrackingScreen setScreen={navigateTo} />;
      case 'place-order': return <PlaceOrderScreen setScreen={navigateTo} />;
      default: return <HomeScreen setScreen={navigateTo} location={location} />;
    }
  };

  const getTitle = () => {
    switch (screen) {
      case 'home': return 'AgriPower';
      case 'equipment': return 'Rent Equipment';
      case 'drones': return 'Drone Services';
      case 'logistics': return 'Logistics';
      case 'assistant': return 'AI Assistant';
      case 'profile': return 'My Profile';
      case 'alerts': return 'Notifications';
      case 'voice': return 'Voice Assistant';
      case 'chat': return 'Support Chat';
      case 'offline': return 'Offline Booking';
      case 'settings': return 'Settings';
      case 'tractor-list': return 'Tractor Rentals';
      case 'jcb-booking': return 'JCB Booking';
      case 'tracking': return 'Live Tracking';
      case 'categories': return 'Equipment Categories';
      case 'equipment-detail': return 'Equipment Details';
      case 'truck-search': return 'Rural Transport';
      case 'truck-results': return 'Available Trucks';
      case 'drone-booking': return 'Drone Spraying';
      case 'drone-operators': return 'Select Operator';
      case 'invoice': return 'Bill Breakdown';
      case 'payment': return 'Secure Payment';
      case 'login': return 'Login';
      case 'otp': return 'Verify OTP';
      case 'market-prices': return 'Market Rates';
      case 'community': return 'Kisan Forum';
      case 'weather-detail': return 'Weather Forecast';
      case 'news': return 'Agri News';
      case 'location-select': return 'Select Location';
      case 'import-export': return 'Import & Export';
      case 'find-buyers': return 'Find Buyers';
      case 'trade-tracking': return 'Trade Tracking';
      case 'place-order': return 'Place Order';
      default: return 'AgriPower';
    }
  };

  if (screen === 'language') return <LanguageSelectScreen onSelect={() => setScreen('login')} />;
  if (screen === 'login') return <LoginScreen setScreen={navigateTo} />;
  if (screen === 'otp') return <OTPScreen setScreen={navigateTo} />;

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/20">
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-background">
        <Header 
          title={getTitle()} 
          onBack={history.length > 0 ? goBack : undefined}
          onProfileClick={() => navigateTo('profile')}
          onAlertsClick={() => navigateTo('alerts')}
        />
        
        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Navbar activeScreen={screen} setScreen={navigateTo} />
      </div>
    </div>
  );
}
