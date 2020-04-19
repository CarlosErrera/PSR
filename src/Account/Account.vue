<template>
    <div id="app" >
  
    <!-- <v-navigation-drawer v-model="drawer" app
      clipped>
      <v-list>
        <v-list-item v-on:click="createGridPSR">

          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Список ПСР</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>

    </v-navigation-drawer> -->
     


    <v-app-bar color="primary"
      app
      clipped-left
    >
      <!-- <v-app-bar-nav-icon dark v-on:click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      
        <v-toolbar color="primary" dark flat>
            <v-toolbar-title >Система управления поисковыми группами</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="exitAppHandler">exit_to_app</v-icon>
        </v-toolbar>

    </v-app-bar>
    

    <v-content app>
      <v-container fluid >
          <ListPSR />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear()}}</span>
    </v-footer>
</div>
</template>>
<script>
import ListPSR from '../ListPSR/ListPSR.vue';
import api from '../api';

export default {
    data: () => ({
    }),
    components:{
      ListPSR
    },
    methods:{
      exitAppHandler: function(){
        this.axios.get(api.url.logout)
        .then(function(){
          this.$router.push("/");
        }.bind(this))
        .catch(function(e){
          console.log(e);
          this.$router.push("/");
        }.bind(this))
      }
    }
}
</script>