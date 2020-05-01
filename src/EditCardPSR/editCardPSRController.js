import api from '../api';
export default {
  props: ["cardProps"],


  data: function() {
    return {
      cardData:this.cardProps,
      dialog: false,
      formTitle: "Карточка ПСР",
      psrStateList: [],
      psrLeaderList: [],
      success_snackbar:false,
      error_snackbar: false,
      errorMsg:''
    };
  },
  created: function() {
    this.init();
    this.loadPsrStateList();
    this.loadPsrLeaderList();
  },
  methods: {
    init: function() {
      console.log(this.cardData);
    },
    loadPsrStateList: function() {
      this.$http
        .get(api.url.psrStateList)
        .then(function(response) {
            // this.psrStateList =  this.psrStateList.concat(response.data);
            console.log(response)
            this.psrStateList = response.data;

          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    loadPsrLeaderList: function(){
      this.$http
        .get(api.url.psrLeaderList)
        .then(
          function(response) {
            // this.psrStateList =  this.psrStateList.concat(response.data);
            this.psrLeaderList = response.data || [];

          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    Save: function(){

      this.dialog = true;

      this.$http
        .put(api.url.psrDataList+'/'+this.cardData.id,
          this.cardData
        )
        .then(
          function(response) {
            this.dialog = false;
            this.success_snackbar = true;
            
            console.log(response);
          }.bind(this)
        )
        .catch(function(err) {  
            this.dialog = false;
            this.errorMsg = err;
            this.error_snackbar = true
          console.log(err);
        }.bind(this));      
    },
    close: function() {
      this.$emit("closeCardPSR");
    }
  }
};