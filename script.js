// ================================
// CONFIG
// ================================
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxYoyXInbS1T3fRvJzNm6al7ng314XyuhG-CGfrMi6e2oMB-IDP8tFJdMGXs7VEI_wrWA/exec";

// ================================
// ELEMENTS
// ================================
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");
const spinner = submitBtn.querySelector(".spinner");

// ================================
// FORM SUBMISSION
// ================================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Enable browser validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // UI: show loading
  spinner.classList.remove("hidden");
  btnText.textContent = "Submitting...";
  submitBtn.disabled = true;

  // Collect form data
  const formData = new FormData(form);

  // Checkbox: bringGuest
  formData.append(
    "bringGuest",
    document.getElementById("bringGuest").checked ? "Yes" : "No"
  );

  // Custom selects (hidden inputs already exist)
  formData.append(
    "tshirtSize",
    document.getElementById("tshirtSize").value
  );
  formData.append(
    "paymentMethod",
    document.getElementById("paymentMethod").value
  );

  // Send data
  fetch(SCRIPT_URL, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      alert("🎉 Registration successful!");
      form.reset();
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Something went wrong. Please try again.");
    })
    .finally(() => {
      // Restore UI
      spinner.classList.add("hidden");
      btnText.textContent = "Register Now";
      submitBtn.disabled = false;
    });
});

// ================================
// ENABLE SUBMIT BUTTON ON VALID FORM
// ================================
form.addEventListener("input", () => {
  submitBtn.disabled = !form.checkValidity();
});
