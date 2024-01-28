exports.formatTelephone = () => {};

const totp4digits = () => Math.floor(1000 + Math.random() * 9000);

const totp6digits = () => Math.floor(100000 + Math.random() * 900000);
const bookingCode = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

const formatPhoneNumber = phoneNumber => {
    if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+' + phoneNumber;
    }
    return phoneNumber;
};

const formatGhPhoneNumber = phoneNumber => {
    if (phoneNumber.startsWith('0')) {
        return phoneNumber.replace('0', '233');
    } else if (!phoneNumber.startsWith('233')) {
        return '233' + phoneNumber;
    } else {
        return phoneNumber;
    }
};

module.exports = {
    formatGhPhoneNumber,
    formatPhoneNumber,
    totp6digits,
    totp4digits,
    bookingCode
};
