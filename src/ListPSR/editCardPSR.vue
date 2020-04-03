<template>
  <v-card>
    <!-- <v-dialog v-model="RegistrationList" :fullscreen="true">
          <RegistrationList v-on:closeRegistrationList = "closeRegistrationListHandler"/>
    </v-dialog>-->

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
          <v-text-field label="Имя">{{cardData.name}}</v-text-field>
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

    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" dense @click="showRegistrationList">Лист Регистрации</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>-->
  </v-card>
</template>
<script>
import api from '../api';
export default {
  props: ["cardProps"],
  /*
    "id": 1,
    "psr": {
      "id": 1,
      "name": "г. Казань, Иванов Иван Иванович, ул. Чуйкова, 1965 г.р.",
      "startDate": "2020-03-01",
      "endDate": "2020-03-02",
      "psrState": {
        "id": 2,
        "name": "Идет поиск"
      },
      "comment": "Найден Жив"
    },
    "station": "г. Казань, ул. Чуйкова, 54а (Стоянка) [55.835608, 49.141352]",
    "psrLeader": {
      "login": "artem",
      "fio": "Артем Латышев",
      "id": 1
    },
    "psrRegisteredUser": {
      "login": "albina",
      "fio": "Альбина Гараева",
      "id": 2
    },
    "objectInfo": "Пропал М/82, в 8:00, заявка 112, г. Казань, ул. Чуйкова",
    "content": "Инфомрация по второму дню поиска",
    "photo": null
    
    */

  data: function() {
    return {
      cardData: this.cardProps,
      formTitle: "Карточка ПСР",
      psrStateList: []
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      console.log(this.cardData);
    },
    loadPsrStateList: function() {
      this.$http
        .get(api.url.psrStateList)
        .then(
          function(response) {
            // this.psrStateList =  this.psrStateList.concat(response.data);
            this.psrStateList = response.data.map(function(state) {
              return {
                text: state.name,
                value: state.id
              };
            });
          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    close: function() {
      this.$emit("closeCardPSR");
    }
  }
};
</script>