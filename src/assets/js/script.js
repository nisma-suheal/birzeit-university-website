
document.addEventListener("DOMContentLoaded", function () {

  // Toggle mobile navigation menu
  const menu = document.getElementById("menu");
  const menu_btn = document.getElementById("menuBtn");

  if (menu && menu_btn) {
    menu_btn.addEventListener("click", function () {
      menu.classList.toggle("hidden");
    });
  }

  // Back to Top button functionality
  const back_top = document.getElementById("backTop");

  if (back_top) {
    back_top.style.opacity = "0";
    back_top.style.transition = "opacity .3s ease";

    window.addEventListener("scroll", function () {
      if (window.scrollY >= 300) {
        back_top.style.opacity = "1";
      } else {
        back_top.style.opacity = "0";
      }
    });

    back_top.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  
  // Toggle notification box on bell icon click
  const bellIcons = document.querySelectorAll(".NoificationIcon");

  bellIcons.forEach((bellIcon) => {
    const notificationBox = bellIcon.nextElementSibling;

    bellIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      notificationBox.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !notificationBox.contains(e.target) &&
        !bellIcon.contains(e.target)
      ) {
        notificationBox.classList.add("hidden");
      }
    });
  });

  // Handle Accept and Decline buttons inside notifications
function showAlert(message, type = "success") {
  const alertBox = document.getElementById("alertBox");

  if (type === "success") {
    alertBox.className =
      "fixed bottom-5 right-5 px-10 py-4 rounded-md shadow-lg text-white text-base font-medium transition-all duration-500 z-[9999] bg-green-500/70";
  } else if (type === "error") {
    alertBox.className =
      "fixed bottom-5 right-5 px-10 py-4 rounded-md shadow-lg text-white text-base font-medium transition-all duration-500 z-[9999] bg-red-500/70";
  }

  alertBox.textContent = message;
  alertBox.classList.remove("hidden");
  alertBox.style.opacity = "1";
  alertBox.style.transform = "translateY(0)";

  setTimeout(() => {
    alertBox.style.opacity = "0";
    alertBox.style.transform = "translateY(-20px)";
    setTimeout(() => alertBox.classList.add("hidden"), 500);
  }, 3000);
}

// Handle Accept and Decline buttons inside notifications
const acceptButtons = document.querySelectorAll(".AcceptBtn");
const declineButtons = document.querySelectorAll(".DeclineBtn");

acceptButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    showAlert("Successfully accepted", "success");
    btn.closest(".group").remove();
  });
});

declineButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    showAlert("Deleted successfully", "error");
    btn.closest(".group").remove();
  });
});


  // Switch between forms (Show/Hide Forms)
  const editBtn = document.getElementById("editProfileBtn");
  const editForm = document.getElementById("editForm");
  const profileInfo = document.getElementById("profileInfo");
  const editpassword = document.getElementById("editPassword");
  const editPassBtn = document.getElementById("editPasswordBtn");

  if (editBtn && editForm && profileInfo && editpassword) {
    editBtn.addEventListener("click", () => {
      profileInfo.classList.add("hidden");
      editForm.classList.remove("hidden");
      editpassword.classList.add("hidden");
    });
  }

  if (editPassBtn && editpassword && profileInfo && editForm) {
    editPassBtn.addEventListener("click", () => {
      profileInfo.classList.add("hidden");
      editpassword.classList.remove("hidden");
      editForm.classList.add("hidden");
    });
  }

  // Toggle Password Visibility
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
      const inputId = icon.getAttribute("data-target");
      const input = document.getElementById(inputId);

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        `;
      } else {
        input.type = "password";
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
            <path d="m2 2 20 20"/>
          </svg>
        `;
      }
    });
  });

  // Verify passwords (are they all filled in and does the new one match the confirmation)
  const newPwd = document.getElementById("newPassword");
  const confirmPwd = document.getElementById("confirmPassword");
  const currentPwd = document.getElementById("currentPassword")
  const message = document.getElementById("message");
  const form = document.getElementById("PasswordForm");

  function validatePasswords() {
    const a = newPwd.value.trim();
    const b = confirmPwd.value.trim();
    const c = currentPwd.value.trim();

    if (!a || !b || !c) {
      message.textContent = "Please fill in all fields";
      message.className = "text-red-600 text-sm mt-2";
      newPwd.classList.add("border-red-500");
      confirmPwd.classList.add("border-red-500");
      currentPwd.classList.add("border-red-500");
      newPwd.classList.remove("border-green-500");
      confirmPwd.classList.remove("border-green-500");
      currentPwd.classList.remove("border-green-500");
      return false;
    }

    if (a !== b) {
      message.textContent = "The passwords do not match";
      message.className = "text-red-600 text-sm mt-2";
      newPwd.classList.add("border-red-500");
      confirmPwd.classList.add("border-red-500");
      newPwd.classList.remove("border-green-500");
      confirmPwd.classList.remove("border-green-500");
      return false;
    }

    message.textContent = "The passwords are identical";
    message.className = "text-green-600 text-sm mt-2";
    newPwd.classList.add("border-green-500");
    confirmPwd.classList.add("border-green-500");
    newPwd.classList.remove("border-red-500");
    confirmPwd.classList.remove("border-red-500");
    return true;
  }


if (newPwd && confirmPwd && currentPwd && message && form) {
  newPwd.addEventListener("input", () => {
    newPwd.classList.remove("border-red-500");
    message.textContent = "";
  });

  confirmPwd.addEventListener("input", () => {
    confirmPwd.classList.remove("border-red-500");
    message.textContent = "";
  });

  currentPwd.addEventListener("input", () => {
    currentPwd.classList.remove("border-red-500");
    message.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    if (!validatePasswords()) {
      e.preventDefault();
    }
  });
}


});



