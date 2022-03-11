function Attache(id, name, extension, type, fileSize, author, guid, ticketId, dateCreate ){
    this.id = id;
    this.name = name;
    this.extension = extension;
    this.type = type;
    this.fileSize = fileSize;
    this.author = author;
    this.guid = guid;
    this.dateCreate = dateCreate;
    this.ticketId = ticketId;
}
function loadTicketAttaches(ticketId, tocken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://fsoma.ks.rt.ru:8080/WFCServices/rest/attached/ticket?ticketId='+ticketId+'&token='+tocken,
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
function deleteAttach(attacheId, token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://10.26.102.196:8080/FSOMWorkflowClient/delete?attacheId='+ attacheId + '&token=' + token,
        {
            method: 'POST',
            headers: headers
        })
        .then(async response => {
            return response.status;
        })
        .then(d => {
            return d;
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

function download(attacheId, token) {
    const link = document.createElement("a");
    link.href = 'http://10.26.102.196:8080/FSOMWorkflowClient/download?attacheId='+ attacheId + '&token=' + token;
    link.click();
}

function addAttach(file, tocken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch('http://fsoma.ks.rt.ru:8080/WFCServices/rest/attached/add?token='+tocken,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(file, (key, value) => {
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
}
export {loadTicketAttaches, addAttach, deleteAttach, download, Attache};