
/* -------------------------------------------------------------------------- */
/*                                  FUNIONES                                  */
/* -------------------------------------------------------------------------- */


/* ------------------------- OBTENER DATOS DEL JSON ------------------------- */
const getDataFetch = async() => {
    const respuesta = await fetch('./js/data.json')
    const data = await respuesta.json()
    console.log(data)
    return data
}

const getDataProducts = async() => {
    storageProducts = await (getStorage('products').length === 0 ? getDataFetch() : getStorage('products'))
    console.log(storageProducts)
    writeProducts()
    writeNewProducts()
}


/* --------------------- OBTENER DATOS DEL LOCALSTORAGE --------------------- */
const getStorage = (name) => {
    let storage = localStorage.getItem(name)
    if(!storage){
      return []
    }
    return JSON.parse(storage)
}
  
/* ----------------------- SUBIR DATOS AL LOCALSTORAGE ---------------------- */
const uploadStorage = (to, data) => {
    localStorage.setItem(to, JSON.stringify(data))
}


/* -------------------------------------------------------------------------- */
/*                           ESCRIBIENDO APLICACION                           */
/* -------------------------------------------------------------------------- */
userState.length !== 0 && writeVenta()
userState.length !== 0 && writeCarrito();

/* -------------------------------------------------------------------------- */
/*                            FUNCIONES EXPORTADAS                            */
/* -------------------------------------------------------------------------- */
export {getDataFetch}