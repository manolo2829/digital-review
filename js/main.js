
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
let users = []
let userState = false
let userNotificationList = []


// FORM REGISTER
const formSingup = document.querySelector('#formSignup')
// FORM SIGN IN
const formSignin = document.querySelector('#formSignin')
console.log(formSignin)
console.log(formSingup)
// USER METHODS
const userMethods = document.querySelector('#menu__methods')
const userNotification = document.querySelector('#user__notifications')

//EVENTOS USER
formSingup.addEventListener('submit', (e) => {
  e.preventDefault()
  signUp()
})

formSignin.addEventListener('submit', (e) => {
  e.preventDefault()
  signIn()
})


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
    Swal.fire({
      icon: 'success',
      title: 'Usuario creado correctamente',
      text: 'Ahora inicie sesion'
    }) 
  }
  console.log(users)
}

const signIn = () => {
  const signinName = formSignin.querySelector('#signinName').value
  const signinPassword = formSignin.querySelector('#signinPassword').value

  const user = users.map((user) => {
    if(user.email === signinName){
      return user
    }
    if(user.username === signinName){
      return user
    }

    return false
  })

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
  Swal.fire({
    icon: 'success',
    title: 'Sesion iniciada',
    text: 'Tus datos no seran compartidos a nadie'
  })
  
  console.log(userState)
  onAuthState()
}


const onAuthState = () => {
  if(!userState){
    console.log('no hay sesion')
    return;
  }



  // content = `
  // <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
  //   ${userState.username}
  // </button>
  // <ul class="dropdown-menu">
  //   <li>
  //       <a href='#' class="m-0 ">Ver Perfil</a>
  //   </li>
  // </ul>
  // `

  // userMethods.innerHTML = content
  // const notificacion = 'Ingreso correctamente'
  // userNotification.innerHTML +=`
  // <li>
  //   <p class="m-0">${notificacion}</p>
  // </li>`
  // userNotificationList.push(notificacion)
}

const createUser = () => {
  localStorage.setItem('users', JSON.stringify(users))
}

let cart = localStorage.getItem('users')
if(!cart){
  createUser()
}else{
  console.log('si exites')
}