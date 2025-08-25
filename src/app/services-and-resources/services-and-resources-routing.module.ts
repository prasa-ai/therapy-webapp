import { NgModule } from "@angular/core";
import { ServicesAndResourcesComponent } from "./services-and-resources.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [ServicesAndResourcesComponent],
    imports: [
        RouterModule.forChild([{ path: '', component: ServicesAndResourcesComponent }])
    ]
})

export class ServicesAndResourcesModule { }