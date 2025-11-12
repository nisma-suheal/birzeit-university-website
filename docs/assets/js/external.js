document.addEventListener("DOMContentLoaded", function () {
    const showProject = document.getElementById('showProject');
    const myProjectEmpty = document.getElementById('myProjectEmpty');
    const addProject = document.getElementById('addProject');

    showProject.addEventListener("click", (e) => {
        myProjectEmpty.classList.add('hidden');
        addProject.classList.remove('hidden');
    });


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

    const addProjectSection = document.getElementById('addProject');
    const projectsSection   = document.getElementById('projectsSection');   
    const form = addProjectSection.querySelector('form');                  
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addProjectSection.classList.add('hidden');
        projectsSection.classList.remove('hidden');

        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });


// student-list        
// const toggleBtns = document.querySelectorAll('.toggleRows');

// toggleBtns.forEach(btn => {
//   const tableContainer = btn.parentElement.parentElement;
//   const tableRows = tableContainer.querySelectorAll('.extra-row');

// btn.addEventListener('click', () => {
//   const isHidden = tableRows[0].classList.contains('hidden');
//   tableRows.forEach(row => row.classList.toggle('hidden'));
//   btn.textContent = isHidden ? 'See Less' : 'See More';
//     });
// });

});