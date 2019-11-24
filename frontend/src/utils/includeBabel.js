const ua = window.navigator.userAgent;
const isIE = /MSIE|Trident/.test(ua);
if (isIE) {
  // eslint-disable-next-line global-require
  require('babel-polyfill');
}
