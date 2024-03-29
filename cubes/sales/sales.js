cube(`sales`, {
   extends: fact_order_item,

  segments: {
    daq_duration: {
     sql: `date_diff(current_timestamp(), ${order_date}, day) < 30 `
    },

    today: {
     sql: `cast(${CUBE}.order_date as date) = current_date()`
    },

    yesterday: {
      sql: `cast(${CUBE}.order_date as date) = date_sub(current_date(), interval 1 day)`
    },

    last_to_last_day: {
      sql: `cast(${CUBE}.order_date as date) between date_sub(current_date(), interval 2 day) and date_sub(current_date(), interval 1 day)`
    },

    month_to_date: {
      sql: `date(${CUBE}.order_date) between date_trunc(current_date(), month) and current_date()`
    },

    last_month_to_date: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 1 month) and  date_sub(current_date(), interval 1 month)`
    },

    last_to_last_month_to_date: {
     sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 2 month) and  date_sub(current_date(), interval 2 month)`
    },

    year_to_date: {
     sql: `date(${CUBE}.order_date) between date_trunc(current_date(), year) and current_date()`
    },

    last_year_to_date: {
     sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 1 year) and  date_sub(current_date(), interval 1 year)`
    },

    last_to_last_year_to_date: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 2 year) and  date_sub(current_date(), interval 2 year)`
    },

    quarter_to_date: {
      sql: `date(${CUBE}.order_date)  between date_trunc(current_date(), quarter) and current_date()`,
    },

    last_quarter_to_date: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 1 quarter) and date_sub(current_date, interval 1 quarter)`,
    },

    last_to_last_quarter_to_date: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 2 quarter) and date_sub(current_date, interval 2 quarter)`,
    },

    this_week: {
      sql: `date(${CUBE}.order_date) between date_trunc(current_date(), week) and current_date()`,
    },

    last_week: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), week), interval 1 week) and date_sub(date_trunc(current_date(), week), interval 1 day)`,
    },

    last_to_last_week: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), week), interval 2 week) and date_sub(date_sub(date_trunc(current_date(), week), interval 1 day), interval 1 week)`,
    },

    last_month: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 1 month) and date_sub(date_trunc(current_date(), month), interval 1 day)`,
    },

    last_to_last_month: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 2 month) and date_sub(date_sub(date_trunc(current_date(), month), interval 1 day), interval 1 month)`,
    },

    last_quarter: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 1 quarter) and date_sub(date_trunc(current_date(), quarter), interval 1 day) `,
    },

    last_to_last_quarter: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 2 quarter) and date_sub(date_sub(date_trunc(current_date(), quarter), interval 1 day), interval 1 quarter)`,
    },

    last_year: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 1 year) and date_sub(date_trunc(current_date(), year), interval 1 day) `,
    },

    last_to_last_year: {
      sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 2 year) and date_sub(date_sub(date_trunc(current_date(), year), interval 1 day), interval 1 year)`,
    },






  },

//  pre_aggregations:{
//    div_1: {
//  measures: [
//    sales.confirmed_revenue,
//    sales.recognized_revenue,
//    sales.booked_revenue,
//    sales.cancelled_revenue,
//    sales.returned_revenue
//  ],
//  dimensions: [
//    dim_date.day_name,
//    dim_date.month_year_combo,
//    dim_date.type_of_day,
//    dim_products.asin,
//    dim_products.category,
//    dim_products.colour,
//    dim_products.final_sku,
//    dim_products.product_name,
//    dim_products.sku,
//    dim_products.sub_category,
//    fact_shipping.courier_partner,
//    fact_shipping.simplified_status,
//    sales.marketplace,
//    sales.order_date,
//    sales.shipping_city,
//    sales.shipping_state
//  ],
//  refreshKey: {
//    every: `1 day`
//  },
//
//},
//  },

  joins: {
    fact_shipping_for_sales: {
      relationship: `one_to_one`,
      sql: `cast(${CUBE}.order_id as string) = ${fact_shipping_for_sales.order_id}`,
    },

    dim_date_for_sales: {
      relationship: `one_to_one`,
      sql: `cast(${CUBE}.order_date as date) = ${dim_date_for_sales.full_date}`,
    },

    dim_products_for_sales: {
      relationship: `one_to_one`,
      sql: `${CUBE}.sku_name = ${dim_products_for_sales.sku}`,
    },

    dim_pincode_for_sales: {
      relationship: `one_to_one`,
      sql: `${CUBE}.shipping_pincode = cast(${dim_pincode_for_sales.pincode} as string)`,
    },

    dim_customer_profile_for_sales: {
      relationship: `one_to_one`,
      sql: `${CUBE}.customer_id = ${dim_customer_profile_for_sales.customer_id}`,
    },

//    top_sku: {
//      relationship: `one_to_one`,
//      sql: `${CUBE}.sku_name = ${top_sku.sku_name} and ${month_year_combo} = ${top_sku.month_year_combo}`,
//    },
  },



  dimensions: {


    composite_key: {
        sql: `CONCAT(order_id, '-', order_item)`,
        description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
        type: `string`,
        primary_key: true,
      },


     simplified_status: {
      sql: `${fact_shipping_for_sales.simplified_status}`,
      type: `string`
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
  },

  measures: {

    booked_revenue: {
      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
    },

    cancelled_revenue: {
      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status)  in ('CANCELLED')` }],
    },

    confirmed_revenue: {
      sql: `case when round(sum(${CUBE}.item_price), 2) is null then 0 else round(sum(${CUBE}.item_price), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in ('RTO',	'DAMAGED','INCOMPLETE') ` }],
    },

//    confirmed_revenue_rn: {
//      sql: `row_number() over( partition by ${dim_date_for_sales}.month_year_combo order by ${confirmed_revenue} desc)`,
//      type: `number`,
//    },

    returned_revenue: {
       sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status)  in ('RTO')` }],
    },

    recognized_revenue: {
      sql: ` case when sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_price else 0 end) is null then 0
             else sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_price else 0 end) end`,
      type: `number`,
    },

    booked_orders: {
      sql: `order_id`,
      type: `countDistinct`,
    },

    booked_order_quantity: {
      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`
    },

    cancelled_order_quantity: {
      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status)  in ('CANCELLED')` }],

    },

    returned_order_quantity: {
       sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status)  in ('RTO')` }],
    },

    confirmed_order_quantity: {
      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in (	'RTO',	'DAMAGED','INCOMPLETE')` }],
    },

    confirmed_orders: {
      sql: `count(distinct ${CUBE}.order_id)`,
      type: `number`,
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in ('RTO','DAMAGED','INCOMPLETE')` }],
    },

    recognized_order_quantity: {
      sql: ` case when sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_quantity else 0 end) is null then 0
             else sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_quantity else 0 end) end`,
      type: `number`,
    },

    booked_daily_average_quantity: {
     sql: `case when count(distinct ${CUBE}.order_id) is null then 0 else count(distinct ${CUBE}.order_id)/30 end`,
     type: `number`,
     shown: true,
  },

    confirmed_daily_average_quantity: {
     sql: `case when count(distinct ${CUBE}.order_id) is null then 0 else count(distinct ${CUBE}.order_id)/30 end`,
     type: `number`,
     filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in ('RTO',	'DAMAGED','INCOMPLETE')` }],

  },

  cancelled_daily_average_quantity: {
     sql: `case when count(distinct ${CUBE}.order_id) is null then 0 else count(distinct ${CUBE}.order_id)/30 end`,
     type: `number`,
     filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status)  in ('CANCELLED')` }],

  },

  returned_daily_average_quantity: {
     sql: `case when count(distinct ${CUBE}.order_id) is null then 0 else count(distinct ${CUBE}.order_id)/30 end`,
     type: `number`,
     filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status)  in ('RTO')` }],

  },

  advertising_cost: {
    sql: `0`,
    type: `number`,
    description: `currently set to 0`,
  },

  shipping_cost: {
    sql: `0`,
    type: `number`,
    description: `currently set to 0`,
  },

  refund_cost: {
    sql: `0`,
    type: `number`,
    description: `currently set to 0`,
  },

  roas: {
    sql: `0`,
    type: `number`,
    description: `currently set to 0`,
  },

  },

});

cube(`dim_pincode_for_sales`, {
   extends: dim_pincode,

   dimensions: {

   },

});

cube(`fact_shipping_for_sales`, {
   extends: fact_shipping,

   dimensions: {

   },

});

cube(`dim_date_for_sales`, {
  extends: dim_date,
  description: `This table contains the dimensional information about the date.`,

  dimensions:{

    },
});

cube(`dim_products_for_sales`, {
  extends: dim_products,
  description: `This table contains the dimensional information about the product.`,


  dimensions:{

    },
});

cube(`dim_customer_profile_for_sales`, {
   extends: dim_customer_profile,

   dimensions: {

   },
});