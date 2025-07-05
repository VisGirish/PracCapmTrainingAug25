 const cds = require('@sap/cds');
module.exports = function(srv){
    srv.on('api',(req,res) => {
        return 'Hello Amigo:, your name is' + req.data.name;
    });
    const { employees } = cds.entities('girish.db.master');
    srv.on('READ','EmployeesSrv', async (req,res) => {
        let tx = await cds.tx(req);
        // let allRecords = await tx.from(employees).limit(5);
        let allRecords = await tx.run(SELECT.from(employees).limit(5));
        // return allRecords;

        const updatedRecords = allRecords.map( record => ({
            ...record, //return all fields
            salaryAmount: record.salaryAmount * .88 
        }));
        return updatedRecords;
    });
}