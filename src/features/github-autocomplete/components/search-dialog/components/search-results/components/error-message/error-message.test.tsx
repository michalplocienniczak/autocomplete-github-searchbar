import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ErrorMessage from "./error-message.component"

describe("ErrorMessage", () => {
  it("renders correctly", () => {
    const mockErrorMessage = "Mock error message"

    render(<ErrorMessage message={mockErrorMessage} />)

    const errorMessage = screen.getByText(mockErrorMessage)

    expect(errorMessage).toBeInTheDocument()
  })
})
