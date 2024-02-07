import { LightningElement, track, api} from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
import updateContacts from "@salesforce/apex/UpdateRecords.updateContacts";
export default class EventSubscriber extends LightningElement {
    @api recordId;
    channelName = '/event/Assesment__e';
    isSubscribeDisabled = false;
    @track msgFromEvent;
    @track recordIdToUpdate;
    @track updated;
    subscription = {};

    handleChannelName(event) {
        this.channelName = event.target.value;
    }

    handleSubscribe() {
        const messageCallback = response => {
            console.log('New message received: ', JSON.stringify(response));
            this.msgFromEvent = JSON.stringify(response);
            this.recordIdToUpdate = JSON.stringify(response.data.payload.ContactRecordId__c);
            console.log('this.recordIdToUpdate : '+this.recordIdToUpdate);
            this.handleUpdate();
        };

        subscribe(this.channelName, -1, messageCallback).then((response) => {
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
            this.toggleSubscribeButton(true);
        });
    }
    handleUpdate() {
        console.log('this.handleUpdate : '+this.recordIdToUpdate);
        updateContacts({ recordIdToUpdate : this.recordIdToUpdate })
          .then((result) => {
            console.log('Success');
          })
          .catch((error) => {
            this.error = error;
            this.contacts = undefined;
          });
      }
    
}