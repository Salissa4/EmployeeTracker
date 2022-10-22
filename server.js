const db = require('./db');
const inquirer = require('inquirer');
const main = require('asciiart-logo');

require('console.table');

// Welcome text and initial prompts
init();
function init() {
  const mainText = main({ name: "Employee Manager", textColor: "yellow"}).render();

  //show in console
  console.log(mainText);

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
    console.log(budget);
  })
  .then(() => promptUser());
}

//add employee
function addEmployee() {
  prompt([
    {
      name: 'first_name',
      message: "Enter employee's first name:"
    },
    {
      name: 'last_name',
      message: "Enter employee's last name:"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: 'list',
            name: 'roleId',
            message: "Select employee's role",
            choices: roleChoices
          })
          .then(res => {
            let roleId = res.roleId;
              db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
              const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
                }));
                managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: 'list',
            name: 'managerId',
            message: "Select employee's manager:",
            choices: managerChoices
          })
            .then(res => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
              }
            db.createEmployee(employee);
            })
            .then(() => console.log(`Employee ${firstName} ${lastName} has been added!`))
            .then(() => promptUser())
            })
            })
        })
    })
}

//add role
function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          name: 'title',
          message: 'Enter name of new role'
        },
        {
          name: 'salary',
          message: 'Enter role salary:'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select role department:',
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Role ${role.title} has been added!`))
            .then(() => promptUser())
        })
    })
}

//add department
function addDepartment() {
  prompt([
    {
      name: 'name',
      message: 'Enter new department name:'
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Department ${name.name} has been added!`))
        .then(() => promptUser())
    })
}

//update employee role
function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select employee to update role:',
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));

              prompt([
                {
                  type: 'list',
                  name: 'roleId',
                  message: "Select employee's new role",
                  choices: roleChoices
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log('Employee role has been updated!'))
                .then(() => promptUser())
            });
        });
    })
}

// Update an employee's manager
function updateEmployeeManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Select employee's manager to update:",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId
          db.findAllPossibleManagers(employeeId)
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
                  message:
                    "Select new manager for employee:",
                  choices: managerChoices
                }
              ])
                .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                .then(() => console.log("Employee's manager has been updated!"))
                .then(() => promptUser())
            })
        })
    })
}

// remove employee, role, department
function removeEmployee() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Select employee to remove:",
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log("Employee has been removed!"))
        .then(() => promptUser())
    })
}

function removeRole() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'roleId',
          message:
            "Select role to remove. NOTE: Associated employee will also be removed!!",
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleId))
        .then(() => console.log("Role has been removed!"))
        .then(() => promptUser())
    })
}

// Delete a department
function removeDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt({
        type: 'list',
        name: 'departmentId',
        message:
          "Select department to remove. NOTE: Associated employee and role will also be removed!!",
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log("Removed department from the database"))
        .then(() => promptUser())
    })
}

// quit
function quit() {
  console.log("Adios!!!");
  process.exit();
}