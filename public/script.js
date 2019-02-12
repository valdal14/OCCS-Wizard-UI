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

// Navbar events
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

// Modal trigger
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});

// Form submit
document.querySelector("#btnSubmit").addEventListener("click", function(e) {
  e.preventDefault();
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
      if (data.message.status === 200) {
        document.querySelector(
          "#modalContent"
        ).textContent = `You new extension with name ${
          data.message.extension
        } has been saved in: ${data.message.directory}`;
        var space = document.createElement("br");
        document.querySelector("#modalContent").appendChild(space);
        document.querySelector("#modalContent").classList.add("modalBodyError");
        // add a link to the ui
        var link = document.createElement("a");
        link.setAttribute(
          "href",
          data.message.directory + "/" + data.message.extension
        );
        link.textContent = "Download the file";
        document.querySelector("#modalContent").appendChild(link);
      } else {
        document.querySelector("#modalContent").textContent = data.message;
        document
          .querySelector("#modalContent")
          .classList.add("modalBodyResult");
      }
    })
    .catch(function(error) {
      document.querySelector("#modalContent").textContent =
        "There was a problem generating your extension, please verify your connection and try again!!!";
      document.querySelector("#modalContent").classList.add("modalBodyResult");
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

// OCCS Text
function changeText() {
  setTimeout(function() {
    document.querySelector("#occsText").textContent = "Welcome to OCCS Wizard";
    document.querySelector("#occsText").classList.add("animated", "fadeInLeft");
  }, 1000);

  setTimeout(function() {
    document.querySelector("#occsText").textContent = "your tool to create";
    document
      .querySelector("#occsText")
      .classList.remove("animated", "fadeInLeft");
    document.querySelector("#occsText").classList.add("animated", "fadeInUp");
  }, 2500);

  setTimeout(function() {
    document.querySelector("#occsText").textContent = "Oracle Commerce Cloud";
    document
      .querySelector("#occsText")
      .classList.remove("animated", "fadeInUp");
    document.querySelector("#occsText").classList.add("animated", "fadeInDown");
  }, 4000);

  setTimeout(function() {
    document.querySelector("#occsText").textContent = "EXTENSIONS";
    document
      .querySelector("#occsText")
      .classList.remove("animated", "fadeInDown");
    document.querySelector("#occsText").classList.add("animated", "flip");
  }, 5500);

  setTimeout(function() {
    document.querySelector("#occsText").style.marginTop = "15%";
    document.querySelector("#occsText").style.textShadow = "0px 2px 3px #555";
    document.querySelector("#occsText").style.letterSpacing = "0.10em";
    document.querySelector("#occsText").style.fontSize = "75px";
    document.querySelector("#occsText").textContent = "OCCS WIZARD";
    document.querySelector("#occsText").classList.remove("animated", "flip");
    document.querySelector("#occsText").classList.add("animated", "bounce");
  }, 7000);
}

changeText();
