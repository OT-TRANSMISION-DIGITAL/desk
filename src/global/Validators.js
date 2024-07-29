
const isEmail=  (correo) => {
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(correo);
};
const isPassword = (password) => {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[a-zA-Z\d!@#$%^&*_]{8,}$/).test(password);
}
function isValidPhoneNumber(phone) {
    return (/^(?:\d{3}-){2}\d{4}$/).test(phone);
  }
function formatPhoneNumber(value) {
    value = value.replace(/\D/g, ''); // Remove non-digit characters
  
    if (value.length <= 10) {
      return value.replace(/(\d{3})(\d{3})(\d{0,4})/, function (_, p1, p2, p3) {
        if (p3) {
          return `${p1}-${p2}-${p3}`;
        } else if (p2) {
          return `${p1}-${p2}`;
        } else if (p1) {
          return p1;
        }
      });
    } else {
      return value.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Ensure maxlength is not exceeded
    }
}


export {
    isEmail,
    isPassword,
    isValidPhoneNumber,
    formatPhoneNumber
}