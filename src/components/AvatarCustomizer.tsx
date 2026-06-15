import React, { useState } from 'react';
import { AvatarConfig } from '../types';
import { Palette, Smile, Crown, Sparkles, Check } from 'lucide-react';

interface AvatarCustomizerProps {
  config: AvatarConfig;
  onChange: (newConfig: AvatarConfig) => void;
}

const COLORS = [
  { name: 'Classic Yellow', hex: '#ECC94B' },
  { name: 'Roblox Blue', hex: '#3182CE' },
  { name: 'Bright Red', hex: '#E53E3E' },
  { name: 'Forest Green', hex: '#38A169' },
  { name: 'Charcoal Grey', hex: '#4A5568' },
  { name: 'Light Orange', hex: '#ED8936' },
  { name: 'Epic Pink', hex: '#ED64A6' },
  { name: 'Deep Purple', hex: '#805AD5' },
  { name: 'Dark Void', hex: '#1A202C' },
  { name: 'White Brick', hex: '#EDF2F7' }
];

const HATS: { id: AvatarConfig['hatType']; name: string; emoji: string }[] = [
  { id: 'none', name: 'ไม่มีหมอน/ทรงผม', emoji: '🧑' },
  { id: 'fedora', name: 'Classic Fedora หมวกสักหลาด', emoji: '🎩' },
  { id: 'cap', name: 'Roblox Cap หมวกแก๊ปแดง', emoji: '🧢' },
  { id: 'hair', name: 'Cool Spiky Blue Hair ทรงผมตั้ง', emoji: '💇‍♂️' },
  { id: 'headphones', name: 'Pro DJ Headphones หูฟัง', emoji: '🎧' },
];

const ACCESSORIES: { id: AvatarConfig['accessory']; name: string; emoji: string }[] = [
  { id: 'none', name: 'ไม่มีเครื่องประดับ', emoji: '❌' },
  { id: 'glasses', name: 'Aviator Glasses แว่นตาดำ', emoji: '🕶️' },
  { id: 'sword', name: 'Dual Swords ดาบคู่ด้านหลัง', emoji: '⚔️' },
  { id: 'cape', name: 'Legendary Red Cape ผ้าคลุมแดง', emoji: '🧣' },
];

const EXPRESSIONS: { id: AvatarConfig['faceExpression']; name: string; emoji: string }[] = [
  { id: 'classic', name: 'Classic Smile หน้ายิ้มคลาสสิก', emoji: '🙂' },
  { id: 'smile', name: 'Winning Smile ยิ้มกว้างภูมิใจ', emoji: '😀' },
  { id: 'cool', name: 'Chill Face แว่นตาชิลล์', emoji: '😎' },
  { id: 'wink', name: 'Playful Wink ขยิบตาขี้เล่น', emoji: '😉' },
  { id: 'focused', name: 'Beast Mode เกียร์โหดหน้าบู๊', emoji: '😠' },
];

export default function AvatarCustomizer({ config, onChange }: AvatarCustomizerProps) {
  const [selectedPart, setSelectedPart] = useState<'all' | 'head' | 'torso' | 'arms' | 'legs'>('all');

  const updateColor = (colorHex: string) => {
    const updated = { ...config };
    if (selectedPart === 'all') {
      updated.headColor = colorHex;
      updated.torsoColor = colorHex;
      updated.leftArmColor = colorHex;
      updated.rightArmColor = colorHex;
      updated.leftLegColor = colorHex;
      updated.rightLegColor = colorHex;
    } else if (selectedPart === 'head') {
      updated.headColor = colorHex;
    } else if (selectedPart === 'torso') {
      updated.torsoColor = colorHex;
    } else if (selectedPart === 'arms') {
      updated.leftArmColor = colorHex;
      updated.rightArmColor = colorHex;
    } else if (selectedPart === 'legs') {
      updated.leftLegColor = colorHex;
      updated.rightLegColor = colorHex;
    }
    onChange(updated);
  };

  const updateSingleField = <K extends keyof AvatarConfig>(field: K, value: AvatarConfig[K]) => {
    onChange({ ...config, [field]: value });
  };

  // Render SVG representation of customized minimalist R6 Roblox Character
  const renderAvatarSVG = () => {
    const {
      headColor,
      torsoColor,
      leftArmColor,
      rightArmColor,
      leftLegColor,
      rightLegColor,
      faceExpression,
      hatType,
      accessory
    } = config;

    return (
      <svg viewBox="0 0 240 280" className="w-full h-full max-h-[300px]" id="avatar-svg">
        <defs>
          <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse cx="120" cy="255" rx="55" ry="12" fill="url(#shadow)" />

        {/* Cape (Back Accessory) */}
        {accessory === 'cape' && (
          <path d="M 85 95 L 60 240 L 180 240 L 155 95 Z" fill="#E53E3E" opacity="0.9" stroke="#9B2C2C" strokeWidth="2" />
        )}

        {/* Swords on back (Back Accessory) */}
        {accessory === 'sword' && (
          <g>
            {/* Sword 1 \ */}
            <rect x="60" y="50" width="10" height="110" transform="rotate(-30, 60, 50)" fill="#CBD5E0" stroke="#4A5568" strokeWidth="2" />
            <rect x="50" y="140" width="30" height="8" transform="rotate(-30, 60, 50)" fill="#718096" />
            <rect x="62" y="148" width="6" height="25" transform="rotate(-30, 60, 50)" fill="#4A5568" />
            {/* Sword 2 / */}
            <rect x="170" y="50" width="10" height="110" transform="rotate(30, 170, 50)" fill="#CBD5E0" stroke="#4A5568" strokeWidth="2" />
            <rect x="160" y="140" width="30" height="8" transform="rotate(30, 170, 50)" fill="#718096" />
            <rect x="172" y="148" width="6" height="25" transform="rotate(30, 170, 50)" fill="#4A5568" />
          </g>
        )}

        {/* Left Leg */}
        <rect x="82" y="172" width="35" height="75" rx="3" fill={leftLegColor} stroke="#2D3748" strokeWidth="2.5" />

        {/* Right Leg */}
        <rect x="123" y="172" width="35" height="75" rx="3" fill={rightLegColor} stroke="#2D3748" strokeWidth="2.5" />

        {/* Torso */}
        <rect x="80" y="95" width="80" height="80" rx="4" fill={torsoColor} stroke="#2D3748" strokeWidth="2.5" />
        
        {/* Minimalist Shirt Design (V-Neck or Lines) */}
        <polygon points="105,95 135,95 120,115" fill={headColor} opacity="0.3" />
        <line x1="85" y1="135" x2="155" y2="135" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

        {/* Left Arm */}
        <rect x="42" y="95" width="34" height="75" rx="3" fill={leftArmColor} stroke="#2D3748" strokeWidth="2.5" />

        {/* Right Arm */}
        <rect x="164" y="95" width="34" height="75" rx="3" fill={rightArmColor} stroke="#2D3748" strokeWidth="2.5" />

        {/* Neck */}
        <rect x="108" y="85" width="24" height="12" fill={headColor} stroke="#2D3748" strokeWidth="2" />

        {/* Head */}
        <rect x="100" y="47" width="40" height="40" rx="5" fill={headColor} stroke="#2D3748" strokeWidth="2.5" />

        {/* Facial Expressions */}
        <g id="face-graphics">
          {faceExpression === 'classic' && (
            <g>
              {/* Eyes */}
              <circle cx="112" cy="61" r="2.5" fill="#1A202C" />
              <circle cx="128" cy="61" r="2.5" fill="#1A202C" />
              {/* Smile */}
              <path d="M 114 71 Q 120 78 126 71" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
          {faceExpression === 'smile' && (
            <g>
              {/* Joy Eyes */}
              <path d="M 110 63 Q 113 58 116 63" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 124 63 Q 127 58 130 63" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
              {/* Open Smiling Mouth */}
              <path d="M 112 68 Q 120 79 128 68 Z" fill="#E53E3E" stroke="#1A202C" strokeWidth="1.5" />
              {/* Teeth */}
              <path d="M 114 69 Q 120 72 126 69" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}
          {faceExpression === 'cool' && (
            <g>
              {/* Cool Sunglasses */}
              <polygon points="106,56 120,56 118,66 108,66" fill="#1A202C" stroke="#2D3748" strokeWidth="1" />
              <polygon points="120,56 134,56 132,66 122,66" fill="#1A202C" stroke="#2D3748" strokeWidth="1" />
              <line x1="116" y1="59" x2="124" y2="59" stroke="#1A202C" strokeWidth="2.5" />
              {/* Chill smile */}
              <path d="M 114 71 Q 118 75 126 71" fill="none" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
          {faceExpression === 'wink' && (
            <g>
              {/* Wink Eye (Left closed, Right open) */}
              <line x1="109" y1="62" x2="115" y2="62" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="128" cy="61" r="2.5" fill="#1A202C" />
              {/* Smile side */}
              <path d="M 115 71 Q 122 76 126 70" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
          {faceExpression === 'focused' && (
            <g>
              {/* Angry Eyebrows & Eyes */}
              <line x1="107" y1="56" x2="115" y2="59" stroke="#1A202C" strokeWidth="2" />
              <line x1="133" y1="56" x2="125" y2="59" stroke="#1A202C" strokeWidth="2" />
              <circle cx="112" cy="62" r="2" fill="#1A202C" />
              <circle cx="128" cy="62" r="2" fill="#1A202C" />
              {/* Focused Line Mouth */}
              <line x1="115" y1="71" x2="125" y2="71" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* Glasses Accessory (Front accessory) */}
        {accessory === 'glasses' && faceExpression !== 'cool' && (
          <g opacity="0.95">
            <rect x="105" y="56" width="12" height="10" rx="1" fill="none" stroke="#ED8936" strokeWidth="2.5" />
            <rect x="123" y="56" width="12" height="10" rx="1" fill="none" stroke="#ED8936" strokeWidth="2.5" />
            <line x1="117" y1="60" x2="123" y2="60" stroke="#ED8936" strokeWidth="2.5" />
            <line x1="100" y1="60" x2="105" y2="60" stroke="#ED8936" strokeWidth="1.5" />
            <line x1="135" y1="60" x2="140" y2="60" stroke="#ED8936" strokeWidth="1.5" />
          </g>
        )}

        {/* Hats & Hair */}
        {hatType === 'fedora' && (
          <g>
            {/* Fedora base brim */}
            <ellipse cx="120" cy="49" rx="32" ry="5" fill="#2D3748" stroke="#1A202C" strokeWidth="1.5" />
            {/* Red Stripe */}
            <rect x="98" y="32" width="44" height="9" fill="#E53E3E" />
            {/* Fedora Crown */}
            <path d="M 98 41 C 98 25, 142 25, 142 41 Z" fill="#2D3748" stroke="#1A202C" strokeWidth="1.5" />
          </g>
        )}

        {hatType === 'cap' && (
          <g>
            {/* Cap Crown */}
            <path d="M 98 48 C 96 30, 144 30, 142 48 Z" fill="#E53E3E" stroke="#9B2C2C" strokeWidth="1.5" />
            {/* Cap Visor */}
            <path d="M 120 48 L 148 42 L 146 51 Z" fill="#1A202C" />
            <ellipse cx="120" cy="35" rx="3" ry="1.5" fill="#FFFFFF" />
          </g>
        )}

        {hatType === 'hair' && (
          <g>
            {/* Hair strands */}
            <path d="M 96 52 C 94 34, 110 32, 114 40 C 117 30, 126 30, 128 40 C 132 32, 146 34, 144 52 Z" fill="#3182CE" stroke="#1A365D" strokeWidth="1.5" />
            <path d="M 100 48 L 94 36 L 105 44 L 112 30 L 118 42 L 126 26 L 130 42 L 138 32 L 140 46" fill="none" stroke="#2B6CB0" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {hatType === 'headphones' && (
          <g>
            {/* Headphone band */}
            <path d="M 103 50 A 18 18 0 0 1 137 50" fill="none" stroke="#2D3748" strokeWidth="4.5" />
            {/* Left ear */}
            <rect x="96" y="48" width="7" height="18" rx="2" fill="#319795" stroke="#1D4ED8" strokeWidth="1" />
            {/* Right ear */}
            <rect x="137" y="48" width="7" height="18" rx="2" fill="#319795" stroke="#1D4ED8" strokeWidth="1" />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-5 rounded-xl border border-slate-100 shadow-sm" id="avatar-customizer">
      {/* 2D Preview Panel */}
      <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg border border-slate-100 relative">
        <span className="absolute top-3 left-3 text-2xs font-mono px-2 py-0.5 bg-slate-200 text-slate-600 rounded">
          R6 Minimal Avatar
        </span>
        <div className="w-full flex justify-center py-2">
          {renderAvatarSVG()}
        </div>
        <div className="text-center mt-3">
          <p className="text-sm font-semibold text-slate-800">เสื้อผ้า/สไตล์จำลอง</p>
          <p className="text-xs text-slate-500">ปรับแต่งสีและเครื่องประดับได้อิสระ</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="md:col-span-8 flex flex-col justify-between">
        <div>
          {/* Quick Tabs to select Limb */}
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider">
              1. เลือกชิ้นส่วนเพื่อแต่งสี
            </span>
            <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
              {(['all', 'head', 'torso', 'arms', 'legs'] as const).map((part) => (
                <button
                  key={part}
                  onClick={() => setSelectedPart(part)}
                  id={`btn-part-${part}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    selectedPart === part
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {part === 'all' && 'ทาสีทั้งหมด'}
                  {part === 'head' && 'หัว'}
                  {part === 'torso' && 'ลำตัว'}
                  {part === 'arms' && 'แขน'}
                  {part === 'legs' && 'ขา'}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes Grid */}
          <div className="mb-5">
            <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-slate-500" /> 2. เลือกสีประจำส่วน (Color Palette)
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {COLORS.map((color) => {
                const isActive = (() => {
                  if (selectedPart === 'head') return config.headColor === color.hex;
                  if (selectedPart === 'torso') return config.torsoColor === color.hex;
                  if (selectedPart === 'arms') return config.leftArmColor === color.hex && config.rightArmColor === color.hex;
                  if (selectedPart === 'legs') return config.leftLegColor === color.hex && config.rightLegColor === color.hex;
                  return (
                    config.headColor === color.hex &&
                    config.torsoColor === color.hex &&
                    config.leftArmColor === color.hex &&
                    config.leftLegColor === color.hex
                  );
                })();

                return (
                  <button
                    key={color.name}
                    onClick={() => updateColor(color.hex)}
                    title={color.name}
                    id={`btn-color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                    className="aspect-square rounded-lg border border-slate-200 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer relative"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isActive && (
                      <span className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 text-slate-800 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expressions list, hats list, accessory list in collapsible rows */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Expression Selection */}
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider flex items-center gap-1">
                <Smile className="w-3.5 h-3.5" /> 3. สีหน้าท่าทาง
              </span>
              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1 border border-slate-100 rounded-lg p-1 bg-slate-50">
                {EXPRESSIONS.map((expr) => (
                  <button
                    key={expr.id}
                    onClick={() => updateSingleField('faceExpression', expr.id)}
                    id={`btn-expression-${expr.id}`}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      config.faceExpression === expr.id
                        ? 'bg-slate-200 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{expr.emoji}</span>
                    <span className="truncate">{expr.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hat Type Selection */}
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" /> 4. สวมหมวก / ทรงผม
              </span>
              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1 border border-slate-100 rounded-lg p-1 bg-slate-50">
                {HATS.map((hat) => (
                  <button
                    key={hat.id}
                    onClick={() => updateSingleField('hatType', hat.id)}
                    id={`btn-hat-${hat.id}`}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      config.hatType === hat.id
                        ? 'bg-slate-200 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{hat.emoji}</span>
                    <span className="truncate">{hat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessory Selection */}
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 5. เครื่องประดับเสริม
              </span>
              <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1 border border-slate-100 rounded-lg p-1 bg-slate-50">
                {ACCESSORIES.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => updateSingleField('accessory', acc.id)}
                    id={`btn-accessory-${acc.id}`}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      config.accessory === acc.id
                        ? 'bg-slate-200 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{acc.emoji}</span>
                    <span className="truncate">{acc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
