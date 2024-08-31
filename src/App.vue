<template>
  <div class="converterCard">
    <div class="conteiner">
      <currency-input-field 
      :selected-code-symbol = "currencySymbolFrom"
      @amount="updateCurrencyInput">
      <h4>Amount</h4>
      </currency-input-field>
      <currency-codes-item 
      :currency-codes = "codes"
      :start-selected-code = "currencyCodeFrom"
      @selected-Code="updateCurrencyCode">
      <h4>From</h4>
      </currency-codes-item>
    <currency-codes-item 
      :currency-codes = "codes"
      :start-selected-code = "currencyCodeTo"
      @selected-Code="updateCurrencyCode">
      <h4>To</h4>
    </currency-codes-item>
    
    </div>
    
    <div v-if="translatedAmount" class="resultConteiner">
      <h4>{{amount }} {{ currencySymbolFrom}} =</h4>
      <h3>{{translatedAmount }} {{ currencySymbolTo}} </h3>
      <h5> 1 {{ currencySymbolFrom }} = {{ exchangeRate }} {{ currencySymbolTo}}</h5>
      
    </div>
  </div>

  
</template>

<script>

import Api from './services/API.js';
import API_KEY from './config.js';
import {getAllISOCodes, getParamByISO} from "iso-country-currency";

const api = new Api(API_KEY);

export default {
  data() {
    return { 
      codes: ['USD', 'RUB', 'EUR'],
      currencyCodeFrom: '',
      currencySymbolFrom: '',
      currencyCodeTo: '',
      currencySymbolTo:'',
      amount: '',
      translatedAmount: '',
      exchangeRate: 5,
      allISOCodesInfo: getAllISOCodes()

    };
  },
  beforeMount() {
   this.codesAppend();
   this.defineCurrencyCodeFrom();
  },
  watch:{
    currencyCodeFrom(){
      this.updateExchangeRate()
    },
    currencyCodeTo(){
      this.updateExchangeRate()
    },
    amount(){
      this.translatedAmount = this.calculationTranslatedAmount()

    },
    exchangeRate(){
      this.translatedAmount = this.calculationTranslatedAmount()
    }
  },

  methods:{
    updateCurrencyCode(newCode, oldCode){
      if(this.currencyCodeFrom === oldCode){
        this.currencyCodeFrom = newCode;
        if(this.currencyCodeTo === newCode){
          this.currencyCodeTo = oldCode;
          let symbol = this.currencySymbolTo;
          this.currencySymbolTo =this.currencySymbolFrom;
          this.currencySymbolFrom = symbol
        }
        else{
          this.currencySymbolFrom = this.getCurrencySymbolbyCode(this.currencyCodeFrom)
        }

      }
      else{
        if(this.currencyCodeTo === oldCode){
          this.currencyCodeTo = newCode;
          if(this.currencyCodeFrom === newCode){
            this.currencyCodeFrom = oldCode;
            let symbol = this.currencySymbolTo;
            this.currencySymbolTo =this.currencySymbolFrom;
            this.currencySymbolFrom = symbol
          }
          else{
          this.currencySymbolTo = this.getCurrencySymbolbyCode(this.currencyCodeTo)
          }
        }
      }
    },
    
    codesAppend(){
      api.getListCodes().then((codes)=>{if(codes){this.codes=codes}});
    },

    updateCurrencyInput(newAmount){
      this.amount = newAmount;
    },

    updateExchangeRate(){
      if(this.currencyCodeTo && this.currencyCodeFrom){
        api.exchangeRate(this.currencyCodeTo, this.currencyCodeFrom).then((exchangeRate)=>
        {if(exchangeRate){this.exchangeRate=exchangeRate}})
      }
      
    },

    calculationTranslatedAmount (){
      if(this.amount && this.currencyCodeTo && this.currencyCodeFrom){
        return parseFloat((this.amount*this.exchangeRate).toFixed(5));
      }
      return ''
    },
    
    defineCurrencyCodeFrom(){
      const countryISO = (navigator.language || navigator.userLanguage).split('-')[1]
      this.currencyCodeFrom = getParamByISO(countryISO, 'currency')
      this.currencySymbolFrom = getParamByISO(countryISO, 'symbol')
    },

    getCurrencySymbolbyCode(code){
      for(let el of this.allISOCodesInfo){
        if(el["currency"] === code){
          return el["symbol"]
        }
      }
      return
    }
  }
};
</script>

<style>
  html{
    font-family: sans-serif;
    color: rgb(20, 30, 55);
  }
  body{
    background-image: linear-gradient(rgb(10,20,110) 40%, white 0);
  }
  
  .converterCard{
    margin: 40px auto;
    max-width: 1050px;
    border-radius: 8px;
    box-shadow: rgba(35, 55, 80, 0.3) 0px 6px 12px;
    padding: 40px;
    background-color: white;
    height: 70vh;

  }
  .conteiner{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .conteiner > div{
    box-sizing: border-box;
    width: 30%;
  }
  .conteiner > div > div{
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 12px;
    border: 1px solid #dbdada;
    border-radius: 4px;
    box-shadow: rgba(35, 55, 80, 0.1) 0px 5px 7px;
  }
  @media only screen and (max-width: 630px) {
    .conteiner > div{
      width: 100%;
    }
  }
  h4{
    margin: 10px 0;
    font-size: 16px;
  }

  .resultConteiner{
    margin: 40px 10%;
  }
  .resultConteiner h4{
    color: #5C677B;
  }
  .resultConteiner h3{
    font-size: 30px;
    margin: 20px 0 5px 0;

  }
  .resultConteiner h5{
    font-size: 14px;
    color: #5C677B;
    margin: 0;
  }
</style>