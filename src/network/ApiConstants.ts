
// DEVELOP || BETA || STAGING || PRODUCTION (master) || TEST
const type = {
    BETA: 'BETA',
    DEV: 'DEV',
    PRODUCTION: 'PRODUCTION',
    STAGING: 'STAGING',
    TEST: 'TEST'
}
const RUN_ENVIRONMENT = type.DEV;
let HOST,ACCOUNT, HOST_Quiz, HOST_Notify;
if (RUN_ENVIRONMENT === type.DEV) {
    HOST = 'https://ais-schildren-test-api.aisolutions.com.vn/',
    ACCOUNT='https://ais-account-test-api.aisolutions.com.vn/'
    
    // HOST = 'http://192.168.10.48:8088/';

} else if (RUN_ENVIRONMENT === type.TEST) {
    HOST = '',
    ACCOUNT='https://ais-account-test-api.aisolutions.com.vn/'

} else if (RUN_ENVIRONMENT === type.PRODUCTION) {
    HOST = 'https://emp-service-api.aisolutions.com.vn/',
    ACCOUNT='https://ais-account-test-api.aisolutions.com.vn/'

}

export const ApiConstants = {
    HOST,
    ACCOUNT
}