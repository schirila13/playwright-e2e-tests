import{test, expect} from "@playwright/test";

/**
 * Scenario:
 * Login as standard user
 * Get a list of products with its price
 * Assert that all products have non-zero dollar value
 */
 
 test.describe("Inventory feature", () => {
    test.beforeEach("Login with valid creds", async () => {});

    test("Should confirm all prices are non-zero", async ({ page }) => {})
 })