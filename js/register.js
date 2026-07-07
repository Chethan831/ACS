/* ============================================================
   Campus Event Manager - Registration Logic
   ============================================================ */

(function () {
  var form = document.getElementById('registrationForm');
  var formCard = document.getElementById('formCard');
  var successCard = document.getElementById('successCard');
  var registerAnotherBtn = document.getElementById('registerAnotherBtn');
  var resetBtn = document.getElementById('resetBtn');

  var FIELD_IDS = ['fullName', 'usn', 'department', 'email', 'phone', 'eventSelect'];
  var fields = {};
  var errorEls = {};

  for (var i = 0; i < FIELD_IDS.length; i++) {
    var id = FIELD_IDS[i];
    fields[id] = document.getElementById(id);
    errorEls[id] = document.getElementById(id + 'Error');
  }

  function showError(fieldId, message) {
    if (fields[fieldId]) fields[fieldId].classList.add('error');
    if (errorEls[fieldId]) {
      errorEls[fieldId].textContent = message;
      errorEls[fieldId].classList.add('visible');
    }
  }

  function clearError(fieldId) {
    if (fields[fieldId]) fields[fieldId].classList.remove('error');
    if (errorEls[fieldId]) {
      errorEls[fieldId].textContent = '';
      errorEls[fieldId].classList.remove('visible');
    }
  }

  function clearAllErrors() {
    for (var i = 0; i < FIELD_IDS.length; i++) {
      clearError(FIELD_IDS[i]);
    }
  }

  function validateName(value) {
    if (!value.trim()) return 'Full name is required.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    return null;
  }

  function validateUSN(value) {
    if (!value.trim()) return 'USN is required.';
    return null;
  }

  function validateDepartment(value) {
    if (!value.trim()) return 'Department is required.';
    return null;
  }

  function validateEmail(value) {
    if (!value.trim()) return 'Email address is required.';
    if (value.trim().indexOf('@') === -1 || value.trim().indexOf('.') === -1) {
      return 'Enter a valid email address.';
    }
    return null;
  }

  function validatePhone(value) {
    var digits = value.trim().replace(/\D/g, '');
    if (!value.trim()) return 'Phone number is required.';
    if (digits.length !== 10) return 'Phone number must be exactly 10 digits.';
    return null;
  }

  function validateEvent(value) {
    if (!value) return 'Please select an event.';
    return null;
  }

  function validateForm() {
    clearAllErrors();
    var isValid = true;

    var checks = [
      { id: 'fullName', fn: validateName },
      { id: 'usn', fn: validateUSN },
      { id: 'department', fn: validateDepartment },
      { id: 'email', fn: validateEmail },
      { id: 'phone', fn: validatePhone },
      { id: 'eventSelect', fn: validateEvent },
    ];

    for (var i = 0; i < checks.length; i++) {
      var c = checks[i];
      var err = c.fn(fields[c.id].value);
      if (err) {
        showError(c.id, err);
        isValid = false;
      }
    }

    return isValid;
  }

  function saveRegistrationData() {
    var registration = {
      id: 'REG-' + Date.now(),
      fullName: fields.fullName.value.trim(),
      usn: fields.usn.value.trim(),
      department: fields.department.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      event: fields.eventSelect.value,
      registeredAt: new Date().toISOString(),
    };

    App.saveRegistration(registration);
    return registration;
  }

  function showSuccess() {
    form.style.display = 'none';
    successCard.style.display = 'block';
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function resetForm() {
    form.reset();
    clearAllErrors();
    form.style.display = 'block';
    successCard.style.display = 'none';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        saveRegistrationData();
        showSuccess();
      }
    });
  }

  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener('click', resetForm);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', clearAllErrors);
  }

  for (var i = 0; i < FIELD_IDS.length; i++) {
    var el = fields[FIELD_IDS[i]];
    if (el) {
      el.addEventListener('focus', function () {
        clearError(this.id);
      });
    }
  }
})();
