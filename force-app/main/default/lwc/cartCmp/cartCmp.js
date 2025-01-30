import { LightningElement } from 'lwc';

export default class CartCmp extends LightningElement {
    cartItems = [];

    connectedCallback() {
        const state = decodeURIComponent(window.location.search.substring(1));
        const params = JSON.parse(state);
        this.cartItems = JSON.parse(params.c__cartItems || '[]');
    }

    proceedToPayment() {
        alert('Payment Successful!');
    }
}
