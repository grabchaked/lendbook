function getLocale() {
  let locale = window.localStorage.getItem('lendbook_locale');
  if (!locale) {
    window.localStorage.setItem('lendbook_locale', 'uk');
    return 'uk';
  } else {
    return locale;
  }
} 

function switchLocale(locale) {
  window.localStorage.setItem('lendbook_locale', locale);
}

export default {
  getLocale,
  switchLocale
}