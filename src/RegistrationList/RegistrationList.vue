<template>
  <v-card>
    <v-dialog v-model="isActiveAddMemberForm" max-width="700">
      <addMemberForm v-bind:ListPsrId="members[0].psr.id" v-if="isActiveAddMemberForm" v-on:close="closeMemberForm"/>
    </v-dialog>
    <v-card-title>

      <span class="headline">Лист Регистрации</span>
      <v-spacer></v-spacer>
      <!-- <v-btn color="blue" dark @click="closeRegistrationList">Назад</v-btn> -->
      <v-icon @click="closeRegistrationList">close</v-icon>

    </v-card-title>

    <v-card-subtitle>
      <span>Доступные ресурсы</span>
    </v-card-subtitle>

    <v-card-text>
        
        <v-row>
          <!-- <v-col class="d-flex" align-self="start" sm="9" md="5" cols="12" xs="12"> -->
          <v-col class="d-flex" sm="9" md="5" cols="12" xs="12">
            <v-btn color="blue" dense dark @click="showMemberForm" >Записать участника</v-btn>
            <v-spacer></v-spacer>
            <v-select 
                dense
                outlined
                item-text="name"
                item-value="id"
                :disabled="stateDisable"
                label="Изменить статус"  
                v-on:change="changeVolunteerStatus"
                :items="statusStore">
            </v-select>
            <v-spacer></v-spacer>

          </v-col>
        </v-row>
      
        <v-spacer></v-spacer>
        
        <v-row>
  
        <v-data-table dense
          :headers="headers" 
          :items="members" 
          :mobile-breakpoint="100"
          :disable-filtering="true"
          :disable-sort="true"
          :show-select="true"
          :hide-default-footer="true"
          
          v-on:input = "ItemSelectedHandler"
          :disable-pagination="true">

        <template v-slot:item.id="{ item }">
          <span>{{ item.volunteer.id}}</span>
        </template>  

        <template v-slot:item.fio="{ item }">
          <span>{{ item.volunteer.fio}}</span>
        </template>  

        <template v-slot:item.volunteerStatus="{ item }">
          <span>{{ item.volunteerStatus.name}}</span>
        </template> 

        <!-- <template v-slot:item.shuttleNum="{ item }">
          <span>{{ item.shuttleNum}}</span>
        </template>   -->

        <template v-slot:item.classification="{ item }">
          <span>{{ item.volunteer.classification.name }}</span>
        </template>  

        <template v-slot:item.startVolunteerTime="{ item }">
          <span>{{ item.startVolunteerTime}}</span>
        </template>  

        <template v-slot:item.endVolunteerTime="{ item }">
          <span>{{ item.endVolunteerTime }}</span>
        </template>  

        <template v-slot:item.shuttleNum="{ item }">
          <span>{{ item.shuttleNum }}</span>
        </template> 
        
        <!-- <template v-slot:item.data-table-select="{ item }">

        </template> -->

        </v-data-table>
        </v-row>
        
    </v-card-text>
  </v-card>


</template>
<script src="./RegistrationListController.js"></script>