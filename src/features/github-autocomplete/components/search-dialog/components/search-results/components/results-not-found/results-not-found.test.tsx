import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ResultsNotFound from "./results-not-found.component"

describe("ResultsNotFound", () => {
  it("renders correctly", () => {
    render(<ResultsNotFound />)

    const notFound = screen.getByText("No results found")

    expect(notFound).toBeInTheDocument()
  })
})
