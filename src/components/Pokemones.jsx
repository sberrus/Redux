import React from "react";

//importaciones necesarias para disparar las acciones en redux.
// useDispatch es el necesario para disparar la acción.
// useSelector sirve para leer el array que tenga el state.
import { useDispatch, useSelector } from "react-redux";
//llamamos a la accion que vamos a disparar.
//llamamos a la función que tiene el pato con la acción que se quiere ejecutar en este componente
import { obtenerPokemonesAccion } from "../redux/pokeDucks";

const Pokemones = () => {
  //llamamos al dispatch para que pueda disparar las acciones.
  const dispatch = useDispatch();

  //almacenamos el objeto en una variable que sará la que usemos para acceder a los datos que devuelve la API.
  const pokemones = useSelector((store) => store.pokemones.array);

  const capitalize = (word) => {
    const cap = word.charAt(0);
    const restText = word.slice(1,word.lenght);
    const capped = cap.toUpperCase() + restText;
    return capped
  };

  //variables globales para el buscador
 
  let globalRange = 50;
  const cambiarLabel= (event) =>{
    const range = document.getElementById("rangeValue");
    range.textContent = event.target.value;
    range.setAttribute("range", event.target.value);
    globalRange = event.target.value;
  }



  return (
    <div className="mb-5">
      <h3>Provider</h3>
      <p>
        Para poder utilizar los datos de redux tenemos que hacer un "provider"
        dentro de este provider estarán encapsulados los datos que nos llegan
        desde redux.
      </p>
      <p>
        Este Provider debe estar en el componente padre de todos los elementos
        que harán uso del mismo. (En este caso será el componente App.jsx).
      </p>
      <p>
        Hasta este punto si todo ha ido bien, al abrir la extensión de redux del
        navegador ya se podrá ver el array vacio.
      </p>
      <h1>Usando la acción</h1>
      {/* Para llamar a la accion hacemos un evento. La función del evneto será la función dispatch que enviaremos como parámetro la función que exporta el pato que queramos usar. */}
      <p>
        El boton anterior llamo a los datos que nos devuelve la API y los
        almacena en el estado. Después haremos uso del "useSelector()" para
        poder leer los datos que nos estan almacenados en redux
      </p>
      <h2>Lista de pokemones</h2>
      <div className="container d-flex justify-content-center">
        <button
          className="btn btn-dark border fw-bolder m-4"
          title="Consumir API"
          onClick={() => {
            const queryRange = globalRange;
            dispatch(obtenerPokemonesAccion(0,queryRange));
          }}
        >
          Obtener Pokemones
        </button>
        <label>De 0 a <span id="rangeValue">50</span></label>
        <input type="range" min="1" max="50" id="range" onChange={cambiarLabel}/>
      </div>
      <div className="row mt-3 d-flex justify-content-center" id="pokeList">
        {pokemones.map((pokemon) => (
          <div key={pokemon.name} className="col-4">
            <a
              title={capitalize(pokemon.name)}
              className="text-white border border-light btn w-100 text-capitalize"
              href={pokemon.url}
            >
              {pokemon.name}
            </a>
          </div>
        ))}
      </div>
      {/* Hay que recordar que en el pato, el array donde se almacenaran los datos debe inicializarse. Esto debe ser asi, ya que al renderizar ese componente va a recorrer el array, si no hay nada, va a saltar siempre un error, para evitar esto inicializamos el estado del pato para evitar este error
      
        pokeDucks.js: 34

       */}
    </div>
  );
};
export default Pokemones;
