<template>
  <v-card>
    <!-- <v-dialog v-model="RegistrationList" :fullscreen="true">
          <RegistrationList v-on:closeRegistrationList = "closeRegistrationListHandler"/>
    </v-dialog>-->
    <v-snackbar
      :color="'success'"
      :timeout="2000"
      :top="true"
      v-model="success_snackbar"
    >{{ "Сохранено"}}</v-snackbar>

    <v-snackbar
      :color="'pink darken-1'"
      :timeout="2000"
      :top="true"
      :multi-line="true"
      v-model="error_snackbar"
    >
      {{ "Ошибка сохранения !"}}
      {{ errorMsg }}
    </v-snackbar>

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
          <span>{{ cardData.psr.startDate=new Date().toISOString().substr(0,10)}}</span>
          <!-- <span>{{ cardData.psr.startDate=new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() }}</span> -->
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
            label="Координатор"
          ></v-combobox>
        </v-row>

        <v-row>
          <v-combobox
            v-model="cardData.psrRegisteredUser"
            :clearable="true"
            item-text="fio"
            item-value="login"
            :items="psrLeaderList"
            outlined
            label="Регистратор"
          ></v-combobox>

          <!-- <v-text-field
            label="Регистратор"
            :disabled="true"
            outlined
            :value="cardData.psrRegisteredUser.fio "
          ></v-text-field> -->
          <!-- <v-select :clearable="true" :items="memberFIO" outlined label="Регистратор"></v-select> -->
        </v-row>

        <v-row>
          <!-- <v-text-field  label="Координатор"></v-text-field> -->
          <!-- <v-select :clearable="true" :items="memberFIO" outlined label="Регистратор"></v-select> -->
        </v-row>

        <v-row>
          <v-text-field label="Штаб" v-model="cardData.station" :value="cardData.station"></v-text-field>
        </v-row>

        <v-row>
          <v-textarea
            label="Первичная информация"
            v-model="cardData.content"
            :value="cardData.content"
          ></v-textarea>
        </v-row>

        <v-row>
          <v-textarea
            label="Основная информация"
            v-model="cardData.objectInfo"
            :value="cardData.objectInfo"
          ></v-textarea>
        </v-row>

        <v-row>
          <!-- <v-select label="Статус" v-model="cardData.psr.psrState" :value="cardData.psr.psrState" :items="psrStateList"></v-select> -->
          <v-combobox
            label="Статус"
            item-text="name"
            item-value="id"
            v-model="cardData.psr.psrState"
            :value="cardData.psr.psrState.id"
            :items="psrStateList"
          ></v-combobox>
        </v-row>

        <v-row>
          <v-file-input label="Прикрепить ориентировку"></v-file-input>
        </v-row>
      </v-container>
    </v-card-text>
    <!-- loading -->
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Пожалуйста, подождите...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
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
<script src="./addCardPSRController.js">
</script>