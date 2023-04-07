"use strict"

// меню бургер
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('lock');
      iconMenu.classList.toggle('active');
      menuBody.classList.toggle('active');
   });
}


// маска и валидация телефона 
function ValidPhone(myPhone) {
   var re = /\+7 \(\d{3}\) \d{3} \d{4}/;
   var valid = re.test(myPhone);
   return valid;
}

[].forEach.call(document.querySelectorAll('.form__phone'), function (input) {
   var keyCode;
   function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
         i = 0,
         def = matrix.replace(/\D/g, ""),
         val = this.value.replace(/\D/g, ""),
         new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
         });
      i = new_value.indexOf("_");
      if (i != -1) {
         i < 5 && (i = 3);
         new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
         function (a) {
            return "\\d{1," + a.length + "}"
         }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
   }

   input.addEventListener("input", mask, false);
   input.addEventListener("focus", mask, false);
   input.addEventListener("blur", mask, false);
   input.addEventListener("keydown", mask, false)

});

// скролл из верхнего меню, кнопок до якоря на странице 
const anchors = document.querySelectorAll('[data-goto]');
const timeout = 800;

if (anchors.length > 0) {
   anchors.forEach(anchor => {
      anchor.addEventListener("click", onAnchorClick);
   });

   function onAnchorClick(e) {
      const anchor = e.target;
      // проверяем заполнен ли атрибут и существует ли данный объект
      if (anchor.dataset.goto && document.querySelector(anchor.dataset.goto)) {
         const gotoBlock = document.querySelector(anchor.dataset.goto);
         // учитываем высоту шапки
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.header__container').offsetHeight + 10;
         console.log(gotoBlock);
         console.log(gotoBlockValue);

         if (iconMenu.classList.contains('active')) {
            document.body.classList.remove('lock');
            iconMenu.classList.remove('active');
            menuBody.classList.remove('active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      }
   }
}


// попапы
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

if (popupLinks.length > 0) {
   for (let i = 0; i < popupLinks.length; i++) {
      const popupLink = popupLinks[i];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let i = 0; i < popupCloseIcon.length; i++) {
      const el = popupCloseIcon[i];
      el.addEventListener("click", function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

// при попапах внутри других попапов
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();
      }
   }
}

// скрываем скролл, добавляя паддинг body и объектам с position: fixed
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
         const el = lockPadding[i];
         el.getElementsByClassName.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

// открываем скролл и убираем паддинг у body и объектов с position: fixed
function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

// закрываем попап клавишей Esc
document.addEventListener("keydown", function (e) {
   if (e.keyCode == 27) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive)
         popupClose(popupActive);
   }
});

(function () {
   // проверяем поддержку 
   if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   // проверяем поддержку 
   if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.mozmatchesSelector ||
         Element.prototype.matchesSelector;
   }
})();

