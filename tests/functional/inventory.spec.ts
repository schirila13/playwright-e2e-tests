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
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*inventory/);
        //await expect(page.locator('.title')).toHaveText("Products");
    });

    test("Should confirm all prices are non-zero", async ({ page }) => {
        // Get a list of products 
        let productsElms = page.locator('.inventory_item');
        await expect(productsElms).toHaveCount(6);

        let priceArr = []
        // Get product name and prices
        let TotalProducts = await productsElms.count();
        for(let i=0; i<TotalProducts; i++){

            let eleNode = productsElms.nth(i);

            //Product name
            let productName = await eleNode.locator('.inventory_item_name').innerText();

            //Price
            let price = await eleNode.locator('.inventory_item_price').innerText();
            // Print the results 
            console.log(`Product: ${productName}, price: ${price}`)

            priceArr.push(price);
        }

        console.log(`Original Price Array: ${priceArr}`);

        let modifiedArray = priceArr.map((item) => parseFloat(item.replace("$", "")))
            console.log(`Price without $: ${modifiedArray}`)

        let priceArrwithinvalidvalues = modifiedArray.filter((item) => item <=0)
        if (priceArrwithinvalidvalues.length > 0) {
            console.log(`Products with invalid price: ${priceArrwithinvalidvalues}`);
        } else {
            console.log("All products have valid prices.");
        }
        expect(priceArrwithinvalidvalues).toHaveLength(0);
    });
});
/**
Replace all $ with ""
compare the price which should be  > 0


 */