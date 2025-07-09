using { girish.db.master, girish.db.transaction } from '../db/datamodel';
using { cappo.cds  } from '../db/CDSView';


service CatalogService @(path: 'CatalogService', requires:'authenticated-user') {

 
    entity EmployeeSet 
    @(restrict: [ { grant: 'READ', to:'Viewer', where: 'bankName = $user.BankName' }, 
                  { grant: 'WRITE', to:'Admin' } ])
                  as projection on master.employees;
    entity AddressSet as projection on master.address;
    entity businesspartner as projection on master.businesspartner;
    entity ProductSet as projection on master.product;

    entity POs @(odata.draft.enabled: true,
                  Common.DefaultValuesFunction: 'loadInitials' ) as 
                  projection on transaction.purchaseorder{
        *,
        case OVERALL_STATUS
          when 'N' then 'New'
          when 'D' then 'Delivered'
          when 'P' then 'Pending'
          when 'A' then 'Approved'
          when 'X' then 'Rejected'
          end as OverallStatus : String(30),
         
        case OVERALL_STATUS
          when 'N' then 2
          when 'D' then 2
          when 'P' then 3
          when 'A' then 3
          when 'X' then 1
          end as IconColor : Integer

    }
    //instance bound action
    actions{
       @Common.SideEffects : {
           TargetProperties : [
            'in/GROSS_AMOUNT'
           ]
           
       }
        action boost() returns POs;
    };
    entity POItems as projection on transaction.poitems;

    // entity CDSSet as projection on cds.CDSViews.ProductView


    function loadInitials() returns POs;

    function getLargestOrder() returns POs;
}
