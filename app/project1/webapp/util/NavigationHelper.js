sap.ui.define([], function () {
    "use strict";
    return {
        onSideNavItemPress: function (oEvent, oController) {
            console.log("Clicked");
            const sKey = oEvent.getSource().getKey().toLowerCase();
            const oRoute = sap.ui.core.UIComponent.getRouterFor(oController);

            switch (sKey) {
                case "dashboard":
                    oRoute.navTo("dashboard");
                    break;
                case "addexpense":
                    oRoute.navTo("addExpense");
                    break;
                case "viewanalysis":
                    oRoute.navTo("viewAnalysis");
                    break;
                case "expensedetails":
                    oRoute.navTo("expenseDetails");
                    break;
                default:
                    console.log("Default Triggered");
                    break;
            }
        }
    };
});
