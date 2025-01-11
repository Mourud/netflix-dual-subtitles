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
// TODO: Function needs to be double checked
async function fetchAvailableLanguages(API_KEY) {
  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    return { data: res, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

function createErrorElement(error) {
  const errorElement = document.createElement("div");
  errorElement.textContent = error;
  return errorElement;
}

function populateDropdown(dropdown, filter = "", languages) {
  dropdown.innerHTML = "";
  if (languages.error) {
    console.error(languages.error);
    const errorElement = createErrorElement(languages.error);
    document.body.replaceChildren(errorElement);
    return;
  }
  const selected = document.createElement("option");
  selected.value = selectedToLang;
  selected.textContent = "✓ " + isoLangs[selectedToLang];
  dropdown.appendChild(selected);

  Object.entries(languages.data.languages).forEach(([_, d]) => {
    const code = d.language;
    const lang = isoLangs[code];
    if (lang.toLowerCase().includes(filter) && code !== selectedToLang) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = lang;
      dropdown.appendChild(option);
    }
  });
  dropdown.value = selectedToLang;
}


async function setupPopup(languages) {
  apiContainer.style.display = "none";
  mainContainer.style.display = "block";
  const toggleButton = document.getElementById("toggleSwitch");
  const toElem = document.getElementById("languageDropdown");

  populateDropdown(toElem, "", languages);

  const initialState = await browser.storage.local.get("isChecked");
  if (initialState.isChecked) {
    toggleButton.checked = initialState.isChecked;
  } else {
    toggleButton.checked = false;
    browser.storage.local.set({ isChecked: false });
  }

  toggleButton.addEventListener("change", () => {
    const button = document.getElementById("toggleSwitch");
    const isChecked = button.checked;
    browser.storage.local.set({ isChecked });
  });

  document.getElementById("searchBox").addEventListener("input", () => {
    const searchInput = document
      .getElementById("searchBox")
      .value.toLowerCase();
    populateDropdown(toElem, searchInput, languages);
  });

  toElem.addEventListener("change", async () => {
    browser.storage.local.set({ to: toElem.value });
    selectedToLang = toElem.value;
    const searchBox = document.getElementById("searchBox");
    searchBox.value = "";
    populateDropdown(toElem, "", languages);
  });
}

const toggleButton = document.getElementById("toggleSwitch");
const apiKeySubmitButton = document.getElementById("submitButton");
const apiContainer = document.getElementById("apiContainer");
const mainContainer = document.getElementById("mainContainer");
const apiInput = document.getElementById("apiInput");
let languages;


const langObj = await browser.storage.local.get("to");

let selectedToLang;
if (langObj.to) {
  selectedToLang = langObj.to;
} else {
  selectedToLang = "en";
}

let API_KEY = (await browser.storage.local.get("apiKey")).apiKey;
console.log("API_KEY", API_KEY);
if (API_KEY) {
  apiContainer.style.display = "none";
  mainContainer.style.display = "block";
  const languages = (await fetchAvailableLanguages(API_KEY)).data;
  setupPopup(languages);
}else{
  apiContainer.style.display = "flex";
  mainContainer.style.display = "none";
}

apiKeySubmitButton.addEventListener("click", async () => {
  API_KEY = apiInput.value;
  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`;
  // TODO: Consider network error handling
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // TODO: Consolidate this and the fetchAvailableLanguages function
  if (response.ok) {
    browser.storage.local.set({ apiKey: API_KEY });
    languages = await response.json();
    setupPopup(languages);
  } else {
    apiInput.style.border = "1px solid red";
  }
});
