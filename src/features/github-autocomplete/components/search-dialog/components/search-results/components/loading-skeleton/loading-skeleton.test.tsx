import { render, screen } from "@testing-library/react"
import LoadingSkeleton from "./loading-skeleton.component"
import { describe, it, expect } from "vitest"

describe("LoadingSkeleton", () => {
  it("renders the correct number of skeleton items", () => {
    render(<LoadingSkeleton />)
    const skeletonItems = screen.getByTestId("loading-skeleton").children
    expect(skeletonItems).toHaveLength(10)
  })

  it("has the correct class names for styling", () => {
    render(<LoadingSkeleton />)
    const skeletonItem = screen.getByTestId("loading-skeleton__item-0")
    expect(skeletonItem).toHaveClass("w-full min-h-7 bg-background-hover-secondary rounded")
  })
})
