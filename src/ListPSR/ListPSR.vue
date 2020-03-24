<template>
  <v-data-table :headers="headers" :items="PSRmembers"  class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cписок спасательных работ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- Card psr -->
        <v-dialog v-model="CardPSR" :fullscreen="true">
          <CardPSR v-on:closeCardPSR="closeCardPSR" />
        </v-dialog>

      </v-toolbar>
    </template>

    <template v-slot:item.Status="{ item }">
      <span
        v-bind:class="{ defaultStatus: item.Status, statusIsOpen: !item.Status }"
      >{{ item.Status | statusFilter}}</span>
    </template>

    <template v-slot:item.action>
      <v-icon small class="mr-2" @click="showCardPSR">edit</v-icon>
    </template>

    <template v-slot:no-data-text>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import CardPSR from './CardPSR';

export default {
  
  components:{
    CardPSR
  },
  data: () => ({
    CardPSR: false,
    
    createNewPSR: "Создать новый ПСР",

    headers: [
      { text: "Номер ПСР", value: "id", sortable: false },
      { text: "Населенный пункт", value: "Settlement" },
      { text: "Начало ПСР", value: "StartDate" },
      { text: "Окончание ПСР", value: "EndDate" },
      { text: "Статус", value: "Status" },
      { text: "Действие", value: "action", sortable: false }
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
    initialize() {
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
      ];
    },
    showCardPSR: function(){
      this.CardPSR = true;
    },
    closeCardPSR: function(){
      this.CardPSR = false;
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