import { test, expect } from "@playwright/test";

test.only("should demo locators", async ({ page }) => {
//



await page.goto("https://katalon-demo-cura.herokuapp.com/");

await page.getByRole("link", { name: "Make Appointment" }).click();
await expect(page.getByText("Please login to make")).toBeVisible();


})
