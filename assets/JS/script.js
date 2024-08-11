const btns = document.querySelectorAll("[data-target]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

// For opening Popup
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // document.querySelector(btn.dataset.target).classList.add("active");
    // overlay.classList.add("active");
    const targetModal = document.querySelector(btn.dataset.target);
    if (targetModal) {
      targetModal.classList.add("active");
      overlay.classList.add("active");
    } else {
      console.error(`No element found with selector: ${btn.dataset.target}`);
    }
  });
});

// For closing popup using "X" sign
close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// After opening popup, if you click outside the popup, it will close
window.onclick = (e) => {
  if (e.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
    overlay.classList.remove("active");
  }
};

function validate() {
  var name = document.getElementById("name").value;
  var subject = document.getElementById("subject").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var error_message = document.getElementById("error_message");
  error_message.style.padding = "10px";
  var text;

  // Asian names can be three-letter names
  if (name.length < 3) {
    text = "Please Enter a valid name (Minimum 3 characters)";
    error_message.innerHTML = text;
    return false;
  }
  if (subject.length < 10) {
    text = "Please Enter a correct subject (Minimum 10 characters)";
    error_message.innerHTML = text;
    return false;
  }
  if (isNaN(phone) || phone.length < 10) {
    text = "Please Enter a valid phone number (Minimum 10 digits)";
    error_message.innerHTML = text;
    return false;
  }
  var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    text = "Please Enter a valid email address";
    error_message.innerHTML = text;
    return false;
  }
  if (message.length >= 500) {
    text = "Please Enter less than 500 characters (Maximum 500 characters)";
    error_message.innerHTML = text;
    return false;
  }

  // Clear error message if validation passes
  error_message.innerHTML = "";
  return true;
}

// Search Functionality
function filter() {
  var filterVal, input, productList, productName, h4, i;
  input = document.getElementById("search");
  filterVal = input.value.toUpperCase();
  productList = document.getElementById("product-list");
  productName = productList.getElementsByClassName("col-4");

  for (i = 0; i < productName.length; i++) {
    h4 = productName[i].getElementsByTagName("h4")[0];
    // In search if typed string matches with the element name
    if (h4.innerHTML.toUpperCase().indexOf(filterVal) > -1) {
      productName[i].style.display = "";
    } else {
      productName[i].style.display = "none";
    }
  }
}

// sorting products by price
function sortlist() {
  var productList, productName, i, switching, b, c, shouldSwitch;
  productList = document.getElementById("product-list");
  productName = productList.getElementsByClassName("col-4");
  switching = true;
  while (switching) {
    switching = false;
    // Loop running through each product
    for (i = 0; i < productName.length - 1; i++) {
      shouldSwitch = false;
      b = productName[i].getElementsByTagName("span")[0].innerHTML;
      c = productName[i + 1].getElementsByTagName("span")[0].innerHTML;
      // Condition to check price for each product item
      if (Number(b) > Number(c)) {
        shouldSwitch = true;
        break;
      }
    }
    // Each element will switch with next product element based on product price sorting
    if (shouldSwitch) {
      productName[i].parentNode.insertBefore(
        productName[i + 1],
        productName[i]
      );
      switching = true;
    }
  }
}
