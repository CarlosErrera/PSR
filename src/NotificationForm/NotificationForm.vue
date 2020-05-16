<template>
    <div>
        <br/>
        <br/>
        <hr>
        <v-row>
            <v-col class="d-flex" sm="6" md="5" cols="12" xs="12">
                <v-data-table dense
                    :headers="headers" 
                    :items="volunteers" 
                    :mobile-breakpoint="100"
                    :disable-filtering="true"
                    :disable-sort="true"
                    :show-select="true"
                    :hide-default-footer="true"
                    
                    v-on:input = "ItemSelectedHandler"
                    :disable-pagination="true">
                <template v-slot:item.classification="{ item }">
                <span>{{ item.classification.name  }}</span>
                </template> 

                </v-data-table>
            </v-col>
            <v-col class="d-flex" sm="6" md="7" cols="12" xs="12">
                <div style="width:100%;">
                <v-textarea
                    label="Текст оповещения"
                    v-model="message"
                    :value="message"
                ></v-textarea>
                <v-btn color="blue" dense dark @click="sendNotification" >
                    Отправить оповещение
                </v-btn>

                </div>
                
                
            </v-col>

        </v-row>
        <v-snackbar
        :color="'success'"
        :timeout="2000"
        :top="true"
        v-model="success_snackbar"
        >{{ "Отправлено"}}</v-snackbar>

        <v-snackbar
        :color="'pink darken-1'"
        :timeout="2000"
        :top="true"
        :multi-line="true"
        v-model="error_snackbar"
        >
        {{ "Ошибка отправки !"}}
        {{ errorMsg }}
        </v-snackbar>
    </div>
   


            <!-- <v-col>
                <v-textarea
                    label="Текст оповещения"
                    v-model="message"
                    :value="message"
                ></v-textarea>
                <v-spacer></v-spacer>
                <v-btn color="blue" 
                  dense dark 
                  @click="sendNotification" >Отправить оповещение</v-btn>
            </v-col> -->
       
</template>
<script src="./NotificationFormController">
</script>