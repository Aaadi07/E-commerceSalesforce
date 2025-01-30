import { LightningElement ,api} from 'lwc';

export default class MealTileCmp extends LightningElement {
     @api meal;

    recepieHandler(event) {
        ///child sai back jaayega parent mai toh humme custom evnt bhejna padega
        const myCustomEvent = new CustomEvent('recepie', { detail: this.meal.idMeal });
        this.dispatchEvent(myCustomEvent);
        
    } 
}