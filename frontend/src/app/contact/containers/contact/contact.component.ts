import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      contactName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      contactMessage: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(250)
      ]),
    });
  }

  ngOnInit(): void {

  }
  get contactName() { return this.contactForm.controls.contactName; }
  get contactEmail() { return this.contactForm.controls.contactEmail }
  get contactMessage() { return this.contactForm.controls.contactMessage }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.contactForm.value);
  }

}
