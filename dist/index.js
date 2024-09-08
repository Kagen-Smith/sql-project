"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const queries_1 = require("./queries");
// Main function to display the menu and handle user input
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    let exit = false;
    // Loop to keep displaying the menu until the user exits
    while (!exit) {
        // Prompt the user for their choice
        const { choice } = yield inquirer_1.default.prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add Department',
                'Delete Department',
                'View All Roles',
                'Add Role',
                'Delete Role',
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View Employees By Manager',
                'View Employees By Department',
                'Delete Employee',
                'View Combined Salaries',
                'Exit'
            ]
        });
        // Handle each menu choice with appropriate actions
        switch (choice) {
            // View all departments
            case 'View All Departments':
                const departments = yield (0, queries_1.viewAllDepartments)();
                console.table(departments);
                break;
            // Add a department
            case 'Add Department':
                const { departmentName } = yield inquirer_1.default.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the department?'
                });
                const newDepartment = yield (0, queries_1.addDepartment)(departmentName);
                console.log('Department added: ', newDepartment);
                break;
            // Delete a department
            case 'Delete Department':
                const { id } = yield inquirer_1.default.prompt({
                    type: 'input',
                    name: 'id',
                    message: 'What is the ID of the department you would like to delete?'
                });
                const deletedDepartment = yield (0, queries_1.deleteDepartment)(parseInt(id));
                console.log('Department deleted');
                break;
            // View all roles
            case 'View All Roles':
                const roles = yield (0, queries_1.viewAllRoles)();
                console.table(roles);
                break;
            // Add a role
            case 'Add Role':
                const departmentsForRole = yield (0, queries_1.viewAllDepartments)();
                const departmentChoices = departmentsForRole.map(department => ({
                    name: department["Name"],
                    value: department["ID"]
                }));
                const { title, salary, department_id } = yield inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: value => !isNaN(value) ? true : 'Please enter a number'
                    },
                    {
                        type: 'list',
                        name: 'department_id',
                        message: 'Which department does the role belong to?',
                        choices: departmentChoices
                    }
                ]);
                const newRole = yield (0, queries_1.addRole)(title, parseFloat(salary), parseInt(department_id));
                console.log('Role added: ', newRole);
                break;
            // Delete a role
            case 'Delete Role':
                const { deleteRoleId } = yield inquirer_1.default.prompt({
                    type: 'input',
                    name: 'deleteRoleId',
                    message: 'Enter the ID of the role to delete:'
                });
                yield (0, queries_1.deleteRole)(parseInt(deleteRoleId));
                console.log('Role deleted');
                break;
            // View all employees
            case 'View All Employees':
                const employees = yield (0, queries_1.viewAllEmployees)();
                console.table(employees);
                break;
            // Add an employee
            case 'Add Employee':
                const rolesForEmployee = yield (0, queries_1.viewAllRoles)();
                const roleChoices = rolesForEmployee.map(role => ({
                    value: role["Role ID"],
                    name: role["Title"]
                }));
                const employeesForManager = yield (0, queries_1.viewAllEmployees)();
                const managerChoices = employeesForManager.filter(employee => employee.manager_id !== null).map(employee => ({
                    value: employee["Employee ID"],
                    name: `${employee["First Name"]} ${employee["Last Name"]}`
                }));
                const { first_name, last_name, role_id, manager_id } = yield inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'What is the employee\'s role?',
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: 'What is the name of the employee\'s manager?',
                        choices: [
                            { value: null, name: 'None' },
                            ...managerChoices
                        ]
                    }
                ]);
                const newEmployee = yield (0, queries_1.addEmployee)(first_name, last_name, parseInt(role_id), manager_id ? parseInt(manager_id) : null);
                console.log('Employee added: ', newEmployee);
                break;
            // Update an employee's role
            case 'Update Employee Role':
                const employeesForUpdate = yield (0, queries_1.viewAllEmployees)();
                const employeeRoleChoices = employeesForUpdate.map(employee => ({
                    name: `${employee["First Name"]} ${employee["Last Name"]}`,
                    value: employee["Employee ID"]
                }));
                const rolesForUpdate = yield (0, queries_1.viewAllRoles)();
                const roleChoicesForUpdate = rolesForUpdate.map(role => ({
                    name: role["Title"],
                    value: role["Role ID"]
                }));
                const { updateEmpRole, newEmpRole } = yield inquirer_1.default.prompt([
                    {
                        type: 'list',
                        name: 'updateEmpRole',
                        message: 'Which employee do you want to update?',
                        choices: employeeRoleChoices
                    },
                    {
                        type: 'list',
                        name: 'newEmpRole',
                        message: 'Which role do you want to assign to the selected employee?',
                        choices: roleChoicesForUpdate
                    }
                ]);
                yield (0, queries_1.updateEmployeeRole)(parseInt(updateEmpRole), parseInt(newEmpRole));
                console.log('Employee role updated');
                break;
            // Update an employee's manager
            case 'Update Employee Manager':
                const { updateEmpIdManager, newManagerId } = yield inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'updateEmpIdManager',
                        message: 'Enter the ID of the employee to update:'
                    },
                    {
                        type: 'input',
                        name: 'newManagerId',
                        message: 'Enter the new manager ID for the employee (or leave blank if none):',
                    }
                ]);
                yield (0, queries_1.updateEmployeeManager)(parseInt(updateEmpIdManager), newManagerId ? parseInt(newManagerId) : null);
                console.log('Employee manager updated');
                break;
            // View employees by manager
            case 'View Employees By Manager':
                const { managerIdToView } = yield inquirer_1.default.prompt({
                    type: 'input',
                    name: 'managerIdToView',
                    message: 'Enter the ID of the manager to view employees for:'
                });
                const employeesByManager = yield (0, queries_1.viewEmployeesByManager)(parseInt(managerIdToView));
                console.table(employeesByManager);
                break;
            // View employees by department
            case 'View Employees By Department':
                const { departmentNameToView } = yield inquirer_1.default.prompt({
                    type: 'input',
                    name: 'departmentNameToView',
                    message: 'Enter the name of the department:'
                });
                const employeesByDepartment = yield (0, queries_1.viewEmployeesByDepartment)(departmentNameToView);
                console.table(employeesByDepartment);
                break;
            // Delete an employee
            case 'Delete Employee':
                const { deleteEmpId } = yield inquirer_1.default.prompt({
                    type: 'input',
                    name: 'deleteEmpId',
                    message: 'Enter the ID of the employee to delete:'
                });
                yield (0, queries_1.deleteEmployee)(parseInt(deleteEmpId));
                console.log('Employee deleted');
                break;
            // View combined salaries
            case 'View Combined Salaries':
                const combinedSalaries = yield (0, queries_1.viewCombinedSalaries)();
                console.table(combinedSalaries);
                break;
            // Exit the program
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
            // Handle invalid option
            default:
                console.log('Invalid option');
                break;
        }
    }
});
// Execute the main menu function
mainMenu();
