let otpFields = document.querySelectorAll(".otpField");
let flag = 0;
otpFields.forEach(otpField => {
  otpField.addEventListener('click', function () { this.select() });
  otpField.addEventListener('paste', function (event) {
    let clipboardData, pastedData;
    event.stopPropagation();
    event.preventDefault();

    clipboardData = event.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    let length = pastedData.length;
    let i, j, k = 0;
    let max = (length > 6 ? 6 : length);
    console.log(k);
    while (otpFields[k].value !== undefined && otpFields[k].value !== '') {
      if (k == 5) return;
      k++;
    }
    for (i = 0, j = (k == 0 ? 0 : k - 1); i < max; i++) {
      if (j > 5) return;
      if (/[^0-9]/.test(pastedData[0])) { j = 1; break };
      if (/[^0-9]/.test(pastedData[i])) continue;
      otpFields[j].value = pastedData[i];
      j++;
    }
    otpFields[j - 1].focus();
  });
});
function keyDownHandler(event) {
  if (((event.which >= 48) && (event.which <= 57)) || (event.which == 39)) { //digit or rightArrow
    if (event.target.id != 'sixth') {
      setTimeout(() => {
        let nextOtpField = event.target.nextElementSibling;
        nextOtpField.focus();
        nextOtpField.select();
      }, 0.1);
    }
    flag = 0;
    return true;
  } else if (event.which == 8 || event.which == 46) { //backspace  and Delete
    let currentOtpField = event.target;
    setTimeout(() => {
      if (event.which == 8) {
        if (event.target.id != 'first') {
          let previousOtpField = currentOtpField.previousElementSibling;
          previousOtpField.focus();
          previousOtpField.select();
        }
      }
      if (event.which == 46) {
        currentOtpField.value = "";
      }
      while (currentOtpField.nextElementSibling.value != undefined && currentOtpField.nextElementSibling.value != "") {
        currentOtpField.value = currentOtpField.nextElementSibling.value;
        if (event.which == 8 && currentOtpField.id == "first") {
          currentOtpField.select();

        }
        currentOtpField = currentOtpField.nextElementSibling;
        currentOtpField.value = "";
      }
    }, 0.1);
    flag = 0;
    return true;
  } else {
    switch (event.which) {
      case 37: {                              //leftArrow
        if (event.target.id != 'first') {
          setTimeout(() => {
            let previousOtpField = event.target.previousElementSibling;
            if (event.which == 8) {
              previousOtpField.value = currentFieldValue;
            }
            previousOtpField.focus();
            previousOtpField.select();
          }, 0.1);
        }
        flag = 0;
        return true;
      }
      case 17: {
        flag = 1;
        event.target.addEventListener('keyup', () => flag = 0);
        return true;
      }
      case 86: {
        return flag == 1 ? true : false;
      }
      default: {
        flag = 0;
        return false;
      }
    }
  }
}