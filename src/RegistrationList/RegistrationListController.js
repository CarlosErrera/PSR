import addMemberForm from '../AddMemberForm/addMemberForm';
import api from '../api';


export default {
  components:{
    addMemberForm
  },
  props:['cardProps'],

  data: function() {
    return {
      
      members: [],
      isActiveAddMemberForm: false,
      selectedIds:[],
      stateDisable: true,
      statusStore:[],
      psrID: this.cardProps,
      
      headers: [
        { text: "пп", value: "id", sortable: false },
        { text: "Участник", value: "fio", sortable: false },
        { text: "Статус", value: "volunteerStatus", sortable: false },
        { text: "А", value: "shuttleNum", sortable: false },
        { text: "К", value: "classification", sortable: false },
        { text: "РВП", value: "startVolunteerTime", sortable: false },
        { text: "РВО", value: "endVolunteerTime", sortable: false },
        { text: "Эк", value: "shuttleNum", sortable: false },
      ]
    };
  },
  created() {
    this.initialize();

  },
  methods: {
    initialize: function() {
      this.loadRegistrationList();
      this.loadVolunteerStatus();
    },
    changeVolunteerStatus: function(item){
      console.log(item);
      console.log(this.selectedIds);
      this.axios.put(api.url.psrRegistrationList+'/volunteer-status', {
        ids: this.selectedIds,
        volunteerStatus:{
          id: item
        }
      })
      .then(function(){
        this.initialize();

      }.bind(this))
      .catch(function(e){
        console.log(e);
      }.bind(this))
    },
    ItemSelectedHandler: function(items){
      
      if (items.length >0){
        this.stateDisable = false
      }
      else{
        this.stateDisable = true
      }
      
      this.selectedIds = items.map(function(item){
        return item.volunteer.id;
      });
    },
    loadVolunteerStatus: function(){
      this.axios.get(api.url.psrVolunteerStatus)
      .then(function(res){
        this.statusStore = this.statusStore.concat(res.data);
      }.bind(this))

      .catch(function(e){
        console.log(e)
      }.bind(this))
    },
    loadRegistrationList: function(){

      this.axios.get( api.url.psrRegistrationList+'/psr/'+ this.psrID)
      .then(function(response){
        console.log(response.data);
        this.members = [];
          this.members = this.members.concat(response.data);
      }.bind(this))
      .catch(function(e){
          console.log(e);
      })
    },
    closeRegistrationList: function() {
      this.$emit("closeRegistrationList");
      
    },
    showMemberForm: function(){
        this.isActiveAddMemberForm = true;
    },
    closeMemberForm: function(){
        this.isActiveAddMemberForm = false;
        this.initialize();
    }

  }
};