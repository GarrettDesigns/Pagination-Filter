// I know writing this in jQuery would have been easier and simpler
// however, I have a good deal of jQuery experience and not so much 
// writing vanilla JS, so as practice and as a challenge, I wrote this
// only using vanilla JS.

// NOTE: This is a work in progress.

"use strict"; // no monkey business

// Grab the students list and page element for global use
const students = document.querySelectorAll('.student-item'),
    page = document.getElementsByClassName('page')[0],

    // Create container for the pagination element
    pagination = document.createElement('UL'),

    // Changing this number changes pages generated as well as
    // configuring how many students to show and updates the pagination
    // click event accordingly
    studentsToShow = 10;

// Tell the app where to start looping through students ( see displayStudents() )
let startingStudentIndex = 0,
    // Calculate the total number of students available
    numStudents = document.getElementsByClassName('student-item').length;

// Assign the pagination list an id and class name
pagination.id = 'pagination-list';
pagination.className = 'pagination-list';

// Append the pagination list to the page
page.appendChild(pagination);

function createSearchBox() {
    // Function that creates and appends the search box markup
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
    // Hide all students initially
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }

    // Starting with whatever student is equal to the current starting index show all students
    // up to the amount of students to show set at the top of this file
    for (let i = startingStudentIndex; i <= (startingStudentIndex + studentsToShow); i++) {
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
    // Function to govern searching the list of students and it's output of the results

    // Get a reference to the pagination element and set searchResults to an empty array
    // to contain any results of the current search
    const paginationList = document.getElementById('pagination-list'),
        searchResults = [];

    // If there is a search error present set this variable equal to its contents
    // otherwise set it to an empty string
    let searchError = document.getElementById('search-error') ? document.getElementById('search-error') : '',
        // On search get the value of the search box, remove whitespace and set to lower case
        // for easier and more efficient comparison
        searchTerm = document.getElementById('student-search').firstElementChild.value.trim().toLowerCase();

    // Hide all students on search
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }

    // If the user has navigated to page other than 1 we need to 
    // reset the starting index to loop through the search results
    // from the beginning
    startingStudentIndex = 0;

    if (searchTerm !== '') {

        // If the user has entered anything into the search box
        for (let i = 0; i < students.length; i++) {

            // loop through the list of students and pull out the name and email
            const studentName = students[i].children[0].childNodes[3].textContent.trim().toLowerCase();
            const studentEmail = students[i].children[0].childNodes[5].textContent.trim().toLowerCase();

            if (studentName.indexOf(searchTerm) !== -1 || studentEmail.indexOf(searchTerm) !== -1) {
                // Push the name and email onto the searchResults array
                searchResults.push(students[i]);
            }

        }

        if (!searchResults.length && searchError === '') {
            // if there are no matches to the search and no errors

            // hide the pagination element
            paginationList.style.display = 'none';

            // and display an error message
            searchError = document.createElement('P');
            searchError.innerHTML = 'Sorry, no students found';
            searchError.className = 'search-error';
            searchError.id = 'search-error';
            page.appendChild(searchError);
        } else if (!searchResults.length && searchError !== '') {
            // if there are no matches and an error already exists keep
            // displaying that error
            searchError = searchError;
        } else {
            // If there are matches 

            if (searchError) {
                // and an error exists, remove it
                page.removeChild(searchError);
            }

            // then display the list of matched results
            paginationList.style.display = 'block';
            numStudents = searchResults.length;
            generatePagination(searchResults);
            displayStudents(searchResults);
        }

    } else {
        // If the user executes an empty search
        if (searchError === '') {
            // Display an error, and prevent the box from displaying multiple times
            paginationList.style.display = 'none';
            searchError = document.createElement('P');
            searchError.innerHTML = 'Please enter a student to search for.';
            searchError.className = 'search-error';
            searchError.id = 'search-error';
            page.appendChild(searchError);
        }
    }
}

function reset() {
    // Allow the user to reset the application after a search or error

    const searchError = document.getElementById('search-error'),
        studentSearch = document.getElementById('student-search'),
        paginationList = document.getElementById('pagination-list');

    studentSearch.firstElementChild.value = ''.trim();

    // if the search error is present, remove it
    if (searchError) {
        page.removeChild(searchError);
        for (let i = 0; i < students.length; i++) {
            students[i].style.display = 'block';
        }
    }

    // reset starting index to display the first ten students
    startingStudentIndex = 0;

    // if the pagination is hidden make sure it's displayed again
    paginationList.style.display = 'block';

    // reset the students to display all students and generate the correct number of pages
    numStudents = students.length;

    // generate pages and display students
    generatePagination(students);
    displayStudents(students);
}

// Initialize application with appropriate elements and event handlers
createSearchBox();
generatePagination(students);
displayStudents(students);

document.getElementById('search-button').addEventListener('click', () => {
    search();
});

document.getElementById('reset-button').addEventListener('click', () => {
    reset();
});