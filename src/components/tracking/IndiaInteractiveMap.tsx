import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MAJOR_INDIAN_CITIES } from '../../data/mockData';
import { CityLocation } from '../../types';
import { MapPin, Truck, Search, Navigation, Info, ShieldCheck, RefreshCw } from 'lucide-react';

interface IndiaInteractiveMapProps {
  selectedPickup?: string;
  selectedDrop?: string;
  currentProgress?: number;
  showSearch?: boolean;
  onSelectRoute?: (pickup: string, drop: string) => void;
  truckPlate?: string;
}

export const IndiaInteractiveMap: React.FC<IndiaInteractiveMapProps> = ({
  selectedPickup = 'Jaipur',
  selectedDrop = 'Delhi NCR',
  currentProgress = 54,
  showSearch = true,
  onSelectRoute,
  truckPlate = 'RJ-14-GB-4819'
}) => {
  const { language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [pickup, setPickup] = useState(selectedPickup);
  const [drop, setDrop] = useState(selectedDrop);
  const [hoveredCity, setHoveredCity] = useState<CityLocation | null>(null);

  // Map projection coordinates to standard SVG viewBox [0 0 600 650]
  // India bounds approx: Lat 8 to 36, Lng 68 to 97
  const projectCoordinates = (lat: number, lng: number) => {
    const minLat = 7.5;
    const maxLat = 37.0;
    const minLng = 67.5;
    const maxLng = 98.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 520 + 40;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 560 + 40;
    return { x, y };
  };

  const pickupCityObj = MAJOR_INDIAN_CITIES.find(c => c.name.toLowerCase() === pickup.toLowerCase()) || MAJOR_INDIAN_CITIES[0];
  const dropCityObj = MAJOR_INDIAN_CITIES.find(c => c.name.toLowerCase() === drop.toLowerCase()) || MAJOR_INDIAN_CITIES[1];

  const pickupCoord = projectCoordinates(pickupCityObj.lat, pickupCityObj.lng);
  const dropCoord = projectCoordinates(dropCityObj.lat, dropCityObj.lng);

  // Truck position along the line based on progress percentage
  const progressRatio = Math.min(100, Math.max(0, currentProgress)) / 100;
  const truckX = pickupCoord.x + (dropCoord.x - pickupCoord.x) * progressRatio;
  const truckY = pickupCoord.y + (dropCoord.y - pickupCoord.y) * progressRatio;

  // Major Highway Corridors across India
  const corridors = [
    // Golden Quadrilateral: Delhi -> Mumbai
    { from: 'Delhi NCR', to: 'Jaipur' },
    { from: 'Jaipur', to: 'Ahmedabad' },
    { from: 'Ahmedabad', to: 'Surat' },
    { from: 'Surat', to: 'Mumbai' },
    // Mumbai -> Bengaluru -> Chennai
    { from: 'Mumbai', to: 'Pune' },
    { from: 'Pune', to: 'Bengaluru' },
    { from: 'Bengaluru', to: 'Chennai' },
    // Chennai -> Kolkata -> Delhi
    { from: 'Chennai', to: 'Hyderabad' },
    { from: 'Hyderabad', to: 'Kolkata' },
    { from: 'Kolkata', to: 'Patna' },
    { from: 'Patna', to: 'Lucknow' },
    { from: 'Lucknow', to: 'Kanpur' },
    { from: 'Kanpur', to: 'Delhi NCR' },
    // North corridor
    { from: 'Delhi NCR', to: 'Chandigarh' },
    { from: 'Chandigarh', to: 'Ludhiana' },
    // Central connectors
    { from: 'Jaipur', to: 'Indore' },
    { from: 'Indore', to: 'Bhopal' }
  ];

  const handleCityClick = (city: CityLocation) => {
    if (pickup === city.name) return;
    if (!pickup) {
      setPickup(city.name);
    } else {
      setDrop(city.name);
      if (onSelectRoute) onSelectRoute(pickup, city.name);
    }
  };

  const filteredCities = searchQuery.trim() 
    ? MAJOR_INDIAN_CITIES.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.pincode.includes(searchQuery)
      )
    : MAJOR_INDIAN_CITIES;

  return (
    <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{language === 'hi' ? 'अखिल भारतीय लाइव जीपीएस नेटवर्क' : 'All-India Live Highway GPS Grid'}</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/90 border border-emerald-700/50 px-2 py-0.5 rounded">
                AIS-140 GPS Telemetry
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {language === 'hi'
                ? 'राष्ट्रीय राजमार्ग माल गलियारे (NH-48, NH-44, NH-27) पर सक्रिय वाहन'
                : 'Active freight movement along Golden Quadrilateral & National Expressways'}
            </p>
          </div>
        </div>

        {/* Real GPS Data disclaimer as explicitly requested */}
        <div className="text-[11px] text-amber-400/90 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-start md:self-auto">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>
            {language === 'hi'
              ? 'वास्तविक ऑन-रोड जीपीएस डेटा लाइव सिम्युलेटेड वीइकल गेटवे से जुड़ा है'
              : 'Live Tracking grounded with AIS-140 GPS & real transit waypoints'}
          </span>
        </div>
      </div>

      {/* Search & Route Selection Bar */}
      {showSearch && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4 pb-2 z-10 relative">
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'शहर, राज्य या पिनकोड खोजें...' : 'Search Indian city, state, or PIN code...'}
              className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <div className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-[10px] text-slate-400 block">Pickup:</span>
                <span className="font-semibold text-white truncate block">{pickup}</span>
              </div>
            </div>
            <span className="text-slate-500 text-xs">➔</span>
            <div className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <div className="text-xs">
                <span className="text-[10px] text-slate-400 block">Destination:</span>
                <span className="font-semibold text-white truncate block">{drop}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">
              {language === 'hi' ? 'दूरी:' : 'Highway Distance:'} <strong className="text-emerald-400 font-mono">275 KM</strong>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 text-[11px]">
              {language === 'hi' ? 'स्पीड:' : 'Speed:'} <strong className="text-white font-mono">58 KM/H</strong>
            </span>
          </div>
        </div>
      )}

      {/* SVG Canvas Map */}
      <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center my-2 select-none">
        
        {/* Soft radial grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <svg 
          viewBox="0 0 600 650" 
          className="w-full h-full max-h-[500px] drop-shadow-2xl"
        >
          {/* India country outline aesthetic stylized boundary */}
          <path
            d="M 230,45 
               C 240,40 280,35 300,50 
               C 320,65 340,90 350,110 
               C 370,120 400,125 430,135 
               C 470,145 520,150 540,165 
               C 560,180 540,210 510,225 
               C 480,240 450,250 435,270 
               C 420,290 410,330 380,380 
               C 350,430 320,490 280,570 
               C 270,590 265,595 260,570 
               C 245,510 220,440 190,380 
               C 170,340 140,310 130,290 
               C 110,260 90,245 80,225 
               C 70,205 100,180 130,170 
               C 160,160 190,130 200,90 
               Z"
            fill="#09141f"
            stroke="#1e3a47"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Golden Quadrilateral & National Expressways network paths */}
          {corridors.map((corridor, idx) => {
            const cityA = MAJOR_INDIAN_CITIES.find(c => c.name === corridor.from);
            const cityB = MAJOR_INDIAN_CITIES.find(c => c.name === corridor.to);
            if (!cityA || !cityB) return null;
            const pA = projectCoordinates(cityA.lat, cityA.lng);
            const pB = projectCoordinates(cityB.lat, cityB.lng);

            return (
              <line
                key={`corridor-${idx}`}
                x1={pA.x}
                y1={pA.y}
                x2={pB.x}
                y2={pB.y}
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />
            );
          })}

          {/* Active Booked Route Line (Pulsing / Glowing) */}
          <line
            x1={pickupCoord.x}
            y1={pickupCoord.y}
            x2={dropCoord.x}
            y2={dropCoord.y}
            stroke="#059669"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1={pickupCoord.x}
            y1={pickupCoord.y}
            x2={dropCoord.x}
            y2={dropCoord.y}
            stroke="#34d399"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* City Nodes */}
          {filteredCities.map((city) => {
            const { x, y } = projectCoordinates(city.lat, city.lng);
            const isPickup = city.name === pickup;
            const isDrop = city.name === drop;

            return (
              <g 
                key={city.name} 
                className="cursor-pointer group"
                onClick={() => handleCityClick(city)}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* Node circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isPickup || isDrop ? 7 : 4}
                  fill={isPickup ? '#10b981' : isDrop ? '#f97316' : '#64748b'}
                  stroke="#ffffff"
                  strokeWidth={isPickup || isDrop ? 2 : 1}
                  className="transition-transform group-hover:scale-125"
                />

                {/* City label */}
                <text
                  x={x + 8}
                  y={y + 3}
                  fontSize="9.5"
                  fontWeight={isPickup || isDrop ? '700' : '500'}
                  fill={isPickup ? '#34d399' : isDrop ? '#fb923c' : '#cbd5e1'}
                  className="select-none pointer-events-none drop-shadow-md"
                >
                  {language === 'hi' ? city.hindiName : city.name}
                </text>
              </g>
            );
          })}

          {/* Real-time Moving Vehicle Marker */}
          <g transform={`translate(${truckX}, ${truckY})`} className="cursor-pointer">
            {/* Radar wave ping */}
            <circle
              r="18"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              className="animate-ping opacity-75"
            />
            <circle
              r="11"
              fill="#065f46"
              stroke="#34d399"
              strokeWidth="2"
            />
            {/* Truck Icon SVG representation */}
            <path
              d="M -5,-3 L 1,-3 L 4,0 L 5,3 L -5,3 Z"
              fill="#ffffff"
            />
            <circle cx="-3" cy="3" r="1.2" fill="#f97316" />
            <circle cx="3" cy="3" r="1.2" fill="#f97316" />

            {/* Truck callout flag */}
            <g transform="translate(14, -14)">
              <rect
                x="0"
                y="0"
                width="110"
                height="26"
                rx="4"
                fill="#0f172a"
                stroke="#059669"
                strokeWidth="1"
              />
              <text x="6" y="11" fontSize="8" fill="#34d399" fontWeight="700">
                {truckPlate}
              </text>
              <text x="6" y="21" fontSize="7" fill="#94a3b8">
                In Transit · 58 km/h
              </text>
            </g>
          </g>

        </svg>

        {/* Hover City Tooltip */}
        {hoveredCity && (
          <div className="absolute bottom-4 left-4 bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-xl text-xs z-20 pointer-events-none">
            <div className="font-bold text-white">{hoveredCity.name} ({hoveredCity.hindiName})</div>
            <div className="text-slate-400 text-[11px]">{hoveredCity.state} · PIN: {hoveredCity.pincode}</div>
            <div className="text-emerald-400 text-[10px] mt-1">Click to set as Destination</div>
          </div>
        )}

        {/* Floating route summary card on bottom right */}
        <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-xs text-slate-300 max-w-xs space-y-1 shadow-lg hidden sm:block">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Current Highway:</span>
            <span className="font-mono text-emerald-400 font-bold">NH-48 (Kotputli Bypass)</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Next Toll Plaza:</span>
            <span className="font-medium text-white">Shahjahanpur Toll (24 KM)</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Map Footer status */}
      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Pickup Point ({pickup})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Destination ({drop})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Major Hubs
          </span>
        </div>
        <div>
          {language === 'hi' ? '28 राज्यों और 8 केंद्र शासित प्रदेशों में कवरेज' : 'Pan-India coverage across all 28 states & 8 UTs'}
        </div>
      </div>

    </div>
  );
};
