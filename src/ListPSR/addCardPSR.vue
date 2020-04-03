<template>
  <v-card>
      <!-- <v-dialog v-model="RegistrationList" :fullscreen="true">
          <RegistrationList v-on:closeRegistrationList = "closeRegistrationListHandler"/>
      </v-dialog> -->

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
          <v-text-field v-model="psrData.name"  label="Имя"></v-text-field>
        </v-row>

        <v-row>
          <!-- <v-text-field label="РПСР"></v-text-field> -->
          <!-- <v-select :clearable="true" :items="memberFIO" outlined label="Координатор"></v-select> -->
        </v-row>

        <v-row>
          <!-- <v-text-field  label="Координатор"></v-text-field> -->
          <!-- <v-select :clearable="true" :items="memberFIO" outlined label="Регистратор"></v-select> -->
        </v-row>

        <v-row>
          <v-text-field label="Штаб"></v-text-field>
        </v-row>

        <!-- <v-row>
          <v-textarea label="Первичная информация"></v-textarea>
        </v-row> -->

        <v-row>
          <v-textarea v-model="psrData.comment" label="Основная информация"></v-textarea>
        </v-row>
        <v-row>
          <v-file-input label="Прикрепить ориентировку"></v-file-input>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" dense @click="SaveHandler">Сохранить</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import api from '../api';

export default {
    data: function(){
        return{
            formTitle: 'Создание новой ПСР',
            psrData: {
                comment: '',
                endDate: '',
                name: '',
                psrState: {
                    "id": 0,
                    "name": "string"
                },
                startDate: " "
            }
            
        }
    },
  methods: {
    SaveHandler: function(){
        this.axios.post( api.url.psrList , {
            body: this.psrData
        }).then(function(response){
            console.log(response)
        }).catch(function(e){
            console.log(e);
        })
    },
    close: function() {
      this.$emit("closeCardPSR");
    }

  }
};
</script>