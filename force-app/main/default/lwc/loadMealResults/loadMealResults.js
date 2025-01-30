import { LightningElement ,api} from 'lwc';

export default class LoadMealResults extends LightningElement {
    @api mealResult = [];
    selectedMeal;
    showModal = false;
       

      get checkMeals() {
        return Array.isArray(this.mealResult) && this.mealResult.length > 0;
    }

     recepieHandler(event) {
        const selectedMealId = event.detail;
        console.log('selectedMealId', selectedMealId);

         //Find Method
        this.selectedMeal = this.mealResult.find(currItem => currItem.idMeal === selectedMealId);
       
       console.log('selectedMeal', this.selectedMeal);
       this.showModal = true;
    }

    closeHandler(){
        this.showModal = false;
    }
}