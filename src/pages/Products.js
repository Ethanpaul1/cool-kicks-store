import useSneakers from "../hooks/useSneakers"
import SneakerCard from "../components/SneakerCard"

function Products() {
  // Using our custom hook to get sneaker data
  const { sneakers, loading } = useSneakers()

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "40px" }}>Loading sneakers...</h2>
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Sneaker Collection</h2>
      <p style={styles.subheading}>
        {sneakers.length} styles available
      </p>

      <div style={styles.grid}>
        {sneakers.map((sneaker) => (
          <SneakerCard
            key={sneaker.id}
            sneaker={sneaker}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "40px 30px",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "10px",
  },
  subheading: {
    textAlign: "center",
    color: "#888",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    justifyItems: "center",
  },
}

export default Products
