// I know writing this in jQuery would have been easier and simpler
// however, I have a good deal of jQuery experience and not so much 
// writing vanilla JS, so as practice and as a challenge, I wrote this
// only using vanilla JS.

// NOTE: This is a work in progress.

"use strict"; // no monkey business

const students = document.querySelectorAll('.student-item'),
    page = document.getElementsByClassName('page')[0],
    // Create container for the pagination element
    pagination = document.createElement('UL'),

    // Changing this number changes pages generated as well as
    // configuring how many students to show and updates the pagination
    // click event accordingly
    studentsToShow = 10;

let startingStudentIndex = 0,
    numStudents = document.getElementsByClassName('student-item').length;

pagination.id = 'pagination-list';
pagination.className = 'pagination-list';
page.appendChild(pagination);

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

function displayStudents(students) {
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

function generatePagination(students) {
    // get the page div, total number of students and calculate
    // the number of pages that need to be generated
    const numPages = Math.ceil(numStudents / studentsToShow);
    let pageList = '';

    if (students.length > 10) {
        // Loop through the number of pages and assign a number
        // for each pages to a list item in the pagination element
        for (let i = 1; i <= numPages; i++) {
            if (i === 1) {
                pageList += `<li class="page-marker active" value="${i}">${i}</li>`;
            } else {
                pageList += `<li class="page-marker" value="${i}">${i}</li>`;
            }
        }
    }

    // Set the inner html of the pagination list 
    // to the list items generated above
    pagination.innerHTML = pageList;

    const pageMarker = document.getElementsByClassName('page-marker');

    // Loop through students and attach event listeners 
    for (let i = 0; i < pageMarker.length; i++) {
        pageMarker[i].addEventListener('click', () => {
            startingStudentIndex = (pageMarker[i].value * studentsToShow) - studentsToShow;
            displayStudents(students);
            let activeLinks = document.querySelectorAll('.page-marker.active');
            for (let i = 0; i < activeLinks.length; i++) {
                activeLinks[i].classList.remove('active');
            }
            pageMarker[i].classList.add('active');
        });
    }
}

function search() {

    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }

    let searchTerm = document.getElementById('student-search').firstElementChild.value.trim();
    const searchResults = [];

    if (searchTerm !== '') {
        for (let i = 0; i < students.length; i++) {
            const studentName = students[i].children[0].childNodes[3].textContent.trim();
            const studentEmail = students[i].children[0].childNodes[5].textContent.trim();
            if (studentName.indexOf(searchTerm) !== -1 || studentEmail.indexOf(searchTerm) !== -1) {
                searchResults.push(students[i]);
            }
        }

        if (!searchResults.length) {
            const searchError = document.createElement('P');
            searchError.innerHTML = 'Sorry, no students found';
            searchError.className = 'search-error';
            searchError.id = 'search-error';
            page.appendChild(searchError);
        } else {
            numStudents = searchResults.length;
            generatePagination(searchResults);
            displayStudents(searchResults);
        }

    } else {
        const searchError = document.createElement('P');
        searchError.innerHTML = 'Please enter a student to search for.';
        searchError.className = 'search-error';
        searchError.id = 'search-error';
        page.appendChild(searchError);
    }
}

function reset() {

    const searchError = document.getElementById('search-error'),
        studentSearch = document.getElementById('student-search');

    studentSearch.firstElementChild.value = ''.trim();

    if (searchError) {
        page.removeChild(searchError);
        for (let i = 0; i < students.length; i++) {
            students[i].style.display = 'block';
        }
    }

    startingStudentIndex = 0;

    numStudents = students.length;
    generatePagination(students);
    displayStudents(students);
}

createSearchBox();
generatePagination(students);
displayStudents(students);

document.getElementById('search-button').addEventListener('click', () => {
    search();
});

document.getElementById('reset-button').addEventListener('click', () => {
    reset();
});