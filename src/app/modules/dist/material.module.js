"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialModule = void 0;
var core_1 = require("@angular/core");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var card_1 = require("@angular/material/card");
var icon_1 = require("@angular/material/icon");
var sidenav_1 = require("@angular/material/sidenav");
var button_1 = require("@angular/material/button");
var checkbox_1 = require("@angular/material/checkbox");
var menu_1 = require("@angular/material/menu");
var toolbar_1 = require("@angular/material/toolbar");
var list_1 = require("@angular/material/list");
var chips_1 = require("@angular/material/chips");
var divider_1 = require("@angular/material/divider");
var table_1 = require("@angular/material/table");
var select_1 = require("@angular/material/select");
var dialog_1 = require("@angular/material/dialog");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var tooltip_1 = require("@angular/material/tooltip");
var snack_bar_1 = require("@angular/material/snack-bar");
var tabs_1 = require("@angular/material/tabs");
var expansion_1 = require("@angular/material/expansion");
var paginator_1 = require("@angular/material/paginator");
var grid_list_1 = require("@angular/material/grid-list");
var datepicker_1 = require("@angular/material/datepicker");
var tree_1 = require("@angular/material/tree");
var radio_1 = require("@angular/material/radio");
var progress_bar_1 = require("@angular/material/progress-bar");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            imports: [
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                dialog_1.MatDialogModule,
                button_1.MatButtonModule,
                checkbox_1.MatCheckboxModule,
                menu_1.MatMenuModule,
                toolbar_1.MatToolbarModule,
                chips_1.MatChipsModule,
                divider_1.MatDividerModule,
                sidenav_1.MatSidenavModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                tabs_1.MatTabsModule,
                list_1.MatListModule,
                table_1.MatTableModule,
                select_1.MatSelectModule,
                progress_spinner_1.MatProgressSpinnerModule,
                tooltip_1.MatTooltipModule,
                snack_bar_1.MatSnackBarModule,
                expansion_1.MatExpansionModule,
                paginator_1.MatPaginatorModule,
                grid_list_1.MatGridListModule,
                datepicker_1.MatDatepickerModule,
                tree_1.MatTreeModule,
                radio_1.MatRadioModule,
                progress_bar_1.MatProgressBarModule,
                slide_toggle_1.MatSlideToggleModule
            ],
            exports: [
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                dialog_1.MatDialogModule,
                button_1.MatButtonModule,
                checkbox_1.MatCheckboxModule,
                menu_1.MatMenuModule,
                toolbar_1.MatToolbarModule,
                chips_1.MatChipsModule,
                divider_1.MatDividerModule,
                sidenav_1.MatSidenavModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                tabs_1.MatTabsModule,
                list_1.MatListModule,
                table_1.MatTableModule,
                select_1.MatSelectModule,
                progress_spinner_1.MatProgressSpinnerModule,
                tooltip_1.MatTooltipModule,
                snack_bar_1.MatSnackBarModule,
                expansion_1.MatExpansionModule,
                paginator_1.MatPaginatorModule,
                grid_list_1.MatGridListModule,
                datepicker_1.MatDatepickerModule,
                tree_1.MatTreeModule,
                radio_1.MatRadioModule,
                progress_bar_1.MatProgressBarModule,
                slide_toggle_1.MatSlideToggleModule
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
