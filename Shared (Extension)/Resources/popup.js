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

initAPIKeyInputEventHandlers();
initMainEventHandlers();

async function fetchLanguages(API_KEY) {
  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

function switchView(from, to, displayStyle) {
  document.getElementById(from).style = "display: none";
  document.getElementById(to).style = `display: ${displayStyle}`;
}

function initAPIKeyInputEventHandlers() {
  const input = document.getElementById("apiKeyInput");
  const submitButton = document.getElementById("apiKeySubmitButton");

  submitButton.addEventListener("click", handleAPIKey);

  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleAPIKey();
    }
  });

  async function handleAPIKey() {
    const apiKey = input.value;
    const response = await fetchLanguages(apiKey);
    if (response.ok) {
      browser.storage.local.set({ apiKey }, () => {
        console.log("API Key Set");
      });
      switchView("apiKeyInputContainer", "mainContainer", "block");
    } else {
      console.log("API Key Invalid");
      input.style.border = "1px solid red";
      // TODO: Add shake animation
    }
  }
}

function initMainEventHandlers() {
  const toggleSwitch = document.getElementById("ToggleSwitch");
  const searchBox = document.getElementById("searchBox");
  const languageDropdown = document.getElementById("languageDropdown");
  const apiKeyInputButton = document.getElementById("changeApiKeyButton");

  toggleSwitch.addEventListener("click", () => {
    browser.storage.local.set({ extensionActive: toggleSwitch.checked }, () =>
      console.log(`ndsActive set to ${toggleSwitch.checked}`)
    );
  });

  searchBox.addEventListener("input", () => {
    const input = searchBox.value.toLowerCase();

    displayLanguageSelect((filter = input));
  });

  languageDropdown.addEventListener("change", handleLanguageDropdown);

  searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleLanguageDropdown();
    }
  });

  apiKeyInputButton.addEventListener("click", () => {
    switchView("mainContainer", "apiKeyInputContainer", "flex");
  });

  function handleLanguageDropdown() {
    browser.storage.local.set({ targetLanguage: languageDropdown.value }, () =>
      console.log(`targetLanguage set to ${languageDropdown.value}`)
    );
    searchBox.value = "";
    displayLanguageSelect();
  }
}
// TODO
function displayLanguageSelect(response) {}
