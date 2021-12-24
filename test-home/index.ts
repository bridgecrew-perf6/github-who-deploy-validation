import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { testBasic } from '../shared/basic-test';

process.env.PLAYWRIGHT_BROWSERS_PATH = "0";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    const testBasicResult = await testBasic();

    context.res = {
        body: testBasicResult.image,
        headers: {
            "content-type": "application/pdf",
            "Content-disposition": `attachment; filename=${testBasicResult.imageFileName}`
        }
    };

};

export default httpTrigger;