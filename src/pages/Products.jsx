import { useState, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"
import useSneakers from "../hooks/useSneakers.jsx"
import SneakerCard from "../components/SneakerCard.jsx"

function Products() {
  // Using our custom hook to get sneaker data
  const { sneakers, loading } = useSneakers()
  const [query, setQuery] = useState("")
  const location = useLocation()

  // Keep query in sync with ?search= in the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const s = params.get("search") || ""
    setQuery(s)
  }, [location.search])

  const filteredSneakers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sneakers
    return sneakers.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        (s.brand && s.brand.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q))
      )
    })
  }, [sneakers, query])

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "40px" }}>Loading sneakers...</h2>
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Sneaker Collection</h2>
      <p style={styles.subheading}>{filteredSneakers.length} styles available</p>

      <div style={styles.searchBox}>
        <input
          aria-label="search-input"
          placeholder="Search by name, brand or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.grid}>
        {filteredSneakers.map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} />
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
