function loadTicket(ticketId, tocken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://fsoma.ks.rt.ru:8080/WFCServices/rest/ticket?id='+ticketId+'&token='+tocken,
        {
            method: 'GET',
            headers: headers
        })
        .then(async response => {
            if (response.status == 404){
                return null;
            }
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
}

export {loadTicket};