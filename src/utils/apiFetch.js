
export class ApiErrors{
    constructor (errors){
        this.errors = errors;
    }

}

export async function apiFetch(endpoint, options ={}){
    options = {
        // credentials : 'include',
        headers : {
            Accept : 'application/json',
            
        },
        ...options
    }

    if(options.body !== null && typeof options.body ==='object' && !(options.body instanceof FormData)) {
        options.body = JSON.stringify(options.body)
        options.headers['Content-Type'] =  'application/json'
    }
    const response = await fetch ('http://localhost:8080' + endpoint, options)
    if(response.status === 204){
        console.log('ok 204')
        return null;
    }
    const responseData = await response.json();
    if(response.ok){
        console.log('oke response data')
        return responseData;
        
    } else {
        if(responseData.errors){
            throw new ApiErrors(responseData.errors);
        }

    }

}