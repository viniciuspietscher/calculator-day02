import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"
import "@testing-library/jest-dom"
import Calculator from "../../components/Calculator"

const server = setupServer(
  rest.get("/api/calculate/add/1/2", async (req, res, ctx) => {
    return res(ctx.json({ result: "3" }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Calculator component testing", () => {
  beforeEach(() => {
    render(<Calculator />)
  })

  it("has all the fields", () => {
    expect(document.getElementById("first")).toBeInTheDocument()
    expect(document.getElementById("second")).toBeInTheDocument()
    expect(document.getElementById("operation")).toBeInTheDocument()
    expect(document.querySelector("button[type=submit]")).toBeInTheDocument()
  })

  it.only("disables button while loading", async () => {
    await userEvent.type(document.getElementById("first"), "1")
    await userEvent.type(document.getElementById("second"), "2")
    await userEvent.selectOptions(document.getElementById("operation"), "add")
    await userEvent.click(document.querySelector("button[type=submit]"))
    expect(document.querySelector("button[type=submit]")).toBeDisabled()
    expect(document.getElementById("result")).toHaveTextContent("")
    // fireEvent.mouseOver(document.querySelector("button[type=submit]"))
    // expect(
    //   await screen.findByText("Please wait for the server reply")
    // ).toBeVisible()

    await waitFor(() => {
      expect(document.querySelector("button[type=submit]")).not.toBeDisabled()
      expect(document.getElementById("result")).toHaveTextContent("3")
    })
  })
})
