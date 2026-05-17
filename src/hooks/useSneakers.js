// Custom hook to manage all sneaker data and actions
import { useState, useEffect } from "react"

function useSneakers() {
  // useState stores our sneaker list
  const [sneakers, setSneakers] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect fetches data when the app first loads (GET request)
  useEffect(() => {
    fetch("http://localhost:3001/sneakers")
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data)
        setLoading(false)
      })
  }, [])

  // POST - adds a new sneaker
  function addSneaker(newSneaker) {
    fetch("http://localhost:3001/sneakers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSneaker),
    })
      .then((response) => response.json())
      .then((data) => setSneakers([...sneakers, data]))
  }

  // PATCH - edits an existing sneaker's price
  function updateSneaker(id, updatedInfo) {
    fetch(`http://localhost:3001/sneakers/${id}`, {
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
  }

  // DELETE - removes a sneaker
  function deleteSneaker(id) {
    fetch(`http://localhost:3001/sneakers/${id}`, {
      method: "DELETE",
    }).then(() => {
      setSneakers(sneakers.filter((sneaker) => sneaker.id !== id))
    })
  }

  // Return everything so other components can use them
  return { sneakers, loading, addSneaker, updateSneaker, deleteSneaker }
}

export default useSneakers