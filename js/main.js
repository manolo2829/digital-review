
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

const carrito__btn__delete = document.querySelector('#btnCarritoDelete')
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
  storeAddNewProduct()
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
  carritoCardNumberChange(valorInput)
})

carrito__card__form.tarjetaNombreInput.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;
  carritoCardNameChange(valorInput)
})

carrito__card__form.selectMes.addEventListener('change', (e) => {
  const card__mes = document.querySelector('#tarjeta #tarjeta__expiracion .mes')
  card__mes.textContent = e.target.value
  carritoCardFront()
})

carrito__card__form.selectYear.addEventListener('change', (e) => {
  const card__year = document.querySelector('#tarjeta #tarjeta__expiracion .year')
  card__year.textContent = e.target.value.slice(2)
  carritoCardFront()
})

carrito__card__form.tarjetaCCVInput.addEventListener('keyup', () => {
  const card__ccv = document.querySelector('#tarjeta #tarjeta__ccv')
  if(!carrito__card__container.classList.contains('active')){
    carrito__card__container.classList.toggle('active')
  }

  carrito__card__form.tarjetaCCVInput.value = carrito__card__form.tarjetaCCVInput.value
  .replace(/\s/g, '')
  .replace(/\D/g, '');

  card__ccv.textContent = carrito__card__form.tarjetaCCVInput.value

})

carrito__btn__buy.addEventListener('click', (e) => {
  e.preventDefault()
  if(user__session.carrito.length === 0){
    Swal.fire({
      icon: 'warning',
      title: 'Su carrito esta vacio',
      text: 'Primero añada productos y despues realice la compra',
      color: '#808191',
      background: '#1f1d2b'
    })
  }else{
    carritoBuy()
  }
})

carrito__btn__delete.addEventListener('click', () => {
  carritoDeleteItems()
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

class CommentNew {

  constructor(date, owner, text){
    this.date = date;
    this.likes = 0;
    this.owner = owner;
    this.text = text;
    this.response = []
  }

  uploadComment(arr, comment){
    arr.unshift(comment)
    storageUpload('products__list', products__list)
  }

}

class ProductNew {
  constructor(title, description, category, price){
    this.title = title;
    this.description = description;
    this.category = category;
    this.img = `./img/${category.toLowerCase()}.png`;
    this.price = price;
    this.comments = []
  }

  addProductStorage(product){
    products__list.unshift(product)
    storageUpload('products__list', products__list)
    products__list = storageGet('products__list')

    Swal.fire({
      icon: 'success',
      title: 'Productos subido exitosamente',
      color: '#808191',
      background: '#1f1d2b'
    })
  }
}

class CarritoNew {
  constructor(title, cantidad, price){
    this.title = title;
    this.cantidad = parseInt(cantidad);
    this.price = price
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
  storeWriteNewProducts()
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
      title: 'Advertencia',
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
    user__session.remember = true
    storageUpload('user__session', user__session)
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

    carritoWrite()
    carritoWriteCard()
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

const storeAddNewProduct = () => {
  const values = store__form__create__product.getElementsByTagName('input')
  const [title, description, price] = values
  const category = store__form__create__product.querySelector('#productCategory').value

  if(!title.value || !description.value || !price.value || !category){
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacios',
      text: 'Debe llenar todos los campos con informacion valida',
      color: '#808191',
      background: '#1f1d2b'
    })
    return;
  }

  const newProduct = new ProductNew(title.value, description.value, category, price.value)
  
  newProduct.addProductStorage(newProduct)
  storeWriteProducts()
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
  const store__comments = document.querySelector('#modal__comments')
  
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
    carritoAddItem(title, cantidad__items.value, price)
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

    const newComment = new CommentNew(output, user__session.username, input__create__comment.value)

    newComment.uploadComment(comments, newComment)
    console.log(comments)
    storeWriteComments(comments, store__comments)

  })

  storeWriteComments(comments, store__comments)
}

const storeWriteComments = (arr, parent) => {
  parent.innerHTML = ''

  arr.forEach(element => {
    const comment__container = document.createElement('div')
    comment__container.classList.add('col-12')
    comment__container.classList.add('p-0')

    const comment__container__card = document.createElement('div')
    comment__container__card.setAttribute('class', 'card mb-3')

    const comment__container__card__body = document.createElement('div')
    comment__container__card__body.setAttribute('class', 'card-body p-0')

    const comment__owner = document.createElement('p')
    comment__owner.setAttribute('class', 'card-title text-start h5 px-3')
    comment__owner.textContent = element.owner

    const comment__text = document.createElement('p')
    comment__text.setAttribute('class', 'card-text text-start px-3')
    comment__text.textContent = element.text

    const comment__methods__container = document.createElement('div')
    comment__methods__container.setAttribute('class', 'm-3 d-flex commentMethodsContainer')    

    const comment__like__button = document.createElement('button')
    comment__like__button.setAttribute('class', 'likedButton btn me-2')

    const comment__like__button__i = document.createElement('i')
    comment__like__button__i.setAttribute('class', 'fa-solid fa-thumbs-up')

    const comment__like__button__content = document.createElement('span')
    comment__like__button__content.setAttribute('class', 'px-2 numberLikes')
    comment__like__button__content.textContent = element.likes

    const comment__input__response = document.createElement('input')
    comment__input__response.setAttribute('class', 'form-control me-2 inputResponse')

    const comment__button__response = document.createElement('button')
    comment__button__response.setAttribute('class', 'btn buttonSubmit')
    comment__button__response.textContent = 'Responder'

    const comment__footer__container = document.createElement('div')
    comment__footer__container.setAttribute('class', 'card-footer text-muted d-flex justify-content-between align-items-center')

    const comment__date = document.createElement('p')
    comment__date.setAttribute('class', 'text-start m-0')
    comment__date.textContent = element.date

    const comment__button__see__responses = document.createElement('p')
    comment__button__see__responses.setAttribute('class', 'btnVerRespuestas')
    comment__button__see__responses.textContent = `Hay ${element.response.length} respuestas`
    let comment__number__of__replies = element.response.length

    const comment__container__responses = document.createElement('div')
    comment__container__responses.setAttribute('class', 'containerCommnetsResponses')

    comment__container.appendChild(comment__container__card)
    comment__container.appendChild(comment__container__responses)

    comment__container__card.appendChild(comment__container__card__body)

    comment__container__card__body.appendChild(comment__owner)
    comment__container__card__body.appendChild(comment__text)
    comment__container__card__body.appendChild(comment__methods__container)
    comment__container__card__body.appendChild(comment__footer__container)

    comment__methods__container.appendChild(comment__like__button)
    comment__methods__container.appendChild(comment__input__response)
    comment__methods__container.appendChild(comment__button__response)

    comment__like__button.appendChild(comment__like__button__i)

    comment__like__button__i.appendChild(comment__like__button__content)

    comment__footer__container.appendChild(comment__date)
    comment__footer__container.appendChild(comment__button__see__responses)

    
    parent.appendChild(comment__container)

    comment__button__see__responses.addEventListener('click', e => {
      comment__container__responses.classList.toggle('active')
    }) 

    comment__like__button.addEventListener('click', e => {
      element.likes++;
      comment__like__button__content.textContent = element.likes;
      storageUpload('products__list', products__list)
    })

    comment__button__response.addEventListener('click', () => {
      comment__input__response.classList.toggle('active')
      if(comment__input__response.classList.contains('active')){
        comment__button__response.innerHTML = '<i class="fa-solid fa-xmark"></i>'
      }else{
        comment__button__response.textContent = 'Responder'
      }
    })

    comment__input__response.addEventListener('keyup', (e) => {
      if(e.key !== 'Enter'){
        return;
      }
      comment__number__of__replies++
      comment__button__see__responses.textContent = `Hay ${comment__number__of__replies} respuestas`
      storeAddNewComment(element, comment__container__responses, comment__input__response.value)
    })

    if(element.response.length > 0){
      storeWriteComments(element.response, comment__container__responses);
    }
  })  
}

const storeAddNewComment = (element, parent, value) => {
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
  else if(value.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Debe escribir algo',
      color: '#808191',
      background: '#1f1d2b'
    })
    return
  }

  const newComment = new CommentNew(output, user__session.username, value)
  
  console.log(element.response)
  newComment.uploadComment(element.response, newComment)
  storeWriteComments(element.response, parent)
  
}

const storeWriteNewProducts = () => {
  let num = 0
  for(let element of products__list){
    const content = `
    <a href="#" class="col-lg-3 col-md-6 col-11 my-2">
      <div class="card bg-dark p-0">
        <img src="${element.img}" class="card-img" alt="...">
        <div class="card-img-overlay d-flex justify-content-around flex-column">
          <h4 class="card-title">${element.title}</h4>
          <p class="card-text text-success">$${element.price}</p>
        </div>
      </div>
    </a>
    `
    num++
    if(num===5){
      break;
    }
    store__new__products__container.innerHTML += content;
  }
}



/* ---------------------------- FUNCIONES CARRITO --------------------------- */

const carritoWrite = () => {
  const carrito__user = user__session.carrito
  const carrito__container = document.querySelector('#modalCarritoItemList')
  const carrito__total__price__container = document.querySelector('#precioTotal')
  carrito__container.innerHTML = ''
  let carrito__total__price = 0;
  if(carrito__user?.length !== 0){
    carrito__user.forEach(item => {

      const {title, cantidad, price} = item
      const total = cantidad*price
      const content = `
      <tr>
        <td>${title}</td>
        <td><input type="number" min="1" class='input__cantidad' data-id='${carrito__user.indexOf(item)}' value="${cantidad}"></td>
        <td>$${price}</td>
        <td>$${total}</td>
        <td>
            <button class='btn__deleteItem' data-id='${carrito__user.indexOf(item)}'>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
      </tr>
      `
      carrito__total__price += total
      carrito__container.innerHTML += content;

      const carrito__btn__delete = carrito__container.querySelectorAll('.btn__deleteItem')
      const carrito__input__cantidad = carrito__container.querySelectorAll('.input__cantidad ')

      carrito__btn__delete.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id
          const carrito__new = user__session.carrito.filter((e)=> {return e !== user__session.carrito[id]})
          user__session.carrito = carrito__new;
          user__session.remember === true && localStorage.setItem('user__session', JSON.stringify(user__session))
          storeWriteProducts()
          carritoWriteCard()
        })
      })

      carrito__input__cantidad.forEach(btn => {
        btn.addEventListener('change', () => {
          const id = btn.dataset.id
          user__session.carrito[id].cantidad = parseInt(btn.value)
          user__session.remember === true && localStorage.setItem('user__session', JSON.stringify(user__session))
          carritoWrite()
          carritoWriteCard()
        })
      })
    })
    carrito__total__price__container.innerHTML = `$${carrito__total__price}`
  }
  carrito__total__price__container.innerHTML = `$${carrito__total__price}`

}


const carritoAddItem = (title, cantidad, price) => {
  const newCarritoItem = new CarritoNew(title, cantidad, price)
  let existe = false
  user__session.carrito.forEach(item => {
    if(item.title === newCarritoItem.title){
      item.cantidad = parseInt(item.cantidad) + parseInt(cantidad)
      existe = true
      return
    }
  })

  if(!existe){
    user__session.carrito.push(newCarritoItem)
  }
  user__session.remember === true && storageUpload('user__session', user__session)
  carritoWrite()
  carritoWriteCard()
}

const carritoDeleteItems = () => {

  Swal.fire({
    title: 'Borrar todo el carrito',
    showCancelButton: true,
    color: '#808191',
    background: '#1f1d2b',
    confirmButtonText: 'confirmar'
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      user__session.carrito = []
      const carrito__list__container = document.querySelector('#modalCarritoItemList')
      const carrito__precio__total = document.querySelector('#precioTotal')
      carrito__list__container.innerHTML = ''
      carrito__precio__total.innerHTML = '$'+0
      user__session.remember === true && storageUpload('user__session', user__session)  
      Swal.fire({
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        color: '#808191',
        background: '#1f1d2b'

      })
    }
  })
}

const carritoWriteCard =() => {
  const carrito__precio__total__container = document.querySelector('#ventaPrecioTotal')
  const carrito__user = user__session.carrito;
  let carrito__precio__total = 0
  if(carrito__user?.length !== 0){
    carrito__user.forEach(item => {
      const {cantidad, price} = item
      const total = cantidad*price
      carrito__precio__total += total
    })
    carrito__precio__total__container.textContent = `$${carrito__precio__total}`
  }else{
    carrito__precio__total__container.textContent = `$0`
  }
}

const carritoCardFront = () => {
  if(carrito__card__container.classList.contains('active')){
    carrito__card__container.classList.remove('active')
  }
}

const carritoCardNumberChange = (valorInput) =>{
  const carrito__card__number = carrito__card__container.querySelector('#tarjetaNumero')
  const carrito__card__logo = document.querySelector('#marcaLogo')

  carrito__card__form.tarjetaNumeroInput.value = valorInput
  .replace(/\s/g, '')
  .replace(/\D/g, '')
  .replace(/([0-9]{4})/g, '$1 ')
  .trim();

  carrito__card__number.textContent = valorInput;

  if(valorInput === ''){
    carrito__card__number.textContent ='#### #### #### ####'

    carrito__card__logo.innerHTML = '';
  }

  if(valorInput[0] === '4'){
    carrito__card__logo.innerHTML = '';
    const imagen = document.createElement('img')
    imagen.src = 'img/visa.png'
    carrito__card__logo.appendChild(imagen)
  }else if(valorInput[0] === '5'){
    carrito__card__logo.innerHTML = '';
    const imagen = document.createElement('img')
    imagen.src = 'img/mastercard.png'
    carrito__card__logo.appendChild(imagen)
  }
  carritoCardFront()
}

const carritoCardNameChange = (valorInput) => {

  const carrito__card__name = carrito__card__container.querySelector('#tarjetaNombre')
  const firma = carrito__card__container.querySelector('#tarjetaFirma')

  carrito__card__form.tarjetaNombreInput.value = valorInput
  .replace(/[0-9]/g, '')

  carrito__card__name.textContent = valorInput;
  firma.textContent = valorInput;

  if(valorInput == ''){
    carrito__card__name.textContent = 'jhon doe'
  }

  carritoCardFront()
}

const carritoBuy = () => {

  const nombre = carrito__card__form.tarjetaNombreInput.value
  const numero = carrito__card__form.tarjetaNumeroInput.value
  const ccv = carrito__card__form.tarjetaCCVInput.value
  const mes = carrito__card__form.selectMes.value
  const year = carrito__card__form.selectYear.value
  if(!nombre || !numero || !ccv || !mes || !year){
    Swal.fire({
      icon: 'error',
      title: 'Complete los campos',
      color: '#808191',
      background: '#1f1d2b'
    })
    return;
  }
  Swal.fire({
    icon: 'success',
    text: 'Se ha comprado todo su carrito',
    timer: 1500,
    showConfirmButton: false,
    color: '#808191',
    background: '#1f1d2b'

  })
  user__session.carrito = []
  user__session.remember === true && storageUpload('user__session', user__session)  
  carritoWrite()
  carritoWriteCard()
}

const carritoWriteSelect = () => {
  for( let i = 1; i<= 12; i++){
    let option = document.createElement('option')
    option.value = i;
    option.innerHTML = i;
    carrito__card__form.selectMes.appendChild(option)
  }
  
  // obtenemos el año actual
  const current__date= new Date().getFullYear();
  for( let i = current__date; i <= current__date + 8; i++){
    let option = document.createElement('option')
    option.value = i;
    option.innerHTML = i;
    carrito__card__form.selectYear.appendChild(option)
  }
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
carritoWriteSelect()