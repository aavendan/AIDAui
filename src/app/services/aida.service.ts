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
}
