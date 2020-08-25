"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VcitaApiService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var VcitaApiService = /** @class */ (function () {
    function VcitaApiService(http) {
        this.http = http;
        this.apiToken = '8fe07e4a21e51416e21e2b6265cc289c7e5ebe81b02feb276c44e5e89debf56a';
        this.testApiToken = 'b685a53ab31efa57e4898bf21b00dba6658cabffdb43e6c629a4b53da40bd387';
        this.businessId = 'ua48ta14yoqqz3r3';
        this.testBusinessId = 'ua48ta14yoqqz3r3';
        this.domain = 'https://api.vcita.biz';
        // testDomain = 'https://api-int.vchost.co';
        this.testDomain = 'https://api2.meet2know.com';
        this.headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.apiToken
        });
        this.testHeaders = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + this.testApiToken
        });
    }
    VcitaApiService.prototype.getServicesList = function () {
        var config = {
            headers: this.headers,
            params: new http_1.HttpParams().set('business_id', this.businessId)
        };
        return this.http.get(this.domain + "/platform/v1/services", config);
    };
    VcitaApiService.prototype.getClients = function (page, perPage) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 50; }
        var config = {
            headers: this.headers
        };
        return this.http.get(this.domain + "/platform/v1/clients?page=" + page + "&per_page=" + perPage, config);
    };
    VcitaApiService.prototype.getConversations = function (page, perPage) {
        var config = {
            headers: this.headers
        };
        // return this.http.get(`${this.testDomain}/platform/v1/conversations?page=${page}&per_page=${perPage}`, config); // Testing domain
        return this.http.get(this.domain + "/platform/v1/conversations?page=" + page + "&per_page=" + perPage, config);
    };
    VcitaApiService.prototype.getClientConversations = function (clientId) {
        var config = {
            headers: this.headers
        };
        return this.http.get(this.domain + "/platform/v1/clients/" + clientId + "/conversations", config);
    };
    VcitaApiService.prototype.getServiceAvailabilityByID = function (serviceId) {
        var config = {
            headers: this.headers
        };
        return this.http.get(this.domain + "/platform/v1/services/" + serviceId + "/availability", config);
    };
    VcitaApiService.prototype.getAuthCode = function () {
        var config = {
            params: new http_1.HttpParams()
                .set('client_id', '53c0ab7c3eb6b5aefcfc3f657f539849cb18e9f9e6c76ffffef743db4c137a1a')
                .set('redirect_uri', 'https://us-central1-vcita-playground.cloudfunctions.net/authorize')
        };
        return this.http.get('https://app.vcita.com/app/oauth/authorize', config);
    };
    VcitaApiService.prototype.subscribeToWebhook = function (object, event, url) {
        var config = {
            headers: this.headers
        };
        var bodyParams = {
            event: object + "/" + event,
            target_url: url
        };
        return this.http.post(this.domain + "/platform/v1/webhook/subscribe", bodyParams, config);
    };
    VcitaApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VcitaApiService);
    return VcitaApiService;
}());
exports.VcitaApiService = VcitaApiService;
