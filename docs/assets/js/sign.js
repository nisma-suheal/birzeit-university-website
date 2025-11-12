    function signin(event) {
      event.preventDefault();
      const role = document.getElementById("roleSelect").value.trim();
      localStorage.setItem("role", role);
      window.location.href = "../index.html";
   }


    function SignUp(event) {
      event.preventDefault();
      const role = document.getElementById("roleSelect").value.trim();
      localStorage.setItem("role", role);
      window.location.href = "../index.html";
   }

    if(!role){
        window.location.href = "../sgin-in.html"
    }


    function showSection(id) {
  const sections = ["forgotPassword", "otp", "resetPassword", "otpForm"];
  sections.forEach(sectionId => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.classList.add("hidden");
    }
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove("hidden");
  }
}

function goToOTP(event) {
  event.preventDefault();

  const email = document.getElementById("resetEmail").value.trim();
  const errorMessage = document.getElementById("error-message");

  if (!email) {
    errorMessage.textContent = "يرجى إدخال البريد الإلكتروني";
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

  console.log("Email entered:", email);
  // داخل goToOTP(event)
console.log("Email entered:", email);

// إرسال البريد للسيرفر
fetch("https://example.com/api/auth/forgot-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"   // نحدد أن البيانات JSON
  },
  body: JSON.stringify({ email })        // نحول البريد لـ JSON ونرسله
})
.then(response => {
  if (!response.ok) {
    throw new Error("حدث خطأ أثناء إرسال البريد");
  }
  return response.json();
})
.then(data => {
  console.log("Server response:", data);

  // لو السيرفر قال إن البريد صحيح و أرسل OTP
  // نعرض شاشة إدخال الكود
  showSection("otp");
})
.catch(error => {
  console.error(error);
  alert("تعذر إرسال البريد، حاول لاحقًا");
});


  // عرض شاشة إدخال الكود
  showSection("otp");
}

// 2. عند إرسال كود OTP (رمز التحقق)
function goToReset(event) {
  if (event) event.preventDefault();

  // تأكد ان جميع الحقول في OTP معبئة
  const otpInputs = document.querySelectorAll("#otp input[type='text']");
  let otpCode = "";
  for (const input of otpInputs) {
    if (input.value.trim() === "") {
      return;
    }
    otpCode += input.value.trim();
  }

  // هنا ممكن تضيف التحقق من كود OTP مع السيرفر
  console.log("OTP entered:", otpCode);

  // عرض شاشة إعادة تعيين كلمة المرور
  showSection("resetPassword");
}

// 3. عند إرسال كلمة المرور الجديدة
function resetDone(event) {
  event.preventDefault();

  const newPass = document.getElementById("newPassword").value.trim();
  const confirmPass = document.getElementById("confirmPassword").value.trim();

  if (!newPass || !confirmPass) {
    alert("يرجى إدخال كلمة المرور وتأكيدها");
    return;
  }
  if (newPass !== confirmPass) {
    alert("كلمة المرور غير متطابقة");
    return;
  }

  // هنا ممكن تضيف كود ارسال كلمة المرور الجديدة للAPI
  console.log("Password reset to:", newPass);

  alert("تم إعادة تعيين كلمة المرور بنجاح!");

  // ارجع للصفحة الرئيسية لتسجيل الدخول
  window.location.href = "../auth/sign-in.html";
}

// ربط الأحداث عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const forgotForm = document.querySelector("#forgotPassword form");
  if (forgotForm) forgotForm.onsubmit = goToOTP;

  const otpForm = document.querySelector("#otp form");
  if (otpForm) otpForm.onsubmit = goToReset;

  const resetForm = document.querySelector("#resetPassword form");
  if (resetForm) resetForm.onsubmit = resetDone;
});