// SWIPER
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

// VARIABLES GLOBALES
let userNotificationList = []
let products = [
  {
    title: 'Buzo Omen',
    description: 'lorem ipsum asnas dasd asfas da sfd asd  dsvc ascxas',
    category: 'buzos',
    price: 200
  },
  {
    title: 'Buzo HP',
    description: 'lorem ipsum asnas dasd asfas da sfd asd  dsvc ascxas',
    category: 'buzos',
    price: 210
  },
  {
    title: 'Remera Omen',
    description: 'lorem ipsum asnas dasd asfas da sfd asd  dsvc ascxas',
    category: 'remeras',
    price: 90
  },
  {
    title: 'Remera HP',
    description: 'lorem ipsum asnas dasd asfas da sfd asd  dsvc ascxas',
    category: 'remeras',
    price: 100
  }
]



// ELEMENTOS SELECCIONADOS


// FORMS USER
const formSingup = document.querySelector('#formSignup')
const formSignin = document.querySelector('#formSignin')


// FORM CREATE PRODUCT
const formCreateProduct = document.querySelector('#formCreateProduct')


// USERS METHODS 
const userMethods = document.querySelector('#menu__methods')
const userNotification = document.querySelector('#user__notifications')
const userMenu = document.querySelector('#user__menu')


// STORE METHODS
const storeInputFilter = document.querySelector('#storeInputFilter')
const storeBody = document.querySelector('#storeBody')
const productCategoryFilter = document.querySelector('#productCategoryFilter')


// ITEM METHOD
const modalItem = document.querySelector('#modalItem')


// EVENTOS

// EVENTO REGISTRARSE
formSingup.addEventListener('submit', (e) => {
  e.preventDefault()
  signUp()
})


// EVENTO INICIAR SESION
formSignin.addEventListener('submit', (e) => {
  e.preventDefault()
  signIn()
})


// EVENTO CREAR PRODUCTO
formCreateProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  addProduct()
})


// FUNCIONES


// FUNCIONES STORAGE
const getStorage = (name) => {
  let storage = localStorage.getItem(name)
  if(!storage){
    return []
  }
  return JSON.parse(storage)
}


// FUNCIONES USER
const signUp = () => {
  const values = formSingup.getElementsByTagName('input')
  const [email, username, password, password2] = values
  if(!email.value || !username.value || !password.value || !password2.value){
    Swal.fire(
      'Advertencia',
      'Complete todos los campos',
      'warning'
    )
    return;
  }
  if(password !== password2){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden'
    })
    return;
  }

  const newUser = {
    email: signupEmail,
    username: signupUsername,
    password: signupPassword,
    saldo: 0,
    carrito: []
  }

  users.forEach(function(user) {
    if(user.email === newUser.email){
      Swal.fire({
          icon: 'warning',
          title: 'Ese email ya esta en uso',
          text: 'Pruebe con otro'
      })
      existe = true
      return;
    }
  })
}


// DATOS OBTENIDOS STORAGE

let users = getStorage('users')
let userState = getStorage('userState')
let storageProducts = getStorage('products').length === 0 ? products : getStorage('products')

