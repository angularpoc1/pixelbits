var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from '@angular/http';
var AppComponent = (function () {
    function AppComponent(router, route, http) {
        this.router = router;
        this.route = route;
        this.http = http;
        this.name = 'Angular';
    }
    AppComponent.prototype.open = function () {
        this.router.navigate([{ outlets: { foo: 'modal' } }]);
    };
    AppComponent.prototype.close = function () {
        this.router.navigate([{ outlets: { foo: null } }]);
    };
    AppComponent.prototype.ping = function () {
        return this.http.get('https://localhost:44347/api/auth/ping', { withCredentials: true })
            .map(function (t) { return t.json(); })
            .subscribe(function (t) {
            alert(t.result);
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, Http])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map