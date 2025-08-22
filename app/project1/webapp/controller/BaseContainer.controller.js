sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.BaseContainer", {
        onInit: function () {
            
        },

        onSideNavItemPress: function (oEvent) {
            var sKey = oEvent.getSource().getKey();
            var oNavContainer = this.byId("innerNav");

            if (sKey === "customers") {
                var oCustomersView = sap.ui.view({
                    id: "Customers",
                    viewName: "aditi.expense.ui.project1.view.Customers",
                    type: sap.ui.core.mvc.ViewType.XML
                });
                oNavContainer.addPage(oCustomersView);
                oNavContainer.to(oCustomersView);
            }

            // same for orders, products, etc.
        }
    });
});
