<template>
  <v-card>
      <v-dialog v-model="RegistrationList" :fullscreen="true">
          <RegistrationList v-on:closeRegistrationList = "closeRegistrationListHandler"/>
      </v-dialog>

    <v-card-title>
      <v-container>
        <v-row>
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue" dark @click="close">Назад</v-btn> -->
          <v-icon @click="close">close</v-icon>
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-subtitle>
      <v-container>
        <v-row>
          <span>{{ new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() }}</span>
        </v-row>
      </v-container>
    </v-card-subtitle>

    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field disabled readonly label="Иванов И.И г.Казань ул.Чуйкова 98 от 25.02.2020"></v-text-field>
        </v-row>

        <v-row>
          <!-- <v-text-field label="РПСР"></v-text-field> -->
          <v-select :clearable="true" :items="memberFIO" outlined label="Координатор"></v-select>
        </v-row>

        <v-row>
          <!-- <v-text-field  label="Координатор"></v-text-field> -->
          <v-select :clearable="true" :items="memberFIO" outlined label="Регистратор"></v-select>
        </v-row>

        <v-row>
          <v-text-field label="Штаб"></v-text-field>
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

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" dense @click="showRegistrationList">Лист Регистрации</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import RegistrationList from './RegistrationList';

export default {
    components:{
        RegistrationList
    },
    data: function(){
        return{
            formTitle: 'Карточка ПСР',
            RegistrationList: false
        }
    },
  methods: {
    close: function() {
      this.$emit("closeCardPSR");
    },
    showRegistrationList: function(){
        this.RegistrationList = true;
    },
    closeRegistrationListHandler: function(){
        this.RegistrationList = false;
    }

  }
};
</script>