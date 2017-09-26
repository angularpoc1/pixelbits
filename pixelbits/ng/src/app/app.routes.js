import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
export var routes = [
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
export var AppRoutes = RouterModule.forRoot(routes, { useHash: true });
//# sourceMappingURL=app.routes.js.map