
/* -------------------------------------------------------------------------- */
/*                                   SLIDERS                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------- https://swiperjs.com/ ------------------------- */

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
/*                       ELEMENTOS SELECCIONADOS DEL DOM                      */
/* -------------------------------------------------------------------------- */

/* -------------------------- ELEMENTOS DEL USUARIO ------------------------- */

const user__modal__sign__up = document.querySelector('#modalSignUp')
const user__modal__sign__in = document.querySelector('#modalSignIn')

const user__form__sign__up = document.querySelector('#formSignup')
const user__form__sign__in = document.querySelector('#formSignin')
const user__menu__methods = document.querySelector('#menu__methods')
const user__menu__container = document.querySelector('#user__menu')
const user__form__sign__in__close = document.querySelector('#formSigninClose')
const user__form__sign__up__close = document.querySelector('#formSignUpClose')



/* ------------------------- ELEMENTOS DE LA TIENDA ------------------------- */

const store__input__filter = document.querySelector('#storeInputFilter')
const store__cards__container = document.querySelector('#storeBody')
const store__category__filter = document.querySelector('#productCategoryFilter')
const store__item__container = document.querySelector('#modalItem')
const store__form__create__product = document.querySelector('#formCreateProduct')
const store__new__products__container = document.querySelector('#product__featured') 


/* -------------------------- ELEMENTOS DEL CARRITO ------------------------- */

const carrito__container = document.querySelector('#modalCarrito')
const carrito__btn__delete = carrito__container.querySelector('#btnCarritoDelete')
const carrito__btn__buy = document.querySelector('#ventaButton')
const carrito__buy__container = document.querySelector('#modalBuyCarrito .modal-body')
const carrito__card__container = document.querySelector('#tarjeta')
const carrito__card__form = document.querySelector('#tarjeta__form')
const carrito__card__btn__open__form = document.querySelector('#btn-abrir-formulario')


/* -------------------------------------------------------------------------- */
/*                                   EVENTOS                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------- EVENTOS DEL USUARIO -------------------------- */

user__form__sign__up.addEventListener('submit', (e) => {
  e.preventDefault()
  userSignUp()
})

user__form__sign__in.addEventListener('submit', (e) => {
  e.preventDefault()
  userSignIn()
})


/* -------------------------- EVENTOS DE LA TIENDA -------------------------- */

store__form__create__product.addEventListener('submit', (e) => {
  e.preventDefault()
  addProduct()
})

store__input__filter.addEventListener('keyup', () => {
  store__category__filter.value = ''
  storeWriteProducts()
})

store__category__filter.addEventListener('change', () => {
  store__input__filter.value = ''
  storeWriteProducts()
})


/* --------------------------- EVENTOS DEL CARRITO -------------------------- */

carrito__card__container.addEventListener('click', (e) => {
  tarjeta.classList.toggle('active')
})  

carrito__card__btn__open__form.addEventListener('click', () => {
  carrito__card__btn__open__form.classList.toggle('active')
  carrito__card__form.classList.toggle('active')
})

carrito__card__form.tarjetaNumeroInput.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;
  numeroTarjetaOnChangue(valorInput)
})

carrito__card__form.tarjetaNombreInput.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;
  nombreTarjetaOnChange(valorInput)
})

carrito__card__form.selectMes.addEventListener('change', (e) => {
  const card__mes = document.querySelector('#tarjeta #tarjeta__expiracion .mes')
  card__mes.textContent = e.target.value
  mostrarFrenteTarjeta()
})

carrito__card__form.selectYear.addEventListener('change', (e) => {
  const card__year = document.querySelector('#tarjeta #tarjeta__expiracion .year')
  card__year.textContent = e.target.value.slice(2)
  mostrarFrenteTarjeta()
})

carrito__card__form.tarjetaCCVInput.addEventListener('keyup', () => {
  const card__ccv = document.querySelector('#tarjeta #tarjeta__ccv')
  if(!containerTarjeta.classList.contains('active')){
      containerTarjeta.classList.toggle('active')
  }

  carrito__card__form.tarjetaCCVInput.value = carrito__card__form.tarjetaCCVInput.value
  .replace(/\s/g, '')
  .replace(/\D/g, '');

  card__ccv.textContent = carrito__card__form.tarjetaCCVInput.value

})

carrito__btn__buy.addEventListener('click', (e) => {
  e.preventDefault()
  comprarCarrito()
})

carrito__btn__delete.addEventListener('click', () => {
  deleteCarrito()
})


/* -------------------------------------------------------------------------- */
/*                                   CLASES                                   */
/* -------------------------------------------------------------------------- */

class UserNew {

  constructor(email, username, password){
    this.email = email;
    this.username = username;
    this.password = password;
    this.carrito = [];
    this.remember = false
  }

  existingUser(){
    console.log('Ese usuario ya existe')
    Swal.fire({
      icon: 'warning',
      title: 'Ese nombre de usuario ya estan en uso',
      text: 'Pruebe con otro',
      color: '#808191',
      background: '#1f1d2b'
    })
    return true
  }

  addUser(new__user){
    users__list = [...users__list, new__user]

    Swal.fire({
      icon: 'success',
      title: 'Usuario creado correctamente',
      text: 'Ahora inicie sesion',
      color: '#808191',
      background: '#1f1d2b'
    })

    storageUpload('users__list', users__list)

    return;
  }
  
}


/* -------------------------------------------------------------------------- */
/*                                  FUNCIONES                                 */
/* -------------------------------------------------------------------------- */

/* ----------------------------- FUNCIONES FETCH ---------------------------- */

const getDataFetch = async() => {
  const respuesta = await fetch('./data/data.json')
  const data = await respuesta.json()
  console.log(data)
  return data
}


/* ---------------------------- FUNCIONES STORAGE --------------------------- */

const storageGet = (name) => {
  let storage = localStorage.getItem(name)
  if(!storage){
    return []
  }
  return JSON.parse(storage)
}

const storageUpload = (to, data) => {
  localStorage.setItem(to, JSON.stringify(data))
}


const getDataProducts = async() => {
  products__list = await (storageGet('products__list').length === 0 ? getDataFetch() : storageGet('products__list'))
  console.log(products__list)
  storeWriteProducts()
}


/* ---------------------- FUNCION CERRAR VENTANA MODAL ---------------------- */

const modalCloseWindow = (parent) => {
  console.log(parent)
}


/* ---------------------------- FUNCIONES USUARIO --------------------------- */

const userSignUp = () => {
  const values = user__form__sign__up.getElementsByTagName('input')
  const [email, username, password, password2] = values
  if(!email.value || !username.value || !password.value || !password2.value){
    Swal.fire({
      titel: 'Advertencia',
      text:'Complete todos los campos',
      icon:'warning',
      color: '#808191',
      background: '#1f1d2b',
    })
    return;
  }
  if(password.value !== password2.value){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden',
      color: '#808191',
      background: '#1f1d2b',
    })
    return;
  }

  const new__user = new UserNew(email.value, username.value, password.value)
  
  let exist = false
  users__list.forEach(function(user) {
    console.log(user)
    exist = user.username === new__user.username && new__user.existingUser();
  });


  if(!exist){
    new__user.addUser(new__user)
    modalCloseWindow(user__modal__sign__up)
  }
  
}

const userSignIn = () => {
  const values = user__form__sign__in.getElementsByTagName('input');
  const [name, password, check] = values;
  const user = users__list.filter((user) => {
    if(user.email === name.value || user.username === name.value){
      return user;
    }
  })

  if(user[0] === false || user.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Usuario no encontrado',
      text: 'Revise los campos',
      color: '#808191',
      background: '#1f1d2b'
    })
    return
  }

  if(user[0].password !== password.value){
    Swal.fire({
      icon: 'error',
      title: 'La contraseña del usuario: ' + user[0].username,
      text: 'Es incorrecta',
      color: '#808191',
      background: '#1f1d2b'
    })
    return
  }
  user__session = user[0]
  if(check.checked === true){
    storageUpload('user__session', user__session)
    user__session.remember = true
  }

  Swal.fire({
    icon: 'success',
    title: 'Sesion iniciada',
    text: 'Tus datos no seran compartidos a nadie',
    color: '#808191',
    background: '#1f1d2b'
  })

  modalCloseWindow(user__modal__sign__in)
  console.log('sesion iniciada en:')
  console.log(user__session)
  onUserSession()

}

const onUserSession = () => {
  if(user__session.length !== 0){
    const contentUser = `
      <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${user__session.username}
      </button>
      <ul class="dropdown-menu">
        <li>
          <a href='#' class="m-0" id='btn__logOut'>Cerrar sesion</a>
        </li>
      </ul>
    `

    const contentMenu = `
      <h2>Products</h2>
      <ul class="p-0 ">
          <li>
              <a href="#" data-bs-toggle="modal" data-bs-target="#modalCreateProduct" class="d-flex justify-content-center align-items-center">
                  <i class="fa-solid fa-shirt"></i>
                  <p class="ms-3 my-0 d-none d-lg-block">Create product</p>
              </a>
          </li>
          <li>
              <a href="#" data-bs-toggle="modal" data-bs-target="#modalCarrito" class="d-flex justify-content-center align-items-center">
                  <i class="fa-solid fa-cart-shopping"></i>
                  <p class="ms-3 my-0 d-none d-lg-block">Carrito</p>
              </a>
          </li>
      </ul>
    `  
    user__menu__methods.innerHTML = contentUser;
    user__menu__container.innerHTML = contentMenu;

    const btnLogout = document.querySelector('#btn__logOut')
    btnLogout.addEventListener('click', (e) => {
      userLogOut()
    })

  }

}

const userLogOut = () => {
  Swal.fire({
    title: '¿Cerrar sesion?',
    showCancelButton: true,
    color: '#808191',
    background: '#1f1d2b',
    confirmButtonText: 'confirmar'
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem('user__session');
      user__session = false
      Swal.fire({
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        color: '#808191',
        background: '#1f1d2b'

      })
      setTimeout( () => {
        window.location.reload()

      }, 1500)

    }
  })
}


/* ------------------------- FUNCIONES DE LA TIENDA ------------------------- */

const storeWriteProducts = () => {
  store__cards__container.innerHTML = '';
  const texto = store__input__filter.value.toLowerCase();
  const categoria = store__category__filter.value.toLowerCase()

  for( let product of products__list){
    let title = product.title.toLowerCase();
    let category = product.category.toLowerCase();

    if(title.indexOf(texto || categoria) !== -1 || category.indexOf(texto || categoria) !== -1){
      const content = `
      <a href="#" class="col-12 col-md-6 col-lg-3 item__key" data-bs-target='#modalItem' data-bs-toggle='modal' data-id='${products__list.indexOf(product)}'>
        <div class="card">
          <img class="w-100" src="${product.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
          </div>
          <div class="card-footer">
            <small>Category <span>${product.category}</span></small>
          </div>
        </div>
      </a>
      `
      store__cards__container.innerHTML += content
    }
  }

  const item__list  = store__cards__container.querySelectorAll('.item__key')
  item__list.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id
      storeOpenItem(id)
    })
  })
  if(store__cards__container.innerHTML === ''){
      store__cards__container.innerHTML += `<h6 class='text__not__found'>Producto no encontrado</h6>`
  } 
}

const storeOpenItem = (e) => {
  const { title, description, category, price, img, comments } = products__list[e];

  const store__modal__footer__container = store__item__container.querySelector('.modal__button__container')

  store__modal__footer__container.innerHTML = ''

  store__item__container.querySelector('#modal__title').innerHTML = title
  store__item__container.querySelector('#modal__description').innerHTML = description
  store__item__container.querySelector('#modal__category').innerHTML = category
  store__item__container.querySelector('#modal__price').innerHTML = price
  store__item__container.querySelector('#modal__img').src = img
  const modalComments = document.querySelector('#modal__comments')
  
  const input__create__comment = document.querySelector('#inputCreateComment')
  input__create__comment.setAttribute('data__id', e)

  let button = document.createElement('button')
  button.classList.add('btn__addCarrito')
  button.classList.add('w-100')
  button.textContent ='Añadir al carrito'

  store__modal__footer__container.appendChild(button)

  let cantidad__items = store__item__container.querySelector('#cantidadItems')
  cantidad__items.addEventListener('change', ()=> {
    cantidad__items = store__item__container.querySelector('#cantidadItems')
  })
 
  button.addEventListener('click', () => {
    if(user__session.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Primero debe registrarse e iniciar sesion',
        text: 'Despues podra comprar tranquilamente',
        color: '#808191',
        background: '#1f1d2b'
      })
      return
    }

    Swal.fire({
      icon: 'success',
      title: 'Elemento añadido al carrito',
      text: 'Puede dirigirse al carrito para comprar todo lo que añada',
      color: '#808191',
      background: '#1f1d2b'
    })
    // addItemCarrito(title, cantidad__items.value, price)
  })

  input__create__comment.addEventListener('keyup', (e) => {
    if(e.key !== 'Enter'){
      return;
    }

    console.log(e.key)
    
    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + ' a las ' + String(date.getHours()) + ':' + String(date.getMinutes());
    if(user__session.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Inicie sesion',
        color: '#808191',
        background: '#1f1d2b'
      })
      return
    }
    else if(input__create__comment.value.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Debe escribir algo',
        color: '#808191',
        background: '#1f1d2b'
      })
      return
    }

    const newComment = {
      date: output,
      likes: 0,
      owner: user__session.username,
      text: input__create__comment.value,
      response: []
    }
    comments.unshift(newComment)
    console.log(comments)
    storageUpload('products__list', products__list)
    // writeComments(comments, modalComments)

  })

  // writeComments(comments, modalComments)
}


/* -------------------------------------------------------------------------- */
/*                     VARIABLES GLOBALES DE LA APLICACION                    */
/* -------------------------------------------------------------------------- */
let users__list = storageGet('users__list')
let user__session = storageGet('user__session')
let products__list = []

/* -------------------------------------------------------------------------- */
/*                          ESCRIBIENDO LA APLICACION                         */
/* -------------------------------------------------------------------------- */

onUserSession()
getDataProducts()
