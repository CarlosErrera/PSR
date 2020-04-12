<template>
  <div>
        <!-- addCardPSR -->
        <v-dialog v-model="addCardPSR_isVisible" :fullscreen="true">
          <addCardPSR v-if="addCardPSR_isVisible" v-on:closeCardPSR="addCardPSRHandler" />
        </v-dialog>

        <!-- editCardPSR-->
        <v-dialog v-model="editCardPSR_isVisible" :fullscreen="true">
          <editCardPSR v-if="editCardPSR_isVisible" v-bind:cardProps="cardProps" v-on:closeCardPSR="editCardPSRHandler" />
        </v-dialog>

        <!-- Registration list  -->
        <v-dialog v-model="RegistrationList_isVisible" :fullscreen="true" >
          <RegistrationList v-if="RegistrationList_isVisible" v-on:closeRegistrationList="RegistrationListHandler"></RegistrationList>
        </v-dialog>
  
  <v-data-table :headers="headers" :items="psrMembers"  class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cписок спасательных работ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="addCardPSRHandler">{{ createNewPSR }}</v-btn>



      </v-toolbar>
    </template>

    <!-- <template v-slot:item.Status="{ item }">
      <span
        v-bind:class="{ defaultStatus: item.Status, statusIsOpen: !item.Status }"
      >{{ item.Status | statusFilter}}</span>
    </template> -->


    <template v-slot:item.id="{ item }">
      <span> {{ item.psr.id }}</span>
    </template>

    <template v-slot:item.name="{ item }">
      <span> {{item.psr.name}}</span>
    </template>

    <template v-slot:item.startDate="{ item }">
      <span> {{item.psr.startDate}}</span>
    </template>

    <template v-slot:item.endDate="{ item }">
      <span> {{item.psr.endDate }}</span>
    </template>

    <template v-slot:item.psrState="{ item }">
      <span> {{item.psr.psrState.name }}</span>
    </template>

    <!-- <template v-slot:item.action>
      <v-icon small class="mr-2" @click="showCardPSR">edit</v-icon>
    </template> -->

    <template v-slot:item.cardPSR="{item}">
      <v-btn color="primary" rounded small @click="editCardPSRHandler(item)">Открыть</v-btn>
    </template>

    <template v-slot:item.registrList>
      <v-btn color="orange" rounded small @click="RegistrationListHandler">Открыть</v-btn>
    </template>

    <template v-slot:no-data-text>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>
<script>
import editCardPSR from './editCardPSR';
import addCardPSR from './addCardPSR';
import RegistrationList from './RegistrationList';
import api from '../api';

export default {
  
  components:{
    editCardPSR,
    RegistrationList,
    addCardPSR
  },
  data: () => ({ 
    addCardPSR_isVisible: false,
    editCardPSR_isVisible: false,
    RegistrationList_isVisible: false,
    cardProps: {},
    createNewPSR: "Создать новый ПСР",
    /*
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
    */
    headers: [
      { text: "Номер ПСР", value: "id", sortable: false },
      { text: "Населенный пункт", value: "name" },
      { text: "Начало ПСР", value: "startDate" },
      { text: "Окончание ПСР", value: "endDate" },
      { text: "Статус", value: "psrState" },
      { text: "Карточка ПСР", value: "cardPSR", sortable: false },
      { text: "Лист Регистрации", value: "registrList", sortable: false }
    ],
    psrMembers: [],
    
    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Создание новой ПСР" : "Карточка ПСР";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  filters: {
    statusFilter: function(val) {
      if (val) {
        return "Завершено";
      } else {
        return "Открыт";
      }
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize: function() {
      this.loadPsrList();
    },
    loadPsrList: function(){
      this.$http.get(api.url.psrDataList)
      .then( function(response){        
        // this.psrMembers =  this.psrMembers.concat(response.data);
        this.psrMembers =  response.data;
        /*
        this.psrMembers =  response.data.map(function(member){
          return {
            id: member.id,
            psr: {
              id: member.psr.id,
              name:member.psr.name ,
              startDate:member.psr.startDate,
              endDate: member.psr.endDate,
              psrState: {
                value: member.psr.psrState.id,
                text: member.psr.psrState.name
              },
              comment: member.psr.comment
            },
            station: member.station,
            psrLeader: {
              // login: member.psrLeader.login,
              text: member.psrLeader.fio,
              value: member.psrLeader.id
            },
            psrRegisteredUser: {
              login: member.psrRegisteredUser.login,
              fio: member.psrRegisteredUser.fio,
              id: member.psrRegisteredUser.id
            },
            objectInfo: member.objectInfo,
            content: member.content,
            photo: member.photo
          }

        });
        */

      }.bind(this))
      .catch(function(err){
        console.log(err);
      }.bind(this))
    },
    editCardPSRHandler: function(item){

      this.cardProps = Object.assign({}, item);

      this.editCardPSR_isVisible ? 
        this.editCardPSR_isVisible = false : 
        this.editCardPSR_isVisible = true;
    },
    addCardPSRHandler: function(){
      this.addCardPSR_isVisible ? 
        this.addCardPSR_isVisible = false : 
        this.addCardPSR_isVisible = true; 
    },
    RegistrationListHandler: function(){
      this.RegistrationList_isVisible ?
        this.RegistrationList_isVisible = false :
        this.RegistrationList_isVisible = true
    }

  }
};
</script>
<style scoped>
.statusIsOpen {
  color: red;
}
.defaultStatus {
  color: limegreen;
}
</style>