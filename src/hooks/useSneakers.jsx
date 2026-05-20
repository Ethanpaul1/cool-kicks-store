// Custom hook to manage all sneaker data and actions
import { useState, useEffect, useCallback, useRef } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

function useSneakers() {
  // useState stores our sneaker list
  const [sneakers, setSneakers] = useState([])
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const fetchSneakers = useCallback(function fetchSneakers() {
    fetch(`${API_URL}/sneakers`)
      .then((response) => response.json())
      .then((data) => {
        if (!mountedRef.current) return
        setSneakers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch sneakers:", error)
        if (mountedRef.current) {
          setLoading(false)
        }
      })
  }, [])

  // useEffect fetches data when the app first loads (GET request)
  useEffect(() => {
    fetchSneakers()
  }, [fetchSneakers])

  // POST - adds a new sneaker
  const addSneaker = useCallback(function addSneaker(newSneaker) {
    fetch(`${API_URL}/sneakers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSneaker),
    })
      .then((response) => response.json())
      .then((data) => {
        if (mountedRef.current) {
          setSneakers((prev) => [...prev, data])
        }
      })
      .catch((error) => console.error("Failed to add sneaker:", error))
  }, [])

  // PATCH - edits an existing sneaker's price
  const updateSneaker = useCallback(function updateSneaker(id, updatedInfo) {
    fetch(`${API_URL}/sneakers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => response.json())
      .then((updatedSneaker) => {
        if (!mountedRef.current) return
        setSneakers((prev) =>
          prev.map((sneaker) => (sneaker.id === id ? updatedSneaker : sneaker))
        )
      })
      .catch((error) => console.error("Failed to update sneaker:", error))
  }, [])

  // DELETE - removes a sneaker
  const deleteSneaker = useCallback(function deleteSneaker(id) {
    fetch(`http://localhost:3001/sneakers/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Delete failed")
        }
        if (mountedRef.current) {
          setSneakers((prev) => prev.filter((s) => s.id !== id))
        }
      })
      .catch((err) => {
        console.error("Delete error:", err)
      })
  }, [])

  // Return everything so other components can use them
  return { sneakers, loading, addSneaker, updateSneaker, deleteSneaker }
}

export default useSneakers
