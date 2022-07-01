/* -------------------------------------------------------------------------- */
/*                          IMPORTACIONES DE FUCIONES                         */
/* -------------------------------------------------------------------------- */
import {signIn, signUp} from './funciones.js'


/* -------------------------------------------------------------------------- */
/*                                   SWIPER                                   */
/* -------------------------------------------------------------------------- */
const swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

const swiper2 = new Swiper(".mySwiper2", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


/* -------------------------------------------------------------------------- */
/*                                     DOM                                    */
/* -------------------------------------------------------------------------- */

/* ------------------------------- FORMS USER ------------------------------- */
const formSingup = document.querySelector('#formSignup')
const formSignin = document.querySelector('#formSignin')

/* --------------------------- EVENTO REGISTRARSE --------------------------- */
formSingup.addEventListener('submit', (e) => {
  e.preventDefault()
  signUp()
})


/* -------------------------- EVENTO INICIAR SESION ------------------------- */
formSignin.addEventListener('submit', (e) => {
  e.preventDefault()
  signIn()
})

