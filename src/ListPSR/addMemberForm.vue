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
          <v-text-field label="Имя, Фамилия"></v-text-field>
        </v-row>

        <v-row>
          <v-text-field label="Телефон"></v-text-field>
        </v-row>

        <v-row>
          <v-text-field label="Наличие Авто"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Рейтинг"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="РВП"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="РВО"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="Примечание"></v-text-field>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn color="blue" dense dark>Записать</v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  methods:{
    close: function(){
      this.$emit('close')
    }
  }
};
</script>