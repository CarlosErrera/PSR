import api from '../api';

export default {
    data: function(){
        return {
            volunteers:[],
            selectedIds: [],
            success_snackbar: false,
            error_snackbar: false,
            errorMsg: '',
            message: '',
            headers:[
                // { text: "пп", value: "id", sortable: false },
                { text: "Участник", value: "fio", sortable: false },
                { text: "Опыт", value: "classification", sortable: false }, 
            ]
        }
    },
    created: function(){
        this.loadPsrVolunteer();
    },
    methods:{
        init: function(){
            // this.selectedIds = [];
            this.message = ""
        },
        loadPsrVolunteer: function(){
            this.axios.get(api.url.psrVolunteer)
            .then(function(res){
                this.volunteers = this.volunteers.concat(res.data);
            }.bind(this))
            .catch(function(err){
                console.log(err)
            }.bind(this)) 
        },
        sendNotification: function(item){
            console.log(item);
            console.log(this.selectedIds);
            this.axios.post(api.url.notification, {
              ids: this.selectedIds,
              message:this.message
            })
            .then(function(){
              this.init();
              this.success_snackbar = true;
      
            }.bind(this))
            .catch(function(e){
              console.log(e);
              this.error_snackbar = true;
              this.errorMsg = e.message;

            }.bind(this))
        },
        ItemSelectedHandler: function(items){
            this.selectedIds = items.map(function(item){
                return item.id;
            });
        },
    }
}