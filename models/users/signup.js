//CONSTRUCTOR
const USER = function (user) {
    this.LEVEL_ID = user.LEVEL_ID;
    this.USER_NAME = user.USER_NAME;
    this.USER_EMAIL = user.USER_EMAIL;
    this.USER_CONTACT_NO = user.USER_CONTACT_NO;
    this.USER_MOBILE_NO = user.USER_MOBILE_NO;
    this.USER_ADDRESS = user.USER_ADDRESS;
    this.USER_CITY = user.USER_CITY;
    this.CREATED_ON = user.CREATED_ON;
    this.CREATED_BY = user.CREATED_BY;
    this.MODIFIED_ON = user.MODIFIED_ON;
    this.MODIFIED_BY = user.MODIFIED_BY;

};

module.exports = USER;