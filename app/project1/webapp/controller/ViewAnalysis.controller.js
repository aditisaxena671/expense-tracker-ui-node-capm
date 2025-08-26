sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "aditi/expense/ui/project1/util/NavigationHelper"
],(Controller,NavigationHelper)=>{
    return Controller.extend("aditi.expense.ui.project1.controller.ViewAnalysis",{
        onInit(){
            
        },
        onSideNavItemPress: function(oEvent){
            NavigationHelper.onSideNavItemPress(oEvent,this);
        }
    });
});