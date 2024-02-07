import { LightningElement, track} from 'lwc';

export default class ParentComponent extends LightningElement {
    @track valueToPass = 'Hey';
    @track showChildValues = false;
    @track serachResultFromChild;
    handleLoad(){
        if(this.showChildValues == true){
            this.showChildValues = false;
        }else{
            this.showChildValues = true;
        }
    }
    handleChildEvent(event){
        this.serachResultFromChild = event.detail;
        console.log(this.serachResultFromChild);
    }
}