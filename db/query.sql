/*joins role and department tables*/
SELECT *
FROM role
JOIN department ON role.department_id = department.id;

/*joins role and employee tables*/

SELECT *
FROM employee
JOIN role ON employee.role_id = role.id;
