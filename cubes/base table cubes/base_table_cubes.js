cube(`fact_order_item`, {
   sql: ` SELECT
                  *,
                  row_number() OVER (ORDER BY order_date ASC) AS row_number_order_date_asc
                FROM
                  thewhitewillow_ocular_production.fact_order_item `,

    dimensions: {

      order_id : {
      sql: `${CUBE}.order_id`,
      type: `string`,
//      primary_key: true,
    },

    composite_key: {
        sql: `CONCAT(order_id, '-', order_item)`,
        description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
        type: `string`,
        primary_key: true,
      },

     order_item_id : {
      sql: `order_item_id`,
      type: `string`
      },

     delivery_date: {
      sql: `${fact_shipping_for_sales.delivery_date}`,
      type: `string`
      },

     simplified_status: {
      sql: `${fact_shipping_for_sales.simplified_status}`,
      type: `string`
      },

     distinct_simplified_status: {
      sql: `distinct ${fact_shipping_for_sales.simplified_status}`,
      type: `string`
      },

     marketplace: {
      sql: `marketplace`,
      type: `string`,
      },

     distinct_markeplace: {
      sql: `distinct marketplace`,
      type: `string`,
      },

     item_quantity: {
      sql: `item_quantity`,
      type: `string`
      },

     order_quantity: {
      sql: `order_quantity`,
      type: `string`,
      },

     payment_gateway: {
      sql: `payment_gateway`,
      type: `string`,
      },

      item_price: {
        sql: `item_price`,
        type: `number`,
      },

      order_price: {
        sql: `order_price`,
        type: `number`,
      },

      listing_discount:{
        sql: `listing_discount`,
        type: `number`,
      },

      item_coupon_discount: {
        sql: `item_coupon_discount`,
        type: `number`,
      },

      order_discounts: {
        sql: `order_discount`,
        type: `number`,
      },

      item_tax_total: {
        sql: `item_tax_total`,
        type: `number`,
      },

      order_tax_total: {
        sql: `order_tax_total`,
        type: `number`,
      },

      cgst_rate: {
        sql: `cgst_rate`,
        type: `number`,
      },

      sgst_rate: {
        sql: `sgst_rate`,
        type: `number`
      },

      igst_rate: {
        sql: `igst_rate`,
        type: `number`
      },

      cgst_amount: {
        sql: `cgst_amount`,
        type: `number`,
      },

      sgst_amount: {
        sql: `sgst_amount`,
        type: `number`
      },

      igst_amount: {
        sql: `igst_amount`,
        type: `number`
      },

      item_cost: {
        sql: `item_cost`,
        type:   `number`,
      },

      order_cost: {
        sql: `order_cost`,
        type: `number`,
      },

      item_shipping_fee: {
        sql: `item_shipping_fee`,
        type: `number`
      },

      shipping_total: {
        sql: `shipping_total`,
        type: `number`,
      },

      shipping_pincode: {
        sql: `shipping_pincode`,
        type: `number`
      },

      shipping_city: {
        sql: `shipping_city`,
        type: `string`
      },

      shipping_state: {
        sql: `shipping_state`,
        type: `string`
      },

      distinct_shipping_state: {
        sql: `distinct shipping_state`,
        type: `string`
      },

      distinct_shipping_city: {
        sql: `distinct shipping_city`,
        type: `string`,
       },

       sku_name: {
         sql: `sku_name`,
         type: `string`,
       },

       order_refund: {
         sql: `order_refund`,
         type: `string`,
       },

       asin: {
         sql: `asin`,
         type: `string`
       },

       product_name: {
         sql: `product_name`,
         type: `string`,
       },

       distinct_product_name: {
         sql: `distinct ${product_name}`,
         type: `string`,
       },

       category: {
         sql: `category`,
         type: `string`
       },

       distinct_category: {
         sql: `distinct ${category}`,
         type: `string`,
       },

       sub_category: {
         sql: `sub_category`,
         type: `string`,
       },

       distinct_sub_category: {
         sql: `distinct sub_category`,
         type: `string`,
       },

       fulfillment_channel: {
         sql: `fulfillment_channel`,
         type: `string`,
       },

       customer_id: {
         sql: `customer_id`,
         type: `string`
       },

       customer_created_at: {
         sql: `customer_created_at`,
         type: `time`
       },

       order_date: {
         sql: `${CUBE}.order_date`,
         type: `time`,
       },

       order_date_day: {
         sql: `cast(${CUBE}.order_date as date)`,
         type: `time`,
       },

       month_year_combo: {
        sql: `${dim_date_for_sales.month_year_combo}`,
        type: `string`,
      },

       order_hour: {
         sql: `extract(hour from timestamp_trunc(${order_date}, hour))`,
         type: `number`,
       },

       new_or_repeat: {
         sql: `new_or_repeat`,
         type: `string`,
       },

    }




})