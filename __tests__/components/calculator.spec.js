import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Calculator from "../../components/Calculator";

describe("Calculator component testing", () => {
  const component = render(<Calculator />);
  it("has all the fields", () => {
    expect(document.getElementById("first")).toBeInTheDocument();
    expect(document.getElementById("second")).toBeInTheDocument();
    expect(document.getElementById("operation")).toBeInTheDocument();
    expect(document.querySelector("button[type=submit]")).toBeInTheDocument();
  });
});

