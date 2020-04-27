import api from "../api";

export default {
  data: function() {
    return {
      psrStateList: [],
      psrLeaderList: [],
      dialog: false,
      success_snackbar: false,
      error_snackbar: false,
      errorMsg: "",

      formTitle: "Создание новой ПСР",
      cardData: {
        id: "",
        psr: {
          id: "",
          name: "",
          startDate: "",
          endDate: "",
          psrState: {
            id: "",
            name: ""
          },
          comment: ""
        },
        station: "",
        psrLeader: {
          login: "",
          fio: "",
          password: ""
        },
        psrRegisteredUser: {
          login: "",
          fio: ""
        },
        objectInfo: "",
        content: "",
        photo: ""
      }
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.loadPsrStateList();
      this.loadPsrLeaderList();
    },
    SaveHandler: function() {
      this.dialog = true;

      this.axios
        .post(api.url.psrDataList, this.cardData)
        .then(
          function(response) {
            this.dialog = false;
            this.success_snackbar = true;

            console.log(response);
          }.bind(this)
        )
        .catch(
          function(e) {
            this.dialog = false;
            this.errorMsg = e;
            this.error_snackbar =true;

            console.log(e);
          }.bind(this)
        );
    },
    loadPsrStateList: function() {
      this.$http
        .get(api.url.psrStateList)
        .then(
          function(response) {
            // this.psrStateList =  this.psrStateList.concat(response.data);
            this.psrStateList = response.data;
          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    loadPsrLeaderList: function() {
      this.$http
        .get(api.url.psrLeaderList)
        .then(
          function(response) {
            this.psrLeaderList = response.data;
          }.bind(this)
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    close: function() {
      this.$emit("closeCardPSR");
    }
  }
};