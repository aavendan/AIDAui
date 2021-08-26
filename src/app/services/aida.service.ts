import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AidaService {

  constructor() { }

  async getModels() {
    const response = await fetch('https://damp-beach-17296.herokuapp.com/http://193.190.127.213:8000/aida/api/v1/models', 
    {
      method: 'POST'
    })
    return response.json();
  }

  async getResources() {
    const response = await fetch('https://damp-beach-17296.herokuapp.com/http://193.190.127.213:8000/aida/api/v1/resources', 
    {
      method: 'POST'
    })
    return response.json();
  }

  async getExercise(text,model) {
    let data = {
      'text': text,
      'model': model
    };

    const response = await fetch('https://damp-beach-17296.herokuapp.com/http://193.190.127.213:8000/aida/api/v1/process', 
    {
      method: 'POST',
      body: new URLSearchParams(data)
    })

    return response.json();
  }


  async getExercisesByResource(resourceId, contentMax) {

    let promises = []
    
    Array.from({length:parseInt(contentMax)-1},(v,k)=>k+1).forEach(id => {
      promises.push(fetch(`https://damp-beach-17296.herokuapp.com/http://193.190.127.213:8000/aida/api/v1/${resourceId}/content?index=${id}`))
    })

    let results = await Promise.allSettled(promises);
    return Promise.allSettled(results.map(function (response) {
      if (response.status == "fulfilled") {
        return response['value'].json();
      }
    }));
   /*  results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        result.value.json()
        .then(response => {
           console.log(response.text)
        })
      }
    }); */

    /* let rs = []
    let texts = []

    Array.from({length:contentMax},(v,k)=>k+1).forEach(id => {
      rs.push(fetch(`https://damp-beach-17296.herokuapp.com/http://193.190.127.213:8000/aida/api/v1/${resourceId}/content?index=${id}`))
    })
    
    Promise.all(rs).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      // Log the data to the console
      // You would do something with both sets of data here
      texts.push(data['text'])
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    }); */

    


    
  }

  

}
