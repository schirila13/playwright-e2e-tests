import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
// 1. Lounch URL;
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

// 2. click on the make appointment
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();

  // 3.Login
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  // 4. Assert a text
  await expect(page.locator("h2")).toContainText("Make Appointment");
});
