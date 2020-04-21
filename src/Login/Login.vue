<template>
  <v-container class="fill-height">
    <!-- <v-app-bar color="primary" app clipped-left>

          
          
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title >Система управления поисковыми группами</v-toolbar-title>
            </v-toolbar>

    </v-app-bar>-->
    <!-- <v-row align="flex-end" justify="center">
          <v-col cols="12"  sm="8" md="4" lg="4" >
            <v-card >
              <v-card-title  >Система управления поисковыми группами</v-card-title>
            </v-card>
          </v-col>
    </v-row>-->

    <!-- loading -->
        <v-dialog
          v-model="wait"
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

    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4">
        <!-- <v-banner single-line sticky> Система управления поисковыми группами </v-banner> -->

        <v-card class="elevation-12">
          <!-- <v-card-title  color="primary"> Система управления поисковыми группами </v-card-title> -->

          <v-toolbar color="primary" dark flat>
            <v-toolbar-title dense>Вход в систему</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <!-- <v-toolbar-title >Система управления поисковыми группами</v-toolbar-title> -->
          <!-- <v-banner app  color="primary" dark > Система управления поисковыми группами </v-banner> -->

          <v-card-text>
            <v-form > 
              <!-- <v-text-field label="Логин" name="login" v-model="username" type="text" /> -->
              <v-text-field label="Логин" name="login" v-model="username" :value="username" type="text" :rules="[rules.validationUsername]"  />

              <v-text-field label="Пароль" name="password" v-model="password" :value="password"  type="password" :rules="[rules.validationPassword]"/>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn  color="primary"  @click="doLogin" :disabled="disBtn ">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../api';

export default {
  name: "LoginForm",

  data: function() {
    return {
      rules: {     
        validationUsername: function(val){
          if (val){
            if (val.length > 50 ){
              return 'Логин не должен превышать больше 50 символов' 
            }
            if (val.length == 0){
              return 'Логин не должен быть пустым!'
            }
          }
          else{
              return 'Логин не должен быть пустым!'
          }

          return true;

        },

        validationPassword: function(val){
          if (val){
            if (val.length == 0){
              return 'Пароль не должен быть пустым!'
            }
            if (val.length > 50){
              return 'Пароль не должен превышать больше 50 символов!' 
            }
          }
          else{
            return 'Логин не должен быть пустым!'
          }

          return true;
          
        }
      },
      username: null,
      password: null,
      wait: false
    };
  },
  computed: {
    disBtn: function(){
      return this.username && this.password ? false : true; 
    }
  },
  methods: {

    doLogin: function() {
      if (this.username && this.password ){
        this.wait = true;
        
        this.axios.post(api.url.login, {
          login: this.username,
          password: this.password
        })
        .then(function(res){
          console.log(res);
         
          this.$router.push("account");
          this.wait = false;
          

        }.bind(this))
        .catch(function(e){
          this.wait = false;

          console.log(e);
        }.bind(this))
      }

    }
  }
};
</script>