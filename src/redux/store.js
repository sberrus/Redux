/**
 *  ¿QUE ES STORE.JS?
 *  
 *      - Store.js es el componente de redux que se encarga de manejar todas las acciones de cada uno de los ducks y enviar los datos al 
 *      resto de la app.
 * 
 *      - Después de que los datos hayan sido tratados en los ducks se manejan en la tienda para dsitribuirñla al resto de la app.
 */

/* PAQUETES NECESARIOS PARA TRABAJAR CON LA STORE */
//Estas importaciones son necesarias a la hora de trabajar con redux. 
//Destacan "applyMiddleware" y "redux-thunk" porque son las que nos permiten trabajar con las promesas en Redux
import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import pokeReducer from "./pokeDucks";

/* IMPORTAMOS LOS DUCKS CON LAS ACCIONES */
// Se llaman a todos los que se vayan a utilizar en la app.
import pokesReducer from "./pokeDucks"

/* Creamos las acciones que serán públicas para el resto de la app */
// como nombre de atributo se envia el nombre de la acción y el duck que hemos importado.
// Si queremos añadir otra acción, tenemos que añadirlo como nuevos nombres de atributos y declarando los ducks siguientes.  
const rootReducer = combineReducers({
    pokemones: pokeReducer,
//  ...
//  accion2: accion2Reducer,
//  accion3: accion3Reducer,
//  ...

})

/* CONFIGURACION DE LA EXTENSIÓN PARA TRABAJAR CON REDUX  */
//Esta sección se encarga de preguntarle al navegador si tiene instalada la extensión.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*  CONFIGURACIÓN DEL EXPORT     */
//Aquí exportamos toda la configuración anterior para poder usar sus acciones en le resto de la app.
//Por convención se usa como nombre a la funnción "generateStore()".
export default function generateStore(){
    //esta función tendra dentro la tienda. Está tendra a su vez, todas las configuraciones y dependencias necesarias para funcionar. Por eso se indicaba al inicio que son necesarias para que funcionen redux correctamente.
    const store = createStore( rootReducer, composeEnhancer( applyMiddleware(thunk) ) )
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    return store; // devolvemos la store
}

/*  
    La ventaja de trabajar de esta forma es que en un fuutro si queremos añadir funcionalidad para nuestra app podemos simplemente añadir más ducks a rootReducer() y estarían listas para funcionar en el resto de la app si se solicitará. 
*/