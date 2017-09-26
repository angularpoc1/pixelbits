import {  Routes, RouterModule } from '@angular/router';
import { LazyComponent } from "./lazy.component";
import { ModuleWithProviders } from "@angular/core";
import { CoolComponent } from "./cool.component";


export const routes: Routes = [
    {
        path: 'cool',
        component: CoolComponent
    },

    {
        path: '',
        component: LazyComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export const AppRoutes:ModuleWithProviders = RouterModule.forChild(routes);