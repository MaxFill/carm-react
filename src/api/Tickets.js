function getTickets(filter, tocken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://fsoma.ks.rt.ru:8080/WFCServices/rest/ticket/find?token='+tocken,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(filter, (key, value) => {
                if (value !== null) return value;
            })
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log("response not ok!");
                return Promise.reject(error);
            }
            return data;
        })
        .then(d => {
            return d;
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    //return fetch('demo/data/products.json').then(res => res.json()).then(d => d.data);
}

export {getTickets};