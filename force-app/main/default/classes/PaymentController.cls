public with sharing class PaymentController {
    @AuraEnabled
    public static String savePaymentDetails(String name, String cardNumber, String expiryDate, String cvv) {
        try {
     
            Payment__c paymentRecord = new Payment__c();
            paymentRecord.Name__c = name; // Replace with your actual field API name
            paymentRecord.Card_Number__c = cardNumber; // Replace with your actual field API name
            paymentRecord.Expiry_Date__c = expiryDate; // Replace with your actual field API name
            paymentRecord.CVV__c = Decimal.valueOf(cvv); // Convert CVV to Decimal
            paymentRecord.Transaction_Date__c = DateTime.now(); // Replace with your actual field API name

           
            insert paymentRecord;

            return 'Payment details saved successfully!';
        } catch (Exception e) {
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
}
