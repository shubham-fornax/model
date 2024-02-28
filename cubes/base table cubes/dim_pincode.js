cube(`dim_pincode`, {
   sql_table: `${COMPILE_CONTEXT.securityContext.schema_name}_ocular_raw.dim_pincode`,

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