<template>
    <div>
        <slot></slot>
        <div class="CurrencyCodes">
            <select name="CurrencyCodes" id="CurrencyCodes" v-model="selectedCode" >
            <option v-for="currencyCode in currencyCodes"  v-bind:value="currencyCode">{{ currencyCode }}</option>
            </select>
        </div>
    </div>
    
</template>

<script>
    export default{
        data(){
            return {selectedCode: this.startSelectedCode}
        },
        emits: ["selected-Code"],
        watch:{
            selectedCode(newVal, oldVal){
                if(newVal!=this.startSelectedCode){
                    this.$emit('selected-Code', newVal, oldVal);
                }
            },
            startSelectedCode(val){
                this.selectedCode=val
            }

        },
        props:{
            currencyCodes : {
                type: Array,
                required: true
            },
            startSelectedCode: {
                type: String,
                required: false
            }
        },
        
    }; 
</script>
    
<style>
select{
    width: 100%;
    border: 0;
    height: 100%;
}
select:focus{
    outline: 0;
}
.CurrencyCodes:has(select:focus){
    border: 1px solid rgba(0, 108, 224, .5);
}
</style>