// var base_url = 'http://localhost:8080/psr/api';
var base_url = '/psr/api'; 

export default {
    url:{
        psrList: base_url + '/psr',
        psrDataList: base_url + '/psr-data',
        psrStateList: base_url + '/psr-state',
        psrLeaderList: base_url + '/users',
        psrRegistrationList: base_url + '/psr-list-registration',
        psrClassficationList: base_url + '/classification',
        psrVolunteerStatus: base_url + '/volunteer-status',
        psrVolunteer: base_url + '/volunteers',
        notification: base_url + '/notification',
        // login:  'http://localhost:8080'  + '/login',
        // logout:   'http://localhost:8080'  +'/logout'
        login:   '/login',
        logout:   '/logout'
    }
}