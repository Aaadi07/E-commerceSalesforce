import { LightningElement, api } from 'lwc';

export default class PaymentCmp extends LightningElement {
    @api cartItems = [];
    @api totalPrice = 0;
    cardNumber = '';
    expiryDate = '';
    cvv = '';

    handleCardNumberChange(event) {
        this.cardNumber = event.target.value;
    }

    handleExpiryDateChange(event) {
        this.expiryDate = event.target.value;
    }

    handleCvvChange(event) {
        this.cvv = event.target.value;
    }

    handleCancel() {
        // Navigate back to the cart or product page if needed
        window.history.back();
    }

    handleSubmitPayment() {
        if (this.cardNumber && this.expiryDate && this.cvv) {
            // Implement payment submission logic
            alert(`Payment of $${this.totalPrice} successfully processed.`);
            // Optionally clear the cart items or reset the state after successful payment
            this.cartItems = [];
            this.totalPrice = 0;
            window.history.back(); // Navigate back to the previous page
        } else {
            alert('Please fill in all payment details.');
        }
    }
}
