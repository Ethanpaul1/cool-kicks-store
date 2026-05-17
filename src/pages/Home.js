import { Link } from "react-router-dom"

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Cool Kicks Store</h1>
        <p style={styles.subtitle}>
          Your go-to spot for the freshest sneakers on the market.
          From classic courts to modern runners — we got you covered.
        </p>
        <Link to="/products" style={styles.btn}>
          Shop Now
        </Link>
      </div>

      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>👟 Top Brands</h3>
          <p>Nike, Adidas, Jordan, New Balance and more</p>
        </div>
        <div style={styles.feature}>
          <h3>🚚 Fast Delivery</h3>
          <p>Get your kicks delivered in 2-3 business days</p>
        </div>
        <div style={styles.feature}>
          <h3>✅ Authentic Only</h3>
          <p>Every pair is verified and 100% authentic</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  hero: {
    backgroundColor: "#111111",
    color: "#ffffff",
    textAlign: "center",
    padding: "80px 30px",
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto 30px auto",
    color: "#cccccc",
  },
  btn: {
    backgroundColor: "#ffffff",
    color: "#111111",
    padding: "14px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "60px 30px",
    flexWrap: "wrap",
  },
  feature: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
}

export default Home
