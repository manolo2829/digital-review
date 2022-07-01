/* -------------------------------------------------------------------------- */
/*                           FUNCIONES STORAGE                                */
/* -------------------------------------------------------------------------- */

/* ---------------------------- FUNCIONES STORAGE --------------------------- */
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


/* --------------------- VARIABLES OBTENIDAS DEL STORAGE -------------------- */
let users = getStorage('users')
let userState = getStorage('userState')


/* -------------------------------------------------------------------------- */
/*                               FUNCIONES USER                               */
/* -------------------------------------------------------------------------- */

/* --------------------------- FUNCION REGISTRARSE -------------------------- */
const signUp = () => {
    const formSingup = document.querySelector('#formSignup')
    const values = formSingup.getElementsByTagName('input')
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

    const newUser = {
        email: email.value,
        username: username.value,
        password: password.value,
        saldo: 0,
        carrito: [],
        remember: false
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
        text: 'Ahora inicie sesion',
        color: '#808191',
        background: '#1f1d2b'
        }) 
    }else{
        Swal.fire({
        icon: 'warning',
        title: 'Ese nombre ya esta en uso',
        text: 'Pruebe con otro',
        color: '#808191',
        background: '#1f1d2b'
        })
    }

}

/* ------------------------- FUNCION INICIAR SESION ------------------------- */
const signIn = () => {
    const formSignin = document.querySelector('#formSignin')
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
    userState = user[0]
    if(check.checked === true){
        uploadStorage('userState', userState)
        userState.remember = true
    }

    Swal.fire({
        icon: 'success',
        title: 'Sesion iniciada',
        text: 'Tus datos no seran compartidos a nadie',
        color: '#808191',
        background: '#1f1d2b'
    })

    console.log(userState)
    onAuthState()
}


/* -------------------------------------------------------------------------- */
/*                       ESCRIBIENDO ESTADO DEL USUARIO                       */
/* -------------------------------------------------------------------------- */


/* -------------------- FUNCIONES ESTADO DE AUTENTICACION ------------------- */



const onAuthState = () => {
    const userMethods = document.querySelector('#menu__methods')
    const userMenu = document.querySelector('#user__menu')
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

/* ------------------------ CERRAR SESION DEL USUARIO ----------------------- */
const logOut = () => {
    Swal.fire({
        title: '¿Cerrar sesion?',
        showCancelButton: true,
        color: '#808191',
        background: '#1f1d2b',
        confirmButtonText: 'confirmar'
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        localStorage.removeItem('userState');
        userState = false
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

/* ------------------------ INICIALIZACION DEL ESTADO ----------------------- */
onAuthState()


/* -------------------------------------------------------------------------- */
/*                          EXPORTACION DE FUNCIONES                          */
/* -------------------------------------------------------------------------- */

export {signIn, signUp}