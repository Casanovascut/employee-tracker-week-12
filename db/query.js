const inquirer = require('inquirer');
const mysql = require('mysql2');
// SQL connection
const { connection } = require('../connection')

// promise to view all roles
const viewAllRoles = () => {
    return new Promise((resolve, reject) => {
    connection.query('SELECT role. *, department.name FROM role JOIN department ON role.department_id = department.id;',    (error, results) => {
        if (error) {
            reject(error);
        } else {
            console.table(results);
            resolve();
        }
        });
    });
};

// promise to view all employees
const viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
    connection.query(`SELECT employee.*,role.title FROM employee JOIN role ON employee.role_id = role.id;            `, (error, results) => {
        if (error) {
            reject(error);
        } else {
            console.table(results);
            resolve();
        }
        });
    });
};

// promise to view all departments
const viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM employeetracker_db.department;', (error, results) => {
        if (error) {
            reject(error);
        } else {
            console.table(results);
            resolve();
        }
        });
    });
};

// adds new role
const addRole = () => {
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT id, name FROM department`,(error,results)=>{
            if (error) {
                reject(error);
            } else {
                inquirer.prompt([
                    {
                        //asks name of role
                        type:  'input',
                        name: 'title',
                        message: 'What is the name of the new role?'
                    },
                    {
                        // asks salary of role
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for the new role?'
                    },
                    {
                        // asks which department the role belongs to
                        type: 'list',
                        name: 'department',
                        message: 'What department does the new role belong to?',
                        choices: results.map(department =>{
                            // returns all of the departments
                            return {
                                name: department.name,
                                value: department.id
                            };
                        })
                    }
                ]).then(answers => {
                    // adds role to database
                    connection.query(
                        `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`,[answers.title,answers.salary,answers.department], (error,results) => {
                            if (error) {
                                reject(error);
                            } else {
                                // console logs name of the new role added to database
                                console.log('The new role has been added to the database.');
                                resolve();
                            }
                        }
                    )
                }

                )
            }
        })
    })
}






// adds new department
const addDepartment = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new department?'
        }
    ]).then(answers => {
      // Insert the new department into the database
        connection.query(
        `INSERT INTO department (name) VALUES (?)`,
        [answers.name],
        (error, results) => {
            if (error) {
            throw error;
            } else {
            console.log('The new department has been added to the database.');
            }
        }
        );
    });
};
    // asks the name of the department
    // adds department to database
    // console logs name of the new department added to database

const getEmployees = () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id, first_name, last_name FROM employee`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
            });
        });
    };

const getRoles = () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id, title FROM role`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// adds new employee
const addEmployee = () => {
    getRoles().then(roles => {
        inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee role?',
            choices: roles.map(role => {
            return {
                name: role.title,
                value: role.id
            };
        })
        }
    ]).then(answers => {
        // Insert the new employee into the database
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`,
            [answers.firstName, answers.lastName, answers.role],
        (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log('The new employee has been added to the database.');
            }
            } 
            );
        });
    });
};

const updateRole = () =>{
    getEmployees().then(employees => {
        getRoles().then(roles => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee do you want to update?',
                    choices: employees.map(employee => {
                    return {
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        };
                    })
                },
                {
                    type: 'list',
                    name: 'roleChange',
                    message: 'what role is this employee changing too?',
                    choices: roles.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        };
                    })
                }
            ]).then( answers => {
                connection.query(
                    `UPDATE employee SET role_id = ? WHERE id = ?`,
                    [answers.role, answers.employee],
                    (error, results) => {
                        if (error) {
                        throw error;
                        } else {
                        console.log('The employee role has been updated in the database.');
                        }
                    }
                )
            })
        })
    })
}
    // asks which employee to update
    // asks which role you want to assign
    // updates employee in database
    // console logs updated employee role

module.exports = {viewAllEmployees,viewAllRoles,viewAllDepartments,addRole,addDepartment,addEmployee,updateRole};