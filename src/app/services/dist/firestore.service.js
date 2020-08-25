"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirestoreService = void 0;
var core_1 = require("@angular/core");
var FirestoreService = /** @class */ (function () {
    function FirestoreService(firestore) {
        this.firestore = firestore;
        this.businessId = 'ua48ta14yoqqz3r3';
    }
    // get clients(): any {
    //   return this.firestore.collection('users').doc(this.businessId).collection('sub-users').valueChanges();
    // }
    FirestoreService.prototype.getClients = function () {
        return this.firestore.collection('users').doc(this.businessId).collection('sub-users').valueChanges();
    };
    FirestoreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FirestoreService);
    return FirestoreService;
}());
exports.FirestoreService = FirestoreService;
