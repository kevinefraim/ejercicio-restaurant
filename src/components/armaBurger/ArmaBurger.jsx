import { useEffect, useState } from "react";
import axios from "axios";
import "./ArmaBurger.css";

const ArmaBurger = () => {
  const [burgerArmada, setBurgerArmada] = useState(
    JSON.parse(localStorage.getItem("ingrediente")) ?? []
  );
  const [ingredientes, setIngredientes] = useState([]);
  //Peticion api burgers
  const getIngredients = async () => {
    const response = await axios.get(
      `https://apipdtc.herokuapp.com/bulldog/ingredientes`
    );
    setIngredientes(response.data);
  };

  //peticion api
  useEffect(() => {
    getIngredients();
  }, []);

  //obtener ingredientes
  useEffect(() => {
    localStorage.setItem("ingrediente", JSON.stringify(burgerArmada));
  }, [burgerArmada]);

  //funcion agregar ingredientes
  const addIngredientes = (hamburguesa) => {
    setBurgerArmada([...burgerArmada, hamburguesa]);
  };

  //funcion borrar ingrediente
  const removeIngredient = (id) => {
    setBurgerArmada(burgerArmada.filter((item) => item.id != id));
  };
  console.log(burgerArmada);
  return (
    <>
      <div className="burger-container">
        <div className="list-ingredient">
          <ul>
            {ingredientes.map((ingr) => (
              <div key={ingr.id} className="ingrediente-container">
                <button
                  disabled={burgerArmada.find((item) => item.id === ingr.id)}
                  onClick={() => addIngredientes(ingr)}
                  className="btn btn-outline-success m-0"
                >
                  <li>
                    <p>{ingr.nombre}</p>
                    <img
                      src={require(`../../assets/img/ingredientes/${ingr.imagen}.png`)}
                      alt={ingr.nombre}
                      className="img-ingrediente"
                    />
                  </li>
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div className="burger-selected">
          <ul className="burger-list ">
            <h3>Arma tu burger:</h3>
            <ul>
              {burgerArmada.map((ingrediente) => (
                <div
                  key={ingrediente.id}
                  className="d-flex justify-content-around my-3"
                >
                  <li key={ingrediente.id}>{ingrediente.nombre}</li>
                  <button
                    onClick={() => removeIngredient(ingrediente.id)}
                    className="btn btn-danger"
                  >
                    X
                  </button>
                </div>
              ))}
              <h6>
                <>
                  Total:
                  {burgerArmada
                    .map((item) => item.precio)
                    .reduce((prev, curr) => prev + curr, 350)}
                </>
              </h6>
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ArmaBurger;
