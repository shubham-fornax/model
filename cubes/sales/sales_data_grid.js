//cube(`sales_data_grid`, {
//   sql: `select * from thewhitewillow_ocular_production.fact_order_item`,
//
//   joins: {
//       fact_shipping: {
//      relationship: `one_to_one`,
//      sql: `cast(${CUBE}.order_id as string) = ${fact_shipping.order_id}`,
//    },
//
//    dim_date: {
//      relationship: `one_to_one`,
//      sql: `cast(${CUBE}.order_date as date) = ${dim_date.full_date}`,
//    },
//
//    dim_products_for_sales_grid: {
//      relationship: `one_to_one`,
//      sql: `${CUBE}.sku_name = ${dim_products_for_sales_grid.sku}`
//    },
//
//   },
//
////   segments: {
////     mtd: {
////       sql: `date(${CUBE}.order_date) between date_trunc(current_date(), month) and current_date()`,
////     },
////
////     lmtd: {
////       sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 1 month) and  date_sub(current_date(), interval 1 month)`
////     },
////
////     ytd: {
////      sql: `date(${CUBE}.order_date) between date_trunc(current_date(), year) and current_date()`
////     },
////
////     lytd: {
////       sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 1 year) and  date_sub(current_date(), interval 1 year)`,
////     },
////
////     qtd: {
////       sql: `date(${CUBE}.order_date)  between date_trunc(current_date(), quarter) and current_date()`,
////     },
////
////     lqtd: {
////       sql: `date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 1 quarter) and date_sub(current_date, interval 1 quarter)`
////     },
////   },
//
//   dimensions: {
//
//
//
//   composite_key: {
//        sql: `CONCAT(order_id, '-', order_item)`,
//        description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
//        type: `string`,
//        primary_key: true,
//        public: true,
//      },
//
//     order_id: {
//       sql: `order_id`,
//       type: `string`,
//     },
//
//     order_item_id: {
//       sql: `order_item_id`,
//       type: `string`,
//     },
//
//     marketplace: {
//       sql: `marketplace`,
//       type: `string`,
//     },
//
//     order_date: {
//       sql: `order_date`,
//       type: `time`,
//     },
//
//     item_quantity: {
//       sql: `item_quantity`,
//       type: `number`,
//     },
//
//     payment_gateway: {
//       sql: `payment_gateway`,
//       type: `string`,
//     },
//
//     item_price: {
//       sql: `item_price`,
//       type: `number`,
//     },
//
//     listing_discount: {
//       sql: `listing_discount`,
//       type: `number`,
//     },
//
//     item_coupon_discount: {
//       sql: `item_coupon_discount`,
//       type: `number`,
//     },
//
//
//     discount_code: {
//       sql: `discount_code`,
//       type: `string`,
//     },
//
//     cgst_rate: {
//       sql: `cgst_rate`,
//       type: `number`,
//     },
//
//     cgst_amount: {
//       sql: `cgst_amount`,
//       type: `number`,
//     },
//
//     sgst_rate: {
//       sql: `sgst_rate`,
//       type: `number`,
//     },
//
//     sgst_amount: {
//       sql: `sgst_amount`,
//       type: `number`,
//     },
//
//     igst_rate: {
//       sql: `igst_rate`,
//       type: `number`,
//     },
//
//     igst_amount: {
//       sql: `igst_amount`,
//       type: `number`,
//     },
//
//     item_tax_total: {
//       sql: `item_tax_total`,
//       type: `number`,
//       public: true,
//     },
//
//     item_cost: {
//       sql: `item_cost`,
//       type: `number`,
//     },
//
//     item_shipping_fee: {
//       sql: `item_shipping_fee`,
//       type: `number`,
//     },
//
//     shipping_pincode: {
//       sql: `shipping_pincode`,
//       type: `string`,
//     },
//
//     shipping_state: {
//       sql: `shipping_state`,
//       type: `string`,
//     },
//
//     shipping_city: {
//       sql: `shipping_city`,
//       type: `string`,
//     },
//
//     sku_name: {
//       sql: `sku_name`,
//       type: `string`,
//     },
//
//     asin: {
//       sql: `asin`,
//       type: `string`,
//     },
//
//     product_name: {
//       sql: `product_name`,
//       type: `string`,
//     },
//
//     category: {
//       sql: `category`,
//       type: `string`,
//     },
//
//     sub_category: {
//       sql: `sub_category`,
//       type: `string`,
//     },
//
//     customer_id: {
//       sql: `customer_id`,
//       type: `string`,
//     },
//
//     is_in_mtd : {
//     sql: `case when date(${CUBE}.order_date) between date_trunc(current_date(), month) and current_date() then 1 else 0 end`,
//     type: `boolean`,
//   },
//
//   is_in_lmtd : {
//     sql: `case when date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), month), interval 1 month) and  date_sub(current_date(), interval 1 month) then 1 else 0 end`,
//     type: `boolean`,
//   },
//
//   is_in_ytd : {
//     sql: `case when date(${CUBE}.order_date) between date_trunc(current_date(), year) and current_date() then 1 else 0 end`,
//     type: `boolean`,
//   },
//
//   is_in_lytd : {
//     sql: `case when date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), year), interval 1 year) and  date_sub(current_date(), interval 1 year) then 1 else 0 end`,
//     type: `boolean`,
//   },
//
//   is_in_qtd : {
//     sql: `case when date(${CUBE}.order_date)  between date_trunc(current_date(), quarter) and current_date() then 1 else 0 end`,
//     type: `boolean`,
//   },
//
//   is_in_lqtd : {
//     sql: `case when date(${CUBE}.order_date) between date_sub(date_trunc(current_date(), quarter), interval 1 quarter) and date_sub(current_date, interval 1 quarter) then 1 else 0 end`,
//     type: `boolean`,
//   },
//   },
//
//   measures: {
//      booked_revenue: {
//      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
//      type: `number`,
//    },
//
//    cancelled_revenue: {
//      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
//      type: `number`,
//      filters: [{ sql: `max(${fact_shipping}.simplified_status)  in ('CANCELLED')` }],
//    },
//
//    confirmed_revenue: {
//      sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
//      type: `number`,
//      filters: [{ sql: `max(${fact_shipping}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE')` }],
//    },
//
//    returned_revenue: {
//       sql: `case when round(sum(item_price), 2) is null then 0 else round(sum(item_price), 2) end`,
//      type: `number`,
//      filters: [{ sql: `max(${fact_shipping}.simplified_status)  in ('RTO')` }],
//    },
//
//    recognized_revenue: {
//      sql: ` case when sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_price else 0 end) is null then 0
//             else sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_price else 0 end) end`,
//      type: `number`,
//    },
//
//    booked_order_quantity: {
//      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
//      type: `number`
//    },
//
//    cancelled_order_quantity: {
//      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
//      type: `number`,
//      filters: [{ sql: `max(${fact_shipping}.simplified_status)  in ('CANCELLED')` }],
//
//    },
//
//    returned_order_quantity: {
//       sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
//      type: `number`,
//      filters: [{ sql: `max(${fact_shipping}.simplified_status)  in ('RTO')` }],
//    },
//
//    confirmed_order_quantity: {
//      sql: `case when round(sum(item_quantity), 2) is null then 0 else round(sum(item_quantity), 2) end`,
//      type: `number`,
//      filters: [{ sql: `max(${fact_shipping}.simplified_status) not in ('IN-WH',	'RTO','IN TRANSIT',	'DAMAGED','INCOMPLETE')` }],
//    },
//
//    recognized_order_quantity: {
//      sql: ` case when sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_quantity else 0 end) is null then 0
//             else sum(case when date_diff(current_timestamp, ${CUBE}.order_date, day) > 30 then item_quantity else 0 end) end`,
//      type: `number`,
//    },
//
//    listing_discount_total: {
//    sql: `case when sum(listing_discount) is not null then sum(listing_discount) else 0 end`,
//    type: `number`,
//  },
//
//  coupon_discount_total: {
//    sql: `case when sum(item_coupon_discount) is not null then sum(item_coupon_discount) else 0 end`,
//    type: `number`,
//  },
//
//  total_discount: {
//    sql: `case when (${coupon_discount_total} + ${listing_discount_total}) is not null then ${coupon_discount_total} + ${listing_discount_total} else 0 end`,
//    type: `number`,
//  },
//
//   },
//
//
//
//});
//
//cube(`fact_shipping`, {
//   sql_table: `thewhitewillow_ocular_production.fact_shipping`,
//   data_source: `default`,
//
//
//   dimensions: {
//     order_id : {
//       sql: `order_id`,
//       type: `string`,
//     },
//
//     shipping_status: {
//       sql: `shipping_status`,
//       type: `string`,
//     },
//
//     simplified_status: {
//       sql: `simplified_status`,
//       type: `string`,
//     },
//
//     distinct_simplified_status: {
//       sql: `distinct simplified_status`,
//       type: `string`,
//     },
//
//     shipping_fee: {
//      sql: `shipping_fee`,
//      type: `number`,
//     },
//
//     awb: {
//       sql: `awb`,
//       type: `string`,
//     },
//
//     weight: {
//       sql: `weight`,
//       type: `number`,
//     },
//
//     delivery_date: {
//       sql: `delivery_date`,
//       type: `time`,
//     },
//
//     courier_partner: {
//       sql: `courier_partner`,
//       type: `string`,
//     },
//
//     distinct_courier_partner: {
//       sql: `distinct courier_partner`,
//       type: `string`,
//     },
//
//   }
//
//});
//
//cube(`dim_date`, {
//  sql_table:`thewhitewillow_ocular_raw.dim_date`,
//  description: `This table contains the dimensional information about the date.`,
//
//  dimensions:{
//
//    full_date: {
//      sql: `full_date`,
//      type: `time`,
//      description: `The calender date.`,
//      },
//
//      day_name: {
//        sql: `day_name`,
//        type: `string`,
//      },
//
//      distinct_day_name: {
//        sql: `distinct day_name`,
//        type: `string`,
//      },
//
//      type_of_day: {
//        sql: `case when day_is_weekday = 0 then 'Weekend' when day_is_weekday = 1 then 'Weekday' end`,
//        type: `string`,
//      },
//
//      month_year_combo: {
//      sql: `month_year_combo`,
//      type: `string`,
//      description: `The month year combination for the date.`,
//      },
//
//      calender_year: {
//          sql: `calender_year`,
//          type: `number`,
//          description: ` The calender year number for the date.`,
//          },
//
//       month: {
//          sql: `month`,
//          type: `number`,
//          description: `The calender month number for the date.`,
//          },
//
//
//    }
//});
//
//cube(`dim_products_for_sales_grid`, {
//  sql_table:`thewhitewillow_ocular_raw.dim_products`,
//  description: `This table contains the dimensional information about the product.`,
//
//  dimensions:{
//    sku: {
//      sql: `sku`,
//      type: `string`,
//      },
//
//     distinct_sku: {
//       sql: `distinct sku`,
//       type: `string`
//     },
//
//    asin: {
//      sql: `asin`,
//      type: `string`,
//    },
//
//    distinct_asin: {
//      sql: `distinct asin`,
//      type: `string`,
//    },
//
//    final_sku: {
//      sql: `final_sku`,
//      type: `string`,
//    },
//
//    distinct_final_sku: {
//      sql: `distinct final_sku`,
//      type: `string`,
//    },
//
//    colour: {
//      sql: `colour`,
//      type: `string`,
//    },
//
//    distinct_colour: {
//      sql: `distinct colour`,
//      type: `string`,
//    },
//
//    product_name: {
//      sql: `product_name`,
//      type: `string`,
//    },
//
//    distinct_product_name: {
//      sql: `distinct product_name`,
//      type: `string`,
//    },
//
//    category: {
//      sql: `category`,
//      type: `string`,
//    },
//
//    sub_category: {
//      sql: `category`,
//      type: `string`,
//    },
//
//    },
//});