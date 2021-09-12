import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  sendEmail(e: Event) {
    emailjs.sendForm('', '', e.target as HTMLFormElement, '')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        console.log(result.status);
      }, (error) => {
        console.log(error.text);

      })
  }
}
