const quizButtonNext = document.querySelectorAll('.quiz__next');
if (quizButtonNext.length > 0) {
   for (let i = 0; i < quizButtonNext.length; i++) {
      const el = quizButtonNext[i];
      el.addEventListener("click", function (e) {
         const currentSlide = el.parentElement.parentElement.parentElement;
         const nextStep = +currentSlide.getAttribute('data-step') + 1;
         currentSlide.classList.remove('active__step');
         const nextSlide = document.querySelector('.step-' + nextStep);
         if (nextSlide.classList.contains('quiz__result')) {
            let quizBoxElement = document.querySelector('.quiz__box');
            quizBoxElement.style.display = 'none';
         }
         nextSlide.classList.add('active__step');
      });
   }
}

const quizButtonPrev = document.querySelectorAll('.quiz__prev');
if (quizButtonPrev.length > 0) {
   for (let i = 0; i < quizButtonPrev.length; i++) {
      const el = quizButtonPrev[i];
      el.addEventListener("click", function (e) {
         const currentSlide = el.parentElement.parentElement.parentElement;
         const prevStep = +currentSlide.getAttribute('data-step') - 1;
         currentSlide.classList.remove('active__step');
         const prevSlide = document.querySelector('.step-' + prevStep);
         prevSlide.classList.add('active__step');
      });
   }
}

const quizRadio = document.querySelectorAll('.quiz__radio-input');
if (quizButtonPrev.length > 0) {
   for (let i = 0; i < quizRadio.length; i++) {
      const el = quizRadio[i];
      if (el.classList.contains('checkbox__input')) {
         // el.addEventListener("click", function (e) {
         //    const quizCheckBoxes = document.querySelectorAll('.quiz__radio-input.checkbox__input');
         //    const currentSlide = el.parentElement.parentElement.parentElement.parentElement.parentElement;
         //    const buttonNext = currentSlide.querySelector('.button_next');
         //    let checkedCount = 0;
         //    for (let j = 0; j < quizCheckBoxes.length; j++) {
         //       cb = quizCheckBoxes[j];
         //       if (cb.checked)
         //          checkedCount++;
         //    }
         //    if (checkedCount > 0) {
         //       buttonNext.classList.remove('disabled');
         //    } else {
         //       buttonNext.classList.add('disabled');
         //    }
         // });
      } else {
         el.addEventListener("click", function (e) {
            const currentSlide = el.parentElement.parentElement.parentElement.parentElement;
            const buttonNext = currentSlide.querySelector('.button_next');
            buttonNext.classList.remove('disabled');
            console.log(currentSlide);
         });
      }
   }
}

const sendFormButton = document.querySelector('.quiz__next_final');
sendFormButton.addEventListener("click", function(e) {
   const quizRadio = document.querySelectorAll('.quiz__radio-input');
   if (quizButtonPrev.length > 0) {
      for (let i = 0; i < quizRadio.length; i++) {
         const el = quizRadio[i];
         if (el.checked) {
            const elName = el.getAttribute('name');
            const elValue = el.getAttribute('value');
            console.log(elName + " - " + elValue);
         }
      }
   }
});

