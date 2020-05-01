import api from '../api';

export default {
    props:['ListPsrId'],
  data: function(){
    return {
      date: new Date().toISOString().substr(0, 10),

      menurvp: false,  
      menurvo: false,
      psrId:  this.ListPsrId,

      rvpTime: '',
      rvpDate: '',
      rvpTimeModal: false,
      
      rvoTime: '',
      rvoDate: '',
      rvoTimeModal: false,
      
      dialog: false,
      memberIsExist: true,

      classificationList :[],
      volunteerList: [],

      success_snackbar: false,
      error_snackbar: false,
      errorMsg: "",

      memberData: {
        shuttleNum: "",
        psr:{
            id: null
        },
        volunteerStatus:{
            id:null
        },
        volunteer: {
          comment: "",
          fio: "",
          login: "",
          phone: "",
          sex: null,
          classification:{
            id: null,
            name: null
          }
        },

      },
    }
  },
  created: function(){
    this.getClassificationList();
    this.getVolunteerList();
  },
  watch:{
    memberIsExist: function(){

      this.memberData = {
        psr:{
          id:null
        },
        volunteerStatus:{
          id:null
        },
        shuttleNum: "",
        volunteer: {

          fio: "",
          login: "",
          phone: "",
          sex: null,
          classification:{
            id: null,
            name: null
          }
        },
      };
    }
  },

  methods:{
    getClassificationList : function(){
      this.axios.get(api.url.psrClassficationList)
      .then(function(res){
        
        this.classificationList = res.data;

      }.bind(this))
      .catch(function(err){
        console.log(err);
      }.bind(this))
    },
    getVolunteerList: function(){
        this.axios.get(api.url.psrVolunteer)
        .then(function(res){
          
          this.volunteerList = res.data;
  
        }.bind(this))
        .catch(function(err){
          console.log(err);
        }.bind(this)) 
    },
    saveHandler: function(){
      this.dialog = true;
      this.memberData.startVolunteerTime = this.rvpDate + ' ' + this.rvpTime + ':00';
      this.memberData.endVolunteerTime = this.rvoDate + ' ' + this.rvoTime + ':00';
      this.memberData.psr.id = this.psrId;
      this.memberData.volunteerStatus.id = 1

      // if (!this.memberIsExist){
      //   this.memberData.volunteer.id = 5
      // }

      // if (this.memberIsExist){
      //   this.memberData.classification = this.classification;
      // }

      this.axios.post(api.url.psrRegistrationList,this.memberData) 
      .then(function(){

          this.success_snackbar = true;
          this.dialog = false;
          setTimeout(function(){
            this.close();
          }.bind(this),2000)
          
      }.bind(this))
      .catch(function(err){

        this.error_snackbar = true;
        this.dialog = false;
        this.errorMsg = err;
        

        console.log(err);
      }.bind(this))
    },
    close: function(){
      this.$emit('close')
    }
  }
};