function SneakerCard({ sneaker, onDelete, onUpdate }) {
  return (
    <div style={styles.card}>
      <img
        src={sneaker.image}
        alt={sneaker.name}
        style={styles.image}
      />
      <div style={styles.info}>
        <h3 style={styles.name}>{sneaker.name}</h3>
        <p style={styles.brand}>{sneaker.brand}</p>
        <p style={styles.description}>{sneaker.description}</p>
        <p style={styles.price}>${sneaker.price}</p>

        {/* Only show these buttons on the Admin page */}
        {onDelete && (
          <button
            style={styles.deleteBtn}
            onClick={() => onDelete(sneaker.id)}
          >
            Delete
          </button>
        )}
        {onUpdate && (
          <button
            style={styles.updateBtn}
            onClick={() => onUpdate(sneaker)}
          >
            Edit Price
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "260px",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  info: {
    padding: "15px",
  },
  name: {
    margin: "0 0 5px 0",
    fontSize: "18px",
  },
  brand: {
    color: "#888",
    margin: "0 0 5px 0",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
  price: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#111",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
  },
  updateBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
}

export default SneakerCard
