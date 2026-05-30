import { test, expect } from "@playwright/test";

test("should demo config file", async ({ page }, testInfo) => {
     console.log(`>> Config at run-time: ${JSON.stringify(testInfo.config)}`);

})
test("should demo fixtures", async ({ page, browserName }, testInfo) => {
        console.log(`>> Test runs on name: ${browserName}`);
})