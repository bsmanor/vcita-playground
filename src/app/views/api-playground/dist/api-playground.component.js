"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiPlaygroundComponent = void 0;
var core_1 = require("@angular/core");
var ApiPlaygroundComponent = /** @class */ (function () {
    function ApiPlaygroundComponent(vcita) {
        this.vcita = vcita;
        this.clientsPage = 1;
        this.conversationsPage = 1;
        this.perPage = 10;
        this.webhookObject = '';
        this.webhookEvent = '';
        this.webhookUrl = '';
        this.OAuthUrl = 'https://app.vcita.com/app/oauth/authorize?client_id=53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a&redirect_uri=https://us-central1-vcita-playground.cloudfunctions.net/authorize&state=test';
        this.services$ = this.vcita.getServicesList();
        this.clients$ = this.vcita.getClients(this.clientsPage);
    }
    ApiPlaygroundComponent.prototype.getServices = function () {
        this.vcita.getServicesList().subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    ApiPlaygroundComponent.prototype.getClients = function (page) {
        this.clientsPage = page;
        this.vcita.getClients(page).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    ApiPlaygroundComponent.prototype.getConversations = function (page) {
        this.conversationsPage = page;
        this.vcita.getConversations(page, this.perPage).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    ApiPlaygroundComponent.prototype.getClientConversations = function (clientId) {
        this.vcita.getClientConversations(clientId).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    ApiPlaygroundComponent.prototype.getServiceAvailabilityByID = function (serviceId) {
        this.vcita.getServiceAvailabilityByID(serviceId).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    ApiPlaygroundComponent.prototype.subscribeToWebhook = function () {
        this.vcita.subscribeToWebhook(this.webhookObject, this.webhookEvent, this.webhookUrl).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
        this.webhookObject = '';
        this.webhookEvent = '';
        this.webhookUrl = '';
    };
    ApiPlaygroundComponent.prototype.ngOnInit = function () {
        this.getClients(this.clientsPage);
    };
    ApiPlaygroundComponent = __decorate([
        core_1.Component({
            selector: 'app-api-playground',
            templateUrl: './api-playground.component.html',
            styleUrls: ['./api-playground.component.css']
        })
    ], ApiPlaygroundComponent);
    return ApiPlaygroundComponent;
}());
exports.ApiPlaygroundComponent = ApiPlaygroundComponent;
