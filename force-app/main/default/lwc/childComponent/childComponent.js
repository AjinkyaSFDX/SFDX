import { LightningElement, api, track} from 'lwc';

export default class ChildComponent extends LightningElement {

@api valueFromParent;
@track searchKey;

handleKeyChange(event){
    this.searchKey = event.target.value;

    const searchEvent = CustomEvent("sendittoparent", {detail:this.searchKey});
    this.dispatchEvent(searchEvent);
}


}