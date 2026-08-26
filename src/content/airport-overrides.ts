/**
 * Hand-maintained corrections for the generated airport list.
 *
 * `scripts/build-airports.ts` merges OurAirports with Macedonian names from
 * Wikidata. Anything in here wins over both, and it is the only place to fix a
 * bad entry — editing the generated file directly would be overwritten on the
 * next run, and the alternative is editing Wikidata itself.
 *
 * Three things belong here:
 *
 *   1. Airports with no Macedonian name upstream. Roughly a quarter of the
 *      airports people actually search for, so add them as they come up.
 *   2. Disambiguation where a city has several airports. Nineteen cities in the
 *      travel pool do; the client's reference shows "Истанбул (Сабиха)" rather
 *      than two rows both reading Истанбул.
 *   3. Transliterations the client prefers. Macedonian has no single convention
 *      — Дубаи or Дубај, Њујорк or Њу Јорк — so this is where that gets settled.
 */

export type AirportOverride = {
  /** Macedonian city name. */
  cityMk?: string;
  /** Latin city name, when the upstream municipality is wrong or unhelpful. */
  city?: string;
  /**
   * Appended in brackets after the city to tell sibling airports apart, e.g.
   * "Сабиха" gives "Истанбул (Сабиха)".
   */
  qualifierMk?: string;
  qualifier?: string;
  /**
   * Extra search terms, space separated. For names travellers type that the
   * upstream data doesn't carry — "Wien" for Vienna, "München" for Munich.
   */
  alt?: string;
  /** The airport people mean when they say the city name. */
  primary?: boolean;
};

export const AIRPORT_OVERRIDES: Record<string, AirportOverride> = {
  // — Macedonia. Skopje is filed upstream under the Ilinden municipality.
  SKP: { city: "Skopje", cityMk: "Скопје" },
  OHD: { city: "Ohrid", cityMk: "Охрид" },

  // — Cities with more than one airport, per the client's reference.
  // No qualifier: IST is simply "Истанбул". Only its siblings need one.
  IST: { primary: true, alt: "Ataturk" },
  SAW: { city: "Istanbul", cityMk: "Истанбул", qualifier: "Sabiha", qualifierMk: "Сабиха" },
  LHR: { primary: true, qualifier: "Heathrow", qualifierMk: "Хитроу" },
  LGW: { city: "London", cityMk: "Лондон", qualifier: "Gatwick", qualifierMk: "Гатвик" },
  STN: { city: "London", cityMk: "Лондон", qualifier: "Stansted", qualifierMk: "Станстед" },
  LTN: { city: "London", cityMk: "Лондон", qualifier: "Luton", qualifierMk: "Лутон" },
  CDG: { primary: true, city: "Paris", cityMk: "Париз", qualifier: "Charles de Gaulle", qualifierMk: "Шарл де Гол" },
  ORY: { city: "Paris", cityMk: "Париз", qualifier: "Orly", qualifierMk: "Орли" },
  BVA: { city: "Paris", cityMk: "Париз", qualifier: "Beauvais", qualifierMk: "Бове" },
  JFK: { primary: true, city: "New York", cityMk: "Њујорк", qualifier: "JFK", qualifierMk: "Џеј Еф Кеј" },
  EWR: { city: "New York", cityMk: "Њујорк", qualifier: "Newark", qualifierMk: "Њуарк" },
  LGA: { city: "New York", cityMk: "Њујорк", qualifier: "LaGuardia", qualifierMk: "Ла Гвардија" },
  MXP: { primary: true, city: "Milan", cityMk: "Милано", qualifier: "Malpensa", qualifierMk: "Малпенса" },
  LIN: { city: "Milan", cityMk: "Милано", qualifier: "Linate", qualifierMk: "Линате" },
  BGY: { city: "Milan", cityMk: "Милано", qualifier: "Bergamo", qualifierMk: "Бергамо" },
  FCO: { primary: true, city: "Rome", cityMk: "Рим", qualifier: "Fiumicino", qualifierMk: "Фјумичино" },
  CIA: { city: "Rome", cityMk: "Рим", qualifier: "Ciampino", qualifierMk: "Чампино" },

  // — Names travellers type that upstream doesn't carry.
  VIE: { alt: "Wien" },
  MUC: { alt: "Munchen München" },
  ZRH: { alt: "Zurich Zürich" },
  CPH: { alt: "Kobenhavn København Copenhagen" },
  ATH: { alt: "Athina Athens" },
  BEG: { alt: "Beograd Belgrade" },
  TIA: { alt: "Tirana Rinas" },
  SOF: { alt: "Sofia Sofiya" },

  // — Popular with Macedonian travellers, missing a Macedonian name upstream.
  KBV: { city: "Krabi", cityMk: "Краби" },
  ACE: { city: "Lanzarote", cityMk: "Ланзароте" },
  FLL: { city: "Fort Lauderdale", cityMk: "Форт Лодердејл" },
  PVR: { city: "Puerto Vallarta", cityMk: "Пуерто Ваљарта" },
};
