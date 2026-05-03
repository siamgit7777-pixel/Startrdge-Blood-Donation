// ===== ELEMENTS =====
const registerNowBtn = document.getElementById("registerNowBtn");
const loginBtn = document.getElementById("loginBtn");
const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const requestPage = document.getElementById("requestPage");

const backBtns = document.querySelectorAll("#backBtn"); // FIXED

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const submitBtn = document.getElementById("submitBtn");

let loggedInUserEmail = "";
const apiBaseURL = "https://sheetdb.io/api/v1/f9d9brkbkup59";

// ===== NAVIGATION =====
registerNowBtn.addEventListener("click", () => {
  registerPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
});

backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    registerPage.classList.add("hidden");
    requestPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  });
});

// ===== LOGIN =====
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  loginBtn.innerText = "Checking...";
  loginBtn.disabled = true;

  try {
    const res = await fetch(`${apiBaseURL}/search?Email=${email}`);
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0];

      if (user.Password === password) {
        loggedInUserEmail = user.Email;

        alert("Login Success");

        loginPage.classList.add("hidden");
        requestPage.classList.remove("hidden");

        // autofill
        document.getElementById("reqName").value = user.Name || "";
        document.getElementById("reqPhoneField").value =
          user["Phone Number"] || "";
        document.getElementById("reqBloodField").value =
          user["Blood Group"] || "";
      } else {
        alert("Wrong password");
      }
    } else {
      alert("User not found");
    }
  } catch (err) {
    alert("Server error");
  }

  loginBtn.innerText = "Login";
  loginBtn.disabled = false;
});

// ===== REGISTER =====
const registerForm = document.querySelector("#registerPage form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    Name: document.getElementById("regFullName").value,
    Email: document.getElementById("regEmail").value,
    "Phone Number": document.getElementById("regPhone").value,
    "Blood Group": document.getElementById("regBloodGroup").value,
    Password: document.getElementById("regPassword").value,
  };

  try {
    await fetch(apiBaseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [data] }),
    });

    alert("Registration Success");

    registerPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  } catch {
    alert("Registration Failed");
  }
});

// ===== SUBMIT REQUEST =====
submitBtn.addEventListener("click", async () => {
  if (!loggedInUserEmail) {
    alert("Login first");
    return;
  }

  submitBtn.innerText = "Submitting...";
  submitBtn.disabled = true;

  const data = {
    Location: document.getElementById("reqLocation").value,
    Occupation: document.getElementById("reqOccupation").value,
    Relation: document.getElementById("reqRelation").value,
    "Patient Name": document.getElementById("patientName").value,
    Condition: document.getElementById("condition").value,
    "Required Blood": document.getElementById("requiredBlood").value,
    Hospital: document.getElementById("hospital").value,
    "Contact Number": document.getElementById("reqPhoneField").value,
  };

  try {
    await fetch(`${apiBaseURL}/Email/${loggedInUserEmail}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    document.getElementById("toast").classList.add("show");
  } catch {
    alert("Submit failed");
  }

  submitBtn.innerText = "Submit Request";
  submitBtn.disabled = false;
});

// ===== PROFILE IMAGE UPLOAD =====
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");

if (imageUpload) {
  imageUpload.addEventListener("change", () => {
    const file = imageUpload.files[0];
    if (file) {
      profileImage.src = URL.createObjectURL(file);
    }
  });
}

// ===== PROFILE PAGE TOGGLE =====
const profileBtn = document.getElementById("profileBtn");
const editProfile = document.getElementById("editProfile");

profileBtn.addEventListener("click", () => {
  editProfile.classList.remove("hidden");
});
