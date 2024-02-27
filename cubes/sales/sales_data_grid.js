cube(`sales_data_grid`, {
   sql: fact_order_item,

   joins: {
       fact_shipping_for_sales_grid: {
      relationship: `one_to_one`,
      sql: `cast(${CUBE}.order_id as string) = ${fact_shipping_for_sales_grid.order_id}`,
    },

    dim_date_for_sales_grid: {
      relationship: `one_to_one`,
      sql: `cast(${CUBE}.order_date as date) = ${dim_date_for_sales_grid.full_date}`,
    },

    dim_products_for_sales_grid: {
      relationship: `one_to_one`,
      sql: `${CUBE}.sku_name = ${dim_products_for_sales_grid.sku}`
    },

   },

//   segments: {
//     mtd: {
//       sql: `date(${CUBE}.order_date) between date_trunc(current_date(), month) and current_date()`,
//     },
//
//     lmtd: {
//       sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 1 month) and  date_sub(current_date(), interval 1 month)`
//     },
//
//     ytd: {
//      sql: `date(${CUBE}.order_date) between date_trunc(current_date(), year) and current_date()`
//     },
//
//     lytd: {
//       sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 1 year) and  date_sub(current_date(), interval 1 year)`,
//     },
//
//     qtd: {
//       sql: `date(${CUBE}.order_date)  between date_trunc(current_date(), quarter) and current_date()`,
//     },
//
//     lqtd: {
//       sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 1 quarter) and date_sub(current_date, interval 1 quarter)`
//     },
//   },

   dimensions: {



   composite_key: {
        sql: `CONCAT(order_id, '-', order_item)`,
        description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
        type: `string`,
        primary_key: true,
        public: true,
      },

     is_in_mtd : {
     sql: `case when date(${CUBE}.order_date) between date_trunc(current_date(), month) and current_date() then 1 else 0 end`,
     type: `boolean`,
   },

   is_in_lmtd : {
     sql: `case when date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 1 month) and  date_sub(current_date(), interval 1 month) then 1 else 0 end`,
     type: `boolean`,
   },

   is_in_ytd : {
     sql: `case when date(${CUBE}.order_date) between date_trunc(current_date(), year) and current_date() then 1 else 0 end`,
     type: `boolean`,
   },

   is_in_lytd : {
     sql: `case when date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 1 year) and  date_sub(current_date(), interval 1 year) then 1 else 0 end`,
     type: `boolean`,
   },

   is_in_qtd : {
     sql: `case when date(${CUBE}.order_date)  between date_trunc(current_date(), quarter) and current_date() then 1 else 0 end`,
     type: `boolean`,
   },

   is_in_lqtd : {
     sql: `case when date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 1 quarter) and date_sub(current_date, interval 1 quarter) then 1 else 0 end`,
     type: `boolean`,
   },
   },

   measures: {
      booked_revenue: {
      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
    },

    cancelled_revenue: {
      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales_grid}.simplified_status)  in ('CANCELLED')` }],
    },

    confirmed_revenue: {
      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales_grid}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE')` }],
    },

    returned_revenue: {
       sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales_grid}.simplified_status)  in ('RTO')` }],
    },

    recognized_revenue: {
      sql: ` case when sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_price else 0 end) is null then 0
             else sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_price else 0 end) end`,
      type: `number`,
    },

    booked_order_quantity: {
      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`
    },

    cancelled_order_quantity: {
      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales_grid}.simplified_status)  in ('CANCELLED')` }],

    },

    returned_order_quantity: {
       sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales_grid}.simplified_status)  in ('RTO')` }],
    },

    confirmed_order_quantity: {
      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales_grid}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE')` }],
    },

    recognized_order_quantity: {
      sql: ` case when sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_quantity else 0 end) is null then 0
             else sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_quantity else 0 end) end`,
      type: `number`,
    },

    listing_discount_total: {
    sql: `case when sum(listing_discount) is not null then sum(listing_discount) else 0 end`,
    type: `number`,
  },

  coupon_discount_total: {
    sql: `case when sum(item_coupon_discount) is not null then sum(item_coupon_discount) else 0 end`,
    type: `number`,
  },

  total_discount: {
    sql: `case when (${coupon_discount_total} + ${listing_discount_total}) is not null then ${coupon_discount_total} + ${listing_discount_total} else 0 end`,
    type: `number`,
  },

   },



});

cube(`fact_shipping_for_sales_grid`, {
   sql_table: fact_shipping,
   data_source: `default`,


   dimensions: {

   },

});

cube(`dim_date_for_sales_grid`, {
  sql_table:dim_table,
  description: `This table contains the dimensional information about the date.`,

  dimensions:{

      type_of_day: {
        sql: `case when day_is_weekday = 0 then 'Weekend' when day_is_weekday = 1 then 'Weekday' end`,
        type: `string`,
      },

    },
});


cube(`dim_products_for_sales_grid`, {
  sql_table:dim_products,
  description: `This table contains the dimensional information about the product.`,

  dimensions:{

    },
});