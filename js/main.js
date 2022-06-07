
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

// MAIN
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


// FORM REGISTER
const formSingup = document.querySelector('#formSignup')
// FORM SIGN IN
const formSignin = document.querySelector('#formSignin')
// FORM CREATE PRODUCT
const formCreateProduct = document.querySelector('#formCreateProduct')
// USER METHODS
const userMethods = document.querySelector('#menu__methods')
const userNotification = document.querySelector('#user__notifications')
const userMenu = document.querySelector('#user__menu')
// STORE METHODS
const storeInputFilter = document.querySelector('#storeInputFilter')
const storeBody = document.querySelector('#storeBody')
const productCategoryFilter = document.querySelector('#productCategoryFilter')
// ITEM METHOD
const modalItem = document.querySelector('#modalItem')
const modalCarrito = document.querySelector('#modalCarritoList')



//EVENTOS USER
formSingup.addEventListener('submit', (e) => {
  e.preventDefault()
  signUp()
})

formSignin.addEventListener('submit', (e) => {
  e.preventDefault()
  signIn()
})

formCreateProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  addProduct()
})



// FUNCIONES USER STATE

const onAuthState = () => {
  if(userState.length === 0){
    return
  }
  contentUser = `
    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${userState.username}
    </button>
    <ul class="dropdown-menu">
      <li>
        <a href='./index.html' class="m-0" id='btn__logOut'>Cerrar sesion</a>
      </li>
    </ul>
  `

  contentMenu = `
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
  const notificacion = 'Ingreso correctamente';
  userNotification.innerHTML =`
  <li>
    <p class="m-0">${notificacion}</p>
  </li>`
  userNotificationList.push(notificacion)
}

const logOut = () => {
  console.log('salir')
  localStorage.removeItem('userState');
  userState = false
}


// FUNCIONES USER

const signUp = () => {
  const signupEmail = formSingup.querySelector('#signupEmail').value
  const signupUsername = formSingup.querySelector('#signupUsername').value
  const signupPassword = formSingup.querySelector('#signupPassword').value
  const signupPassword2 = formSingup.querySelector('#signupPassword2').value  
  if(!signupEmail || !signupUsername || !signupPassword || !signupPassword2){
    Swal.fire(
      'Advertencia',
      'Complete todos los campos',
      'warning'
    )
    return;
  }

  if(signupPassword !== signupPassword2){
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
  let existe = false
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
    if(user.username === newUser.username){
      Swal.fire({
        icon: 'warning',
        title: 'Ese nombre ya esta en uso',
        text: 'Pruebe con otro'
      })
      existe = true
      return;
    }
  });
  if(!existe){
    users.push(newUser)
    uploadStorageUser()
    Swal.fire({
      icon: 'success',
      title: 'Usuario creado correctamente',
      text: 'Ahora inicie sesion'
    }) 
  }
  
}

const signIn = () => {
  const signinName = formSignin.querySelector('#signinName').value
  const signinPassword = formSignin.querySelector('#signinPassword').value
  const signinCheck = formSignin.querySelector('#signinCheck').checked

  const user = users.filter((user) => {
    if(user.email === signinName){
      return user;
    }else if(user.username === signinName){
      return user;
    }
  })

  console.log(user)
  if(user[0] === false || user.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Usuario no encontrado',
      text: 'Revise los campos'
    })
    return
  }

  if(user[0].password !== signinPassword){
    Swal.fire({
      icon: 'error',
      title: 'La contraseña del usuario: ' + user[0].username,
      text: 'Es incorrecta'
    })
    return
  }
  userState = user[0]
  console.log(signinCheck)
  if(signinCheck === true){
    localStorage.setItem('userState', JSON.stringify(userState))
  }
  Swal.fire({
    icon: 'success',
    title: 'Sesion iniciada',
    text: 'Tus datos no seran compartidos a nadie'
  })
  console.log(userState)
  onAuthState()
}

// FUNCIONES STORAGE

const getStorage = (name) => {
  let storage = localStorage.getItem(name)
  if(!storage){
    return []
  }
  return JSON.parse(storage)
}

const getStorageProducts = () => {
  let storage = localStorage.getItem('products')
  if(!storage){
    localStorage.setItem('products', JSON.stringify(products))
    console.log(products)
    return products;
  }
  console.log(storage)
  return JSON.parse(storage)
}

const uploadStorageUser = () => {
  let storage = localStorage.getItem('users')
  if(!storage){
    localStorage.setItem('users', JSON.stringify(users))
    return;
  }
  localStorage.setItem('users', JSON.stringify(users))
}

const uploadStorageProducts = () => {
  localStorage.setItem('products', JSON.stringify(products))
}

// FUNIONES STORE

const filtrar = () => {
  // console.log(filtro.value)
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
          <img class="w-100" src="./img/img1.png" class="card-img-top" alt="...">
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

const openItem = (e) => {
  // title: 'Remera HP',
  // description: 'lorem ipsum asnas dasd asfas da sfd asd  dsvc ascxas',
  // category: 'remeras',
  // price: 100 

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
    addItemCarrito(e, cantidadItems.value)
  })

}


// FUNCIONES CARRITO 

const addItemCarrito = (id, cantidad) => {
  const newCarritoItem ={
    id: id,
    cantidad: cantidad
  }
  let existe = false

  userState.carrito.forEach(item => {
    if(item.id === newCarritoItem.id){
      item.cantidad = parseInt(item.cantidad) + parseInt(cantidad)
      console.log(parseInt(item.cantidad), parseInt(cantidad))
      existe = true
      return
    }
  })

  if(!existe){
    console.log('agregando')
    userState.carrito.push(newCarritoItem)
  }

  console.log(userState.carrito)
  localStorage.setItem('userState', JSON.stringify(userState))
  
}

const writeCarrito = () => {
  const carrito = userState.carrito

  
}

const addProduct = () => {
  const title = formCreateProduct.querySelector('#productTitle').value
  const description = formCreateProduct.querySelector('#productDescription').value
  const price = formCreateProduct.querySelector('#productPrice').value
  const category = formCreateProduct.querySelector('#productCategory').value

  if(!title || !description || !price || !category){
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacios',
      text: 'Debe llenar todos los campos con informacion valida'
    })

    return;
  }

  newProduct = {
    title: title,
    description: description,
    category: category,
    price: price
  }

  storageProducts.push(newProduct)
  localStorage.setItem('products', JSON.stringify(storageProducts))
  console.log(products)
  storageProducts = getStorageProducts()
  filtrar()
}

//EVENTO FILTRAR
storeInputFilter.addEventListener('keyup', () => {
  productCategoryFilter.value = ''
  filtrar()
})
productCategoryFilter.addEventListener('change', () => {
  storeInputFilter.value = ''
  filtrar()
})

// VARIABLES GLOBALES

let users = getStorage('users')
let userState = getStorage('userState')
let storageProducts = getStorageProducts()
console.log(storageProducts)
onAuthState()
filtrar()


if(userState.length !== 0){
  const btnLogout = document.querySelector('#btn__logOut')
  console.log(btnLogout)
  btnLogout.addEventListener('click', (e) => {
    logOut()
  })
}