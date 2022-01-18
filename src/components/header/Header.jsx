import "./Header.css";
const Header = () => {
  return (
    <header>
      <nav className="nav-container">
        <div className="left-container">
          <img
            src={require(`../../assets/img/logoFav.png`)}
            alt="logo"
            className="img-nav"
          />
          <h5>Burger Manía</h5>
        </div>
        <div className="right-container">
          <img
            src={require(`../../assets/img/instagramNavbar.png`)}
            alt="ig"
            className="img-nav m-2"
          />
          <img
            src={require(`../../assets/img/facebookNavbar.png`)}
            alt="fb"
            className="img-nav m-2"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
