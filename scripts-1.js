  /* Place your JavaScript in this file */
// Program name: script.js
// Author: Si John Van
// Date created: 2024-09-25
// Date Modified: 2024-12-10
// Version: 1.0
// Description: This java script file contains dynamic time display and user validation data. User's data will be validated on the fly for convenience. Cookies and local storage serves to automatically populate user entered data.    -->

const moodMap = [                                             // MOODMAP ARRAY (GLOBAL) //
    "uncomfortable",
    "Sick",
    "Unwell",
    "Neutral",
    "Can be a bit better",
    "Ok",
    "Adequate"
  ];

function updateDateTime() {                                      // DYNAMIC DATE AND TIME // 
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }

    const formattedDateTime = now.toLocaleString(undefined, options);
    document.getElementById("datetime").textContent = "Today's date is: " + formattedDateTime;

}

updateDateTime();
setInterval(updateDateTime, 1000);
function containsUserID(password, userid) {
  return password.toLowerCase().includes(userid.toLowerCase());
}

function verifyPassword() {                                      // PASSWORD VALIDATION // 
  let password = document.getElementById("password").value;
  let checkPassword = document.getElementById("verifyPassword").value;
  let userid = document.getElementById("userid").value;
  let message = "";
  let color ="red";

  if(password === "" && checkPassword === "") {
    document.getElementById("passwordMessage").textContent = "";
    return;
  }
  
  else if(password !== checkPassword) {
    message = "Passwords do not match.";
  }
  else if (!containsNumber(password)) {
    message = "Password must contain at least one number";
  }
  else if(!containsUppercase(password)) {
    message = "Password must contain at least one uppercase character.";
  }
  else if(containsForbidden(password)) {
    message = "Password should exclude special characters !@#$%^";
  }
  else if (userid !== "" && containsUserID(password, userid)) {
    message ="Password should not contain userID";
  }
  else {
    message = "Password is valid";
    color = "green";
  }
  let messageSpan = document.getElementById("passwordMessage");
  messageSpan.textContent = message;
  messageSpan.style.color = color;
 }

 function containsNumber(password) {
  for (let i=0; i < password.length; i++) {
    if(password[i] >= '0' && password[i] <= '9') return true;
  }
  return false;
 }

 function containsUppercase(password) {
  for (let i=0; i < password.length; i++) {
    if(password[i] >= 'A' && password[i] <= 'Z') return true;
  }
  return false;
}

function containsUserID(password, userid) {
  if(!userid) return false;
  return password.toLowerCase().includes(userid.toLowerCase());

}

 function containsForbidden(password) {
  forbidden = "!@#$%^&";
  for (let i=0; i < password.length; i++) {
    if(forbidden.indexOf(password[i]) !== -1) return true;
  }
  return false;

}
                                                              // USERID VALIDATION //
function useridCheck() {
  const userid = document.getElementById("userid").value.trim();
  const userError = document.getElementById("userError");
  userError.style.color = "red";

  if(userid === "") {
    userError.textContent = "Username is required";
    return;
  }
  else if(/^[0-9]/.test(userid)) {
    userError.textContent = "Username cannot start with a number";
  }
  else if(userid.length < 5 || userid.length > 20) {
    userError.textContent = "Username must be 5-20 characters long";
  }
  else if(!/^[A-Za-z0-9_-]+$/.test(userid)) {
    userError.textContent = "Username can only contain letters, numbers, dash and underscore";
  }
else {
  userError.textContent = "Username is valid";
  userError.style.color = "green";
  }
}
                                                                // Fname FIELD CHECK //
function firstNameCheck() {    
       
  const fname = document.getElementById("fname").value.trim();
  const fnameError = document.getElementById("fnameError");

  if(fname === "") {
    fnameError.textContent = "First name is required";
  } else {
    fnameError.textContent = "";
  }
}

                                                              // Lname FIELD CHECK //
function lastNameCheck() {
  const lname = document.getElementById("lname").value.trim();
  const lnameError = document.getElementById("lnameError");

  if(lname === "") {
    lnameError.textContent = "Last name is required";
    error_flag=1;
  } else {
    lnameError.textContent = "";
    error_flag=0;
  }
}


function emailCheck() {                                         // EMAIL VALIDATION //                        
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailValue = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(emailValue === "") {
    emailError.textContent = "Email is required";
  } else if(!emailPattern.test(emailValue)) {
    emailError.textContent = "Please enter a valid email.";
  } else  {
    emailError.textContent = "Email is valid";
    emailError.style.color = "green";
  }
}

function formatPhone(value) {                                 //PHONE FORMAT
    if (!value) return value;
    const phone = value.replace(/[^\d]/g, '');
    const phoneLength = phone.length;
  
    if (phoneLength < 3) return phone;
  
    if (phoneLength < 6) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    }
  
    if (phoneLength < 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
  
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
}
function phoneCheck() {                                         // PHONE VALIDATION //   
  const phoneInput = document.getElementById("homePhone");
  const phoneError = document.getElementById("phoneError");
  const phoneValue = phoneInput.value;
  const phonePattern = /^(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/;

  phoneInput.value = formatPhone(phoneInput.value);

  if(phoneValue === "") {
    phoneError.textContent = "Phone number is required";
  } else if(!phonePattern.test(phoneValue)) {
    phoneError.textContent = "Please enter a valid phone number";
  } else  {
    phoneError.textContent = "";
  }
}
  
function dobCheck() {                                                        // DOB VALIDATION //
  const dobInput = document.getElementById("dob");
  const birthdayMsg = document.getElementById("birthdayMsg");
   dobInput.addEventListener("blur", function() {
  const today = new Date().toISOString().split("T")[0];
  const minDate = dobInput.min;
  dobInput.max = today;

    if(this.value > today) {
      birthdayMsg.textContent = "Date can't be in the future.";
      dobInput.value= "";
    } else if (dobInput.value < minDate) {
      birthdayMsg.textContent = "Enter a valid dob (can't be before 01-01-1910.";
      dobInput.textContent = "";
    } else {
      birthdayMsg.textContent = "";
    }
    });
}

  function addressCheck() {                                         // ADDRESS VALIDATION //   
  const addressInput = document.getElementById("address1");
  const addressError = document.getElementById("addressError");
  const addressValue = addressInput.value;

  if(addressValue === "") {
    addressError.textContent = "Missing valid address";
    addressError.style.color = "red";
  } else if(addressValue.length < 6) {
    addressError.textContent = "Please enter a valid address";
    addressError.style.color = "red";
  } else  {
    addressError.textContent = "Address is valid";
    addressError.style.color = "green";
  }
  }
                                                                  // CITY VALIDATION //
  function cityCheck() {
    const cityInput = document.getElementById("city").value.trim();
    const cityError = document.getElementById("cityError");
    cityError.style.color = "red";

    if(cityInput === "") {
      cityError.textContent = "Please enter a city";
    } else {
      cityError.textContent = "";
    }
    
  }

  function zipCheck() {                                           // ZIP VALIDATION // 
    const zipInput = document.getElementById("zip");
    const zipError = document.getElementById("zipError");
    const zipValue = zipInput.value.trim();

    if(zipValue === "") {
      zipError.textContent = "Missing ZIP Code";
      zipError.style.color = "red";
    } else if(!/^\d{5}(-\d{4})?$/.test(zipValue)) {
      zipError.textContent = "Please enter valid ZIP code";
    } else {
      zipError.textContent = "Zip code is valid";
      zipError.style.color = "green";
    }
  }
                                                                // SSN VALIDATION // 
  function ssnCheck() {
    const ssnInput = document.getElementById("ssn").value.trim();
    const ssnError = document.getElementById("ssnError");
    ssnError.style.color = "red";
    
    if(!/^[0-9-]*$/.test(ssnInput)) {
      ssnError.textContent = "SSN can only contain numbers.";
    } else if(ssnInput.length !== 11) {
      ssnError.textContent = "SSN should be in proper format, XXX-XX-XXXX";
    } else {
      ssnError.textContent = "";
    }
  }


                                                                  // DYNAMIC MOOD SLIDER //
  document.addEventListener("DOMContentLoaded", function() {
  const moodSlider = document.getElementById("mood");
  const moodDisplay = document.getElementById("moodSlide");

  
  moodSlider.addEventListener("input", function() {
    const value = parseInt(moodSlider.value);
    moodDisplay.textContent = moodMap[value];
  
  });
    moodDisplay.textContent = moodMap[moodSlider.value];
  });


                                                                  // USER DATA VALIDATION REVIEW  //
function review() {                                 
  let output = "<table border='1' cellpadding='5'><tr><th>Field</th><th>Value</th></tr>";

  output += row("Email", document.getElementById("email").value);
  output += row("Username", document.getElementById("userid").value);
  output += row("Password", document.getElementById("password").value);

  output += row("First Name", document.getElementById("fname").value);
  output += row("MI", document.getElementById("mi").value);
  output += row("Last Name", document.getElementById("lname").value);

  output += row("Address 1", document.getElementById("address1").value);
  output += row("Address 2", document.getElementById("address2").value);

  output += row("City", document.getElementById("city").value);
  output += row("State", document.getElementById("state").value);
  output += row("ZIP", document.getElementById("zip").value);
                               
  output += row("Home Phone", document.getElementById("homePhone").value);
  output += row("Work Phone", document.getElementById("workPhone").value);

  output += row("DOB", document.getElementById("dob").value);
  output += row("SSN", document.getElementById("ssn").value);

  let bloodType = document.getElementById("bloodtype").value;
  output += row("Blood Type", bloodType ? bloodType : "Not Selected");

  let gender = document.querySelector('input[name="gender"]:checked');
  output += row("Gender", gender ? gender.value : "Not Selected");

  let smoke = document.querySelector('input[name="smoke"]:checked');
  output += row("Smoke", smoke ? smoke.value : "Not Selected");

  let alcohol = document.querySelector('input[name="alcohol"]:checked');
  output += row("Alcohol", alcohol ? alcohol.value : "Not Selected");

  
  let allergyList = [ "Anesthetics", "aspirin",  "Cephalosporins", "latex", "penicillin", "pollen", "sulfa"];

  let allergies = allergyList.filter(a => {
    let el = document.getElementById(a);
    return el && el.checked;
  });
  
  output += row("Allergies", allergies.length ? allergies.join(", ") : "None");
  
  let moodValue = parseInt(document.getElementById("mood").value);
  output += row("Mood Slider", moodMap[moodValue]);

  output += row("Insurance Coverage", document.getElementById("insurancecov").value);

  output += "</table>";

  document.getElementById("review").innerHTML = output;

}

function row(label, value) {                                       //TABLE VALIDATION ROWS 
  return `<tr><td>${label}</td><td>${value}</td></tr>`;
}
async function loadStates(file) {                                  //STATE API
  let response = await fetch(file);
  let text = await response.text();
  let state = JSON.parse(text);

  const select = document.getElementById("state");
  Object.entries(state).forEach(([abbr, name]) => {
    select.add(new Option(name, abbr));
  });
  const saved = localStorage.getItem("state");
  if(saved) select.value = saved;
}

function setCookie(cname, cvalue, exdays) {                       //SET COOKIES
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}


function getCookie(cname) {                                     //FETCH COOKIES
   let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(name) {                                  //DELETE COOKIES FUNCTION 
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

function saveLocal(fieldId) {
  const val = document.getElementById(fieldId).value;
  localStorage.setItem(fieldId, val);
}

function loadLocalSave() {                                    //SET LOCALSAVE
  let fields = [ "fname", "lname" , "email", "homePhone", "workPhone", "address1", "address2", "city", "state", "zip"];
  fields.forEach(f => {
    const val = localStorage.getItem(f);
    if(val) document.getElementById(f).value = val;
  });
}

function welcomeBanner() {                                    //DYNAMIC WELCOME MESSAGE
    const welcomeDiv = document.getElementById("welcomeMsg");
    const newUserDiv = document.getElementById("newUserOption");
    const fnameCookie = getCookie("fname");
    const fnameInput = document.getElementById("fname").value.trim();
    const fnameUsed = fnameCookie || fnameInput;
    
    if(fnameUsed) {
    welcomeDiv.innerHTML = "Welcome back, " + fnameUsed;
    newUserDiv.innerHTML = '';
    const btn = document.createElement("button");
    btn.textContent = "Not " + fnameUsed + "? CLICK HERE to create NEW USER";
    btn.type = "button";
    btn.style.backgroundColor = "black";
    btn.addEventListener("click", () => {
      deleteCookie("fname");
      document.getElementById("signup").reset();
      welcomeBanner();  
    });
    newUserDiv.appendChild(btn);
} else {
  welcomeDiv.innerHTML = "Welcome New User";
    newUserDiv.innerHTML = '';
  }
}

function saveFirstName(event) {                             //REMEMBER ME & FNAME SAVE
  if(event) event.preventDefault();
  const fname = document.getElementById("fname").value.trim();
  const remember = document.getElementById("rememberMe").checked;

  const fields = [ "fname", "lname", "email", "homePhone", "workPhone", "address1", "address2", "city", "state", "zip"];

  if(remember && fname) {
    setCookie("fname", fname, 2);
    fields.forEach(f => saveLocal(f));
      } else {
    deleteCookie("fname");
    fields.forEach(f => localStorage.removeItem(f));
      }
    welcomeBanner();
}

window.addEventListener("DOMContentLoaded", () => {       // INITIALIZE FORM
  loadLocalSave();
  loadStates("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json");
  welcomeBanner();
  
    document.getElementById("password").addEventListener("input", verifyPassword);
    document.getElementById("verifyPassword").addEventListener("input", verifyPassword);
    document.getElementById("email").addEventListener("input", emailCheck);
    document.getElementById("userid").addEventListener("input", useridCheck);
    document.getElementById("homePhone").addEventListener("input", phoneCheck);
    document.getElementById("dob").addEventListener("input", dobCheck);
    document.getElementById("city").addEventListener("input", cityCheck);
    document.getElementById("ssn").addEventListener("input", ssnCheck);
    document.getElementById("zip").addEventListener("input", zipCheck);
    document.getElementById("address1").addEventListener("input", addressCheck);
});
