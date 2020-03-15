import '../style.css';
import * as fileUpload from './components/file-upload';
import * as language from './components/language';
import * as paralax from './components/paralax';
import * as menu from './components/menu';
// console.log('run');

var grecaptchaId;
var errorHandling = function(err) { console.err('reCAPTCHA Error:', err) }
var onloadCallback = function() {
  grecaptchaId = grecaptcha.render('myRecaptchaElement', {
    'sitekey' : 'your_site_key',
    'size': 'invisible',
    'error-callback': errorHandling,
  });
};
