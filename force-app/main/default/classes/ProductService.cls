public with sharing class ProductService {
    @AuraEnabled
    public static List<Product__c> getProducts(String searchTerm) {
        List<Product__c> productList = new List<Product__c>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://fakestoreapi.com/products');
        request.setMethod('GET');

        try {
            HttpResponse response = http.send(request);
            System.debug('Response Body: ' + response.getBody()); // Debug API response

            if (response.getStatusCode() == 200) {
                List<Object> products = (List<Object>) JSON.deserializeUntyped(response.getBody());
                for (Object obj : products) {
                    Map<String, Object> productMap = (Map<String, Object>) obj;
                    System.debug('Product Map: ' + productMap); // Debug each product

                    if (!String.isBlank(searchTerm) && 
                        !((String) productMap.get('title')).toLowerCase().contains(searchTerm.toLowerCase())) {
                        continue;
                    }
                    Product__c prod = new Product__c();
                    prod.Name = (String) productMap.get('title');
                    prod.Price__c = Decimal.valueOf(String.valueOf(productMap.get('price')));
                    prod.Description__c = (String) productMap.get('description');
                    prod.Image__c = (String) productMap.get('image');

                    prod.External_Id__c = String.valueOf(productMap.get('id')); 
                    System.debug('Product ID: ' + prod.External_Id__c); 

                    productList.add(prod);
                }
            }
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }
        return productList;
    }
}
