import { useState } from "react"
import useSneakers from "../hooks/useSneakers"
import SneakerCard from "../components/SneakerCard"

function Admin() {
  const { sneakers, loading, addSneaker, updateSneaker, deleteSneaker } =
    useSneakers()

  // State for the add sneaker form
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
  })

  // State for the edit price form
  const [editingSneaker, setEditingSneaker] = useState(null)
  const [newPrice, setNewPrice] = useState("")

  // Handles typing in the add form
  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // POST - submits the new sneaker form
  function handleAddSneaker(e) {
    e.preventDefault()
    addSneaker({
      ...formData,
      price: parseFloat(formData.price),
    })
    // Reset form after submitting
    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
    })
  }

  // Sets up the edit form when Edit Price is clicked
  function handleUpdateClick(sneaker) {
    setEditingSneaker(sneaker)
    setNewPrice(sneaker.price)
  }

  // PATCH - submits the updated price
  function handleUpdateSubmit(e) {
    e.preventDefault()
    updateSneaker(editingSneaker.id, { price: parseFloat(newPrice) })
    setEditingSneaker(null)
    setNewPrice("")
  }

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "40px" }}>Loading...</h2>
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <p style={styles.subheading}>Manage your sneaker inventory</p>

      {/* ADD SNEAKER FORM - POST request */}
      <div style={styles.formBox}>
        <h3>Add New Sneaker</h3>
        <form onSubmit={handleAddSneaker} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Sneaker Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleFormChange}
            required
          />
          <input
            style={styles.input}
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleFormChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleFormChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleFormChange}
          />
          <button style={styles.addBtn} type="submit">
            Add Sneaker
          </button>
        </form>
      </div>

      {/* EDIT PRICE FORM - PATCH request - only shows when editing */}
      {editingSneaker && (
        <div style={styles.formBox}>
          <h3>Edit Price for {editingSneaker.name}</h3>
          <form onSubmit={handleUpdateSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="number"
              placeholder="New Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
            />
            <button style={styles.addBtn} type="submit">
              Update Price
            </button>
            <button
              style={styles.cancelBtn}
              type="button"
              onClick={() => setEditingSneaker(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* SNEAKER LIST with Delete and Edit buttons */}
      <h3 style={{ textAlign: "center", marginTop: "40px" }}>
        Current Inventory ({sneakers.length} sneakers)
      </h3>
      <div style={styles.grid}>
        {sneakers.map((sneaker) => (
          <SneakerCard
            key={sneaker.id}
            sneaker={sneaker}
            onDelete={deleteSneaker}
            onUpdate={handleUpdateClick}
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
  formBox: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "500px",
    margin: "0 auto 30px auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },
  addBtn: {
    backgroundColor: "#111111",
    color: "#ffffff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#888",
    color: "#ffffff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    justifyItems: "center",
    marginTop: "20px",
  },
}

export default Admin
