import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private router: Router, private route: ActivatedRoute, private http:Http) {
        
    }

    open() {
        this.router.navigate([{ outlets: { foo: 'modal' } }]);
    }
    close() {
        this.router.navigate([{ outlets: { foo: null } }]);
    }
    name = 'Angular';

    ping() {
        return this.http.get('https://localhost:44347/api/auth/ping', { withCredentials: true })
            .map(t => t.json())
            .subscribe(t => {
                alert(t.result);
            });
    }
}