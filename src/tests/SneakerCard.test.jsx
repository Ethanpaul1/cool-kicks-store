import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import SneakerCard from "../components/SneakerCard.jsx"

// Mock sneaker data for testing
const mockSneaker = {
  id: 1,
  name: "Air Pulse 1",
  brand: "Nike",
  price: 120,
  description: "Classic low-top with a clean white sole",
  image: "https://via.placeholder.com/400",
}

// Test 1 - checks sneaker info renders correctly
test("renders sneaker name, brand and price", () => {
  render(<SneakerCard sneaker={mockSneaker} />)
  expect(screen.getByText(/Air Pulse 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Nike/i)).toBeInTheDocument()
  expect(screen.getByText(/120/i)).toBeInTheDocument()
})

// Test 2 - checks delete button works
test("calls onDelete when delete button is clicked", async () => {
  const mockDelete = vi.fn()
  render(<SneakerCard sneaker={mockSneaker} onDelete={mockDelete} />)
  const deleteBtn = screen.getByText(/Delete/i)
  await userEvent.click(deleteBtn)
  expect(mockDelete).toHaveBeenCalledWith(1)
})

// Test 3 - checks edit button works
test("calls onUpdate when edit button is clicked", async () => {
  const mockUpdate = vi.fn()
  render(<SneakerCard sneaker={mockSneaker} onUpdate={mockUpdate} />)
  const editBtn = screen.getByText(/Edit Price/i)
  await userEvent.click(editBtn)
  expect(mockUpdate).toHaveBeenCalledWith(mockSneaker)
})
