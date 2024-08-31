import { createApp } from 'vue'
import App from './App.vue'
import CurrencyCodesItem from './components/CurrencyCodesItem.vue'
import CurrencyInputField from './components/CurrencyInputField.vue'

const app = createApp(App)
app.component('currency-codes-item', CurrencyCodesItem)
app.component('currency-input-field', CurrencyInputField)
app.mount('#app')
