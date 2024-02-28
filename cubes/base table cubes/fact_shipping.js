
cube(`fact_shipping`, {
   sql_table: `${COMPILE_CONTEXT.securityContext.schema_name}_ocular_production.fact_shipping`,


   dimensions: {
     order_id : {
       sql: `order_id`,
       type: `string`,
     },

     shipping_status: {
       sql: `shipping_status`,
       type: `string`,
     },

     simplified_status: {
       sql: `simplified_status`,
       type: `string`,
     },

     shipping_fee: {
      sql: `shipping_fee`,
      type: `number`,
     },

     awb: {
       sql: `awb`,
       type: `string`,
     },

     weight: {
       sql: `weight`,
       type: `number`,
     },

     delivery_date: {
       sql: `delivery_date`,
       type: `time`,
     },

     courier_partner: {
       sql: `courier_partner`,
       type: `string`,
     },


   }

});