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
            v-model="memberData.volunteer"
            :value="memberData.volunteer.fio"
            :items="volunteerList"
            item-text="fio"
            item-value="id"
            :clearable="true" 
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
            
            :items="classificationList"
            item-text="name"
            item-value="id"
            v-model="memberData.volunteer.classification"
            
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
          <v-text-field v-model="memberData.volunteer.comment" label="Примечание"></v-text-field>
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
<script src="./addMemberFormController.js"></script>