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
    await page.getByLabel("Username").pressSequentially("John Doe", { delay: 100 });



    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // 4. Assert if the appointment page is loaded
    await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test("Should make an appointment with non-default values", async ({ page }) => {
        // 📍 Dropdown
        // Assert default option
        await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
        await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

        //Select by label or index
        await page.getByLabel("Facility").selectOption({label: "Seoul CURA Healthcare Center"});
        await page.getByLabel("Facility").selectOption({index: 0});

        //Assert the count 
        let dropdownOptionsEle = page.getByLabel("Facility").locator("option");
        await expect(dropdownOptionsEle).toHaveCount(3);

        //get all dropdown values
        let listofdropdownValues = await page.getByLabel("Facility").all();
       
       let listOfOptions = [];
       for (let ele of listofdropdownValues){
        let eleTxt = await ele.textContent();
        if (eleTxt) {
            listOfOptions.push(eleTxt);
        }
       }

         console.log(`List of dropdown options: ${listOfOptions}`);


        // checkbox
        await page.getByText("Apply for hospital readmission" ).check();
        await page.getByText("Apply for hospital readmission" ).uncheck();


        // radio button

        await expect(page.getByText("Medicare")).toBeChecked();

        await page.getByText("Medicaid").click();
        await expect(page.getByText("Medicare")).not.toBeChecked();


        //date input box
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("05/10/2027");
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");
        
        // multi-line comments        
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page.getByRole("textbox", { name: "Comment" }).fill("this is a multi-line comments\ncaptured by playwright");

        //button
        await page.getByRole("button", { name: "Book Appointment" }).click();
        await expect(page.locator("h2")).toContainText("Appointment Confirmation");
        await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
    });

    // Nore tests 
});

