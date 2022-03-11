export const getJWToken = (user, password) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://fsoma.ks.rt.ru:8080/WFCServices/rest/user/login?name='+user+'&pwd='+password,
        {
            method: 'get',
            headers: headers
        })
        .then(async response => {
            const status = response.status;
            if (status != 200){
                return {'reason':`${status}`};
            }
            const json = await response.json();
            json.reason = response.status;
            return json;
        })
        .then(d => d)
        .catch(error => {
            console.error('Function getGWToken() was an error!', error);
        });
 }