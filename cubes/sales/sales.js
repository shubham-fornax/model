cube(`sales`, {
  sql: ` SELECT
                  *,
                  row_number() OVER (ORDER BY order_date ASC) AS row_number_order_date_asc
                FROM
                  thewhitewillow_ocular_production.fact_order_item `,

  segments: {
    daq_duration: {
     sql: `date_diff(current_timestamp(), ${order_date}, day) < 30 `
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

    dim_pincode: {
      relationship: `one_to_one`,
      sql: `${CUBE}.shipping_pincode = cast(${dim_pincode.pincode} as string)`,
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
  },

  measures: {

    distinct_customer_count: {
      sql: `customer_id`,
      type: `countDistinct`,
    },

    new_customer_count: {
     sql:  `customer_id`,
     type: `countDistinct`,
     filters: [{ sql: `${new_or_repeat} = 'New'`}],
    },

    repeat_customer_count: {
     sql:  `customer_id`,
     type: `countDistinct`,
     filters: [{ sql: `${new_or_repeat} = 'Repeat'`}],
    },

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
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE') ` }],
    },

    confirmed_revenue_rn: {
      sql: `row_number() over( partition by ${dim_date_for_sales.month_year_combo} order by ${confirmed_revenue} desc)`,
      type: `number`,
    },

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
      filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE')` }],
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
     filters: [{ sql: `max(${fact_shipping_for_sales}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE')` }],

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

  average_order_value: {
    sql: `case when sum(item_price)/count(distinct ${CUBE}.order_id) is not null then round(sum(item_price)/count(distinct ${CUBE}.order_id))
          else 0 end`,
    type:  `number`,
  },

  listing_discount_total: {
    sql: `case when sum(listing_discount) is not null then sum(listing_discount) else 0 end`,
    type: `number`,
  },

  coupon_discount_total: {
    sql: `case when sum(item_coupon_discount) is not null then sum(item_coupon_discount) else 0 end`,
    type: `number`,
  },

//  total_discount: {
//    sql: `case when (${coupon_discount_total} + ${listing_discount_total}) is not null then ${coupon_discount_total} + ${listing_discount_total} else 0 end`,
//    type: `number`,
//  },

   total_revenue: {
       sql: `sum(item_price)`,
       type: `number`,
       description: `This is the actual revenue inclusive of tax exclusive after discount. Note- in FOI, the item_price is calculated using actual qty`,
     },

     total_cost: {
       sql: `case when sum(item_cost) != 0 then sum(item_cost) end`,
       type: `number`,
       description: `This is the total cost (COGS) for an SKU over the aggregation period.  Note- in FOI, the item_cost is calculated using actual qty`,
     },

     total_tax: {
       sql: `case when sum(item_tax_total) != 0 then sum(item_tax_total) end`,
       type: `number`,
     },

     total_shipping_revenue: {
      sql: `case when sum(item_shipping_fee) != 0 then sum(item_shipping_fee) end`,
      type: `number`,
      description: `This is the total shipping fee for an SKU over the aggregation period.  Note- in FOI, the item_shipping_fee is calculated using actual qty`,
     },

      total_discount: {
      sql: `case when sum(item_coupon_discount) != 0 then sum(item_coupon_discount) end`,
      type: `number`,
      description: `This is the total_discount over the aggregation period and specified filters. Note - In FOI, the column item_discount is calculated using actual qty`,
     },

     net_revenue: {
       sql: `${total_revenue} + ${total_shipping_revenue} - ${total_discount} - ${total_tax}`,
       type: `number`,
     },

     contribution_margin_1 :{
       sql: `${net_revenue} - ${total_cost}`,
       type: `number`,
     },

     contribution_margin_2: {
       sql: `${net_revenue} - ${total_cost}`, // - fulfillment_cost - order_processing_fee`
       type: `number`,
       rolling_window: {
         trailing: `unbounded`
         },
     },

//     monthly_revenue: {
//      sql: `sum(item_price)`,
//      type: `number`,
//      rolling_window: {
//        trailing: `unbounded`
//      },
//    },
//
//    row_number_revenue: {
//       sql: `row_number() over (partition by sales__month_year_combo order by ${monthly_revenue} desc)`,
//       type: `number`,
//       rolling_window: {
//        trailing: `unbounded`
//      },
//      },
},


});

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

cube(`fact_shipping_for_sales`, {
   sql_table: `thewhitewillow_ocular_production.fact_shipping`,
   data_source: `default`,


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

     distinct_simplified_status: {
       sql: `distinct simplified_status`,
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

     distinct_courier_partner: {
       sql: `distinct courier_partner`,
       type: `string`,
     },

   }

});

cube(`dim_date_for_sales`, {
  sql_table:`ocular_reports.dim_date`,
  description: `This table contains the dimensional information about the date.`,

  dimensions:{

    full_date: {
      sql: `full_date`,
      type: `time`,
      description: `The calender date.`,
      },

      day_name: {
        sql: `day_name`,
        type: `string`,
      },

      month_name: {
        sql: `month_name`,
        type: `string`,
      },

      distinct_day_name: {
        sql: `distinct day_name`,
        type: `string`,
      },

      type_of_day: {
        sql: `case when day_is_weekday = 0 then 'Weekend' when day_is_weekday = 1 then 'Weekday' end`,
        type: `string`,
      },

      month_year_combo: {
      sql: `month_year_combo`,
      type: `string`,
      description: `The month year combination for the date.`,
      },

      calender_year: {
          sql: `calender_year`,
          type: `number`,
          description: ` The calender year number for the date.`,
          },

       month: {
          sql: `month`,
          type: `number`,
          description: `The calender month number for the date.`,
          },


    }
});

cube(`dim_products_for_sales`, {
  sql_table:`thewhitewillow_ocular_raw.dim_products`,
  description: `This table contains the dimensional information about the product.`,


  dimensions:{

    sku: {
      sql: `sku`,
      type: `string`,
      },

     distinct_sku: {
       sql: `distinct sku`,
       type: `string`
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

cube(`dim_customer_profile_for_sales`, {
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