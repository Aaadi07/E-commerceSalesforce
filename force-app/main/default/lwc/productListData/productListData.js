import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductService.getProducts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EnhancedProductList extends LightningElement {
    @track products = [];
    @track filteredProducts = [];
    @track error;
    @track cart = [];
    @track noResults = false;

    // Fetch products from Apex
    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.filteredProducts = data; // Initialize filteredProducts with all products
        } else if (error) {
            this.error = error.body.message;
        }
    }

    // Search filter logic
    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();

        if (searchTerm) {
            this.filteredProducts = this.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
            this.noResults = this.filteredProducts.length === 0;
        } else {
            this.filteredProducts = [...this.products];
            this.noResults = false;
        }
    }

    // Add to cart logic
    handleAddToCart(event) {
        const productName = event.target.closest('.product-card').querySelector('h3').innerText;
        this.cart.push(productName);

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Added to Cart',
                message: `${productName} has been added to your cart.`,
                variant: 'success',
            })
        );
    }
}