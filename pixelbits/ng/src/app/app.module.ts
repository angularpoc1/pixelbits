import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppRoutes } from './app.routes';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { MasterpageComponent } from "./shared/masterpage/masterpage.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";


@NgModule({
  imports:      [ AppRoutes ,BrowserModule,HttpModule ],
  declarations: [ 
    AppComponent, 
    HomeComponent, 
    AdminComponent, 
    MasterpageComponent,
    HeaderComponent,
    FooterComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
