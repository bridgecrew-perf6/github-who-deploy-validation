import { AzureFunction, Context } from "@azure/functions";
const { chromium } = require("playwright-chromium");

export const testBasic = async function (): Promise<any> {
    var timeStamp = new Date().toISOString();

    const url = "https://thankful-glacier-0c994031e.azurestaticapps.net";
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.emulateMedia('screen');
    await page.goto(url);
    const screenshotBuffer = await page.pdf({ format: 'Letter' })
    await browser.close();
    return {
        image: screenshotBuffer,
        imageFileName: "thankful-glacier-0c994031e" + "_" + timeStamp + ".pdf"
    };
};