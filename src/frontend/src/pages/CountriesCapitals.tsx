import { Globe, Search } from "lucide-react";
import { useMemo, useState } from "react";

const COUNTRIES = [
  { flag: "🇮🇳", country: "India", capital: "New Delhi" },
  { flag: "🇺🇸", country: "United States", capital: "Washington D.C." },
  { flag: "🇬🇧", country: "United Kingdom", capital: "London" },
  { flag: "🇨🇳", country: "China", capital: "Beijing" },
  { flag: "🇷🇺", country: "Russia", capital: "Moscow" },
  { flag: "🇧🇷", country: "Brazil", capital: "Brasília" },
  { flag: "🇨🇦", country: "Canada", capital: "Ottawa" },
  { flag: "🇦🇺", country: "Australia", capital: "Canberra" },
  { flag: "🇩🇪", country: "Germany", capital: "Berlin" },
  { flag: "🇫🇷", country: "France", capital: "Paris" },
  { flag: "🇯🇵", country: "Japan", capital: "Tokyo" },
  { flag: "🇰🇷", country: "South Korea", capital: "Seoul" },
  { flag: "🇮🇹", country: "Italy", capital: "Rome" },
  { flag: "🇪🇸", country: "Spain", capital: "Madrid" },
  { flag: "🇲🇽", country: "Mexico", capital: "Mexico City" },
  { flag: "🇮🇩", country: "Indonesia", capital: "Jakarta" },
  { flag: "🇳🇬", country: "Nigeria", capital: "Abuja" },
  { flag: "🇵🇰", country: "Pakistan", capital: "Islamabad" },
  { flag: "🇧🇩", country: "Bangladesh", capital: "Dhaka" },
  { flag: "🇵🇭", country: "Philippines", capital: "Manila" },
  { flag: "🇪🇬", country: "Egypt", capital: "Cairo" },
  { flag: "🇿🇦", country: "South Africa", capital: "Pretoria" },
  { flag: "🇦🇷", country: "Argentina", capital: "Buenos Aires" },
  { flag: "🇨🇴", country: "Colombia", capital: "Bogotá" },
  { flag: "🇨🇱", country: "Chile", capital: "Santiago" },
  { flag: "🇸🇦", country: "Saudi Arabia", capital: "Riyadh" },
  { flag: "🇦🇪", country: "United Arab Emirates", capital: "Abu Dhabi" },
  { flag: "🇹🇷", country: "Turkey", capital: "Ankara" },
  { flag: "🇮🇷", country: "Iran", capital: "Tehran" },
  { flag: "🇹🇭", country: "Thailand", capital: "Bangkok" },
  { flag: "🇻🇳", country: "Vietnam", capital: "Hanoi" },
  { flag: "🇲🇾", country: "Malaysia", capital: "Kuala Lumpur" },
  { flag: "🇸🇬", country: "Singapore", capital: "Singapore" },
  { flag: "🇳🇿", country: "New Zealand", capital: "Wellington" },
  { flag: "🇬🇷", country: "Greece", capital: "Athens" },
  { flag: "🇵🇹", country: "Portugal", capital: "Lisbon" },
  { flag: "🇸🇪", country: "Sweden", capital: "Stockholm" },
  { flag: "🇳🇴", country: "Norway", capital: "Oslo" },
  { flag: "🇩🇰", country: "Denmark", capital: "Copenhagen" },
  { flag: "🇫🇮", country: "Finland", capital: "Helsinki" },
  { flag: "🇨🇭", country: "Switzerland", capital: "Bern" },
  { flag: "🇦🇹", country: "Austria", capital: "Vienna" },
  { flag: "🇧🇪", country: "Belgium", capital: "Brussels" },
  { flag: "🇳🇱", country: "Netherlands", capital: "Amsterdam" },
  { flag: "🇵🇱", country: "Poland", capital: "Warsaw" },
  { flag: "🇺🇦", country: "Ukraine", capital: "Kyiv" },
  { flag: "🇨🇿", country: "Czech Republic", capital: "Prague" },
  { flag: "🇭🇺", country: "Hungary", capital: "Budapest" },
  { flag: "🇷🇴", country: "Romania", capital: "Bucharest" },
  { flag: "🇧🇬", country: "Bulgaria", capital: "Sofia" },
  { flag: "🇸🇰", country: "Slovakia", capital: "Bratislava" },
  { flag: "🇭🇷", country: "Croatia", capital: "Zagreb" },
  { flag: "🇷🇸", country: "Serbia", capital: "Belgrade" },
  { flag: "🇮🇱", country: "Israel", capital: "Jerusalem" },
  { flag: "🇯🇴", country: "Jordan", capital: "Amman" },
  { flag: "🇱🇧", country: "Lebanon", capital: "Beirut" },
  { flag: "🇰🇼", country: "Kuwait", capital: "Kuwait City" },
  { flag: "🇶🇦", country: "Qatar", capital: "Doha" },
  { flag: "🇧🇭", country: "Bahrain", capital: "Manama" },
  { flag: "🇴🇲", country: "Oman", capital: "Muscat" },
  { flag: "🇾🇪", country: "Yemen", capital: "Sana'a" },
  { flag: "🇦🇫", country: "Afghanistan", capital: "Kabul" },
  { flag: "🇳🇵", country: "Nepal", capital: "Kathmandu" },
  { flag: "🇱🇰", country: "Sri Lanka", capital: "Colombo" },
  { flag: "🇲🇻", country: "Maldives", capital: "Malé" },
  { flag: "🇧🇹", country: "Bhutan", capital: "Thimphu" },
  { flag: "🇰🇿", country: "Kazakhstan", capital: "Astana" },
  { flag: "🇺🇿", country: "Uzbekistan", capital: "Tashkent" },
  { flag: "🇲🇲", country: "Myanmar", capital: "Naypyidaw" },
  { flag: "🇰🇭", country: "Cambodia", capital: "Phnom Penh" },
  { flag: "🇱🇦", country: "Laos", capital: "Vientiane" },
  { flag: "🇵🇬", country: "Papua New Guinea", capital: "Port Moresby" },
  { flag: "🇫🇯", country: "Fiji", capital: "Suva" },
  { flag: "🇰🇪", country: "Kenya", capital: "Nairobi" },
  { flag: "🇹🇿", country: "Tanzania", capital: "Dodoma" },
  { flag: "🇺🇬", country: "Uganda", capital: "Kampala" },
  { flag: "🇪🇹", country: "Ethiopia", capital: "Addis Ababa" },
  { flag: "🇬🇭", country: "Ghana", capital: "Accra" },
  { flag: "🇸🇳", country: "Senegal", capital: "Dakar" },
  { flag: "🇲🇦", country: "Morocco", capital: "Rabat" },
  { flag: "🇩🇿", country: "Algeria", capital: "Algiers" },
  { flag: "🇹🇳", country: "Tunisia", capital: "Tunis" },
  { flag: "🇱🇾", country: "Libya", capital: "Tripoli" },
  { flag: "🇸🇩", country: "Sudan", capital: "Khartoum" },
  { flag: "🇨🇲", country: "Cameroon", capital: "Yaoundé" },
  { flag: "🇨🇩", country: "DR Congo", capital: "Kinshasa" },
  { flag: "🇦🇴", country: "Angola", capital: "Luanda" },
  { flag: "🇲🇿", country: "Mozambique", capital: "Maputo" },
  { flag: "🇿🇲", country: "Zambia", capital: "Lusaka" },
  { flag: "🇿🇼", country: "Zimbabwe", capital: "Harare" },
  { flag: "🇧🇼", country: "Botswana", capital: "Gaborone" },
  { flag: "🇳🇦", country: "Namibia", capital: "Windhoek" },
  { flag: "🇲🇬", country: "Madagascar", capital: "Antananarivo" },
  { flag: "🇵🇪", country: "Peru", capital: "Lima" },
  { flag: "🇻🇪", country: "Venezuela", capital: "Caracas" },
  { flag: "🇪🇨", country: "Ecuador", capital: "Quito" },
  { flag: "🇧🇴", country: "Bolivia", capital: "Sucre" },
  { flag: "🇵🇾", country: "Paraguay", capital: "Asunción" },
  { flag: "🇺🇾", country: "Uruguay", capital: "Montevideo" },
  { flag: "🇨🇺", country: "Cuba", capital: "Havana" },
  { flag: "🇯🇲", country: "Jamaica", capital: "Kingston" },
  { flag: "🇹🇹", country: "Trinidad and Tobago", capital: "Port of Spain" },
  { flag: "🇵🇦", country: "Panama", capital: "Panama City" },
  { flag: "🇨🇷", country: "Costa Rica", capital: "San José" },
  { flag: "🇬🇹", country: "Guatemala", capital: "Guatemala City" },
  { flag: "🇭🇳", country: "Honduras", capital: "Tegucigalpa" },
  { flag: "🇸🇻", country: "El Salvador", capital: "San Salvador" },
  { flag: "🇳🇮", country: "Nicaragua", capital: "Managua" },
  { flag: "🇧🇿", country: "Belize", capital: "Belmopan" },
];

const CARD_COLORS = [
  "bg-sky-100 border-sky-400",
  "bg-sunshine-100 border-sunshine-400",
  "bg-grass-100 border-grass-400",
  "bg-lavender-100 border-lavender-400",
  "bg-cherry-100 border-cherry-400",
  "bg-tangerine-100 border-tangerine-400",
  "bg-mint-100 border-mint-400",
  "bg-coral-100 border-coral-400",
];

export default function CountriesCapitals() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof COUNTRIES)[0] | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-sky-100 via-grass-100 to-sunshine-100 py-8 px-4"
      data-ocid="countries.page"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Globe size={44} className="text-sky-600" />
            <h1 className="font-fredoka text-4xl sm:text-5xl text-sky-700">
              World Countries &amp; Capitals
            </h1>
          </div>
          <p className="font-nunito text-lg text-gray-600 mb-2">
            {COUNTRIES.length} countries — tap any card to learn more!
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none"
          />
          <input
            type="text"
            data-ocid="countries.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country or capital..."
            className="w-full pl-12 pr-4 py-3 border-4 border-sky-400 rounded-3xl font-nunito text-lg focus:outline-none focus:border-sky-600 bg-white shadow-fun"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 font-bold text-xl"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-center font-nunito text-gray-600 mb-4">
            Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
            for "{search}"
          </p>
        )}

        {/* Country Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16" data-ocid="countries.empty_state">
            <div className="text-7xl mb-4">🔍</div>
            <p className="font-fredoka text-2xl text-gray-500">
              No countries found for "{search}"
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 kid-btn bg-sky-400 text-white px-6 py-2 border-3 border-sky-600"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((item, idx) => (
              <button
                key={item.country}
                type="button"
                data-ocid={`countries.item.${idx + 1}`}
                onClick={() => setSelected(item)}
                className={`kid-card border-3 ${CARD_COLORS[idx % CARD_COLORS.length]} p-3 flex flex-col items-center gap-2 text-center cursor-pointer hover:scale-105 hover:shadow-fun-xl active:scale-95 transition-all`}
              >
                <span className="text-5xl">{item.flag}</span>
                <span className="font-fredoka text-base text-gray-800 leading-tight">
                  {item.country}
                </span>
                <span className="font-nunito text-xs text-gray-600 bg-white/60 rounded-full px-2 py-0.5">
                  {item.capital}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelected(null)}
          role="presentation"
          data-ocid="countries.modal"
        >
          <dialog
            open
            className="bg-white border-4 border-sky-400 rounded-4xl p-8 max-w-sm w-full shadow-fun-xl text-center static"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="text-8xl mb-4">{selected.flag}</div>
            <h2 className="font-fredoka text-3xl text-sky-700 mb-2">
              {selected.country}
            </h2>
            <div className="bg-sky-100 border-2 border-sky-300 rounded-2xl px-6 py-3 inline-block mb-4">
              <p className="font-nunito text-gray-500 text-sm mb-1">Capital</p>
              <p className="font-fredoka text-2xl text-sky-800">
                {selected.capital}
              </p>
            </div>
            <div className="mt-2">
              <button
                type="button"
                data-ocid="countries.close_button"
                onClick={() => setSelected(null)}
                className="kid-btn bg-sky-400 hover:bg-sky-500 text-white px-8 py-3 text-lg border-4 border-sky-600 shadow-fun"
              >
                Got it! ✓
              </button>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
}
