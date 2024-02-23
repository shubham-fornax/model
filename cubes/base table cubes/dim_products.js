cube(`dim_products`, {
  sql_table:`thewhitewillow_ocular_raw.dim_products`,
  description: `This table contains the dimensional information about the product.`,


  dimensions:{

    sku: {
      sql: `sku`,
      type: `string`,
      },

    asin: {
      sql: `asin`,
      type: `string`,
    },

    distinct_asin: {
      sql: `distinct asin`,
      type: `string`,
    },

    final_sku: {
      sql: `final_sku`,
      type: `string`,
    },

    distinct_final_sku: {
      sql: `distinct final_sku`,
      type: `string`,
    },

    colour: {
      sql: `colour`,
      type: `string`,
    },

    distinct_colour: {
      sql: `distinct colour`,
      type: `string`,
    },

    product_name: {
      sql: `product_name`,
      type: `string`,
    },

    distinct_product_name: {
      sql: `distinct product_name`,
      type: `string`,
    },

    category: {
      sql: `category`,
      type: `string`,
    },

    sub_category: {
      sql: `category`,
      type: `string`,
    },

    },
});