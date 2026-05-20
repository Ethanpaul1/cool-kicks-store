import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const navigate = useNavigate()
  const [q, setQ] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`)
      setQ("")
    } else {
      navigate(`/products`)
    }
  }
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>👟 Cool Kicks Store</h1>

      <div style={styles.links}>
        <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px'}}>
          <input
            aria-label="navbar-search"
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{padding: '6px 8px', borderRadius: '6px', border: '1px solid #ddd'}}
          />
          <button type="submit" style={{padding: '6px 10px', borderRadius: '6px', border: 'none', backgroundColor: '#fff', color: '#111', cursor: 'pointer'}}>Go</button>
        </form>
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