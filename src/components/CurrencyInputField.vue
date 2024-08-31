<template>
    <div>
        <slot></slot>
        <div title="inputConteiner" class="inputConteiner" ref="inputConteiner">
            <span>{{ selectedCodeSymbol }}</span>
            <input type="number" v-model="amount">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amount: ''
            }
        },
        emits:['amount'],
        watch:{
            amount(value){
                if(this.isValid(value)){
                    this.$refs.inputConteiner.classList.remove('borderColorRed');
                    this.$emit('amount', value)
                }
                else{
                    this.$refs.inputConteiner.classList.add('borderColorRed');
                }
            }
        },
        methods:{
            isValid(value){
                if(typeof value === 'number' && value>=0){
                    return true
                }
                return false

            }
        },
        props:{
            selectedCodeSymbol:{
                type: String,
                default: false
            }
        }
    }
</script>
<style scoped>
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input{
        border: 0;
        height: 100%;
        background-color: white;
        flex: 1 1;
        min-width: 0;
        font-size: 16px;
    }
    input:focus{
        outline-width: 0;
    }
    .inputConteiner:has(input:focus){
        border: 1px solid rgba(0, 108, 224, .5);
    }
    .borderColorRed{
        border-color: red !important;
    }
    .inputConteiner{
        display: flex;
        align-items: baseline;
    }
    
</style>