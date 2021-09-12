import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  sendEmail(e: Event) {
    console.log(e);
    
    emailjs.sendForm('service_id', 'template_id', e.target as HTMLFormElement, 'user_id')
      .then((result: EmailJSResponseStatus) => {
        return result.text;
      }, (error) => {
        throw new HttpErrorResponse({error: error.text, status: error.status});

      })
  }
}
