cube(`dim_customer_profile`, {
   sql_table: `thewhitewillow_ocular_production.dim_customer_profile`,

   dimensions: {
     customer_id : {
       sql: `customer_id`,
       type: `string`,
     },

     customer_city: {
       sql: `customer_city`,
       type: `string`,
     },

     distinct_customer_city: {
       sql: `distinct customer_city`,
       type: `string`,
     },

     customer_state: {
       sql: `customer_state`,
       type: `string`,
     },

     distinct_customer_state: {
       sql: `distinct customer_state`,
       type: `string`,
     },

     customer_country: {
       sql: `customer_country`,
       type: `string`,
     },

     distinct_customer_country: {
       sql: `distinct customer_country`,
       type: `string`,
     },
   }
});