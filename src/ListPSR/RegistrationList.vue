<template>
  <v-card>
    <v-dialog v-model="addMemberForm" max-width="700">
      <addMemberForm/>
    </v-dialog>
    <v-card-title>
      <v-container>
        <v-row>
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue" dark @click="closeRegistrationList">Назад</v-btn> -->
          <v-icon @click="closeRegistrationList">close</v-icon>
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-subtitle>
      <v-container>
        <v-row>
          <span>Доступные ресурсы</span>
        </v-row>
      </v-container>
    </v-card-subtitle>

    <v-card-text>
        
        <v-row>
          <v-col class="d-flex" align-self="start" sm="9" md="5" cols="12" xs="12">
            <v-btn color="blue" dense dark @click="showMemberForm" >Записать участника</v-btn>
            <v-spacer></v-spacer>
            <v-select 
                dense
                outlined
                label="Изменить статус"  
                :items="statusStore">
            </v-select>
          </v-col>
        </v-row>
      
        <v-spacer></v-spacer>
        
        <v-data-table dense
          :headers="headers" 
          :items="members" 
          :mobile-breakpoint="100"
          :disable-filtering="true"
          :disable-sort="true"
          :show-select="true"
          :hide-default-footer="true"
          :disable-pagination="true"></v-data-table>
         
    </v-card-text>
  </v-card>


</template>
<script>
import addMemberForm from './addMemberForm';

export default {
  components:{
    addMemberForm
  },
  data: function() {
    return {
      formTitle: "Лист Регистрации",
      members: [],
      addMemberForm: false,
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
        { text: "Участник", value: "member", sortable: false },
        { text: "Статус", value: "status", sortable: false },
        { text: "А", value: "a", sortable: false },
        { text: "К", value: "k", sortable: false },
        { text: "РВП", value: "rvp", sortable: false },
        { text: "РВО", value: "rvo", sortable: false },
        { text: "Эк", value: "ek", sortable: false },
      ]
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize: function() {
      this.members = [
        {
          id: 1208,
          member: "Lorem ipsun ",
          status: "Прибыл",
          a: "A",
          k: "1",
          ek: "4",
          rvp: "19:00",
          rvo: "00:01"
        },
        {
          id: 1210,
          member: "Lorem ipsun ",
          status: "Прибыл",
          a: "A",
          k: "1",
          ek: "2",
          rvp: "19:00",
          rvo: "00:01"
        },
        {
          id: 1209,
          member: "Lorem ipsun ",
          status: "Прибыл",
          a: "A",
          k: "2",
          ek: "1",
          rvp: "19:00",
          rvo: "00:01"
        }
      ];
    },
    closeRegistrationList: function() {
      this.$emit("closeRegistrationList");
    },
    showMemberForm: function(){
        this.addMemberForm = true;
    },
    closeMemberForm: function(){
        this.addMemberForm = false;
    }

  }
};
</script>