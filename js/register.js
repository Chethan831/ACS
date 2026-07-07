/* ============================================================
   Campus Event Manager - Registration Logic
   ============================================================ */

(function () {
  // ---------- DOM References ----------
  var form = document.getElementById('registrationForm');
  var formCard = document.getElementById('formCard');
  var successCard = document.getElementById('successCard');
  var registerAnotherBtn = document.getElementById('registerAnotherBtn');
  var resetBtn = document.getElementById('resetBtn');

  // ---------- Helper: show error below a field ----------
  function showError(inputId, message) {
    var input = document.getElementById(inputId);
    var errorEl = document.getElementById(inputId + 'Error');
    if (input) input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  // ---------- Helper: clear error for a field ----------
  function clearError(inputId) {
    var input = document.getElementById(inputId);
    var errorEl = document.getElementById(inputId + 'Error');
    if (input) input.classList.remove('error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  // ---------- Helper: clear all field errors ----------
  function clearAllErrors() {
    var fields = ['fullName', 'usn', 'department', 'email', 'phone', 'eventSelect'];
    for (var i = 0; i < fields.length; i++) {
      clearError(fields[i]);
    }
  }

  // ---------- Validation Rules ----------

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
    // Simple email format check
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

  // ---------- Validate all fields, return true if valid ----------
  function validateForm() {
    clearAllErrors();
    var isValid = true;

    var nameErr = validateName(document.getElementById('fullName').value);
    if (nameErr) { showError('fullName', nameErr); isValid = false; }

    var usnErr = validateUSN(document.getElementById('usn').value);
    if (usnErr) { showError('usn', usnErr); isValid = false; }

    var deptErr = validateDepartment(document.getElementById('department').value);
    if (deptErr) { showError('department', deptErr); isValid = false; }

    var emailErr = validateEmail(document.getElementById('email').value);
    if (emailErr) { showError('email', emailErr); isValid = false; }

    var phoneErr = validatePhone(document.getElementById('phone').value);
    if (phoneErr) { showError('phone', phoneErr); isValid = false; }

    var eventErr = validateEvent(document.getElementById('eventSelect').value);
    if (eventErr) { showError('eventSelect', eventErr); isValid = false; }

    return isValid;
  }

  // ---------- Build registration object and save to Local Storage ----------
  function saveRegistrationData() {
    var registration = {
      id: 'REG-' + Date.now(),
      fullName: document.getElementById('fullName').value.trim(),
      usn: document.getElementById('usn').value.trim(),
      department: document.getElementById('department').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      event: document.getElementById('eventSelect').value,
      registeredAt: new Date().toISOString(),
    };

    App.saveRegistration(registration);

    return registration;
  }

  // ---------- Show success, hide form ----------
  function showSuccess() {
    form.style.display = 'none';
    successCard.style.display = 'block';
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ---------- Reset form back to initial state ----------
  function resetForm() {
    form.reset();
    clearAllErrors();
    form.style.display = 'block';
    successCard.style.display = 'none';
  }

  // ---------- Event Listeners ----------

  // Form submit
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        saveRegistrationData();
        showSuccess();
      }
    });
  }

  // "Register Another Event" button
  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener('click', resetForm);
  }

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      // Native form.reset() fires before this handler, so errors are stale
      clearAllErrors();
    });
  }

  // Clear individual field errors on focus
  var inputIds = ['fullName', 'usn', 'department', 'email', 'phone', 'eventSelect'];
  for (var i = 0; i < inputIds.length; i++) {
    var el = document.getElementById(inputIds[i]);
    if (el) {
      el.addEventListener('focus', function () {
        clearError(this.id);
      });
    }
  }

})();
