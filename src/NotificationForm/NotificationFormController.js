import api from '../api';

export default {
    props:['psrId'],

    data: function(){
        return {
            volunteers:[],
            selectedIds: [],
            success_snackbar: false,
            error_snackbar: false,
            errorMsg: '',
            message: '',
            sendBtn: true,
            regPsrCheckbox: false,
            psrID: this.psrId,
            headers:[
                // { text: "пп", value: "id", sortable: false },
                { text: "Участник", value: "fio", sortable: false },
                { text: "Номер Телефона", value: "phone", sortable: false },
                { text: "Опыт", value: "classification", sortable: false }, 
                // { text: 'Телеграмм', value: 'chatId', sortable:false}
            ]
        }
    },
    created: function(){
        console.log('created');
        this.loadPsrVolunteer();

        if ( localStorage.getItem('autoUpdate') ){
            setInterval(function(){
                this.volunteers = [];
                this.loadPsrVolunteer();
    
            }.bind(this), 5000)
        }
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
            if ( this.message && this.selectedIds.length>0 ){
                var psrId = this.psrID;

                var params  = this.regPsrCheckbox ? {
                    ids: this.selectedIds,
                    message:this.message,
                    reply_markup: [
                        {
                            text:"Да",
                            callback_data: "reg_psr_yes_"+psrId
                        },
                        {
                            text:"Нет",
                            callback_data: "reg_psr_no"
                        }
                    ]
                }: {
                    ids: this.selectedIds,
                    message:this.message
                };
                
                this.axios.post(api.url.notification, params )
                .then(function(){
                    this.init();
                    this.success_snackbar = true;
            
                }.bind(this))
                .catch(function(e){
                    console.log(e);
                    this.error_snackbar = true;
                    this.errorMsg = e.message;
    
                }.bind(this))

            }
        },
        ItemSelectedHandler: function(items){
            if (items.length >0){
                this.sendBtn = false
              }
              else{
                this.sendBtn = true
              }
            
            this.selectedIds = items.map(function(item){
                return item.id;
            });
        },
    }
}