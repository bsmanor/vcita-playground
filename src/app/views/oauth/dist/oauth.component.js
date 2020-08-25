"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OauthComponent = void 0;
var core_1 = require("@angular/core");
var OauthComponent = /** @class */ (function () {
    function OauthComponent(vcita, firestore) {
        this.vcita = vcita;
        this.firestore = firestore;
        this.OAuthUrl = 'https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=https://us-central1-vcita-playground.cloudfunctions.net/authorize&state=test';
        this.clients$ = this.firestore.getClients();
    }
    OauthComponent.prototype.ngOnInit = function () {
    };
    OauthComponent = __decorate([
        core_1.Component({
            selector: 'app-oauth',
            templateUrl: './oauth.component.html',
            styleUrls: ['./oauth.component.css']
        })
    ], OauthComponent);
    return OauthComponent;
}());
exports.OauthComponent = OauthComponent;
