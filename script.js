const registerNowBtn = document.getElementById("registerNowBtn");
const loginBtn = document.getElementById("loginBtn");
const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const backBtn = document.getElementById("backBtn");
const mainSection = document.getElementById("mainSection");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

// Register Page-e jaoar jonno
registerNowBtn.addEventListener("click", function () {
  registerPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
  // Main section thakle seta-o hide korte paren
  if (mainSection) mainSection.classList.add("hidden");
});

// Back Button logic
backBtn.addEventListener("click", function () {
  loginPage.classList.remove("hidden");
  registerPage.classList.add("hidden");
  if (mainSection) mainSection.classList.remove("hidden");
});

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Button click hoyeche!");

  const email = emailInput.value;
  const password = passwordInput.value;

  if (email === "" || password === "") {
    alert("Please fill up all fields first!");
  } else {
    alert("You are not registered yet! Please register first.");
  }
});

// Register Form select kora
const registerForm = document.querySelector("#registerPage form");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Page reload bondho korbe

  // Button-ke disable kora jate bar bar click na hoy
  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  // Form theke data gulo nite hobe (Check korun ID gulo HTML-e ache ki na)
  const formData = {
    Name: document.getElementById("regFullName")
      ? document.getElementById("regFullName").value
      : "",
    Email: document.getElementById("regEmail")
      ? document.getElementById("regEmail").value
      : "",
    "Phone Number": document.getElementById("regPhone")
      ? document.getElementById("regPhone").value
      : "",
    "Blood Group": document.getElementById("regBloodGroup")
      ? document.getElementById("regBloodGroup").value
      : "",
    Password: document.getElementById("regPassword")
      ? document.getElementById("regPassword").value
      : "",
  };

  // Apnar SheetDB API URL
  const apiURL = "https://sheetdb.io/api/v1/f9d9brkbkup59";

  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [formData],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Registration Successful! Data added to Google Sheet.");
      registerForm.reset(); // Form faka hoye jabe

      // Login page-e niye jaoa
      loginPage.classList.remove("hidden");
      registerPage.classList.add("hidden");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong! Check your internet or code.");
    })
    .finally(() => {
      submitBtn.innerText = "Register as Donor";
      submitBtn.disabled = false;
    });
});

// loginBtn.addEventListener("click", function () {
//   const inputPass = document.getElementById("inputPass").value;
//   const mobileNumberInput = document.getElementById("mobileNumber").value;
//   console.log(mobileNumberInput);
//   if (mobileNumberInput === "") {
//     alert("Please enter your mobile number.");
//   } else if (mobileNumberInput === "01869967777" && inputPass === "1234") {
//     loginPage.style.display = "none";
//     mainSection.classList.remove("hidden");
//   } else {
//     alert("Invalid mobile number or password.");
//   }
// });

// const loginBtn = document.getElementById("loginBtn");
// const payBillSection = document.getElementById("payBillSection");

// loginBtn.addEventListener("click", function () {
//   const loginContainer = document.getElementById("loginContainer");
//   const inputPass = document.getElementById("inputPass").value;
//   const mobileNumberInput = document.getElementById("mobileNumber").value;
//   const mainSection = document.getElementById("mainSection");
//   console.log(mobileNumberInput);

//   if (mobileNumberInput === "") {
//     alert("Please enter your mobile number.");
//   } else if (mobileNumberInput === "01869967777" && inputPass === "1234") {
//     loginContainer.style.display = "none";
//     mainSection.classList.remove("hidden");
//   } else {
//     alert("Invalid mobile number or password.");
//   }
// });
