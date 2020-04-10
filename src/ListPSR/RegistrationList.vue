<template>
  <v-card>
    <v-dialog v-model="isActiveAddMemberForm" max-width="700">
      <addMemberForm v-if="isActiveAddMemberForm" v-on:close="closeMemberForm"/>
    </v-dialog>
    <v-card-title>

      <span class="headline">{{ formTitle }}</span>
      <v-spacer></v-spacer>
      <!-- <v-btn color="blue" dark @click="closeRegistrationList">Назад</v-btn> -->
      <v-icon @click="closeRegistrationList">close</v-icon>

    </v-card-title>

    <v-card-subtitle>
      <span>Доступные ресурсы</span>
    </v-card-subtitle>

    <v-card-text>
        
        <v-row>
          <!-- <v-col class="d-flex" align-self="start" sm="9" md="5" cols="12" xs="12"> -->
          <v-col class="d-flex" sm="9" md="5" cols="12" xs="12">
            <v-btn color="blue" dense dark @click="showMemberForm" >Записать участника</v-btn>
            <v-spacer></v-spacer>
            <v-select 
                dense
                outlined
                :disabled="stateDisable"
                label="Изменить статус"  
                :items="statusStore">
            </v-select>
            <v-spacer></v-spacer>

          </v-col>
        </v-row>
      
        <v-spacer></v-spacer>
        
        <v-row>
  
        <v-data-table dense
          :headers="headers" 
          :items="members" 
          :mobile-breakpoint="100"
          :disable-filtering="true"
          :disable-sort="true"
          :show-select="true"
          :hide-default-footer="true"
          
          v-on:input = "ItemSelectedHandler"
          :disable-pagination="true">

        <template v-slot:item.id="{ item }">
          <span>{{ item.volunteer.id}}</span>
        </template>  

        <template v-slot:item.fio="{ item }">
          <span>{{ item.volunteer.fio}}</span>
        </template>  

        <template v-slot:item.volunteerStatus="{ item }">
          <span>{{ item.volunteerStatus.name}}</span>
        </template> 

        <template v-slot:item.shuttleNum="{ item }">
          <span>{{ item.shuttleNum}}</span>
        </template>  

        <template v-slot:item.classification="{ item }">
          <span>{{ item.volunteer.classification.name }}</span>
        </template>  

        <template v-slot:item.startVolunteerTime="{ item }">
          <span>{{ item.startVolunteerTime}}</span>
        </template>  

        <template v-slot:item.endVolunteerTime="{ item }">
          <span>{{ item.endVolunteerTime }}</span>
        </template>  

        <template v-slot:item.shuttleNum="{ item }">
          <span>{{ item.shuttleNum }}</span>
        </template> 
        
        <!-- <template v-slot:item.data-table-select="{ item }">

        </template> -->

        </v-data-table>
        </v-row>
        
    </v-card-text>
  </v-card>


</template>
<script>
import addMemberForm from './addMemberForm';
import api from '../api';
/*
[
  {
    "departureAddress": "string",
    "endVolunteerTime": "2020-04-05T14:12:20.678Z",
    "id": 0,
    "psr": {
      "comment": "string",
      "endDate": "string",
      "id": 0,
      "name": "string",
      "psrState": {
        "id": 0,
        "name": "string"
      },
      "startDate": "string"
    },
    "shuttleNum": "string",
    "startVolunteerTime": "2020-04-05T14:12:20.678Z",
    "volunteer": {
      "classification": {
        "id": 0,
        "name": "string"
      },
      "comment": "string",
      "equipment": "string",
      "fio": "string",
      "id": 0,
      "login": "string",
      "phone": "string",
      "psrListDesc": "string",
      "sex": true
    },
    "volunteerStatus": {
      "id": 0,
      "name": "string"
    }
  }
]
*/

export default {
  components:{
    addMemberForm
  },
  data: function() {
    return {
      formTitle: "Лист Регистрации",
      members: [],
      isActiveAddMemberForm: false,
      selectedItems:[],
      stateDisable: true,
      statusStore:[
        {
          text: 'Пришел',
          value: '1'
        },
        {
          text: 'Ушел',
          value: '2'
        },
      ],
      headers: [
        { text: "пп", value: "id", sortable: false },
        { text: "Участник", value: "fio", sortable: false },
        { text: "Статус", value: "volunteerStatus", sortable: false },
        { text: "А", value: "shuttleNum", sortable: false },
        { text: "К", value: "classification", sortable: false },
        { text: "РВП", value: "startVolunteerTime", sortable: false },
        { text: "РВО", value: "endVolunteerTime", sortable: false },
        { text: "Эк", value: "shuttleNum", sortable: false },
      ]
    };
  },
  created() {
    this.initialize();
    this.loadRegistrationList();
  },
  methods: {
    initialize: function() {

    },
    ItemSelectedHandler: function(items){
      console.log(items);
      if (items.length >0){
        this.stateDisable = false
      }
      else{
        this.stateDisable = true
      }
      // this.selectedItems = items.map(function(item){
      //   return {

      //   }
      // });
    },
    loadRegistrationList: function(){

      this.axios.get( api.url.psrRegistrationList)
      .then(function(response){
          this.members =  response.data;
      }.bind(this))
      .catch(function(e){
          console.log(e);
      })
    },
    closeRegistrationList: function() {
      this.$emit("closeRegistrationList");
    },
    showMemberForm: function(){
        this.isActiveAddMemberForm = true;
    },
    closeMemberForm: function(){
        this.isActiveAddMemberForm = false;
    }

  }
};
</script>