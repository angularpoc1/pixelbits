import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {
    id: Observable<string>;
    constructor(private route: ActivatedRoute) {
        
        this.id = this.route.params.map(t=>t.id);

    }

    ngOnInit() { }
}