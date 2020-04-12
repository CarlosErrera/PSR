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
          <span>{{ cardData.psr.startDate }}</span>
          <!-- <span>{{ new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() }}</span> -->
        </v-row>
      </v-container>
    </v-card-subtitle>

    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field label="Имя" v-model="cardData.psr.name" :value="cardData.psr.name"></v-text-field>
        </v-row>

        <v-row>
          <!-- <v-text-field label="РПСР"></v-text-field>  -->
          <v-combobox 
            v-model="cardData.psrLeader.fio"
            :value="cardData.psrLeader.login"
            :clearable="true" 
            item-value="login"
            item-text="fio"
            :items="psrLeaderList" 
            outlined 
            label="Координатор"></v-combobox>
        </v-row>

        <v-row>
          <!-- <v-text-field  label="Координатор"></v-text-field> -->
          <!-- <v-select :clearable="true" :items="memberFIO" outlined label="Регистратор"></v-select> -->
        </v-row>

        <v-row>
          <v-text-field label="Штаб" v-model="cardData.station" :value="cardData.station" ></v-text-field>
        </v-row>

        <v-row>
          <v-textarea label="Первичная информация" v-model="cardData.content" :value="cardData.content"></v-textarea>
        </v-row>

        <v-row>
          <v-textarea label="Основная информация" v-model="cardData.objectInfo"  :value="cardData.objectInfo"></v-textarea>
        </v-row>
        
        <v-row>
          <!-- <v-select label="Статус" v-model="cardData.psr.psrState" :value="cardData.psr.psrState" :items="psrStateList"></v-select> -->
          <v-combobox label="Статус"  
            v-model="cardData.psr.psrState" 
            item-text="name"
            item-value="id"
            :value="cardData.psr.psrState.id"  
            :items="psrStateList"></v-combobox>
        </v-row>

        <v-row>
          <v-file-input label="Прикрепить ориентировку"></v-file-input>
        </v-row>
      </v-container>
    </v-card-text>
    <!-- loading -->
        <v-dialog
          v-model="dialog"
          hide-overlay
          persistent
          width="300"
        >
          <v-card
            color="primary"
            dark>
            <v-card-text>
              Пожалуйста, подождите...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
    <!-- /loading -->

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" dense @click="Save">Сохранить</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
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
      cardData:this.cardProps,
      dialog: false,
      formTitle: "Карточка ПСР",
      psrStateList: [],
      psrLeaderList: [],
    };
  },
  created: function() {
    this.init();
    this.loadPsrStateList();
    this.loadPsrLeaderList();
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
            this.psrStateList = response.data;
            /*
            this.psrStateList = response.data.map(function(state) {
              return {
                text: state.name,
                value: state.id
              };
            });
            */
          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    loadPsrLeaderList: function(){
      this.$http
        .get(api.url.psrLeaderList)
        .then(
          function(response) {
            // this.psrStateList =  this.psrStateList.concat(response.data);
            this.psrLeaderList = response.data;
            /*
            this.psrLeaderList = response.data.map(function(user){
              return {
                text: user.fio,
                value: user.id,
              }
            })
            */
          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    Save: function(){
      // var obj = Object.create(this.cardData);
      
      // var obj1 = Object.create(obj);

      // obj.psr.psrState = {
      //   id : obj1.psr.psrState.value,
      //   name: obj1.psr.psrState.text,
      // };

      // obj.psrLeader = {
      //   id : obj1.psrLeader.value,
      //   fio: obj1.psrLeader.text,
      // }

      this.dialog = true;

      this.$http
        .put(api.url.psrDataList,{
          id: this.cardData.id,
          dto: this.cardData
        })
        .then(
          function(response) {

            setTimeout(function(){
              this.dialog = false;
            }.bind(this),1000)

            console.log(response);
          }.bind(this)
        )
        .catch(function(err) {

            setTimeout(function(){
              this.dialog = false;
            }.bind(this),1000)

          console.log(err);
        }.bind(this));      
    },
    close: function() {
      this.$emit("closeCardPSR");
    }
  }
};
</script>