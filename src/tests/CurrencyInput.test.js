import { mount} from "@vue/test-utils";
import CurrencyInputField from "../components/CurrencyInputField.vue";
import { describe, expect, it} from "vitest";

describe("CurrencyInputField.vue", () => {
    it ( "Test if isValid is a function" ,( ) => { 
        expect (typeof CurrencyInputField.methods.isValid ).toBe( "function"); });
    it ( "Test if negative number is valid  currancy input (no)" , ( ) => { 
        expect (CurrencyInputField.methods.isValid(-5)).toBeFalsy(); });
    it ( "Test if numerical expression is valid  currancy input (no)" ,( ) => { 
        expect (CurrencyInputField.methods.isValid('-5+23')).toBeFalsy(); });
    it ( "Test if string is valid  currancy input (no)" ,( ) => { 
        expect (CurrencyInputField.methods.isValid('notvalidString')).toBeFalsy(); });
    it ( "Test if positive integer is valid  currancy input (yes)" ,( ) => { 
        expect (CurrencyInputField.methods.isValid(100)).toBeTruthy(); });  
    it ( "Test if float is valid  currancy input (yes)" ,( ) => { 
        expect (CurrencyInputField.methods.isValid(10.15)).toBeTruthy();}); 
});