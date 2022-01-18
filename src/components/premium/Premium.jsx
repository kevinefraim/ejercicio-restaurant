import { useEffect, useState } from "react";
import axios from "axios";
import "./Premium.css";

const Premium = () => {
  const [premium, setPremium] = useState([]);
  //Peticion api classNames
  const getPremium = async () => {
    const response = await axios.get(
      `https://apipdtc.herokuapp.com/bulldog/premium`
    );
    setPremium(response.data);
  };
  useEffect(() => {
    getPremium();
  }, []);
  console.log(premium);
  return (
    <div className="premium-container">
      <h2>Las más premium</h2>
    </div>
  );
};

export default Premium;
