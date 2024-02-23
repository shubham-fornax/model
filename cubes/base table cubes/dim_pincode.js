cube(`dim_pincode`, {
   sql_table: `thewhitewillow_ocular_raw.dim_pincode`,

   dimensions: {
      pincode: {
        sql: `pincode`,
        type: `string`,
      },

      latitude: {
        sql: `latitude`,
        type: `string`,
      },

      longitude: {
        sql: `longitude`,
        type: `string`,
      },
   },

});