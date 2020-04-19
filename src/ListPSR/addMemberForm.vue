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
          <v-radio-group :row="true" v-if="!memberIsExist" v-model="memberData.volunteer.sex"  >
            
            <v-radio label="Мужской" :value="true"></v-radio>
            <v-radio label="Женский" :value="false"></v-radio>
            
          </v-radio-group>
        </v-row>

        <v-row>
          <v-text-field v-if="!memberIsExist" label="Телеграмм участника" v-model="memberData.volunteer.login"></v-text-field>
        </v-row>

        <v-row>
          <!-- <v-text-field v-if="!memberIsExist"   label="Рейтинг"  ></v-text-field> -->
          <v-combobox 
            v-if="memberIsExist"
            :items="classificationList"
            item-text="name"
            item-value="id"
            v-model="classification"
            
            :clearable="true" 
            
            outlined 
             label="Рейтинг"></v-combobox>
        </v-row>


        <v-row>
          <v-text-field v-if="!memberIsExist" label="Телефон" v-model="memberData.volunteer.phone"></v-text-field>
        </v-row>

        <v-row>
          <v-text-field label="Наличие Авто" v-model="memberData.shuttleNum"></v-text-field>
        </v-row>
        
        <v-row>
          <v-menu
            ref="rvp"
            v-model="menurvp"
            :close-on-content-click="false"
            :return-value.sync="rvpDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="rvpDate"
                label="РВП"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="rvpDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menurvp = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.rvp.save(rvpDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <!-- время РВП -->
          <v-dialog
            ref="dialog"
            v-model="rvpTimeModal"
            :return-value.sync="rvpTime"
            persistent
            width="290px"
          >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="rvpTime"
              label="Выбрать время"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            format="24hr"
            v-if="rvpTimeModal"
            v-model="rvpTime"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="rvpTimeModal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(rvpTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
          
        </v-row>

        <v-row>
          <!-- <v-text-field label="РВО" v-model="memberData.endVolunteerTime"></v-text-field> -->
          <v-menu
            ref="rvo"
            v-model="menurvo"
            :close-on-content-click="false"
            :return-value.sync="rvoDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="rvoDate"
                label="РВО"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="rvoDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menurvo = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.rvo.save(rvoDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-dialog
            ref="rvoTimedialog"
            v-model="rvoTimeModal"
            :return-value.sync="rvoTime"
            persistent
            width="290px"
          >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="rvoTime"
              label="Выбрать время"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            format="24hr"
            v-if="rvoTimeModal"
            v-model="rvoTime"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="rvoTimeModal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.rvoTimedialog.save(rvoTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
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

      rvpTime: '',
      rvpDate: '',
      rvpTimeModal: false,
      
      rvoTime: '',
      rvoDate: '',
      rvoTimeModal: false,
      
      dialog: false,
      memberIsExist: true,

      classificationList :[],
      classification: {
        id: null,
        name: null
      },

      memberData: {
        // departureAddress: "" ,
        // endVolunteerTime: "",
        // psr: {
        //   comment: "",
        //   endDate: "",
        //   name: "",
        //   psrState: {
        //     id: '',
        //     name: ""
        //   },
        //   startDate: ""
        // },
        shuttleNum: "",

        // startVolunteerTime: '' ,
        volunteer: {
          // classification: {
          //   id: null,
          //   name: null
          // },
          fio: "",
          login: "",
          phone: "",
          sex: null
        },
        // volunteerStatus: {
        //   name: ""
        // }
      },
    }
  },
  created: function(){
    this.getClassificationList();
  },
  watch:{
    memberIsExist: function(){
      
      this.memberData = {
        shuttleNum: "",
        volunteer: {

          fio: "",
          login: "",
          phone: "",
          sex: null
        },
      };
      this.classification = {
        id: null,
        name: null
      };
    }
  },

  methods:{
    getClassificationList : function(){
      this.axios.get(api.url.psrClassficationList)
      .then(function(res){
        
        this.classificationList = res.data;

      }.bind(this))
      .catch(function(err){
        console.log(err);
      }.bind(this))
    },
    saveHandler: function(){
      this.dialog = true;
      this.memberData.startVolunteerTime = this.rvpDate + ' ' + this.rvpTime + ':00';
      this.memberData.endVolunteerTime = this.rvoDate + ' ' + this.rvoTime + ':00';
      if (this.memberIsExist){
        this.memberData.classification = this.classification;
      }

      this.axios.post(api.url.psrRegistrationList,this.memberData) 
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