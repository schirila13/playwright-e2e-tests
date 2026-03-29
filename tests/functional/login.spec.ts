import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    // 1. Lounch URL;
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator(".text-vertical-center h1")).toHaveText(
      "CURA Healthcare Service",
    );

    // 2. Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Should login successfully", async ({ page }) => {
    // 3.Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Assert if the appointment page is loaded
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should prevent login with invalid credentials", async ({ page }) => {
    // 3. Unsuccessful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("thisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Assert a error message is displayed
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
