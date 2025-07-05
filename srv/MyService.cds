using { girish.db.master } from '../db/datamodel';


service MyService @(path: 'MyService') {


    function api(name:String) returns String;


    entity EmployeesSrv as projection on master.employees;

}