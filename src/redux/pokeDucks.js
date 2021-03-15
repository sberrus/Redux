/**
 *  ¿Qué es Ducks?
 * 
 *      Los Ducks son un tipo de dependencia que nos permite trabajar de manera más eficiente y tener un mejor control sobre los 
 *      archivos que manejemos dentro de la app. Es en simples palabras un reducer de react.
 * 
 *      Con los Ducks vamos a poder consumir Api`s.
 * 
 *  CONFIGURACION DEL DUCK
 *  
 *      Para configurarlo el Duck tiene 3 configuraciones básicas:
 *      
 *          //constantes: Aqui es donde se almacena la información como estado que va a enviar sus datos al resto de la app.
 * 
 *          //reducer: Es donde se tratan los datos que llegan de las acciones y se envian a las constantes. 
 * 
 *          //acciones: Son las acciones que se realizan. En este ejemplo consumira la API.
 * 
 *      Este Reducer será el que tratará los datos que provienen de la API.
 * 
 *  USO CONJUNTO CON STORE
 * 
 *      Los ducks se encargan de realizar tareas especificas. Se pueden tener tantos ducks como se deseen. Estos ducks se manejan para el 
 *      resto de la app en la tienda (store.js). Por eso se necesita la tienda obligatoriamente y obviamente las acciones (Ducks).
 */
// ##### EJEMPLO EN CÓDIGO #####

//llamamos a axios para trabajar con las apis.
import axios from "axios"

/*          CONSTANTES:         */

// Siempre se tiene una variable que inicializa el estado. El nombre puede ser cualquiera.
const dataInicial = {
    array: [],
    offset: 0,
}

//DECLARACION DE TYPES
//Por convención los nombres de las acciones se declaran en MAYUSCULAS.
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";



/*           REDUCER:            */

/**
 * Esta es la función que será llamada desde los distintos componentes para su uso. Lleva como parámetro un estado (state) y una acción
 * (action). En el estado (state) se debe enviar el parámetro inicializado con el estado inicial del duck
 */

export default function pokeReducer(state = dataInicial, action) {
    //se va a recivir del action unas acciones ya declaradas en las constantes. Cada una de las acciones se debe encargar de algo muy en especifico.
    //cuando se recibe se dispara la acción, llegan aquí los datos. Aqui los transformamos y los ordenamos para devolverlos al State.
    switch (action.type) {
        //ponemos en los casos el type que querramos que sea tratado.
        case OBTENER_POKEMONES_EXITO:
            //este caso va a devolver un objeto con una copia del state actual y un array con los datos de la API.
            return { ...state, array: action.payload }
        //indicamos el default que devuelva el state como ha llegado
        default:
            return state
    }
}

/*          ACCIONES         */

//Aquí ocurre algo curioso. Las acciones se declarán con 2 funciones de flecha. Esto se debe a que la primera funcion recibe los parametros que se deben enviar a esta función, en principio no se va a usar pero más adelante veremos que en algunos casos necesitamos enviar un parámetro o más. 
//El segundo parámetro necesita obligatoriamente 2 parametros (dispatch,getState). "dispatch" es el que va a activar al reducer y con el getState se obtiene la data inicial.
//Como se va a llamar a una API tenemos que hacer una función asyncrona. La palabra reservada "async" se debe indicar al segundo parámetros que es el que va a llamar a la api. Para llamar a la API vamos a hacer uso de "axios"
// - GETSTATE: getState es el método que usamos para leer los estados. 
export const obtenerPokemonesAccion = (num_uno, num_dos) => async (dispatch, getState) => {
    //llamamos a los datos con el método getState, que nos devuelve el objeto dataInicial con sus propiedades.

    /*  console.log("getState", getState().pokemones.offset) */

    //almacenamos el valor de offset en la variable offset del export.
    //forma 1:
    /*     const offset1 = getState().pokemones.offset
    */    //forma 2:
    const { offset } = getState().pokemones; //usamos destructuring para familiarizarme con el uso del mismo.
    console.log(offset)

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${num_uno}&limit=${num_dos}`)
        //Con dispatch enviamos la información que hemos recibido desde la api y la enviamos a reducer
        //Enviamos el TYPE que hayamos declarado en las constantes para enviar ese type al switch y poder manejarlo la acción desde allí.
        //en payload indicamos los datos que nos devuelve la API y los enviamos al reducer para que los maneje.
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAction = ()=> async (dispatch,getState)=>{

    const { offset } = getState().pokemones;
    const siguiente = offset + 20 

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({

        })
    } catch (error) {
        console.log(error)
    }
}
/*********************************/
/*          DESGLOSE             */

//TOMANDO EN CUENTA QUE TAN COMPLEJO SEA LA APP QUE ESTES DESARROLLANDO, PUEDE QUE VEAS PERSONAS QUE TIENEN TODO EL DUCK EN UN SOLO DOCUMENTO U OTRAS QUE TIENEN EL DUCK EN VARIOS DOCUMENTOS. EN ESTE CASO AL SER UNA APP SIMPLE DEJAREMOS TODO EN UN SOLO DOCUMENTO.
