import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <img
        src={require(`../../assets/img/hamburguesaPortada.png`)}
        alt="banner"
      />
      <div className="titles">
        <h1>Burger Manía</h1>
        <h3>Vení a probar las mejores burgers</h3>
      </div>
    </div>
  );
};

export default Banner;
