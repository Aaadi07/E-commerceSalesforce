public class StripeService {
    @AuraEnabled
    public static String createPaymentLink(Decimal amount, String curency, String productName) {
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://api.stripe.com/v1/payment_links');
            request.setMethod('POST');
            
            // Set the Stripe Secret Key (Replace with your own key)
            String secretKey = 'sk_test_YOUR_SECRET_KEY';
            String authorizationHeader = 'Bearer ' + secretKey;
            request.setHeader('Authorization', authorizationHeader);
            request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            // Set the payment link parameters
            String body = 'line_items[0][price_data][currency]=' + curency +
                          '&line_items[0][price_data][product_data][name]=' + EncodingUtil.urlEncode(productName, 'UTF-8') +
                          '&line_items[0][price_data][unit_amount]=' + (amount * 100) +
                          '&line_items[0][quantity]=1';
            request.setBody(body);
            
            // Send the request
            HttpResponse response = http.send(request);
            
            if (response.getStatusCode() == 200 || response.getStatusCode() == 201) {
                // Parse the JSON response
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                return (String) responseMap.get('url');
            } else {
                System.debug('Error: ' + response.getBody());
                throw new AuraHandledException('Failed to create a payment link.');
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            throw new AuraHandledException('An error occurred while creating the payment link.');
        }
    }
}
