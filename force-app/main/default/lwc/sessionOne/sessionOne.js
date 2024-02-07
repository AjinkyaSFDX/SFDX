import { LightningElement, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';
import COLORS from '@salesforce/resourceUrl/colors';
import {loadStyle} from 'lightning/platformResourceLoader';

const DELAY = 300;
const columns = [
    { label: 'Name', fieldName: 'Name', type: 'button' , sortable: "true", cellAttributes:{
        class:{fieldName:'nameColor'}}, typeAttributes: { label: { fieldName: 'Name' }, variant: 'base' }},
    { label: 'Website', fieldName: 'Website', type: 'url', cellAttributes:{
        class:{fieldName:'websiteColor'}}},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' , cellAttributes:{
        class:{fieldName:'phoneColor'}}},
    { label: 'AccountNumber', fieldName: 'AccountNumber', type: 'currency' , cellAttributes:{
        class:{fieldName:'accountNumberColor'}}},
    { label: 'Rating', fieldName: 'Rating', sortable: "true", cellAttributes:{
        class:{fieldName:'ratingColor'}}}
];

export default class SessionOne extends LightningElement {

    searchKey = '';
    @track accounts;
    @track accountsData;
    @track error;
    @track columns = columns;
    @track showTable = false;
    @track showRecord;
    @track selectedRow;
    @track showSearch = false;
    @track num1;
    @track num2;
    @track calResult;
    @track openCalculator = false;
    @track oper = "!";
    @track history;
    @track showCalculatorHistory = false;
    @track showVideo = false;
    @track sortBy;
    @track sortDirection;
    @track isCssLoaded = false

  
    connectedCallback(){
        this.showSearch = true;
    }

    handleLoad() {
        findAccounts({ searchKey: this.searchKey })
        .then((result) => {
          this.accounts = result;
          this.accounts = this.accounts.map(item=>{
            return {...item, 
                "nameColor":"datatable-orange",
                "websiteColor":"datatable-purple",
                "phoneColor":"datatable-red",
                "accountNumberColor":"datatable-blue",
                "ratingColor":"slds-icon-custom-custom12 slds-text-color_default"
            }
        })
          this.showTable = true;
          this.error = undefined;
        })
        .catch((error) => {
          this.error = error;
          this.accounts = undefined;
        });
      }
    handleKeyChange(event) {
        this.showTable = false;
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }
    handleRowAction(event) {
        this.selectedRow = event.detail.row;
        this.showRecord = true;
        this.showSearch = false;
        this.showTable = false;
    }
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Record Updated Successfully !!',
            message: 'Opearion Sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        this.openCalculator = true;
        this.showRecord = false;
    }
    handleSubmit(event) {
        console.log('Submitted');
    }
    handleChangeNum1(event) {
        this.num1 = event.target.value;
    }
    handleChangeNum2(event) {
        this.num2 = event.target.value;
    }
    handleChangeOper(event) {
        this.oper = event.target.value;
        this.calculateNumbers();
      }
    get operOpt() {
        return [
          { label: "Select Operator", value: "!" },
          { label: "Add", value: "+" },
          { label: "Subtract", value: "-" },
          { label: "Multiply", value: "*" },
          { label: "Divide", value: "/" }
        ];
    }
    calculateNumbers() {
        switch (this.oper) {
          case "+":
            this.result = Number(this.num1) + Number(this.num2);
            break;
          case "-":
            this.result = Number(this.num1) - Number(this.num2);
            break;
          case "*":
            this.result = Number(this.num1) * Number(this.num2);
            break;
          case "/":
            this.result = Number(this.num1) / Number(this.num2);
            break;
        default:
        this.result = "Select Operator";
        }
        const whatIsHappening = this.num1.toString() + ' ' + this.oper + ' ' + this.num2.toString() + '=' + this.result.toString();
        if(this.history){
            this.history = [ ...this.history, whatIsHappening];
        }else{
            this.history = [whatIsHappening];
        }
        this.showCalculatorHistory = false;
    }
    calculatorHistory(){
        this.showCalculatorHistory = true;
    }
    showBGM(){
        this.showCalculatorHistory = false;
        this.openCalculator = false;
        this.showVideo = true;
    }
    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
    }

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.accounts));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.accounts = parseData;
    }
    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
}