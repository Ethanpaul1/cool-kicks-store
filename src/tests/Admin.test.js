import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Admin from "../pages/Admin"

const mockSneakers = [
  {
    id: 1,
    name: "Air Pulse 1",
    brand: "Nike",
    price: 120,
    description: "Classic low-top with a clean white sole",
    image: "https://via.placeholder.com/400",
  },
]

describe("Admin page", () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("loads inventory and displays sneaker cards", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSneakers,
    })

    render(<Admin />)

    expect(await screen.findByText(/Current Inventory/i)).toBeInTheDocument()
    expect(screen.getByText(/Air Pulse 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Nike/i)).toBeInTheDocument()
  })

  test("adds a new sneaker using the admin form", async () => {
    const newSneaker = {
      id: 2,
      name: "Runner X",
      brand: "Adidas",
      price: 140,
      description: "Lightweight running shoe",
      image: "https://via.placeholder.com/400",
    }

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSneakers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newSneaker,
      })

    render(<Admin />)

    expect(await screen.findByText(/Current Inventory/i)).toBeInTheDocument()

    userEvent.type(screen.getByPlaceholderText(/Sneaker Name/i), newSneaker.name)
    userEvent.type(screen.getByPlaceholderText(/Brand/i), newSneaker.brand)
    userEvent.type(screen.getByPlaceholderText(/Price/i), newSneaker.price.toString())
    userEvent.type(screen.getByPlaceholderText(/Description/i), newSneaker.description)
    userEvent.type(screen.getByPlaceholderText(/Image URL/i), newSneaker.image)

    userEvent.click(screen.getByRole("button", { name: /Add Sneaker/i }))

    await waitFor(() => {
      expect(screen.getByText(/Runner X/i)).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenLastCalledWith("http://localhost:3001/sneakers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newSneaker.name,
        brand: newSneaker.brand,
        price: newSneaker.price,
        description: newSneaker.description,
        image: newSneaker.image,
      }),
    })
  })

  test("updates sneaker price when edit is submitted", async () => {
    const updatedPrice = 150
    const updatedSneaker = { ...mockSneakers[0], price: updatedPrice }

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSneakers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedSneaker,
      })

    render(<Admin />)

    expect(await screen.findByText(/Air Pulse 1/i)).toBeInTheDocument()

    userEvent.click(screen.getByRole("button", { name: /Edit Price/i }))

    const priceInput = screen.getByPlaceholderText(/New Price/i)
    userEvent.clear(priceInput)
    userEvent.type(priceInput, updatedPrice.toString())
    userEvent.click(screen.getByRole("button", { name: /Update Price/i }))

    await waitFor(() => {
      expect(screen.getByText(/\$150/i)).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenLastCalledWith("http://localhost:3001/sneakers/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: updatedPrice }),
    })
  })

  test("deletes a sneaker when delete is clicked", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSneakers,
      })
      .mockResolvedValueOnce({
        ok: true,
      })

    render(<Admin />)

    expect(await screen.findByText(/Air Pulse 1/i)).toBeInTheDocument()

    userEvent.click(screen.getByRole("button", { name: /Delete/i }))

    await waitFor(() => {
      expect(screen.queryByText(/Air Pulse 1/i)).not.toBeInTheDocument()
    })

    expect(fetch).toHaveBeenLastCalledWith("http://localhost:3001/sneakers/1", {
      method: "DELETE",
    })
  })
})
