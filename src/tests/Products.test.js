import { render, screen } from "@testing-library/react"
import Products from "../pages/Products"

const mockSneakers = [
  {
    id: 1,
    name: "Air Pulse 1",
    brand: "Nike",
    price: 120,
    description: "Classic low-top with a clean white sole",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    name: "Runner X",
    brand: "Adidas",
    price: 140,
    description: "Lightweight running shoe",
    image: "https://via.placeholder.com/400",
  },
]

describe("Products page", () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("renders sneaker collection after loading", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSneakers,
    })

    render(<Products />)

    expect(await screen.findByText(/Our Sneaker Collection/i)).toBeInTheDocument()
    expect(screen.getByText(/Air Pulse 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Runner X/i)).toBeInTheDocument()
    expect(screen.getByText(/2 styles available/i)).toBeInTheDocument()
  })
})
