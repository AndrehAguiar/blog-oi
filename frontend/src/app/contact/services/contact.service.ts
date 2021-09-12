import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  result!: any;
  error!: any;
  
  async sendContactEmail(e: Event):Promise<any>{
    this.sendEmail(e);
    return this.result;
  }

  private sendEmail(e: Event) {
    console.log(e);

    emailjs.sendForm('service_id', 'template_id', e.target as HTMLFormElement, 'user_id')
      .then((result: EmailJSResponseStatus) => {
        this.result = result.status;
      }, (error) => {
        this.error = error.status;
      })
  }
}
