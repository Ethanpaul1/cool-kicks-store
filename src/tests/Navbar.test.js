import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Navbar from "../components/Navbar"

// Test 1 - checks the store name renders
test("renders Cool Kicks Store title", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
  const title = screen.getByText(/Cool Kicks Store/i)
  expect(title).toBeInTheDocument()
})

// Test 2 - checks all nav links are present
test("renders Home, Products and Admin links", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
  expect(screen.getByText(/Home/i)).toBeInTheDocument()
  expect(screen.getByText(/Products/i)).toBeInTheDocument()
  expect(screen.getByText(/Admin/i)).toBeInTheDocument()
})