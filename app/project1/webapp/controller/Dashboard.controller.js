sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller) => {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.Dashboard", {
        onInit() {
            console.log("hello from dashboard")
        },
        
        onSideNavItemPress: function (oEvent) {
            console.log("Clicked");
            const sKey = oEvent.getSource().getKey().toLowerCase();
            const oRoute = sap.ui.core.UIComponent.getRouterFor(this);
            switch (sKey) {
                case "dashboard":
                    oRoute.navTo("dashboard");
                    break;
                case "addexpense":
                    oRoute.navTo("addExpense");
                    break;
                case "orders":
                    oRoute.navTo("orders");
                    break;
                case "products":
                    oRoute.navTo("products");
                    break;
                default:
                    console.log("Default Treggered");
                    break;


            }
        }
        
    });
});