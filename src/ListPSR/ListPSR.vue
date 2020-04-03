<template>
  <v-data-table :headers="headers" :items="PSRmembers"  class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cписок спасательных работ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="addCardPSRHandler">{{ createNewPSR }}</v-btn>

        <!-- addCardPSR -->
        <v-dialog v-model="addCardPSR_isVisible" :fullscreen="true">
          <addCardPSR  v-on:closeCardPSR="addCardPSRHandler" />
        </v-dialog>

        <!-- editCardPSR-->
        <v-dialog v-model="editCardPSR_isVisible" :fullscreen="true">
          <editCardPSR v-bind:cardProps="cardProps" v-on:closeCardPSR="editCardPSRHandler" />
        </v-dialog>

        <!-- Registration list  -->
        <v-dialog v-model="RegistrationList_isVisible" :fullscreen="true" >
          <RegistrationList v-on:closeRegistrationList="RegistrationListHandler"></RegistrationList>
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:item.Status="{ item }">
      <span
        v-bind:class="{ defaultStatus: item.Status, statusIsOpen: !item.Status }"
      >{{ item.Status | statusFilter}}</span>
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
</template>
<script>
import editCardPSR from './editCardPSR';
import addCardPSR from './addCardPSR';
import RegistrationList from './RegistrationList';
// import api from '../api';

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

    headers: [
      { text: "Номер ПСР", value: "id", sortable: false },
      { text: "Населенный пункт", value: "Settlement" },
      { text: "Начало ПСР", value: "StartDate" },
      { text: "Окончание ПСР", value: "EndDate" },
      { text: "Статус", value: "Status" },
      { text: "Карточка ПСР", value: "cardPSR", sortable: false },
      { text: "Лист Регистрации", value: "registrList", sortable: false }
    ],
    PSRmembers: [],
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
      this.PSRmembers = [
        {
          id: 1208,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: true
        },
        {
          id: 5609,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: false
        }
      ]
      // this.$http.get(api.url.psrListGetAll).then( function(response){
      //   console.log(response);
      // })
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