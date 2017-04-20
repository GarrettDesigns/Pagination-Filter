"use strict"; // no monkey business

const students = document.querySelectorAll('.student-item'),

    // Changing this number changes pages generated as well as
    // configuring how many students to show and updates the pagination
    // click event accordingly
    studentsToShow = 10;

let startingStudentIndex = 0;


function createSearchBox() {
    const searchBoxMarkup = `<input placeholder="Search for students...">
        <button id="search-button">Search</button><button id="reset-button">Reset</button>`;

    const studentSearch = document.createElement('DIV'),
        pageHeader = document.getElementsByClassName('page-header')[0];

    studentSearch.className = 'student-search';
    studentSearch.id = 'student-search';
    studentSearch.innerHTML = searchBoxMarkup;
    pageHeader.appendChild(studentSearch);
}

function generatePagination() {
    // get the page div, total number of students and calculate
    // the number of pages that need to be generated
    const page = document.getElementsByClassName('page')[0],
        numStudents = document.getElementsByClassName('student-item').length,
        numPages = Math.ceil(numStudents / studentsToShow);

    // Create container for the pagination element
    const pagination = document.createElement('UL');
    pagination.id = 'pagination-list';
    pagination.className = 'pagination-list';

    let pageList = '';

    // Loop through the number of pages and assign a number
    // for each pages to a list item in the pagination element
    for (let i = 1; i <= numPages; i++) {
        if (i === 1) {
            pageList += `<li class="page-marker active" value="${i}">${i}</li>`;
        } else {
            pageList += `<li class="page-marker" value="${i}">${i}</li>`;
        }
    }

    // Set the inner html of the pagination list 
    // to the list items generated above
    pagination.innerHTML = pageList;

    // Append the entire pagination element to the page element 
    page.appendChild(pagination);
}

function displayStudents() {
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }

    for (let i = startingStudentIndex; i < (startingStudentIndex + studentsToShow); i++) {
        try {
            students[i].style.display = 'block';
        } catch (e) {
            break;
        }
    }
}

function filterStudents() {
    // When a use clicks on a page number, they should see ten results
    displayStudents();

    const pageMarker = document.getElementsByClassName('page-marker');

    // Loop through students and attach event listeners 
    for (let i = 0; i < pageMarker.length; i++) {
        pageMarker[i].addEventListener('click', () => {
            startingStudentIndex = (pageMarker[i].value * studentsToShow) - studentsToShow;
            displayStudents();
            let activeLinks = document.querySelectorAll('.page-marker.active');
            for (let i = 0; i < activeLinks.length; i++) {
                activeLinks[i].classList.remove('active');
            }
            pageMarker[i].classList.add('active');
        });
    }
}

function search() {
    document.getElementById('pagination-list').style.display = 'none';

    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }

    let searchTerm = document.getElementById('student-search').firstElementChild.value;
    const foundStudents = [];

    for (let i = 0; i < students.length; i++) {
        const studentName = students[i].children[0].childNodes[3].textContent;
        const studentEmail = students[i].children[0].childNodes[5].textContent;
        if (studentName.indexOf(searchTerm) !== -1 || studentEmail.indexOf(searchTerm) !== -1) {
            students[i].style.display = 'block';
            foundStudents.push(students[i]);
        }
    }
    if (!foundStudents.length) {
        const searchError = document.createElement('P');
        searchError.innerHTML = 'Sorry, no students found';
        searchError.className = 'search-error';
        searchError.id = 'search-error';

        document.getElementsByClassName('page')[0].appendChild(searchError);
    }
}

function reset() {

    document.getElementById('student-search').firstElementChild.value = '';
    document.getElementById('pagination-list').firstElementChild.click();
    document.getElementById('pagination-list').style.display = 'block';

    const searchError = document.getElementById('search-error');
    if (searchError) {
        document.getElementsByClassName('page')[0].removeChild(searchError);
    }
}

createSearchBox();
generatePagination();
filterStudents();

document.getElementById('search-button').addEventListener('click', () => {
    search();
});

document.getElementById('reset-button').addEventListener('click', () => {
    reset();
});