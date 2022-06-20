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


// CARRITO METHOD
const carritoContainerModal = document.querySelector('#modalCarrito')
const btnDeleteCarrito = carritoContainerModal.querySelector('#btnCarritoDelete')
const btnBuyCarrito = carritoContainerModal.querySelector('#btnCarritoBuy')


// METHOD BUY CARRITO
const modalBuyCarrito = document.querySelector('#modalBuyCarrito')
const buyCarritoContainer = modalBuyCarrito.querySelector('.modal-body')


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


// EVENTOS FILTRAR PRODUCTOS


//EVENTO FILTRAR POR BUSQUEDA
storeInputFilter.addEventListener('keyup', () => {
  productCategoryFilter.value = ''
  writeProducts()
})


// EVENTO FILTRAR POR CATEGORIA
productCategoryFilter.addEventListener('change', () => {
  storeInputFilter.value = ''
  writeProducts()
})



// EVENTOS CARRITO


// EVENTO ELIMINAR CARRITO
btnDeleteCarrito.addEventListener('click', () => {
  deleteCarrito()
})


// EVENTO COMPRAR CARRITO
btnBuyCarrito.addEventListener('click', () => {

})


// FUNCIONES

// FUNCIONES FETCH
const getDataFetch = async() => {
  const respuesta = await fetch('./js/data.json')
  const data = await respuesta.json()
  console.log(data)
  return data
}


// FUNCIONES STORAGE
const getStorage = (name) => {
  let storage = localStorage.getItem(name)
  if(!storage){
    return []
  }
  return JSON.parse(storage)
}

const uploadStorage = (to, data) => {
  localStorage.setItem(to, JSON.stringify(data))
}



// FUNCIONES USER

// FUNCION REGISTRARSE
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
  if(password.value !== password2.value){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden'
    })
    return;
  }

  const newUser = {
    email: email.value,
    username: username.value,
    password: password.value,
    saldo: 0,
    carrito: []
  }
  let exist = false
  users.forEach(function(user) {
    exist = user.email === newUser.email && true;
    exist = user.username === newUser.username && true;
    console.log(exist)
  });

  if(!exist){
    users = [...users, newUser]
    uploadStorage('users', users)
    Swal.fire({
      icon: 'success',
      title: 'Usuario creado correctamente',
      text: 'Ahora inicie sesion'
    }) 
  }else{
    Swal.fire({
      icon: 'warning',
      title: 'Ese nombre ya esta en uso',
      text: 'Pruebe con otro'
    })
  }

}

// FUNCION INICIAR SESION
const signIn = () => {
  const values = formSignin.getElementsByTagName('input');
  const [name, password, check] = values;
  const user = users.filter((user) => {
    if(user.email === name.value || user.username === name.value){
      return user;
    }
  })

  if(user[0] === false || user.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Usuario no encontrado',
      text: 'Revise los campos'
    })
    return
  }

  if(user[0].password !== password.value){
    Swal.fire({
      icon: 'error',
      title: 'La contraseña del usuario: ' + user[0].username,
      text: 'Es incorrecta'
    })
    return
  }
  userState = user[0]
  if(check.checked === true){
    uploadStorage('userState', userState)
  }

  Swal.fire({
    icon: 'success',
    title: 'Sesion iniciada',
    text: 'Tus datos no seran compartidos a nadie'
  })

  console.log(userState)
  onAuthState()
}

// FUNCIONES ESTADO DEL USUARIO


// ESTABLECER ESTADO
const onAuthState = () => {
  if(userState.length !== 0){
    const contentUser = `
    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${userState.username}
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
    userMethods.innerHTML = contentUser;
    userMenu.innerHTML = contentMenu;

    const btnLogout = document.querySelector('#btn__logOut')
    btnLogout.addEventListener('click', (e) => {
      logOut()
    })

  }

}


// CERRAR SESION
const logOut = () => {
  Swal.fire({
    title: '¿Cerrar sesion?',
    showCancelButton: true,
    confirmButtonText: 'confirmar'
    }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem('userState');
      userState = false
      Swal.fire({
        icon: 'success',
        timer: 1500,
        showConfirmButton: false

      })
      setTimeout( () => {
        window.location.reload()

      }, 1500)

    }
  })
}

// FUNCIONES STORE


// ESCRIBIR PRODUCTOS EN EL STORE
const writeProducts = () => {
  storeBody.innerHTML = '';
  const texto = storeInputFilter.value.toLowerCase();
  const categoria = productCategoryFilter.value.toLowerCase()

  for( let product of storageProducts){
    let title = product.title.toLowerCase();
    let category = product.category.toLowerCase();

    if(title.indexOf(texto || categoria) !== -1 || category.indexOf(texto || categoria) !== -1){
      const content = `
      <a href="#" class="col-12 col-md-6 col-lg-3 item__key" data-bs-target='#modalItem' data-bs-toggle='modal' data-id='${storageProducts.indexOf(product)}'>
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
      storeBody.innerHTML += content
    }
  }

  const itemList  = storeBody.querySelectorAll('.item__key')
  itemList.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id
      openItem(id)
    })
  })
  if(storeBody.innerHTML === ''){
      storeBody.innerHTML += `<h6 class='text__not__found'>Producto no encontrado</h6>`
  } 
}


// AÑADIR PRODUCTO AL STORE
const addProduct = () => {
  const values = formCreateProduct.getElementsByTagName('input')
  const [title, description, price] = values
  console.log(values)
  const category = formCreateProduct.querySelector('#productCategory').value

  if(!title.value || !description.value || !price.value || !category){
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacios',
      text: 'Debe llenar todos los campos con informacion valida'
    })
    return;
  }

  

  const newProduct = {
    title: title.value,
    description: description.value,
    category: category,
    img: `./img/${category.toLowerCase()}.png`,
    price: price.value
  }
  
  storageProducts = [...storageProducts, newProduct]
  uploadStorage('products', storageProducts)
  storageProducts = getStorage('products')
  console.log(storageProducts)

  Swal.fire({
    icon: 'success',
    title: 'Productos subido exitosamente'
  })
  writeProducts()

}


// ABRIR VENTANA ITEM
const openItem = (e) => {
  const { title, description, category, price } = storageProducts[e];

  const modalFooterContainer = modalItem.querySelector('.modal__button__container')

  modalFooterContainer.innerHTML = ''

  modalItem.querySelector('#modal__title').innerHTML = title
  modalItem.querySelector('#modal__description').innerHTML = description
  modalItem.querySelector('#modal__category').innerHTML = category
  modalItem.querySelector('#modal__price').innerHTML = price

  let button = document.createElement('button')
  button.classList.add('btn__addCarrito')
  button.classList.add('w-100')
  button.textContent ='Añadir al carrito'

  modalFooterContainer.appendChild(button)

  let cantidadItems = modalItem.querySelector('#cantidadItems')
  cantidadItems.addEventListener('change', ()=> {
    cantidadItems = modalItem.querySelector('#cantidadItems')
  })
 
  button.addEventListener('click', () => {
    addItemCarrito(title, cantidadItems.value, price)
  })

}


// FUNCIONES CARRITO


// FUNCION AÑADIR ITEM AL CARRITO
const addItemCarrito = (title, cantidad, price) => {
  const newCarritoItem ={
    title: title,
    cantidad: parseInt(cantidad),
    price: price
  }
  let existe = false


  userState.carrito.forEach(item => {

    if(item.title === newCarritoItem.title){
      item.cantidad = parseInt(item.cantidad) + parseInt(cantidad)
      existe = true
      return
    }
  })

  if(!existe){
    userState.carrito.push(newCarritoItem)
  }
  writeNotifications(`${newCarritoItem.title} agregado al carrito`)
  uploadStorage('userState', userState)
  writeCarrito()
}



// FUNCION ESCRIBIR CARRITO
const writeCarrito = () => {
  const carrito = userState.carrito
  const carritoContainer = document.querySelector('#modalCarritoItemList')
  const precioTotalContainer = document.querySelector('#precioTotal')
  carritoContainer.innerHTML = ''
  let precioTotal = 0
  if(carrito?.length !== 0){
    carrito.forEach(item => {

      const {title, cantidad, price} = item
      const total = cantidad*price
      content = `
      <tr>
        <td>${title}</td>
        <td><input type="number" min="1" class='input__cantidad' data-id='${carrito.indexOf(item)}' value="${cantidad}"></td>
        <td>$${price}</td>
        <td>$${total}</td>
        <td>
            <button class='btn__deleteItem' data-id='${carrito.indexOf(item)}'>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
      </tr>
      `
      precioTotal += total
      carritoContainer.innerHTML += content;

      const btnGroup = carritoContainer.querySelectorAll('.btn__deleteItem')
      const inputCantidad = carritoContainer.querySelectorAll('.input__cantidad ')

      btnGroup.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id
          const newCarrito = userState.carrito.filter((e)=> {return e !== userState.carrito[id]})
          userState.carrito = newCarrito;
          localStorage.setItem('userState', JSON.stringify(userState))
          writeCarrito()
        })
      })

      inputCantidad.forEach(btn => {
        btn.addEventListener('change', () => {
          const id = btn.dataset.id
          userState.carrito[id].cantidad = parseInt(btn.value)
          localStorage.setItem('userState', JSON.stringify(userState))
          writeCarrito()
        })
      })
    })
    precioTotalContainer.innerHTML = `$${precioTotal}`
  }

}


// FUNCION VACIAR CARRITO 
const deleteCarrito = () => {

  userState.carrito = []
  const listContainer = carritoContainerModal.querySelector('#modalCarritoItemList')
  const precioTotalContainer = document.querySelector('#precioTotal')
  listContainer.innerHTML = ''
  precioTotalContainer.innerHTML = '$'+0
  uploadStorage('userState', userState)  
}


// FUNCION COMPRAR CARRITO
const buyCarrito = () => {

  

}


// FUNCION CREAR NOTIFICACIONES
const writeNotifications = (data) => {
  userNotification.innerHTML +=`
  <li>
    <p class="m-0">${data}</p>
  </li>`

}

// DATOS OBTENIDOS STORAGE

let users = getStorage('users')
let userState = getStorage('userState')
let storageProducts = []
// ESCRIBIENDO LA APLICACION

const getDataProducts = async() => {
  storageProducts = await (getStorage('products').length === 0 ? getDataFetch() : getStorage('products'))
  console.log(storageProducts)
  writeProducts()
}

getDataProducts()
onAuthState()
userState.length !== 0 && writeCarrito();
userState.length !== 0 ? writeNotifications('Ingreso correctamente') : writeNotifications('Para tener mas funciones incicie sesion');