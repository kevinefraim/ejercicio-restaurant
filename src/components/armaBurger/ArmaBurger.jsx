import { useEffect, useState } from "react";
import axios from "axios";
import "./ArmaBurger.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  //alerta
  const success = () =>
    toast.success("Órden agregada!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
  console.log(ingredientes);
  return (
    <>
      <div className="burger-container">
        <div className="list-ingredient">
          {ingredientes.map((ingr) => (
            <button
              key={ingr.id}
              disabled={burgerArmada.find((item) => item.id === ingr.id)}
              onClick={() => addIngredientes(ingr)}
              className="btn btn-outline-warning m-0"
            >
              <div className="ingr-container">
                <p>{ingr.nombre}</p>
                <img
                  src={require(`../../assets/img/ingredientes/${ingr.imagen}.png`)}
                  alt={ingr.nombre}
                  className="img-ingrediente"
                />
              </div>
            </button>
          ))}
        </div>
        <div className="burger-selected">
          <h3>Arma tu burger:</h3>
          {/* {burgerArmada.length>0 ? 
            } */}
          {burgerArmada.map((ingrediente) => (
            <button
              key={ingrediente.id}
              className="btn btn-outline-warning m-1 w-100"
            >
              <div className="ingr-container">
                <p>{ingrediente.nombre}</p>
                <div className="rigth-container">
                  <img
                    src={require(`../../assets/img/ingredientes/${ingrediente.imagen}.png`)}
                    alt={ingrediente.nombre}
                    className="img-ingrediente mx-4"
                  />
                  <button
                    onClick={() => removeIngredient(ingrediente.id)}
                    className="btn btn-danger"
                  >
                    X
                  </button>
                </div>
              </div>
            </button>
          ))}
          <button className="btn btn-outline-warning m-3 w-100 ">
            <div className="ingr-container">
              <p>Carne</p>
              <img
                src={require(`../../assets/img/ingredientes/Carne.png`)}
                alt="carne"
                className="img-ingrediente"
              />
            </div>
          </button>
          <h3>
            <>
              Total: $
              {burgerArmada
                .map((item) => item.precio)
                .reduce((prev, curr) => prev + curr, 350)}
            </>
          </h3>
          <button onClick={success} className="btn btn-warning mt-4 w-50 p-2 ">
            Confirmar órden
          </button>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
};

export default ArmaBurger;
