import { AzureFunction, Context } from "@azure/functions";
import { chromium } from "playwright-chromium";

export const testBasic = async function (uri: string): Promise<any> {
    var timeStamp = Date.now();

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.emulateMedia({media:'screen'});
    await page.goto(uri);
    const screenshotBuffer = await page.pdf({ format: 'Letter' })
    await browser.close();
    return {
        image: screenshotBuffer,
        imageFileName: 'result.pdf'
    };
};