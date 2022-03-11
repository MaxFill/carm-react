import Cookies from 'universal-cookie';

function getTicketGroups () {
    const cookies = new Cookies();
    const token = cookies.get('carm-cookie-tocken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://fsoma.ks.rt.ru:8080/WFCServices/rest/groups?token='+token,
        {
            method: 'GET',
            headers: headers,
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
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
export {getTicketGroups};