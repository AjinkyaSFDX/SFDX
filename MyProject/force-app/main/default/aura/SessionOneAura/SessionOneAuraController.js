({
    doInit: function(component) {
        component.set("v.showSearch", true);
    },
	handleClick : function(component, event, helper) {
        var searchTerm = component.find('enter-search').get('v.value');
        component.set("v.searchKey", searchTerm);
        component.set('v.columns',[
            
            {label: 'Name', fieldName: 'Name',  type: 'button', typeAttributes: { label: { fieldName: 'Name' }, variant: 'base' }},
            {label: 'Phone', fieldName: 'Phone', type: 'text'},
            {label: 'Website', fieldName: 'Website', type: 'url'}
            
        ]);
        helper.getAccounts(component, event, helper);
        component.set("v.showTable", true);
        component.set("v.showSearch", false);
	},
    handleRowAction : function(component, event, helper){
        component.set("v.showTable", false);
        component.set("v.showRecordEditForm", true);
        var row = event.getParam('row');
        component.set("v.accountRecordToEdit", row);
    },
    handleSuccess : function(component,event,helper) {
        component.find('notifLib').showToast({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        component.set("v.showRecordEditForm", false);
        component.set("v.showCalculator", true);
    },
    Add : function(component, event, helper) {
        var a = component.get("v.num1");
        var b = component.get("v.num2");
        var total = parseInt(a) + parseInt(b);
        component.set("v.total",total);
        component.set("v.isAdd",true);
        component.set("v.isSub",false);
        component.set("v.isMul",false);
        component.set("v.isDiv",false);
        const whatIsHappening = a.toString() + ' + ' + b.toString() + ' = ' + total.toString();
        console.log(whatIsHappening);
        helper.storeHistory(component, whatIsHappening);
    },
    Sub : function(component, event, helper) {
        var a = component.get("v.num1");
        var b = component.get("v.num2");
        var total = parseInt(a) - parseInt(b);
        component.set("v.total",total);
        component.set("v.isAdd",false);
        component.set("v.isSub",true);
        component.set("v.isMul",false);
        component.set("v.isDiv",false);
        const whatIsHappening = a.toString() + ' - ' + b.toString() + ' = ' + total.toString();
        helper.storeHistory(component, whatIsHappening);
    },
    Mul : function(component, event, helper) {
        var a = component.get("v.num1");
        var b = component.get("v.num2");
        var total = parseInt(a) * parseInt(b);
        component.set("v.total",total);
        component.set("v.isAdd",false);
        component.set("v.isSub",false);
        component.set("v.isMul",true);
        component.set("v.isDiv",false);
        const whatIsHappening = a.toString() + ' * ' + b.toString() + ' = ' + total.toString();
        helper.storeHistory(component, whatIsHappening);
    },
    Divi : function(component, event, helper) {
        var a = component.get("v.num1");
        var b = component.get("v.num2");
        var total = parseInt(a) / parseInt(b);
        component.set("v.total",total);
        component.set("v.isAdd",false);
        component.set("v.isSub",false);
        component.set("v.isMul",false);
        component.set("v.isDiv",true);
        const whatIsHappening = a.toString() + ' / ' + b.toString() + ' = ' + total.toString();
        helper.storeHistory(component, whatIsHappening);
    },
    Clear : function(component, event, helper) {
        component.set("v.total",0);
        component.set("v.num1",0);
        component.set("v.num2",0);
        component.set("v.isAdd",false);
        component.set("v.isSub",false);
        component.set("v.isMul",false);
    },
    showHistoryButton : function(component, event, helper){
        if(component.get("v.showHistory") == false){
        	component.set("v.showHistory", true);
        }else{
        	component.set("v.showHistory", false);
        }
        component.set("v.showVideoButton", true);
	},
    showVideo : function(component, event, helper){
        component.set("v.showVideoButton", false);
        component.set("v.showHistory", false);
        component.set("v.showCalculator", false);
        component.set("v.showVideo", true);
    }
})