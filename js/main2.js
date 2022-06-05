
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


// FORM REGISTER
const formSingup = document.querySelector('#formSignup')
// FORM SIGN IN
const formSignin = document.querySelector('#formSignin')
// USER METHODS
const userMethods = document.querySelector('#menu__methods')
const userNotification = document.querySelector('#user__notifications')
const userMenu = document.querySelector('#user__menu')

//EVENTOS USER
formSingup.addEventListener('submit', (e) => {
  e.preventDefault()
  signUp()
})

formSignin.addEventListener('submit', (e) => {
  e.preventDefault()
  signIn()
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
            <a href="#" data-bs-toggle="modal" data-bs-target="#modalSignUp" class="d-flex justify-content-center align-items-center">
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

const uploadStorageUser = () => {
  let storage = localStorage.getItem('users')
  if(!storage){
    localStorage.setItem('users', JSON.stringify(users))
    return;
  }
  localStorage.setItem('users', JSON.stringify(users))
}

// VARIABLES GLOBALES

let users = getStorage('users')
let userState = getStorage('userState')
onAuthState()


if(userState.length !== 0){
  const btnLogout = document.querySelector('#btn__logOut')
  console.log(btnLogout)
  btnLogout.addEventListener('click', (e) => {
    logOut()
  })
}