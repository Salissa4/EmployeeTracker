const connection = require("./connection");

class DB {
    constructor(connection) {
      this.connection = connection;
    }

//create employee
addEmployee(employee) {
  return this.connection.promise().query(
    "INSERT INTO employee SET ?", employee);
}

// create a new role
createRole(role) {
  return this.connection.promise().query(
    "INSERT INTO role SET ?", role);
}

// create a new department
createDepartment(department) {
  return this.connection.promise().query(
    "INSERT INTO department SET ?", department);
}

// update employee's role
updateEmployeeRole(employeeId, roleId) {
  return this.connection.promise().query(
    "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
  );
}

// update employee's manager
updateEmployeeManager(employeeId, managerId) {
  return this.connection.promise().query(
    "UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]
  );
}

// delete an employee 
removeEmployee(employeeId) {
  return this.connection.promise().query(
    "DELETE FROM employee WHERE id = ?", employeeId
  );
}

// delete a role 
removeRole(roleId) {
  return this.connection.promise().query("DELETE FROM role WHERE id= ?", roleId);
}

// delete a department
removeDepartment(departmentId) {
  return this.connection.promise().query(
    "DELETE FROM department WHERE id = ?", departmentId
    );
}
}

module.exports = new DB(connection);
