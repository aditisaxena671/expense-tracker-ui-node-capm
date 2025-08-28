sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "aditi/expense/ui/project1/util/NavigationHelper",
    "aditi/expense/ui/project1/util/Login",
    "sap/m/MessageBox",

    
], (Controller,NavigationHelper,Login,MessageBox) => {
    "use-strict";
    
    return Controller.extend("aditi.expense.ui.project1.controller.ViewAnalysis", {
        onInit() {
            const oUser = this.getOwnerComponent().getModel("userModel").getProperty("/userData");
            if(!oUser){
                console.log("user need to login");
                Login.loginRequired(this);
                return;
            }
            const UserId = oUser.loginID;
            this.getView().bindElement("/Users(" + UserId + ")");
            this.getTotalExpenseValue(UserId);
        },
        onSideNavItemPress: function (oEvent) {
            NavigationHelper.onSideNavItemPress(oEvent,this);
        },
        getTotalExpenseValue:function(user_ID){
            console.log("Inside get total function");
            // var oPayLoad={
            //     userId: user_ID
            // }
            $.ajax({
                url:"/odata/v4/expense/getTotalExpensesByUser",
                type:"POST",
                contentType: "application/json",
                data:JSON.stringify({userId:user_ID}),
                success: function(oData){
                    if(oData){
                        console.log("Success response:", oData);
                        this.getView().byId("totalExpense").setText(oData.total);
                    }
                    else{
                        console.log("error:", oData);
                    }
                }.bind(this),
                error: function(){
                    console.log("error:", oData);
                }
            })
        },
        deleteItemBtn:function(oEvent){
            this._oDeleteContext = oEvent.getSource().getBindingContext();
            MessageBox.warning("The quantity you have reported exceeds the quantity planned.", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if (sAction === MessageBox.Action.OK) {
                        var oContext = this._oDeleteContext;
                        oContext.delete().then(()=>{
                            MessageBox.success("Expense Deleted");
                        }).catch((oError)=>{
                            MessageBox.error("Error while deleting Expense",oError);

                        })
                       
                    }
                    else{
                        MessageBox.CANCEL("Action Canceled");
                    }
				}.bind(this),
				dependentOn: this.getView()
			});
            
            
        }
       
    });
});