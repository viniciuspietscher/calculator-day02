import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../../pages/index";

describe("Testing home page", () => {
  it("has the header", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe("The Amazing Calculator");
  });
});
