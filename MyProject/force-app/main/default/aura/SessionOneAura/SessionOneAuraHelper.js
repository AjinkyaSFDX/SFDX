({
	getAccounts : function(component, event, helper) {
        var action = component.get("c.findAccounts");
        action.setParams({
            "searchKey": component.get("v.searchKey")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accounts", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	},
    storeHistory : function(component, calculation) {
        var history = component.get("v.allCalculations");
        history.push(calculation);
        component.set("v.allCalculations", history);
    }
})