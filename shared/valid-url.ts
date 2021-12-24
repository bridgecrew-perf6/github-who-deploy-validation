import * as ValidUrl from 'valid-url';

export const isValidUri = (uri: string): boolean =>{
    if(!uri) return false;

    const result:boolean = (ValidUrl.isUri(uri)!==undefined) ? true : false;

    return result;
}