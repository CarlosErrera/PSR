<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <span class="headline">Новый Участник</span>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue" dark @click="closeRegistrationList">Назад</v-btn> -->
          <v-icon @click="close">close</v-icon>
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-text>

      <v-container>
        <v-row>
          <v-checkbox label="Записать существующего" v-model="memberIsExist" > </v-checkbox>
        </v-row>

        <v-row>
          <!-- <v-text-field label="РПСР"></v-text-field>  -->
          <v-combobox 
            v-if="memberIsExist"
            v-model="memberData.volunteer.fio"
            :value="memberData.volunteer.fio"
            :clearable="true" 
            :disabled="true" 
            outlined 
            label="Имя, Фамилия"></v-combobox>
        </v-row>

        <v-row>
          <v-text-field v-if="!memberIsExist" label="Имя, Фамилия" v-model="memberData.volunteer.fio"></v-text-field>
        </v-row>

        <v-row>
          <v-radio-group :row="true" v-if="!memberIsExist" >
            
            <v-radio label="Мужской"></v-radio>
            <v-radio label="Женский"></v-radio>
            
          </v-radio-group>
        </v-row>

        <v-row>
          <v-text-field v-if="!memberIsExist" label="Телеграмм участника" v-model="memberData.volunteer.fio"></v-text-field>
        </v-row>

        <v-row>
          <v-text-field v-if="!memberIsExist"   label="Рейтинг"  ></v-text-field>
        </v-row>


        <v-row>
          <v-text-field v-if="!memberIsExist" label="Телефон" v-model="memberData.volunteer.phone"></v-text-field>
        </v-row>

        <v-row>
          <v-text-field label="Наличие Авто" v-model="memberData.shuttleNum"></v-text-field>
        </v-row>
        
        <v-row>
          <!-- <v-text-field label="РВП" v-model="memberData.startVolunteerTime"></v-text-field> -->
          <v-menu
            ref="rvp"
            v-model="menurvp"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="memberData.startVolunteerTime"
                label="РВП"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="memberData.startVolunteerTime" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menurvp = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.rvp.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-row>

        <v-row>
          <!-- <v-text-field label="РВО" v-model="memberData.endVolunteerTime"></v-text-field> -->
          <v-menu
            ref="rvo"
            v-model="menurvo"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="memberData.endVolunteerTime"
                label="РВО"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="memberData.endVolunteerTime" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menurvo = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.rvo.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-row>
        <v-row>
          <v-text-field label="Примечание"></v-text-field>
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
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn color="blue" dense dark @click="saveHandler">Записать</v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script>
import api from '../api';

export default {
  data: function(){
    return {
      date: new Date().toISOString().substr(0, 10),
      menurvp: false,  
      menurvo: false,
      dialog: false,
      memberIsExist: true,
      memberData: {},
      emptyObj: {} 
    }
  },

  created: function(){

    this.memberData =  {
        departureAddress: "",
        endVolunteerTime: "",
        psr: {
          comment: "",
          endDate: "",
          name: "",
          psrState: {
            id: 0,
            name: ""
          },
          startDate: ""
        },
        shuttleNum: "",
        startVolunteerTime: "",
        volunteer: {
          fio: "",
          login: "",
          phone: "",
          sex: true
        },
        volunteerStatus: {
          name: ""
        }
      }
  },
  methods:{
    saveHandler: function(){
      this.dialog = true;
      this.axios.post(api.url.psrRegistrationList, this.memberData)
      .then(function(response){

          setTimeout(function(){
            this.dialog = false;
          }.bind(this),1000)

          console.log(response)
      }.bind(this))
      .catch(function(err){

        setTimeout(function(){
          this.dialog = false;
        }.bind(this),1000)

        console.log(err);
      }.bind(this))
    },
    close: function(){
      this.$emit('close')
    }
  }
};
</script>