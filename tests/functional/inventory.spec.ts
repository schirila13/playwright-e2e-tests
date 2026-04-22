import{test, expect} from "@playwright/test";

/**
 * Scenario:
 * Login as standard user
 * Get a list of products with its price
 * Assert that all products have non-zero dollar value
 */
 
 test.describe("Inventory feature", () => {
    test.beforeEach("Login with valid creds", async ({page}) => {

        //Launch the Url
        await page.goto('https://www.saucedemo.com/');
        //Login with valid creds
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Assert that we are on the inventory page
        await expect(page.locator('.title')).toHaveText("Products");
    });

    test("Should confirm all prices are non-zero", async ({ page }) => {})
 })
