"use strict"; // no monkey business

function createSearchBox() {
    const searchBoxMarkup = '<input placeholder="Search for students...">' +
        '<button>Search</button>';

    const studentSearch = document.createElement('DIV'),
        pageHeader = document.getElementsByClassName('page-header')[0];

    studentSearch.className = 'student-search';
    studentSearch.innerHTML = searchBoxMarkup;
    pageHeader.appendChild(studentSearch);
}

createSearchBox();