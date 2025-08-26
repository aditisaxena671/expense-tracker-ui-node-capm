sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "aditi/expense/ui/project1/util/NavigationHelper"
], (Controller,NavigationHelper) => {
    "use-strict";
    return Controller.extend("aditi.expense.ui.project1.controller.ViewAnalysis", {
        onInit() {
            const oUser = this.getOwnerComponent().getModel("userModel").getProperty("/userData");
            const UserId = oUser.loginID;
            this.getView().bindElement("/Users(" + UserId + ")");
        },
        onSideNavItemPress: function (oEvent) {
            NavigationHelper.onSideNavItemPress(oEvent,this);
        }
    });
});