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

    <v-card-actions>  
      <v-container>
        <v-row>
        <v-btn color="blue" dense dark @click="showMemberForm">Записать участника</v-btn>
        </v-row>
      </v-container>
      
    </v-card-actions>

    <v-card-text>
      <v-container>
        <v-data-table :headers="headers" :items="members" :disable-pagination="true"></v-data-table>
      </v-container>
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

      headers: [
        { text: "пп", value: "id", sortable: false },
        { text: "Участник", value: "member", sortable: false },
        { text: "Статус", value: "status", sortable: false },
        { text: "А", value: "transport", sortable: false },
        { text: "К", value: "k", sortable: false },
        { text: "Эк", value: "ek", sortable: false },
        { text: "РВП", value: "rvp", sortable: false },
        { text: "РВО", value: "rvo", sortable: false }
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
          member: "Lorem ipsun qweqfawd",
          status: "18.09.2020",
          transport: "26.09.2022",
          k: true,
          ek: true,
          rvp: true,
          rvo: true
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