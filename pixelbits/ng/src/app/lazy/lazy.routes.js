import { RouterModule } from '@angular/router';
import { LazyComponent } from "./lazy.component";
import { CoolComponent } from "./cool.component";
export var routes = [
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
export var AppRoutes = RouterModule.forChild(routes);
//# sourceMappingURL=lazy.routes.js.map