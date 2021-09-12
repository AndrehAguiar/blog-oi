import { IEmail } from "src/app/contact/models/email.model";

export function formToEmail (formValue: any):IEmail {
    return {
        to_name: "Blog Oi!?",
        from_name: formValue.contactName,
        reply_to: formValue.contactEmail,
        message: formValue.contactMessage,
    }
}