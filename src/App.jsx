import React from "react";
import "./App.css";
import Pokemones from "./components/Pokemones";

//importamos el provider de react-redux y también importamos la tienda
import { Provider } from "react-redux";
//aqui llamamos al generador de la tienda que es la función que se exporta.
import generateStore from "./redux/store";

function App() {
  //store almacenará lo que retorna generateStore()
  //Este store será utilizado luego en los providers ya que se envian como props.
  const store = generateStore();

  return (
    <div className="container text-white">
      <h1 className="mt-5 display-2 text-info">Curso de Redux con React</h1>
      <h2>¿Qué es Redux?</h2>
      <h2>Configurando Redux (Básico)</h2>
      <p>
        Para configurar Redux hay que crear una carpeta con el nombre que
        querramos(preferiblemente <b>"redux"</b> por convención).
      </p>
      <p>
        Dentro de esa carpeta deben haber 2 archivos:
        <b>
          <i>store.js</i>
        </b>
        y
        <b>
          <i>reducer.js</i>
        </b>
      </p>
      <h3>store.js</h3>
      <p>
        store(tienda) es ese concepto que también vimos en VUE para controlar
        los estados globales de la app.
      </p>
      <p>Se profundizará en estos aspectos en los respectivos archivos.</p>
      <h3>reducer.js</h3>
      <p>
        Ir al archivo "./redux/store.js" y a "./redux/pokeDucks.js" para
        comprender en código más a fondo que es.
      </p>
      <h2>Usando las acciones en React.</h2>
      <Provider store={store}>
        <Pokemones />
      </Provider>
    </div>
  );
}

export default App;
