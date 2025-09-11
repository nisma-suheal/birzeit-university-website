document.addEventListener("DOMContentLoaded", function () {

    const tabButtons = document.querySelectorAll('button[data-tab]');
    const tabContents = document.querySelectorAll('.tabs');

    tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-tab');
        tabContents.forEach(content => content.classList.add('hidden'));
        document.getElementById(targetId).classList.remove('hidden');
    });
    });

    
    const dropdown = document.getElementById('dropdownMenu');
    const dropdown_toggle = document.getElementById('dropdown-toggle');

    dropdown_toggle.addEventListener("click", function() {
        dropdown.classList.toggle('hidden');
    });


    const submitBtn = document.getElementById("submitProjectBtn");
    const submitSection = document.getElementById("submitProjectSection");

    submitBtn.addEventListener("click", function () {
      submitSection.classList.toggle("hidden");
    });


    window.addEventListener('click', function(e) {
      const dropdown = document.getElementById('dropdownMenu');
      const isButton = e.target.closest('button');
      const isToggle = e.target.closest('#dropdown-toggle');

      if (!dropdown.contains(e.target) && !isButton && !isToggle) {
        dropdown.classList.add('hidden');
      }
    });


   let rowToDelete = null;

  document.querySelectorAll("td button").forEach((btn) => {
    if (btn.textContent.trim() === "Delete") {
      btn.addEventListener("click", function () {
        rowToDelete = this;
        document.getElementById("deleteConfirmModal").classList.remove("opacity-0", "pointer-events-none");
      });
    }
  });

  document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
    if (rowToDelete) {
      rowToDelete.textContent = "Deleted";
      rowToDelete.disabled = true;
      
      const row = rowToDelete.closest("td");
      const approveBtn = row.querySelector("button:not(:disabled):not([class*='red'])");
      if (approveBtn && approveBtn.textContent.trim() === "Approve") {
        approveBtn.parentElement.remove();
      }
    }
    closeModal();
  });

  function cancelDelete() {
    closeModal();
  }

  function closeModal() {
    document.getElementById("deleteConfirmModal").classList.add("opacity-0", "pointer-events-none");
  }

  document.querySelectorAll("td button").forEach((btn) => {
    if (btn.textContent.trim() === "Approve") {
      btn.addEventListener("click", function () {
        this.textContent = "Approved";
        this.disabled = true;
        

        const row = this.closest("td");
        const deleteBtn = row.querySelector("button:not(:disabled):not([class*='green'])");
        if (deleteBtn && deleteBtn.textContent.trim() === "Delete") {
          deleteBtn.parentElement.remove();
        }
      });
    }
  });

});