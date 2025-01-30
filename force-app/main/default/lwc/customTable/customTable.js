import { LightningElement, wire, track } from 'lwc';
import fetchRecords from '@salesforce/apex/CustomTableController.fetchRecords';
import updateRecords from '@salesforce/apex/CustomTableController.updateRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomTable extends LightningElement {
    @track tableData = [];
    @track draftValues = [];
    @track isSaving = false;

    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        {
            label: 'Status',
            fieldName: 'Status__c',
            type: 'picklistColumn',
            typeAttributes: {
                options: [
                    { label: 'Pending', value: 'Pending' },
                    { label: 'In Progress', value: 'In Progress' },
                    { label: 'Completed', value: 'Completed' },
                ],
                placeholder: 'Select a status',
            },
            editable: true,
        },
    ];

    @wire(fetchRecords)
    wiredRecords({ error, data }) {
        if (data) {
            this.tableData = data;
        } else if (error) {
            this.showToast('Error', 'Failed to fetch records', 'error');
        }
    }

    handleSave() {
        this.isSaving = true;
        const updatedFields = this.draftValues.map(draft => {
            const record = { Id: draft.id };
            if (draft.Status__c) record.Status__c = draft.Status__c;
            return record;
        });

        updateRecords({ updatedRecords: updatedFields })
            .then(() => {
                this.showToast('Success', 'Records updated successfully!', 'success');
                this.draftValues = [];
                return refreshApex(this.wiredRecords);
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            })
            .finally(() => {
                this.isSaving = false;
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant,
            })
        );
    }
}
