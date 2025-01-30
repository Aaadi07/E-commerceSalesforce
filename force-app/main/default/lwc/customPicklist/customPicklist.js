import { LightningElement, api } from 'lwc';

export default class CustomPicklist extends LightningElement {
    @api options;
    @api value;
    @api rowId;

    handleChange(event) {
        const selectedValue = event.target.value;
        this.dispatchEvent(new CustomEvent('cellchange', {
            detail: {
                rowId: this.rowId,
                selectedValue,
            },
        }));
    }
}
