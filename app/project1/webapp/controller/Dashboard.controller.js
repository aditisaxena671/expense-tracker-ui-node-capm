sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "aditi/expense/ui/project1/util/NavigationHelper"
], (Controller,MessageToast,NavigationHelper) => {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.Dashboard", {
        onInit() {
            console.log("hello from dashboard")
        },
        onSideNavItemPress:function(oEvent){
            NavigationHelper.onSideNavItemPress(oEvent,this);
        }

    });
});