<template>
    <div>
      <b-modal
        id="dataForm"
        ok-only
        ok-title="Accept"
        modal-class="modal-primary"
        centered
        title="Data Form"
      >
        <b-card-text>
            <b-list-group v-for="(listElement, index) in listArray" :key="index">
                <b-list-group-item button @click="selectListItem(listElement)"><strong>Symbol:</strong> {{listElement.symbol}}, <strong>Last Price:</strong>  {{listElement.lastPrice}}</b-list-group-item>
              </b-list-group>
        </b-card-text>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from '../../axios'
  export default {
    props: {
        dataForm: Object,
    },
    data(){
        return{
            listArray:[],
            propsElementId: null
        }
    },
    mounted(){
        this.getList()  
    },
    methods:{
    getList(){
      let result = axios.get('https://api2.binance.com/api/v3/ticker/24hr').then(response => {
      this.listArray = response.data
    })  
    },
    selectListItem(elementId){
        this.propsElementId = elementId
        this.$emit('clicked', this.propsElementId);
        // this.$bvModal.hide('dataForm')
    }
  }
  }
  </script>