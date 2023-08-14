import { LightningElement, track } from 'lwc';

export default class AI_Image_Generator extends LightningElement {
    @track prompt = '';
    @track imageUrl = '';
    @track isLoading = false; // Add this line to initialize isLoading

    handlePromptChange(event) {
        this.prompt = event.target.value;
    }

    async sendRequest() {
        this.isLoading = true; // Start loading

        const apiKey = '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';
        const model = 'image-alpha-001';
        const url = `https://api.openai.com/v1/images/generations`;

        const options = {
            method: 'POST',
            body: JSON.stringify({ prompt: this.prompt, model: model }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Data: ' + JSON.stringify(data));
            this.imageUrl = data.data[0].url;
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = false; // Stop loading
        }
    }
}
