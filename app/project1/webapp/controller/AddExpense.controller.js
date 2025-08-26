sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "aditi/expense/ui/project1/util/NavigationHelper"

], (Controller, MessageToast,NavigationHelper) => {
  "use strict";
  return Controller.extend("aditi.expense.ui.project1.controller.AddExpense", {
    onInit() {
      
    },
    onSideNavItemPress: function (oEvent) {
      NavigationHelper.onSideNavItemPress(oEvent,this);
    },
    onSave: async function () {

      var user_ID = this.getOwnerComponent().getModel("userModel").getProperty("/userData/loginID")
      var oView = this.getView();
      var inputTitle = oView.byId("inputTitle").getValue();
      var inputAmount = oView.byId("inputAmount").getValue();
      var inputDate = oView.byId("inputDate").getValue();
      var inputNotes = oView.byId("inputNotes").getValue();
      // var firstName = oView.byId("firstNameInput").getValue();
      if (!inputTitle) {
        this.getView().byId("showErrorInExpense").setText("Please Enter Title for your expense")
        this.getView().byId("showErrorInExpense").setVisible(true);
        return;
      }
      if (!inputAmount) {
        this.getView().byId("showErrorInExpense").setText("Please Enter Amount for your expense")
        this.getView().byId("showErrorInExpense").setVisible(true);
        return;
      }
      if (!inputDate) {
        this.getView().byId("showErrorInExpense").setText("Please Select Date for your expense")
        this.getView().byId("showErrorInExpense").setVisible(true);
        return;
      }
      var oPayload = {
        title: inputTitle,
        amount: inputAmount,
        date: inputDate,
        note: inputNotes,
        user_ID: user_ID
      };
      try {
        const response = await fetch("/odata/v4/expense/Expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(oPayload)
        });
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        MessageToast.show("Expense Added: " + data.title);
        console.log("Response:", data);
      }
      catch (err) {
        MessageToast.show("Failed: " + err);
        console.log("failed to add expense", err);
      }
    }
  });
});