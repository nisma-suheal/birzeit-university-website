document.addEventListener("DOMContentLoaded", function () {
   
  const noProject = document.getElementById("noProject");
  const projectTable = document.getElementById("projectTable");
  const projectLinks = document.querySelectorAll(".project-link");
  const projectDetails = document.getElementById("projectDetails");
  const addHoursForm = document.getElementById("addHoursForm");
  const AddHourBtn = document.getElementById("AddHour");

  const hasProjects = document.querySelectorAll("tbody tr:not(.hidden)").length > 0;

  if (hasProjects) {
    noProject.classList.add("hidden");
    projectTable.classList.remove("hidden");
  } else {
    noProject.classList.remove("hidden");
    projectTable.classList.add("hidden");
  }

  projectLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      projectTable.classList.add("hidden");
      projectDetails.classList.remove("hidden");
    });
  });

  if (AddHourBtn) {
    AddHourBtn.addEventListener("click", function () {
      addHoursForm.classList.remove("hidden");
      projectDetails.classList.add("hidden");
    });
  }
  

  document.getElementById("showMoreBtn").addEventListener("click", function () {
    document.querySelector('table').parentElement.classList.add('hidden');
    document.getElementById('projectDetails').classList.remove('hidden');
  });

  const sendBtn = document.querySelector("#addHoursForm button[type='submit']");

if (sendBtn) {
  sendBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const date = document.getElementById("workDate").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;
    const total = document.getElementById("totalHours").value;
    const note = document.getElementById("note").value;

    const errorBox = document.getElementById("errorMsg");

    if (!date || !start || !end || !total || !note) {
    errorBox.textContent = "Please fill in all fields";
    errorBox.classList.remove("hidden");
    return;
    } else {
    errorBox.classList.add("hidden");
    }

    const tbody = document.querySelector("#workingHoursTable tbody");
    const newRow = document.createElement("tr");
    newRow.className = "text-[#505050]";
    newRow.innerHTML = `
      <td class="pt-8 pr-4 whitespace-nowrap">${date}</td>
      <td class="pt-8 pr-4 whitespace-nowrap">${new Date().toLocaleDateString()}</td>
      <td class="pt-8 pr-4 whitespace-nowrap">${start}</td>
      <td class="pt-8 pr-4 whitespace-nowrap">${end}</td>
      <td class="pt-8 pr-4 whitespace-nowrap">${total}</td>
      <td class="pt-8 pr-4 whitespace-nowrap">${note}</td>
    `;
    tbody.appendChild(newRow);

    document.getElementById("addHoursForm").classList.add("hidden");
    document.getElementById("projectDetails").classList.remove("hidden");

    document.getElementById("workDate").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("totalHours").value = "";
    document.getElementById("note").value = "";
  });
}
  // Setup Image Preview Function
  function setupImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!input || !preview) return;

    input.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
        preview.classList.add("hidden");
      }
    });
  }

  setupImagePreview("upload-id-card", "preview-id-card");
  setupImagePreview("upload-university-id", "preview-university-id");
  setupImagePreview("upload-agreement", "preview-agreement");
  }
);
