import editCardPSR from '../EditCardPSR/editCardPSR';
import addCardPSR from '../AddCardPSR/addCardPSR';
import RegistrationList from '../RegistrationList/RegistrationList';
import api from '../api';

export default {
  
  components:{
    editCardPSR,
    RegistrationList,
    addCardPSR
  },
  data: () => ({ 
    addCardPSR_isVisible: false,
    editCardPSR_isVisible: false,
    RegistrationList_isVisible: false,
    cardProps: {},
    
    headers: [
      { text: "Номер ПСР", value: "id", sortable: false },
      { text: "Населенный пункт", value: "name" },
      { text: "Начало ПСР", value: "startDate" },
      { text: "Окончание ПСР", value: "endDate" },
      { text: "Статус", value: "psrState" },
      { text: "Телефон", value: "phone", sortable: false },
      { text: "Карточка ПСР", value: "cardPSR", sortable: false },
      { text: "Лист Регистрации", value: "registrList", sortable: false }
    ],
    psrMembers: [],
    
    
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize: function() {
      this.loadPsrList();
    },
    loadPsrList: function(){
      this.$http.get(api.url.psrDataList)
      .then( function(response){        
        this.psrMembers =  response.data;
      }.bind(this))

      .catch(function(err){
        console.log(err);
      }.bind(this))
    },
    editCardPSRHandler: function(item){

      this.cardProps = Object.assign({}, item);

      if ( this.editCardPSR_isVisible ){
        this.editCardPSR_isVisible = false
        this.initialize();
      }
      else{
        this.editCardPSR_isVisible = true
      }
    },
    addCardPSRHandler: function(){
      if (this.addCardPSR_isVisible){ 
        this.addCardPSR_isVisible = false;
        this.initialize();
      }else{
        this.addCardPSR_isVisible = true; 
      }
    },
    RegistrationListHandler: function(item){
      
      this.cardProps = Object.assign({}, item);

      this.RegistrationList_isVisible ?
        this.RegistrationList_isVisible = false :
        this.RegistrationList_isVisible = true
    }

  }
};