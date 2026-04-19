import { test, expect } from "@playwright/test";

test.describe("Make Appointment functionality", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
    // 1. Lounch URL;
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator(".text-vertical-center h1")).toHaveText("CURA Healthcare Service",);

    /**
    * ELEMENT: Button, Link
    *
    * @actions
    * 1. ✅ Click
    * 2. ✅ Press
    * 3. ✅ Double click
    * 4. ✅ Right click
    * 5. ✅ Hover if Link
    * 6. ✅ [Optionall timeout if slow
    */

    // 2. Click on the Make Appointment
   // await page.getByRole("link", { name: "Make Appointment" }).click();
    //await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
   // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    //await page.getByRole("link", { name: "Make Appointment" }).click({button: "right"});
    //await page.getByRole("link", { name: "Make Appointment" }).hover();
    await page.getByRole("link", { name: "Make Appointment" }).click({timeout: 10_000});
    
    

    await expect(page.getByText("Please login to make")).toBeVisible();

    // 3.Successful Login
    //await page.getByLabel("Username").fill("John Doe");

    //Clears and Enter
    //await page.getByLabel("Username").clear();
    //await page.getByLabel("Username").fill("John Doe");

    // press sequentially
    await page.getByLabel("Username").pressSequentially("John Doe", { delay: 300 });



    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Assert if the appointment page is loaded
    await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test("Should make an appointment with non-default values", async ({ page }) => {
        // Dropdown
        await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

        // checkbox
        await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
        await page.getByRole("radio", { name: "Medicaid" }).check();
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
        await page.getByRole("cell", { name: "22" }).click();
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page.getByRole("textbox", { name: "Comment" }).fill("this is a multi-line comments\ncaptured by playwright");
        await page.getByRole("button", { name: "Book Appointment" }).click();
        await expect(page.locator("h2")).toContainText("Appointment Confirmation");
        await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
    });

    // Nore tests 
});

