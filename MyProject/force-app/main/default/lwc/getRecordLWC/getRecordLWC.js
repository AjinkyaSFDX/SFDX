import { LightningElement, api, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import { getRecord } from 'lightning/uiRecordApi';
import ID_FIELD from "@salesforce/schema/Account.Id";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import RATING_FIELD from "@salesforce/schema/Account.Rating";
import { updateRecord } from "lightning/uiRecordApi";

const FIELDS = [ 'Account.Name', 'Account.Website' ];

export default class AccountQuickView extends LightningElement {

    @api recordId;
    accountRec;
    name;
    website;
    accountId;
    industry;
    rating;
  
    handleNameChange(event) {
        this.accountId = undefined;
        this.name = event.target.value;
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS } )
    wiredRecord( { error, data } ) {

        if (error) {
            console.log(error);
        } else if ( data ) {
            this.accountRec = data;
            this.name = this.accountRec.fields.Name.value;
            this.website = this.accountRec.fields.Website.value;
        }
    }
    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                console.log(this.accountId);
            })
            .catch(error => {
            });
    }
    handleChange(e) {
        if (e.target.name === "name") {
        
          //this is name input textbox
          this.name = e.target.value;
          console.log(this.name);
        } else if (e.target.name === "industry") {
        
          //this is industry input textbox
          this.industry = e.target.value;
          console.log(this.industry);
        } else if (e.target.name === "rating") {
        
          //this is rating input textbox
          this.rating = e.target.value;
          console.log(this.rating);
        }
      }
    
      handleClick() {
          //4. map the data to the fields
        const fields = {};
    
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[INDUSTRY_FIELD.fieldApiName] = this.industry;
        fields[RATING_FIELD.fieldApiName] = this.rating;
            
            //5. Create a config object that had info about fields. 
            //Quick heads up here we are not providing Object API Name
        const recordInput = {
          fields: fields
        };
    
            //6. Invoke the method updateRecord()
        updateRecord(recordInput).then((record) => {
          console.log(record);
        });
      }
    
}