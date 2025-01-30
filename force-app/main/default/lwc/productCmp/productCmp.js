import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductService.getProducts';
import savePaymentDetails from '@salesforce/apex/PaymentController.savePaymentDetails'
import 	PhonePe from "@salesforce/resourceUrl/PhonePe";
import Googlepay from "@salesforce/resourceUrl/Googlepay";
import Paytm from "@salesforce/resourceUrl/Paytm";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ProductCmp extends LightningElement {
    @track filteredProducts = [];
    @track searchTerm = '';
    @track noResults = false;
    @track cartItems = [];
    @track totalPrice = 0;
    @track activeTab = 'Products';
    @track isPaymentModalOpen = false; 
    @track selectedPaymentMethod = ''; 
    @track isPaymentDetailsVisible = false; 
    @track name = '';
    @track cardNumber = '';
    @track expiryDate = '';
    @track cvv = '';

    

    phonepayUrl = PhonePe;
    googlepayUrl = Googlepay;
    paytmUrl = Paytm;


    handleSearch(event) {
        this.searchTerm = event.target.value.trim();
         if (this.searchTerm) {
            this.fetchProducts(this.searchTerm);
        } else {
            this.filteredProducts = [];
            this.noResults = true;
        }
    }

    // handleSearchClick() {
    //     if (this.searchTerm) {
    //         this.fetchProducts(this.searchTerm);
    //     } else {
    //         this.filteredProducts = [];
    //         this.noResults = true;
    //     }
    // }

    fetchProducts(searchTerm) {
        getProducts({ searchTerm })
            .then((data) => {
                if (data && data.length > 0) {
                    this.filteredProducts = data;
                    this.noResults = false;
                } else {
                    this.filteredProducts = [];
                    this.noResults = true;
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }

    // handleAddToCart(event) {
    //     let { productId, productName } = event.detail;
    //     alert('Product Id:', productId);
    //     alert('Product Name:', productName);
    //     let product = this.filteredProducts.find((p) => p.Id === productId);
    //     if (product && !this.cartItems.find((item) => item.Id === productName)) {
    //         this.cartItems = [...this.cartItems, product];
    //         console.log('Cart Items:', JSON.stringify(this.cartItems));
    //         this.calculateTotalPrice();

    //         this.activeTab = 'Cart';
    //     }
    // }
handleAddToCart(event) {
    let { productId, productName } = event.detail;
    console.log('Product ID Received:', productId);
    console.log('Product Name:', productName);

    let product = this.filteredProducts.find((p) => p.External_Id__c === productId);
    console.log('Product Found:', product);

    if (product && !this.cartItems.find((item) => item.External_Id__c === productId, productName)) {
        this.cartItems = [...this.cartItems, product];
        this.calculateTotalPrice();
        this.activeTab = 'Cart';
    } else {
        console.warn('Product already in cart or not found');
    }
}


   calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + parseFloat(item.Price__c), 0);
    console.log('Updated Total Price:', this.totalPrice);
}

    handlePayment() {
        this.isPaymentModalOpen = true; 
    }

    closePaymentModal() {
        this.isPaymentModalOpen = false; 
    }

    handlePaymentMethodSelection(event) {
        this.selectedPaymentMethod = event.target.dataset.method; 
        this.isPaymentDetailsVisible = true; 
    }

// handleInputChange(event) {
//     let fieldName = event.target.dataset.field;
//     this[fieldName] = event.target.value;

//     console.log(`Updated ${fieldName}: ${this[fieldName]}`);
// }

handleInputChange(event) {
    let fieldName = event.target.dataset.field;
    let fieldValue = event.target.value.trim(); // Remove extra spaces

    if (fieldName) {
        this[fieldName] = fieldValue;
        console.log(`Updated ${fieldName}: ${this[fieldName]}`); // Debugging log
    } else {
        console.warn('Field name is missing or incorrect in dataset');
    }
}


    submitPayment() {
        let name = this.name;
        let cardNumber = this.cardNumber;
        let expiryDate = this.expiryDate;
        let cvv = this.cvv;

    console.log('Name:', this);
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVV:', cvv);

    if (name && cardNumber && expiryDate && cvv) {
    
        savePaymentDetails({ name, cardNumber, expiryDate, cvv })
            .then(() => {
                this.showToast('Success', `Payment successful for ${name} with card ending in ${cardNumber.slice(-4)}`, 'success');
                this.resetForm();
            })
            // .catch((error) => {
            //     this.showToast('Error', `Failed to save payment details: ${error.body.message}`, 'error');
            // });
    } else {
        this.showToast('Error', 'Please fill in all payment details.', 'error');
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
        resetForm() {
    this.name = '';
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvv = '';
    }

}
