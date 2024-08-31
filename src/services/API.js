
export default class Api {
    myHeaders;
    requestOptions;

    constructor(apikey) {
        this.myHeaders = new Headers();
        this.myHeaders.append("apikey", apikey);
        this.requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: this.myHeaders
        };
    }

    async getListCodes() {
        return fetch("https://api.apilayer.com/currency_data/list", this.requestOptions)
        .then((response)=>response.json())
        .then((data)=> Object.keys(data["currencies"]))
        .catch(error => console.log('error', error));
    }
    async exchangeRate(to, from) {
        return fetch(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=1`, this.requestOptions)
            .then(response => response.json())
            .then((data)=>data["result"])
            .catch(error => console.log('error', error));
    }



}