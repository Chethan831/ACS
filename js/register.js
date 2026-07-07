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
    if (!value.trim()) return 'We need your full name to complete the registration.';
    if (value.trim().length < 2) return 'Please enter your full name — it should be at least 2 characters.';
    return null;
  }

  function validateUSN(value) {
    if (!value.trim()) return 'Please provide your USN so we can identify you (e.g., 1AY21CS001).';
    return null;
  }

  function validateDepartment(value) {
    if (!value.trim()) return 'Tell us your department so we can group registrations (e.g., Computer Science).';
    return null;
  }

  function validateEmail(value) {
    if (!value.trim()) return 'An email address is required so we can send you updates (e.g., you@example.com).';
    if (value.trim().indexOf('@') === -1 || value.trim().indexOf('.') === -1) {
      return 'Hmm, that does not look like a valid email. Please use a format like username@domain.com.';
    }
    return null;
  }

  function validatePhone(value) {
    var digits = value.trim().replace(/\D/g, '');
    if (!value.trim()) return 'A phone number helps us reach you quickly (e.g., 9876543210).';
    if (digits.length !== 10) return 'Phone numbers must be exactly 10 digits. Please enter a valid number without spaces or prefixes.';
    return null;
  }

  function validateEvent(value) {
    if (!value) return 'Pick an event from the list so we know which one you are registering for.';
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
