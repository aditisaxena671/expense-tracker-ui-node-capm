sap.ui.define([
	"sap/m/Dialog",
    "sap/m/library",
    "sap/m/Button",
	"sap/m/Text"
], function (Dialog,mobileLibrary,Button,Text) {
    "use strict";
	var ButtonType = mobileLibrary.ButtonType;
	var DialogType = mobileLibrary.DialogType;
    return {
    loginRequired: function (oController) {
			if (!this.oDefaultMessageDialog) {
				this.oDefaultMessageDialog = new Dialog({
					type: DialogType.Message,
					title: "Login Required",
					content: new Text({ text: "Please Login to continue" }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function () {
							this.oDefaultMessageDialog.close();
                            const oRoute = sap.ui.core.UIComponent.getRouterFor(oController);
                            oRoute.navTo("login");
						}.bind(this)
					})
				});
			}

			this.oDefaultMessageDialog.open();
		}
    }
});