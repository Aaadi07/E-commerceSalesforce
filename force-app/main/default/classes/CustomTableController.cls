public with sharing class CustomTableController {
    @AuraEnabled(cacheable=true)
    public static List<CustomObject__c> fetchRecords() {
        return [SELECT Id, Name, Status__c FROM CustomObject__c];
    }

    @AuraEnabled
    public static void updateRecords(List<CustomObject__c> updatedRecords) {
        update updatedRecords;
    }
}
