sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "aditi/expense/ui/project1/util/NavigationHelper",
    "aditi/expense/ui/project1/util/Login"
], (Controller,MessageToast,NavigationHelper,Login) => {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.Dashboard", {
        onInit() {
            console.log("hello from dashboard")
            const oUser = this.getOwnerComponent().getModel("userModel").getProperty("/userData");
            if(!oUser){
                console.log("user need to login");
                Login.loginRequired(this);
                var oView= this.getOwnerComponent().getView()
            }
            const UserId = oUser.loginID;
            this.getView().bindElement("/Users(" + UserId + ")");
        },
        onSideNavItemPress:function(oEvent){
            NavigationHelper.onSideNavItemPress(oEvent,this);
        }

    });
});