import {  Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'one',
                component: HomeComponent
            },
            {
                path: 'two',
                loadChildren: './lazy/lazy.module#LazyModule'
            },
        ]
    },
    {
        path: 'modal/:id',
        component: AdminComponent,
        outlet: 'foo'
    }

];

export const AppRoutes:ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });