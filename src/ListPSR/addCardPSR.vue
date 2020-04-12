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
          <span>{{ cardData.psr.startDate=new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() }}</span>
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
            v-model="cardData.psrLeader" 
            :clearable="true" 
            item-text="fio"
            item-value="login"
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
            item-text="name"
            item-value="id" 
            v-model="cardData.psr.psrState" 
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
            psrStateList: [],
            psrLeaderList: [],
            dialog:false,

            formTitle: 'Создание новой ПСР',
            cardData: {
              id: '',
              psr: {
                id: '',
                name: "",
                startDate: "",
                endDate: "",
                psrState: {
                  id: '',
                  name: ""
                },
                comment: ""
              },
              station: "",
              psrLeader: {
                "login": "artem",
                fio: "",
                password: ''
              },
              psrRegisteredUser: {
                "login": "albina",
                "fio": "Альбина Гараева",
                "id": 2
              },
              objectInfo: "",
              content: "",
              photo: ''
            }
            
        }
    },
  created: function(){
      this.loadPsrStateList();
      this.loadPsrLeaderList()
  },
  methods: {
    init: function(){

    },
    SaveHandler: function(){
        this.dialog = true;

        this.axios.post( api.url.psrDataList , 
         this.cardData)
        .then(function(response){
          setTimeout(function(){
            this.dialog = false;
          }.bind(this),1000)
          console.log(response)

        }.bind(this))
        .catch(function(e){

          setTimeout(function(){
            this.dialog = false;
          }.bind(this),1000)
          console.log(e);

        }.bind(this))
    },
    loadPsrStateList: function() {
      this.$http
        .get(api.url.psrStateList)
        .then(
          function(response) {
            // this.psrStateList =  this.psrStateList.concat(response.data);
            this.psrStateList = response.data
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
            // this.psrLeaderList = response.data.map(function(user){
            //   return {
            //     text: user.fio,
            //     value: user.id,
            //   }
            // })
            this.psrLeaderList = response.data
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