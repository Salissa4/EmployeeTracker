const connection = require('./db');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');

require('console.table');

// Welcome text and initial prompts
init();
function init() {
  const lText = logo({ name: "Employee Manager", textColor: "yellow"}).render();

  //show in console
  console.log(lText);

  promptUser();
}

function promptUser() {
  inquirer.prompt(
    [ 
      {
        type: 'list',
        name: 'choice',
        message: 'Please select an option',
        choices: [
          { name: 'View ALL Employees',
            value: 'VIEW_EMPLOYEES'
          },
          { name: 'View ALL Roles',
            value: 'View_ROLES'
          },
          { name: 'View ALL Departments',
            value: 'View_DEPARTMENTS'
          },
          // Bonus
          { name: 'View ALL Employees by Department',
            value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
          },
          { name: 'View ALL Employees by Manager',
            value: 'VIEW_EMPLOYEES_BY_Manager'
          }, 
          { name: 'View Department Budget',
            value: 'VIEW_DEPARTMENT_BUDGET'
          }, //
          { name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          { name: "Add Role",
            value: "ADD_ROLE"
          },
          { name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          { name: 'Update Employee Role',
            value: 'UPDATE_EMPLOYEE_ROLE'
          },
          // Bonus
          { name: 'Update Employee Manager',
            value: 'UPDATE_EMPLOYEE_MANAGER'
          },
          { name: 'Remove Employee',
            value: 'REMOVE_EMPLOYEE'
          },
          { name: 'Remove Role',
            value: 'REMOVE_ROLE'
          },
          { name: 'Remove Department',
            value: 'REMOVE_DEPARTMENT'
          }, //
          { name: 'Quit',
            value: 'QUIT'
          }
        ]
      }
    ]).then(res => {
            let choice =res.choice;
            //switch 
            switch (choice) {
              case 'VIEW_EMPLOYEES': viewEmployees();
                break;
              case 'VIEW_ROLES': viewRoles();
                break;
              case 'VIEW_DEPARTMENTS': viewDepartments();
                break;
              case 'VIEW_EMPLOYEES_BY_DEPARTMENT': viewEmployeesByDepartment();
                break;
              case 'VIEW_EMPLOYEES_BY_MANAGER': viewEmployeesByManager();
                break;
              case 'VIEW_DEPARTMENT_BUDGET': viewDepartmentBudget();
                break;
              case 'ADD_EMPLOYEE': addEmployee();
                break;
              case 'ADD_ROLE': addRole();
                break;
              case 'ADD_DEPARTMENT': addDepartment();
                break;
              case 'UPDATE_EMPLOYEE_ROLE': updateEmployeeRole();
                break;
              case 'UPDATE_EMPLOYEE_MANAGER': updateEmployeeManager();
                break;
              case 'REMOVE_EMPLOYEE': removeEmployee();
                break;
              case 'REMOVE_ROLE': removeRole();
                break;
              case 'REMOVE_DEPARTMENT': removeDepartment();
                break;
              default:
                quit();  
            }
          })
}
// View all employees, all roles, all departments
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    }).then(() => promptUser());
    }

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    }).then(() => promptUser());
}

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    }).then(() => promptUser());
}

//view emp by dept, by manager
function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select department you wish to see employees',
          choices: departmentChoices
        }
      ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log('\n');
          console.table(employees);
        })
        .then(() => promptUser())
    });
}

function viewEmployeesByManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      let managers = rows;
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'managerId',
          message: 'Select employee you wish to see direct reports',
          choices: managerChoices
        }
      ])
        .then(res => db.findAllEmployeesByManager(res.managerId))
        .then(([rows]) => {
          let employees = rows;
          console.log('\n');
          if (employees.length === 0) {
            console.log('Selected employee has no direct reports');
          } else {
            console.table(employees);
          }
        })
        .then(() => promptUser())
    });
}

//view department budget
function viewDepartmentBudget() {
  db.viewDepartmentBudget()
  .then(([rows]) => {
    let budget = rows;
    console.log('\n');

  })
}