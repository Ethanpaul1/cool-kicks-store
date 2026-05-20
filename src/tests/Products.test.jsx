import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import Products from "../pages/Products.jsx"

// Mock the custom hook
vi.mock("../hooks/useSneakers.jsx", () => ({
  default: () => ({
    sneakers: [
      {
        id: 1,
        name: "Air Pulse 1",
        brand: "Nike",
        price: 120,
        description: "Classic low-top",
        image: "https://via.placeholder.com/400",
      },
      {
        id: 2,
        name: "Boost Runner",
        brand: "Adidas",
        price: 140,
        description: "Lightweight runner",
        image: "https://via.placeholder.com/400",
      },
    ],
    loading: false,
    addSneaker: vi.fn(),
    updateSneaker: vi.fn(),
    deleteSneaker: vi.fn(),
  }),
}))

test("renders sneaker collection heading", () => {
  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  )
  expect(screen.getByText(/Our Sneaker Collection/i)).toBeInTheDocument()
})

test("renders sneakers from hook", () => {
  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  )
  expect(screen.getByText(/Air Pulse 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Boost Runner/i)).toBeInTheDocument()
})
