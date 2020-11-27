export default class ParisEvents {
 
    constructor() {
        this.urlBase = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-';
    }

    getEvents(term = '', date = (new Date()).getFullYear(), sort ='data_sort'){
        let url = `${this.urlBase}&q=${term}&lang=fr&refine.date_start=${date}&sort=${sort}`;
       return fetch(url)
        .then(response => response.json())
    }
}
