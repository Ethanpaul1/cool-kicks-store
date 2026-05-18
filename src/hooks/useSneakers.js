// Custom hook to manage all sneaker data and actions
import { useState, useEffect } from "react"

function useSneakers() {
  // useState stores our sneaker list
  const [sneakers, setSneakers] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"

  // useEffect fetches data when the app first loads (GET request)
  useEffect(() => {
    fetch(`${API_URL}/sneakers`)
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch sneakers:", error)
        setLoading(false)
      })
  }, [API_URL])

  // POST - adds a new sneaker
  function addSneaker(newSneaker) {
    fetch(`${API_URL}/sneakers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSneaker),
    })
      .then((response) => response.json())
      .then((data) => setSneakers([...sneakers, data]))
      .catch((error) => console.error("Failed to add sneaker:", error))
  }

  // PATCH - edits an existing sneaker's price
  function updateSneaker(id, updatedInfo) {
    fetch(`${API_URL}/sneakers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => response.json())
      .then((updatedSneaker) => {
        setSneakers(
          sneakers.map((sneaker) =>
            sneaker.id === id ? updatedSneaker : sneaker
          )
        )
      })
      .catch((error) => console.error("Failed to update sneaker:", error))
  }

  // DELETE - removes a sneaker
  function deleteSneaker(id) {
    fetch(`${API_URL}/sneakers/${id}`, {
      method: "DELETE",
    }).then(() => {
      setSneakers(sneakers.filter((sneaker) => sneaker.id !== id))
    .catch((error) => console.error("Failed to delete sneaker:", error))
    })
  }

  // Return everything so other components can use them
  return { sneakers, loading, addSneaker, updateSneaker, deleteSneaker }
}

export default useSneakers