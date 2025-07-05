   module.exports = cds.service.impl( async function(){

    const { POs, EmployeeSet } = this.entities;

    // generic handler-before employee data create or update

    this.before(['UPDATE','CREATE'],EmployeeSet, (req,res)=> {
         console.log('Create/Update aa gaya' + req.data.salaryAmount);

         if(parseFloat(req.data.salaryAmount) >= 100000){
          req.error(500,"Salary must be less than 1mn" );
         }
    })

    this.on('boost', async (req,res) => {
          // since instance bound it will get key by default
          const Id = req.params[0];
         console.log('This is your key' + JSON.stringify(Id));
        const tx = await cds.tx(req);
        let test = await tx.update(POs).with ({
            GROSS_AMOUNT: { '+=' : 20000 }
        }).where(Id);

        let reply = await tx.read(POs).where(Id);
        return reply;
        
    })

    
    this.on('getLargestOrder', async (req,res) => {
    try {        
        const tx = await cds.tx(req);
      let reply = await tx.read(POs).orderBy({ "GROSS_AMOUNT" : 'desc'}).limit(1);
      return reply;
    } catch (error) {
        return "Error aa gaya " + error.toString();
    }
      
  })
    

this.on('loadInitials', async (req,res) => {
  try {      
      return { OVERALL_STATUS : 'N' }
  } catch (error) {
      return "Error in setting default overall status " + error.toString();
  }
    
})

})
  