import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

describe("Products search", () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("filters products as the user types", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockSneakers })

    render(<Products />)

    // wait for collection to show
    expect(await screen.findByText(/Our Sneaker Collection/i)).toBeInTheDocument()

    // both items present initially
    expect(screen.getByText(/Air Pulse 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Runner X/i)).toBeInTheDocument()

    // type a query that matches only Runner X
    await userEvent.type(screen.getByLabelText("search-input"), "Runner")

    expect(screen.queryByText(/Air Pulse 1/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Runner X/i)).toBeInTheDocument()

    // clear and search Nike
    await userEvent.clear(screen.getByLabelText("search-input"))
    await userEvent.type(screen.getByLabelText("search-input"), "nike")

    expect(screen.getByText(/Air Pulse 1/i)).toBeInTheDocument()
    expect(screen.queryByText(/Runner X/i)).not.toBeInTheDocument()
  })
})
