// All Elements
const registerNowBtn = document.getElementById("registerNowBtn");
const loginBtn = document.getElementById("loginBtn");
const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const requestPage = document.getElementById("requestPage");
const backBtn = document.getElementById("backBtn");
const mainSection = document.getElementById("mainSection");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

// Variable to store logged-in user email
let loggedInUserEmail = "";
const apiBaseURL = "https://sheetdb.io/api/v1/f9d9brkbkup59";

// Navigation logic
registerNowBtn.addEventListener("click", () => {
  registerPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
  if (mainSection) mainSection.classList.add("hidden");
});

backBtn.addEventListener("click", () => {
  loginPage.classList.remove("hidden");
  registerPage.classList.add("hidden");
  if (mainSection) mainSection.classList.remove("hidden");
});

// --- Unified Login & Auto-fill Logic ---
loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "" || password === "") {
    alert("Please fill up all fields first!");
    return;
  }

  loginBtn.innerText = "Checking...";
  loginBtn.disabled = true;

  fetch(`${apiBaseURL}/search?Email=${email}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        const user = data[0];
        if (user.Password === password) {
          loggedInUserEmail = user.Email;
          alert("Login Successful! Welcome, " + user.Name);

          // Switch to Request Page
          loginPage.classList.add("hidden");
          requestPage.classList.remove("hidden");

          // Auto-fill fields if they exist
          if (document.getElementById("reqName"))
            document.getElementById("reqName").value = user.Name;
          if (document.getElementById("reqPhoneField"))
            document.getElementById("reqPhoneField").value =
              user["Phone Number"];
          if (document.getElementById("reqBloodField"))
            document.getElementById("reqBloodField").value =
              user["Blood Group"];
        } else {
          alert("Wrong password!");
        }
      } else {
        alert("Email not found! Please register first.");
      }
    })
    .catch(() => alert("Error connecting to database."))
    .finally(() => {
      loginBtn.innerText = "Login";
      loginBtn.disabled = false;
    });
});

// --- Registration Logic ---
const registerForm = document.querySelector("#registerPage form");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  const formData = {
    Name: document.getElementById("regFullName")?.value || "",
    Email: document.getElementById("regEmail")?.value || "",
    "Phone Number": document.getElementById("regPhone")?.value || "",
    "Blood Group": document.getElementById("regBloodGroup")?.value || "",
    Password: document.getElementById("regPassword")?.value || "",
  };

  fetch(apiBaseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [formData] }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Registration Successful!");
      registerForm.reset();
      loginPage.classList.remove("hidden");
      registerPage.classList.add("hidden");
    })
    .catch(() => alert("Registration failed. Check internet."))
    .finally(() => {
      submitBtn.innerText = "Register as Donor";
      submitBtn.disabled = false;
    });
});

// --- Submit Request (Update Row) ---
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
  if (!loggedInUserEmail) return alert("Please login again.");

  submitBtn.innerText = "Updating...";
  submitBtn.disabled = true;

  const updatedData = {
    Location: document.getElementById("reqLocation")?.value || "",
    Occupation: document.getElementById("reqOccupation")?.value || "",
    Relation: document.getElementById("reqRelation")?.value || "",
    "Patient Name": document.getElementById("patientName")?.value || "",
    Condition: document.getElementById("condition")?.value || "",
    "Required Blood": document.getElementById("requiredBlood")?.value || "",
    Hospital: document.getElementById("hospital")?.value || "",
    "Contact Number": document.getElementById("reqPhoneField")?.value || "",
  };

  fetch(`${apiBaseURL}/Email/${loggedInUserEmail}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: updatedData }),
  })
    .then((res) => res.json())
    .then(() => alert("Request Submitted & Sheet Updated!"))
    .catch(() => alert("Error updating sheet!"))
    .finally(() => {
      submitBtn.innerText = "Submit Request";
      submitBtn.disabled = false;
    });
});
