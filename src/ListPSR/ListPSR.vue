<template>
  <v-data-table :headers="headers" :items="PSRmembers" sort="Status" class="elevation-1">

    
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cписок спасательных работ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- <v-dialog v-model="dialog" max-width="1000px"> -->
        <v-dialog v-model="dialog" :fullscreen="true">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">{{ createNewPSR }}</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <!-- <v-spacer></v-spacer>
              <span class="headline">{{ formTitle }}</span>
              <v-spacer></v-spacer>
              <span>{{ new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() }}</span>
              <v-spacer></v-spacer> -->
              <v-container>
                <v-row>
                  <span class="headline">{{ formTitle }}</span>
                  <v-spacer></v-spacer>
                  <span>{{ new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() }}</span>   
                </v-row>
              </v-container>
            </v-card-title>

            <v-card-text>
              <v-container>
               
                <v-row>
                  <v-text-field disabled="" readonly label="Иванов И.И г.Казань ул.Чуйкова 98 от 25.02.2020"></v-text-field>
                </v-row>
                
                <v-row>
                  <!-- <v-text-field label="РПСР"></v-text-field> -->
                    <v-select :clearable="true" :items="memberFIO" outlined="" label="Координатор"></v-select>
                </v-row>

                <v-row>
                  <!-- <v-text-field  label="Координатор"></v-text-field> -->
                  <v-select :clearable="true" :items="memberFIO" outlined="" label="Регистратор"></v-select>
                </v-row>
                
                <v-row>
                  <v-text-field  label="Штаб"></v-text-field>
                </v-row>
                
                <v-row>
                  <v-textarea label="Первичная информация"></v-textarea>
                </v-row>
                
                <v-row>
                  <v-textarea label="Основная информация"></v-textarea>
                </v-row>
                <v-row>
                  <v-file-input label="Прикрепить ориентировку"></v-file-input>
                </v-row>
               
              </v-container>
            </v-card-text>

            <!-- <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="Номер ПСР"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Settlement" label="Населеный пункт"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.StartDate" label="Начало ПСР"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.EndDate" label="Окончание ПСР"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Status" label="Статус"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text> -->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
              <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:item.Status="{ item }">
      <span  v-bind:class="{ defaultStatus: item.Status, statusIsOpen: !item.Status }">{{ item.Status | statusFilter}} </span>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
    </template>

    <template v-slot:no-data-text>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    createNewPSR: "Создать новый ПСР",
    headers: [
      { text: "Номер ПСР", value: "id", sortable: false}, 
      { text: "Населенный пункт", value: "Settlement" },
      { text: "Начало ПСР", value: "StartDate" },
      { text: "Окончание ПСР", value: "EndDate" },
      { text: "Статус", value: "Status" },
      { text: "Действие", value: "action", sortable: false }
    ],
    PSRmembers: [],
    memberFIO: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      Settlement: "",
      StartDate: "",
      EndDate: "",
      Status: ""
    },
    defaultItem: {
      id: "",
      Settlement: "",
      StartDate: "",
      EndDate: "",
      Status: ""
    }
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
  filters:{
    statusFilter: function(val){
      if (val){
        return "Завершено"
      }
      else{
        return "Открыт"
      }
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.memberFIO = [
        'Lorem ipsun1',
        'Lorem ipsun2',
        'Lorem ipsun3',
        'Lorem ipsun4',
        'Lorem ipsun5',
        'Lorem ipsun6',
        'Lorem ipsun7',
        'Lorem ipsun9',
      ];
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
        },

        {
          id: 12312,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: true
        },
        {
          id: 5678,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: true
        },
        {
          id: 4573,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: false
        },
        {
          id: 6873,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status:true
        },
        {
          id: 5487,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: true
        },
        {
          id: 9698,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: false
        },
        {
          id: 1229,
          Settlement: "Lorem ipsun qweqfawd",
          StartDate: "18.09.2020",
          EndDate: "26.09.2022",
          Status: false
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.PSRmembers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.PSRmembers.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.PSRmembers.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.PSRmembers[this.editedIndex], this.editedItem);
      } else {
        this.PSRmembers.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style scoped>
  .statusIsOpen{
    color: red;
  }
  .defaultStatus{
    color: limegreen;
  }
</style>