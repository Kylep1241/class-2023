function webapp_02() {

    //Get elements


    var anchorNavCustomer = document.getElementById("anchor-nav-customer");
    var anchorNavEmployee = document.getElementById("anchor-nav-employee");

    var pageCustomer = document.getElementById("page-customer")
    var pageEmployee = document.getElementById("page-employee")

    var textSearch = document.getElementById("text-search");

    var buttonSearch = document.getElementById("button-search");
    var buttonSearchClear = document.getElementById("button-search-clear");

    var employeeTable = document.getElementById("employee-table");

    var buttonInsert = document.getElementById("button-insert");
    var buttonInsertCancel = document.getElementById("button-insert-cancel");

    //Add event listeners

    anchorNavCustomer.addEventListener("click", handleClickAnchorNavCustomer);
    anchorNavEmployee.addEventListener("click", handleClickAnchorNavEmployee);

    buttonSearch.addEventListener("click", searchEmployees);
    buttonSearchClear.addEventListener("click", searchClear);

    buttonInsert.addEventListener("click", insertEmployee);
    buttonInsertCancel.addEventListener("click", insertEmployeeCancel);

    //Functions

    function handleClickAnchorNavCustomer(e) {
        pageCustomer.classlist.remove("visually-hidden");
        pageEmployee.classlist.add("visually-hidden");
        e.preventDefault();
    }

    function handleClickAnchorNavEmployee(e) {
        pageCustomer.classlist.add("visually-hidden");
        pageEmployee.classlist.remove("visually-hidden");
        e.preventDefault();
    }


    function searchEmployees() {

        var url = 'http://localhost:5120/SearchEmployees?search=' + textSearch.value;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterSearchEmployees;
        xhr.open('GET', url);
        xhr.send(null);

        function doAfterSearchEmployees() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        };

    };

    function showEmployees(employees) {
        var employeeTableText = '<table class="table table-striped table-sm"><thead><tr><th scope="col">Empoyee ID</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Salary</th></tr></thead><tbody>';

        for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];

            employeeTableText = employeeTableText + '<tr><th scope="row">' + employee.employeeId + '</th><td>' + employee.firstName + '</td><td>' + employee.lastName + '</td><td>' + employee.salary + '</td></tr>';
        }

        employeeTableText = employeeTableText + '</tbody></table>';

        employeeTable.innerHTML = employeeTableText;
    }

    function searchClear() {
        textSearch.value = "";
        searchEmployees();
    }

    function insertEmployee() {

        var textFirstName = document.getElementById("text-insert-first-name");
        var textLastName = document.getElementById("text-insert-last-name");
        var textSalary = document.getElementById("text-insert-salary");

        var url = 'http://localhost:5120/InsertEmployee?lastName=' + textLastName.value + '&firstName=' + textFirstName.value + '&salary=' + textSalary.value;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterInsertEmployee;
        xhr.open('GET', url);
        xhr.send(null);

        function doAfterInsertEmployee() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        };

        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";

    };

    function insertEmployeeCancel() {

        var textFirstName = document.getElementById("text-insert-first-name");
        var textLastName = document.getElementById("text-insert-last-name");
        var textSalary = document.getElementById("text-insert-salary");

        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";

    }

    //Update functions go here.


    //Delete functions go here.


    //Invoke searchEmployees() on load
    searchEmployees();
}

webapp_02();

