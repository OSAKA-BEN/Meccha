import  { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, DollarSign, Languages } from 'lucide-react';


const languageOptions = [
  { value: 'en', label: 'English', flag: '/flags/gb.svg' },
  { value: 'fr', label: 'Français', flag: '/flags/fr.svg' },
  { value: 'es', label: 'Español', flag: '/flags/es.svg' },
];

const currencyOptions = [
  { value: 'USD', label: 'USD', symbol: '$' },
  { value: 'EUR', label: 'EUR', symbol: '€' },
  { value: 'GBP', label: 'GBP', symbol: '£' },
];

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    console.log('Settings applied:', { language, currency });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500"
      >
        <Languages className='w-5 h-5 mr-2' />
        Settings
        <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-80 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-lg font-semibold">Settings</div>
            <div className="px-4 py-2">
              <SettingDropdown
                icon={<Globe size={20} />}
                label="Language"
                options={languageOptions}
                value={language}
                onChange={setLanguage}
              />
            </div>
            <div className="px-4 py-2">
              <SettingDropdown
                icon={<DollarSign size={20} />}
                label="Currency"
                options={currencyOptions}
                value={currency}
                onChange={setCurrency}
              />
            </div>
            <div className="px-4 py-2">
              <button
                onClick={handleApply}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingDropdown({ icon, label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{label}:</span>
          <span className="ml-2 font-medium flex items-center">
            {value.flag ? (
              <img src={value.flag} alt={value.label} className="w-5 h-5 mr-2" />
            ) : (
              <span className="mr-2">{value.symbol}</span>
            )}
            {value.label}
          </span>
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
            >
              {option.flag ? (
                <img src={option.flag} alt={option.label} className="w-5 h-5 mr-2" />
              ) : (
                <span className="mr-2">{option.symbol}</span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}