sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("aditi.expense.ui.project1.controller.View1", {
        onInit() {
        },
        onRegisterPress: function () {
            var oView = this.getView();
            // oView.byId("rightPanelRegister").setVisible(true);
            // oView.byId("rightPanelLogin").setVisible(false);
            var firstName = oView.byId("firstNameInput").getValue();
            var lastName = oView.byId("lastNameInput").getValue();
            var email = oView.byId("inputEmail").getValue();
            var password = oView.byId("passwordInput").getValue();
            var confirmPassword = oView.byId("confirmPasswordInput").getValue();

            if (!firstName) {
                this.getView().byId("showErrorRegister").setText("Please Enter First Name")
                this.getView().byId("showErrorRegister").setVisible(true);
                return;
            }
            if (!lastName) {
                this.getView().byId("showErrorRegister").setText("Please Enter Last Name")
                this.getView().byId("showErrorRegister").setVisible(true);
                return;
            }
            if (!email) {
                this.getView().byId("showErrorRegister").setText("Please Enter Email")
                this.getView().byId("showErrorRegister").setVisible(true);
                return;
            }
            if (!password) {
                this.getView().byId("showErrorRegister").setText("Please Enter Password")
                this.getView().byId("showErrorRegister").setVisible(true);
                return;
            }
            var minNumberofChars = 6;
            var maxNumberofChars = 25;
            var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/;
            if (password.length < minNumberofChars || password.length > maxNumberofChars) {
                this.getView().byId("showErrorRegister").setText("Password's length should be between 6-25 characters")
                this.getView().byId("showErrorRegister").setVisible(true);
                return;
                
            }
            if (!regularExpression.test(password)) {
                this.getView().byId("showErrorRegister").setVisible(true);
                this.getView().byId("showErrorRegister").setText("Please enter a strong password");
                return;
            }
            
            if (!confirmPassword) {
                this.getView().byId("showErrorRegister").setText("Please Enter Password to confirm")
                this.getView().byId("showErrorRegister").setVisible(true);
                return;
            }
            if (password !== confirmPassword) {
                oView.byId("showErrorRegister").setText("Passwords do not match").setVisible(true);
                return;
            }
            const validateEmail = (email) => {
                return email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            };
            if (!validateEmail(email)) {
                oView.byId("showErrorRegister").setText("Invalid Email Id").setVisible(true);
                return
            }

            oView.byId("showErrorRegister").setVisible(false);
            var oPayload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };
            $.ajax({
                url: "/odata/v4/expense/registerUser",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function (oData) {
                    MessageToast.show("User registered successfully!");
                    console.log("Response:", oData);
                    oView.byId("firstNameInput").setText("");
                    oView.byId("lastNameInput").setText("");
                    oView.byId("inputEmail").setText("");
                    oView.byId("passwordInput").setText("");
                    oView.byId("confirmPasswordInput").setText("");
                },
                error: function (oError) {
                    MessageToast.show("User registered Failed!");
                    console.log("Error : ", oError);
                }
            })
        },
        onLoginPress: function () {
            var oView = this.getView();
            var email = oView.byId("loginEmail").getValue();
            var password = oView.byId("loginPassword").getValue();
            if (!email) {
                MessageToast.show("Email can't be empty");
            }
            const validateEmail = (email) => {
                return email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            };
            if (!validateEmail(email)) {
                MessageToast.show("Not a valid Email Id");
                return
            }
            if (!password) {
                MessageToast.show("Password can't be empty");
            }

            var oPayload = {
                email: email,
                password: password
            };
            $.ajax({
                url: "/odata/v4/expense/login",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function (oData) {
                    MessageToast.show("User Login Successfull!");
                    console.log("Login Successfull ", oData);
                },
                error: function (oError) {
                    MessageToast.show("User Login Failed!");
                    console.log("Error ", oError)
                }

            })
        },
        toLoginPressed: function () {
            var oView = this.getView();
            oView.byId("rightPanelLogin").setVisible(true);
            oView.byId("rightPanelRegister").setVisible(false);
            oView.byId("goRegister").setVisible(true);
            oView.byId("goLogin").setVisible(false);
        },
        toRegisterPressed: function () {
            var oView = this.getView();
            oView.byId("rightPanelLogin").setVisible(false);
            oView.byId("rightPanelRegister").setVisible(true);
            oView.byId("goRegister").setVisible(false);
            oView.byId("goLogin").setVisible(true);
        }
    });
});