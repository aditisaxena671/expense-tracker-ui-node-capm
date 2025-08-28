sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "aditi/expense/ui/project1/util/NavigationHelper",
    "aditi/expense/ui/project1/util/Login"

    
], (Controller,NavigationHelper,Login) => {
    "use-strict";
    
    return Controller.extend("aditi.expense.ui.project1.controller.ViewAnalysis", {
        onInit() {
            const oUser = this.getOwnerComponent().getModel("userModel").getProperty("/userData");
            if(!oUser){
                console.log("user need to login");
                Login.loginRequired(this);
                var oView= this.getOwnerComponent().getView()
            }
            const UserId = oUser.loginID;
            this.getView().bindElement("/Users(" + UserId + ")");
        },
        onSideNavItemPress: function (oEvent) {
            NavigationHelper.onSideNavItemPress(oEvent,this);
        },
        // loginRequired: function () {
		// 	if (!this.oDefaultMessageDialog) {
		// 		this.oDefaultMessageDialog = new Dialog({
		// 			type: DialogType.Message,
		// 			title: "Login Required",
		// 			content: new Text({ text: "Please Login to continue" }),
		// 			beginButton: new Button({
		// 				type: ButtonType.Emphasized,
		// 				text: "OK",
		// 				press: function () {
		// 					this.oDefaultMessageDialog.close();
        //                     const oRoute = sap.ui.core.UIComponent.getRouterFor(this);
        //                     oRoute.navTo("login");
		// 				}.bind(this)
		// 			})
		// 		});
		// 	}

		// 	this.oDefaultMessageDialog.open();
		// }
    });
});