import { useEffect, useState } from "react";
import axios from "axios";
import "./MasBuscadas.css";

const MasBuscadas = () => {
  const [buscadas, setBuscadas] = useState([]);
  //Peticion api classNames
  const getBuscadas = async () => {
    const response = await axios.get(
      `https://apipdtc.herokuapp.com/bulldog/buscadas`
    );
    setBuscadas(response.data);
  };
  useEffect(() => {
    getBuscadas();
  }, []);
  console.log(buscadas);
  return (
    <div className="buscadas-container">
      <h2>Las más buscadas</h2>
      <div className="card-container">
        {buscadas.map((buscada) => (
          <div className="card shadow" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={require(`../../assets/img/buscadas/${buscada.imagen}.png`)}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{buscada.nombre}</h5>
              <ul>
                {buscada.ingredientes.map((ingrediente) => (
                  <li>{ingrediente}</li>
                ))}
              </ul>
              <div className="btn-price">
                <button className="btn btn-warning text-light">
                  <p className="btn-order">Ordenar</p>
                </button>
                <p className="m-0 ">${buscada.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasBuscadas;
