<template>
  <div>
        <!-- addCardPSR -->
        <v-dialog v-model="addCardPSR_isVisible" :fullscreen="true">
          <addCardPSR v-if="addCardPSR_isVisible" v-on:closeCardPSR="addCardPSRHandler" />
        </v-dialog>

        <!-- editCardPSR-->
        <v-dialog v-model="editCardPSR_isVisible" :fullscreen="true">
          <editCardPSR v-if="editCardPSR_isVisible" v-bind:cardProps="cardProps" v-on:closeCardPSR="editCardPSRHandler" />
        </v-dialog>

        <!-- Registration list  -->
        <v-dialog v-model="RegistrationList_isVisible" :fullscreen="true" >
          <RegistrationList v-if="RegistrationList_isVisible" v-on:closeRegistrationList="RegistrationListHandler"></RegistrationList>
        </v-dialog>
  
  <v-data-table :headers="headers" :items="psrMembers"  class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cписок спасательных работ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="addCardPSRHandler">Создать новый ПСР</v-btn>



      </v-toolbar>
    </template>

    <template v-slot:item.id="{ item }">
      <span> {{ item.psr.id }}</span>
    </template>

    <template v-slot:item.name="{ item }">
      <span> {{item.psr.name}}</span>
    </template>

    <template v-slot:item.startDate="{ item }">
      <span> {{item.psr.startDate}}</span>
    </template>

    <template v-slot:item.endDate="{ item }">
      <span> {{item.psr.endDate }}</span>
    </template>

    <template v-slot:item.psrState="{ item }">
      <span> {{item.psr.psrState.name }}</span>
    </template>

    <template v-slot:item.cardPSR="{item}">
      <v-btn color="primary" rounded small @click="editCardPSRHandler(item)">Открыть</v-btn>
    </template>

    <template v-slot:item.registrList>
      <v-btn color="orange" rounded small @click="RegistrationListHandler">Открыть</v-btn>
    </template>

    <template v-slot:no-data-text>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>
<script src="./ListPSRController.js">

</script>
<style scoped>
.statusIsOpen {
  color: red;
}
.defaultStatus {
  color: limegreen;
}
</style>