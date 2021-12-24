import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { testBasic } from '../shared/basic-test';
import { isValidUri } from '../shared/valid-url';

process.env.PLAYWRIGHT_BROWSERS_PATH = "0";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    const uri = (req.query.uri || (req.body && req.body.uri));

    if(!uri || !isValidUri(uri)){
        context.res = {
            body: { message: "Body property `uri` is missing"},
            status: 404
        };
        return; 
    }

    const testBasicResult = await testBasic(uri);

    const fileName = testBasicResult.imageFileName

    context.res = {
        body: testBasicResult.image,
        headers: {
            "content-type": "application/pdf",
            "Content-Disposition": `attachment; filename=${fileName}`
        }
    };

};

export default httpTrigger;