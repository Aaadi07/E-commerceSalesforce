// import { LightningElement } from 'lwc';

// export default class MealHunter extends LightningElement {
//      searchResult
//     async mealSearchHandler(event) {
//         let searchMeal = event.detail;
//         console.log('searchMeal', searchMeal);
       
//         let response = await fetch(`https://fakestoreapi.com/products=${searchMeal}`);
//         let data = await response.json();
//             console.log('data', data.meals);
//         this.searchResult = data.meals;

        
    
// }
// }
import { LightningElement } from 'lwc';

export default class MealHunter extends LightningElement {
    searchResult;
    
    async mealSearchHandler(event) {
        try {
            // Fetch all products from the fake store API
            let response = await fetch('https://fakestoreapi.com/products=${searchProducts}');
            let data = await response.json();
            console.log('Fetched products:', data.meals); // Log the result
            this.searchResult = data.meals; // Store the fetched data in searchResult
            
        } catch (error) {
            console.error('Error fetching products:', error); // Handle any errors
        }
    }
}
