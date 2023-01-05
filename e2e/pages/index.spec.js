import { test, expect } from "@playwright/test"

test("Calculator for works", async ({ page }) => {
  await page.goto("/")
  await page.type("#first", "1")
  await page.type("#second", "2")
  await page.click("#operation")
  await page.locator("#operation").selectOption("multiply")
  await page.click("button[type='submit']")

  const result = await page.locator("#result")
  await expect(result).toContainText("2")
})

test("Calculator wants numbers", async ({ page }) => {
  await page.goto("/")
  await page.type("#first", "fsdfsdfdsf")
  await page.type("#second", "2")
  await page.click("#operation")
  await page.locator("#operation").selectOption("add")
  await page.click("button[type='submit']")

  const result = await page.locator("#result")
  await expect(result).toContainText("Params")
})

// test.only("Slow network", async ({ page }) => {
//   await page.goto("/")
//   await page.type("#first", "2")
//   await page.type("#second", "2")
//   await page.click("#operation")
//   await page.locator("#operation").selectOption("add")

//   const button = await page.getByRole("button")
//   await expect(button).toContainText("Calculate")

// await page.route("**/*", async (route) => {
//   await new Promise((f) => setTimeout(f, 2000))
//   // const button = await page.getByRole("button")
//   // await expect(button).toContainText("Please wait for the server reply")
//   await route.continue()
// })

// await page.click("button[type='submit']")

// async function isFinished(response) {
//   return (await response.json()).response
// }

// const response = await page.waitForResponse(async (res) => isFinished(res))
// console.log(await response.body())

// const button2 = await page.getByRole("button")
// await expect(button2).toContainText("Calculate")
// })
