const isoLangs = {
  ab: "Abkhazian",
  ace: "Achinese",
  ach: "Acoli",
  af: "Afrikaans",
  ak: "Akan",
  alz: "Alur",
  am: "Amharic",
  ar: "Arabic",
  as: "Assamese",
  awa: "Awadhi",
  ay: "Aymara",
  az: "Azerbaijani",
  ba: "Bashkir",
  ban: "Balinese",
  bbc: "Batak Toba",
  be: "Belarusian",
  bem: "Bemba",
  bew: "Betawi",
  bg: "Bulgarian",
  bho: "Bhojpuri",
  bik: "Bikol",
  bm: "Bambara",
  bn: "Bengali",
  br: "Breton",
  bs: "Bosnian",
  bts: "Batak Simalungun",
  btx: "Batak Karo",
  bua: "Buryat",
  ca: "Catalan",
  ceb: "Cebuano",
  cgg: "Chiga",
  chm: "Mari",
  ckb: "Central Kurdish",
  cnh: "Hakha Chin",
  co: "Corsican",
  crh: "Crimean Tatar",
  crs: "Seselwa Creole French",
  cs: "Czech",
  cv: "Chuvash",
  cy: "Welsh",
  da: "Danish",
  de: "German",
  din: "Dinka",
  doi: "Dogri",
  dov: "Domari",
  dv: "Dhivehi",
  dz: "Dzongkha",
  ee: "Ewe",
  el: "Greek",
  en: "English",
  eo: "Esperanto",
  es: "Spanish",
  et: "Estonian",
  eu: "Basque",
  fa: "Persian",
  ff: "Fulah",
  fi: "Finnish",
  fj: "Fijian",
  fr: "French",
  fy: "Western Frisian",
  ga: "Irish",
  gaa: "Ga",
  gd: "Scottish Gaelic",
  gl: "Galician",
  gn: "Guarani",
  gom: "Goan Konkani",
  gu: "Gujarati",
  ha: "Hausa",
  haw: "Hawaiian",
  he: "Hebrew",
  hi: "Hindi",
  hil: "Hiligaynon",
  hmn: "Hmong",
  hr: "Croatian",
  hrx: "Hunsrik",
  ht: "Haitian Creole",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  ig: "Igbo",
  ilo: "Iloko",
  is: "Icelandic",
  it: "Italian",
  iw: "Hebrew",
  ja: "Japanese",
  jv: "Javanese",
  jw: "Javanese",
  ka: "Georgian",
  kk: "Kazakh",
  km: "Khmer",
  kn: "Kannada",
  ko: "Korean",
  kri: "Krio",
  ktu: "Kituba",
  ku: "Kurdish",
  ky: "Kyrgyz",
  la: "Latin",
  lb: "Luxembourgish",
  lg: "Ganda",
  li: "Limburgish",
  lij: "Ligurian",
  lmo: "Lombard",
  ln: "Lingala",
  lo: "Lao",
  lt: "Lithuanian",
  ltg: "Latgalian",
  luo: "Luo",
  lus: "Mizo",
  lv: "Latvian",
  mai: "Maithili",
  mak: "Makasar",
  mg: "Malagasy",
  mi: "Māori",
  min: "Minangkabau",
  mk: "Macedonian",
  ml: "Malayalam",
  mn: "Mongolian",
  "mni-Mtei": "Manipuri (Meitei Mayek)",
  mr: "Marathi",
  ms: "Malay",
  "ms-Arab": "Malay (Arabic Script)",
  mt: "Maltese",
  my: "Burmese",
  ne: "Nepali",
  new: "Newari",
  nl: "Dutch",
  no: "Norwegian",
  nr: "South Ndebele",
  nso: "Northern Sotho",
  nus: "Nuer",
  ny: "Nyanja",
  oc: "Occitan",
  om: "Oromo",
  or: "Odia",
  pa: "Punjabi",
  "pa-Arab": "Punjabi (Arabic Script)",
  pag: "Pangasinan",
  pam: "Pampanga",
  pap: "Papiamento",
  pl: "Polish",
  ps: "Pashto",
  pt: "Portuguese",
  qu: "Quechua",
  rn: "Kirundi",
  ro: "Romanian",
  rom: "Romani",
  ru: "Russian",
  rw: "Kinyarwanda",
  sa: "Sanskrit",
  scn: "Sicilian",
  sd: "Sindhi",
  sg: "Sango",
  shn: "Shan",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovene",
  sm: "Samoan",
  sn: "Shona",
  so: "Somali",
  sq: "Albanian",
  sr: "Serbian",
  ss: "Swati",
  st: "Southern Sotho",
  su: "Sundanese",
  sv: "Swedish",
  sw: "Swahili",
  szl: "Silesian",
  ta: "Tamil",
  te: "Telugu",
  tet: "Tetum",
  tg: "Tajik",
  th: "Thai",
  ti: "Tigrinya",
  tk: "Turkmen",
  tl: "Tagalog",
  tn: "Tswana",
  tr: "Turkish",
  ts: "Tsonga",
  tt: "Tatar",
  ug: "Uyghur",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  yua: "Yucatec Maya",
  yue: "Cantonese",
  zh: "Chinese",
  "zh-CN": "Simplified Chinese",
  "zh-TW": "Traditional Chinese",
  zu: "Zulu",
};

async function fetchAvailableLanguages() {
  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    return { data: res.data.languages, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

function createErrorElement(error) {
  const errorElement = document.createElement("div");
  errorElement.textContent = error;
  return errorElement;
}

function populateDropdown(dropdown, filter = "") {
  dropdown.innerHTML = "";
  if (languages.error) {
    console.error(languages.error);
    const errorElement = createErrorElement(languages.error);
    document.body.replaceChildren(errorElement);
    return;
  }
  Object.entries(languages.data).forEach(([_, d]) => {
    const code = d.language;
    const lang = isoLangs[code];
    if (lang.toLowerCase().includes(filter)) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = lang;
      dropdown.appendChild(option);
    }
  });
}

const languages = await fetchAvailableLanguages();
const toElem = document.getElementById("languageDropdown");
let selectedToLang = "en";
populateDropdown(toElem, "");

document.getElementById("searchBox").addEventListener("input", () => {
  const searchInput = document.getElementById("searchBox").value.toLowerCase();
  populateDropdown(toElem, searchInput);
});

toElem.addEventListener("change", async () => {
  browser.storage.local.set({to: toElem.value})
});

browser.storage.local.set({to: selectedToLang}).then(() => console.log("Default languages set"));
