import ParisEvents from '/models/ParisEvents.js'
export default class Search 
{
    constructor(){
        this.view = 'views/search.html';
    }

    executeHttpRequest()
    {
        document.querySelector('.form').addEventListener('submit', (e)=>{
           e.preventDefault()
           const parisEvents = new ParisEvents;
            let title = document.querySelector('#name').value;
            let date_sort = document.querySelector('#year').value;
            let sort_val = document.querySelector('#date').value;
            parisEvents.getEvents(title, date_sort, sort_val)
            .then((data)=>{
                console.log(data);

                let template = document.querySelector("#productrow");

                    for(let record of data.records) {
                        console.log(record.fields.title, record.fields.cover_url);
                    
                        let clone = document.importNode(template.content, true);
                        clone.querySelector('h6.event-title').textContent = record.fields.title;
                        clone.querySelector('img.event-image').src = record.fields.cover_url;
                        document.querySelector('.event-list').append(clone);

                    }
            })
        });
    }

    template(){

         
    
    }

   
}