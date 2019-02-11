var extIdValidation = false;
var devNameValidation = false;
var extDescValidation = false;
var devIdValidation = false;
var extNameValidation = false;

function enableFormSubmit(extId, devName, extDesc, devId, extName) {
  if (extId && devName && extDesc && devId && extName) {
    document.querySelector("#btnSubmit").classList.remove("disabled");
  } else {
    document.querySelector("#btnSubmit").classList.add("disabled");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

// Form submit
document.querySelector("#btnSubmit").addEventListener("click", function() {
  fetch("/downloadProject", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      //data to send
      extId: document.querySelector("#extId").value,
      devName: document.querySelector("#devName").value,
      extDesc: document.querySelector("#extDesc").value,
      devId: document.querySelector("#devId").value,
      extName: document.querySelector("#extName").value
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// Validation UI inputs
document.querySelector("#extId").addEventListener("focusout", function(e) {
  e.preventDefault();
  if (document.querySelector("#extId").value.length !== 36) {
    document.querySelector("#extId").classList.add("invalid");
    extIdValidation = false;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  } else {
    extIdValidation = true;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  }
});

document.querySelector("#devName").addEventListener("focusout", function(e) {
  e.preventDefault();
  if (document.querySelector("#devName").value.length <= 3) {
    document.querySelector("#devName").classList.add("invalid");
    devNameValidation = false;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  } else {
    devNameValidation = true;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  }
});

document.querySelector("#extDesc").addEventListener("focusout", function(e) {
  e.preventDefault();
  if (document.querySelector("#extDesc").value.length <= 4) {
    document.querySelector("#extDesc").classList.add("invalid");
    extDescValidation = false;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  } else {
    extDescValidation = true;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  }
});

document.querySelector("#devId").addEventListener("focusout", function(e) {
  e.preventDefault();
  if (document.querySelector("#devId").value.length <= 4) {
    document.querySelector("#devId").classList.add("invalid");
    devIdValidation = false;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  } else {
    devIdValidation = true;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  }
});

document.querySelector("#extName").addEventListener("focusout", function(e) {
  e.preventDefault();
  if (document.querySelector("#extName").value.length <= 4) {
    document.querySelector("#extName").classList.add("invalid");
    extNameValidation = false;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  } else {
    extNameValidation = true;
    enableFormSubmit(
      extIdValidation,
      devNameValidation,
      extDescValidation,
      devIdValidation,
      extNameValidation
    );
  }
});
