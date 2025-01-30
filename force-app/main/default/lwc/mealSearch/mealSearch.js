import { LightningElement } from 'lwc';
import DataEC from "@salesforce/resourceUrl/DataEC";

export default class MealSearch extends LightningElement {

     searchMeal
    chnageHandler(event) {
        this.searchMeal = event.target.value; 
    }

    clickHandler(event) {
        //setp 1
        let myCustomEvent = new CustomEvent('searchmeal', { detail: this.searchMeal });

        //setp 2
        this.dispatchEvent(myCustomEvent);
    }
}