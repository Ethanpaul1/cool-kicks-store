import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>👟 Cool Kicks Store</h1>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/products" style={styles.link}>
          Products
        </Link>
        <Link to="/admin" style={styles.link}>
          Admin
        </Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111111",
    padding: "15px 30px",
  },
  logo: {
    color: "#ffffff",
    margin: 0,
    fontSize: "22px",
  },
  links: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
  },
}

export default Navbar