import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppModule } from 'src/app/app.module';
import { FooterComponent } from "./footer/footer.component";
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  declarations: [
    NavbarComponent,
    LoaderComponent,
    FooterComponent,
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    FooterComponent,
  ],
})
export class ComponentsModule {
}
