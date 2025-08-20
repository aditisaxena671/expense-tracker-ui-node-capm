sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.View1", {
        onInit() {
        },
        onRegisterPress:function(){
            var oView= this.getView();
            var firstName= oView.byId("firstNameInput").getValue();
            var lastName= oView.byId("lastNameInput").getValue();
            var email= oView.byId("inputEmail").getValue();
            var password= oView.byId("passwordInput").getValue();
            var confirmPassword= oView.byId("confirmPasswordInput").getValue();

            if(!firstName || !lastName || !email|| !password || !confirmPassword ){
                this.getView().byId("showError").setVisible(true);
            }
        }
    });
});