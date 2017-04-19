"use strict"; // no monkey business

const students = document.querySelectorAll('.student-item');
const startingStudentIndex = 0;
const studentsToShow = 10;

for (let i = 0; i < students.length; i++) {
    students[i].style.display = 'none';
}

function createSearchBox() {
    const searchBoxMarkup = '<input placeholder="Search for students...">' +
        '<button>Search</button>';

    const studentSearch = document.createElement('DIV'),
        pageHeader = document.getElementsByClassName('page-header')[0];

    studentSearch.className = 'student-search';
    studentSearch.innerHTML = searchBoxMarkup;
    pageHeader.appendChild(studentSearch);
}

function generatePagination() {
    // get the page div, total number of students and calculate
    // the number of pages that need to be generated
    const page = document.getElementsByClassName('page')[0],
        numStudents = document.getElementsByClassName('student-item').length,
        numPages = Math.ceil(numStudents / 10);

    // Create container for the pagination element
    const pagination = document.createElement('UL');
    pagination.className = 'pagination-list';

    let pageList = '';

    // Loop through the number of pages and assign a number
    // for each pages to a list item in the pagination element
    for (let i = 1; i <= numPages; i++) {
        pageList += `<li class="page-marker">${i}</li>`;
    }

    // Set the inner html of the pagination list 
    // to the list items generated above
    pagination.innerHTML = pageList;

    // Append the entire pagination element to the page element 
    page.appendChild(pagination);
}

function filterStudents() {
    // When a use clicks on a page number, they should see ten results
    for (let i = startingStudentIndex; i < (startingStudentIndex + studentsToShow); i++) {
        students[i].style.display = 'block';
    }
}


createSearchBox();
generatePagination();
filterStudents();