sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller) => {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.View1", {
        onInit() {
            console.log("hello from dashboard")
        }
    });
});