let otpFields = document.querySelectorAll(".otpField");

function keyDownHandler(event) {
  if (((event.which >= 48) && (event.which <= 57)) || (event.which == 39)) { //digit or rightArrow
    if (event.target.id != 'sixth') {
      setTimeout(() => {
        let nextOtpField = event.target.nextElementSibling;
        nextOtpField.focus();
        nextOtpField.select();
      }, 0.1);
    }
    return true;
  } else if (event.which == 37) { //leftArrow
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
        if (event.which == 8) {
          if (currentOtpField.id == "first") {
            currentOtpField.select();
          }
        }
        currentOtpField = currentOtpField.nextElementSibling;
        currentOtpField.value = "";
      }
    }, 0.1);
    return true;
  } else {
    return false;
  }
}