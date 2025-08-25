import { NgModule } from "@angular/core";
import { ContactsComponent } from "./contacts.component";
import { RouterModule } from "@angular/router";
import { EmailComponent } from "./email/email.component";
import { PhoneComponent } from "./phone/phone.component";

const routes = [
    { path: '', component: ContactsComponent,
        children: [
            { path: 'email', component: EmailComponent },
            { path: 'phone', component: PhoneComponent }
        ]
    },
];

@NgModule({
    declarations: [
        ContactsComponent,
        EmailComponent,
        PhoneComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class ContactsModule { }