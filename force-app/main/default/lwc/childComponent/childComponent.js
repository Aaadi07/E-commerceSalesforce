import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ChildComponent extends LightningElement {
    @api products = []; 

   handleAddToCart(event) {
        let productId = event.target.dataset.id;
        console.log('Clicked Product ID:', productId); // Debug log

        let product = this.products.find(prod => prod.External_Id__c === productId);
        console.log('Product Found in Child:', product);

        if (product) {
            this.dispatchEvent(
                new CustomEvent('addtocart', {
                    detail: { productId: product.External_Id__c, productName: product.Name }
                })
            );
            this.showToast('Success', `${product.Name} added to cart!`, 'success');
        } else {
            this.showToast('Error', 'Product not found.', 'error');
        }
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}
