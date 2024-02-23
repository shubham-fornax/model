//cube(`customer_first_order`, {
//  sql: `
//        with first_order_details_per_customer as (
//
//        select customer_id, sku_name, dp.product_name, dp.category
//        , foi.order_date
//        , shipping_city, shipping_state
//        , day_name as day_of_the_week
//        , case when day_is_weekday = 1 then 'Weekday' when day_is_weekday = 0 then 'Weekend' end as type_of_day
//        , dense_rank() over (partition by customer_id order by order_date asc) as rn
//        from  thewhitewillow_ocular_production.fact_order_item as foi
//        left join  thewhitewillow_ocular_gsheets_integration.dim_products as dp on foi.sku_name = dp.sku
//        left join  thewhitewillow_ocular_raw.dim_date as dd  on date(foi.order_date) = dd.full_date
//
//         )
//
//      select distinct *
//      from first_order_details_per_customer where rn  = 1
//      `,
//  description: `This cube is defined on top of fact_order_item and fetched the sku level details of the first order for all customers.`,
//
//  segments: {
//    distinct_customer:{
//      sql: `${CUBE}.rn_cust = 1`,
//    }
//  },
//
//  joins: {
//    margin: {
//      relationship: `one_to_one`,
//      sql: `${customer_id} = ${margin.customer_id}`,
//    },
//  },
//
//  dimensions: {
////    dummy:{
////      sql: ``
////    },
//
//    customer_id: {
//      sql: `customer_id`,
//      type: `string`,
//      description: `customer_id associated with the order.`,
//      },
//
//    product_name: {
//        sql: `product_name`,
//        type: `string`,
//        description: ` Product_name of the SKU ordered in the first order for a customer. It is fetched from the dim_products table.`,
//    },
//
//    distinct_product_name: {
//      sql: `distinct product_name`,
//      type: `string`,
//      description: `distinct product_name values from the dim_product table.`},
//
//    category: {
//        sql: `category`,
//        type: `string`,
//        description: `category of the SKU ordered in the first order for a customer. It is fetched from the dim_products table.`,
//        },
//
////     sub_category: {
////        sql: `sub_category`,
////        type: `string`,
////        description: `sub_category of the SKU ordered in the first order for a customer. It is fetched from the dim_products table.`,
////        },
//
//    distinct_category: {
//      sql: `distinct category`,
//      type: `string`,
//      description: `distinct category values from the dim_product table.`
//      },
//
//    first_order_date: {
//      sql: `order_date`,
//      type: `string`,
//      description: `date when a particular customer placed their first order.`
//      },
//
//    sku_name: {
//        sql: `sku_name`,
//        type: `string`,
//        description: `sku_name of the SKU ordered in the first order for a customer. It is fetched from the dim_products table.`,
//        },
//
//    distinct_sku_name: {
//      sql: `distinct sku_name`,
//      type: `string`,
//      description: `distinct sku_name values from the dim_product table.`
//    },
//
//    shipping_city: {
//      sql: `shipping_city`,
//      type: `string`,
//    },
//
//    shipping_state: {
//     sql: `shipping_state`,
//     type: `string`,
//    },
//
//    day_of_the_week: {
//     sql: `day_of_the_week`,
//     type: `string`,
//    },
//
//    type_of_day: {
//      sql: `type_of_day`,
//      type: `string`,
//    },
//
//
//
//    },
//});
//
//
//cube(`margin`, {
//  sql_table: `thewhitewillow_ocular_production.fact_order_item`,
//
//  joins: {
//    dim_customer_profile: {
//      relationship: `one_to_one`,
//      sql: `cast(${CUBE}.customer_id as string) = ${dim_customer_profile.customer_id}`,
//    },
//
////    dim_date_customer_created: {
////      relationship: `many_to_one`,
////      sql: `cast({CUBE}.customer_created_at as date) = {dim_date_customer_created.full_date}`,
////    },
//
//    dim_date_orders: {
//      relationship: `one_to_one`,
//      sql: `cast(${CUBE}.order_date as date) = ${dim_date_orders.full_date}`,
//    },
//
////    margin_customer_count : {
////      relationship: `one_to_one`,
////      sql: `${CUBE}.age_month_year = ${margin_customer_count}.age_month_year`,
////    },
////
//  },
//
//  dimensions: {
//    composite_key: {
//      sql: `CONCAT(order_id, '-', order_item)`,
//      type:  `string`,
//      description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
//      primary_key: true
//      },
//
//   order_id: {
//     sql: `order_id`,
//     type: `string`,
//     },
//
//   customer_id: {
//     sql: `customer_id`,
//     type: `string`,
//     },
//
//   order_item_id: {
//     sql: `order_item_id`,
//     type: `string`,
//   },
//
//   marketplace: {
//    sql: `marketplace`,
//    type: `string`,
//    },
//
//   sku_name: {
//     sql: `sku_name`,
//     type: `string`,
//    },
//
//   item_price: {
//     sql: `item_price`,
//     type: `string`,
//     description: `item_price of the SKU in the order. It is calculated as price_per_sku * item_quantity`,
//   },
//
//   item_cost: {
//     sql: `item_cost`,
//     type: `number`,
//     description: `item_cost of the SKU in the order. It is calculated as COGS_per_sku * item_quantity.`,
//   },
//
//   order_date: {
//     sql: `order_date`,
//     type: `time`,
//     description: `The timestamp when the order was placed on the marketplace website.`,
//   },
//
//   order_week: {
//     sql: `${dim_date_orders.year_week}`,
//     type: `number`,
//     description: `The week number when the order was placed.  This is extracted from the order_date column.`,
//   },
//
//   order_month: {
//     sql: `${dim_date_orders.month}`,
//     description: `The month number when the order was placed.  This is extracted from the order_date column.`,
//     type: `number`,
//   },
//
//   order_year: {
//     sql: `${dim_date_orders.calender_quarter}`,
//     description: `The year number when the order was placed.  This is extracted from the order_date column.`,
//     type: `number`,
//   },
//
////   first_order_date: {
////     sql: `${dim_customer_profile}.first_order_date`,
////     description: `This is the date when the first order was made by that particular customer. It is fetched from dim_customer_profile table`,
////     type: `time`,
////   },
//
//   first_order_week: {
//     sql: `${dim_date_customer_first_order.year_week}`,
//     description: `This is the week when the first order was made by that particular customer. It is fetched from dim_customer_profile table.`,
//     type: `number`,
//   },
//
//   first_order_month: {
//     sql: `${dim_date_customer_first_order.month}`,
//     type: `number`,
//     description: `This is the month when the first order was made by that particular customer. It is fetched from dim_customer_profile table`,
//   },
//
//   first_order_quarter: {
//     sql: `${dim_date_customer_first_order.calender_quarter}`,
//     description: `This is the quarter when the first order was made by that particular customer. It is fetched from dim_customer_profile table`,
//     type: `number`,
//   },
//
//   first_order_year: {
//     sql: `${dim_date_customer_first_order.calender_year}`,
//     type: `number`,
//     description: `This is the year when the first order was made by that particular customer. It is fetched from dim_customer_profile table.`,
//   },
//
//   product_name: {
//     sql: `product_name`,
//     type: `string`,
//     description: `The name of the product.`,
//   },
//
//   category: {
//     sql: `category`,
//     type: `string`,
//     description: `The main category to which the items in this order belong.`,
//   },
//
//   sub_category: {
//     sql: `sub_category`,
//     type: `string`,
//     description: `The sub-category to which the items in this order belong.`,
//     },
//
//   retention_quarter: {
//     sql: `4*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.calender_quarter} - ${dim_date_customer_first_order.calender_quarter} )`,
//     type: `number`,
//     description: `The numeric difference between the starting quarter of the cohort and the order quarter`,
//      },
//
//   retention_month: {
//     sql: `12*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.month} - ${dim_date_customer_first_order.month} )`,
//     type: `number`,
//     description: `The numeric difference between the starting month of the cohort and the order month`,
//   },
//
//   retention_week: {
//     sql: ` 52*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.year_week} - ${dim_date_customer_first_order.year_week})`,
//     type: `number`,
//     description: `The numeric difference between the starting week of the cohort and the order week`,
//   },
//
//   age_month_year: {
//     sql: `${dim_date_customer_first_order.month_year_combo}`,
//     description: `The month-year extracted from the first order date column. This column contains the cohort definition.`,
//     type: `string`,
//   },
//
//   age_week_year: {
//     sql: `${dim_date_customer_first_order.week_year_combo}`,
//     description: ` The week-year extracted from the first order date column . This column contains the cohort definition.`,
//     type: `string`,
//   },
//
//   age_quarter_year: {
//     sql: `${dim_date_customer_first_order.quarter_year_combo}`,
//     description: `The quarter-year extracted from the first order date column . This column contains the cohort definition.`,
//     type: `string`,
//   },
//
//   first_month_count_distinct_customer_id : {
//     sql: `${margin_customer_count.first_month_count_distinct_customer_id}`,
//     type: `number`,
//     sub_query: true,
//   },
//
////   first_month_customer_count: {
////     sql: `${margin_customer_count.}
////   }
//   },
//
//   measures: {
//
//   count_order_id: {
//     sql: `order_id`,
//     type: `count`,
//   },
//
//     count_distinct_customer_id: {
//        sql: `customer_id`,
//        description: `The distinct count of customer_id.`,
//        type: `countDistinct`,
//       },
////
////
////      final_customer_count_first_month : {
////        sql: `sum(${count_distinct_customer_id}) over (order by margin__retention_month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
////       type: `number`,
////      },
//
//     total_revenue: {
//       sql: `sum(item_price)`,
//       type: `number`,
//       description: `This is the actual revenue inclusive of tax exclusive after discount. Note- in FOI, the item_price is calculated using actual qty`,
//     },
//
//     total_cost: {
//       sql: `case when sum(item_cost) != 0 then sum(item_cost) end`,
//       type: `number`,
//       description: `This is the total cost (COGS) for an SKU over the aggregation period.  Note- in FOI, the item_cost is calculated using actual qty`,
//     },
//
//     total_tax: {
//       sql: `case when sum(item_tax_total) != 0 then sum(item_tax_total) end`,
//       type: `number`,
//     },
//
//     total_shipping_revenue: {
//      sql: `case when sum(item_shipping_fee) != 0 then sum(item_shipping_fee) end`,
//      type: `number`,
//      description: `This is the total shipping fee for an SKU over the aggregation period.  Note- in FOI, the item_shipping_fee is calculated using actual qty`,
//     },
//
//      total_discount: {
//      sql: `case when sum(item_coupon_discount) != 0 then sum(item_coupon_discount) end`,
//      type: `number`,
//      description: `This is the total_discount over the aggregation period and specified filters. Note - In FOI, the column item_discount is calculated using actual qty`,
//     },
//
//     net_revenue: {
//       sql: `${total_revenue} + ${total_shipping_revenue} - ${total_discount} - ${total_tax}`,
//       type: `number`,
//     },
//
//     contribution_margin_1 :{
//       sql: `${net_revenue} - ${total_cost}`,
//       type: `number`,
//     },
//
//     contribution_margin_2: {
//       sql: `${net_revenue} - ${total_cost}`, // - fulfillment_cost - order_processing_fee`
//       type: `number`,
//       rolling_window: {
//         trailing: `unbounded`
//         },
//     },
//
//     running_monthly_contributed_revenue: {
//       sql: `sum(${contribution_margin_2}) over (order by margin__retention_month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
//       type: `number`,
//     },
//
//     running_weekly_contributed_revenue: {
//       sql: `sum(${contribution_margin_2}) over (order by margin__retention_week ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
//       type: `number`,
//     },
//
//     running_quarterly_contributed_revenue: {
//       sql: `sum(${contribution_margin_2}) over (order by margin__retention_quarter ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
//       type: `number`,
//     },
//
////     LTV_per_customer: {
////       sql: `${running_contributed_revenue}/${margin_customer_count.first_month_count_distinct_customer_id}`,
////       type: `number`,
////     },
//
////     first_month_count_distinct_customer_id:{
////       sql: ``
////     }
//
////      product_margin: {
////      sql: `case when ((${total_revenue} - ${total_cost})/${total_revenue}) * 100 is null then 0 else ((${total_revenue} - ${total_cost})/${total_revenue}) * 100 end`,
////      type: `number`,
////      description: `This is the product margin. It is calculated as the ratio of the difference in revenue generated and the cost of that sku with the revenue of that sku over a particular agg period`,
////     },
//
////      gross_margin: {
////      sql: `((${total_revenue} - ${total_cost} - ${total_shipping_fee})/${total_revenue}) * 100`,
////      type: `number`,
////      description: `This is the gross margin. It is calculated as the ratio of the difference in revenue generated and the cost of that sku and the shipping charges with the revenue of that sku over a particular agg period`,
////     },
////
////     contribution_margin: {
////       sql: `((${total_revenue} - ${total_cost} - ${total_shipping_fee} - ${total_discount})/${total_revenue}) * 100`,
////       type: `number`,
////       rolling_window: {
////         trailing: `unbounded`
////         }
////     },
////
////     contributed_revenue: {
////       sql: `(${total_revenue} - ${total_cost} - ${total_shipping_fee} - ${total_discount})`,
////       type: `number`,
////       rolling_window: {
////         trailing: `unbounded`
////         }
////     },
////
////     contributed_revenue_montly_rolling: {
////       sql: `sum(${contributed_revenue}) over (order by margin__retention_month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
////       type: `number`
////     },
//
////     first_month_contribution_revenue: {
////       sql: `first_value((${contributed_revenue})) over (order by margin__retention_month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
////       type: `number`
////     },
////
////     contributed_revenue_weekly_rolling: {
////       sql: `sum(${contributed_revenue}) over (order by margin__retention_week ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
////       type: `number`
////     },
////
////     contributed_revenue_quarterly_rolling: {
////       sql: `sum(${contributed_revenue}) over (order by margin__retention_quarter ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
////       type: `number`
////     },
//},
//});
//
//cube(`dim_customer_profile`, {
//  sql_table: `thewhitewillow_ocular_production.dim_customer_profile`,
//  description: `This cube contains relevant customer info for customer and order retention analysis.`,
//
//  joins: {
//    dim_date_customer_first_order: {
//      relationship: `many_to_one`,
//      sql: `cast(${dim_customer_profile.first_order_date} as date) = ${dim_date_customer_first_order.full_date}`,
//    },
//  },
//
//  dimensions: {
//    customer_id: {
//       sql: `customer_id`,
//       type: `string`,
//       description: `Customer ID from the dim_customer_profile table.`,
//    },
//
//    first_order_date: {
//      sql: `first_order_date`,
//      type: `time`,
//      description: `The date when the given customer placed their first order.`,
//    },
//
//    total_amount_spent_till_date: {
//       sql: `total_amount_spent_till_date`,
//       type: `number`,
//       description: `The total amount spent by a customer so far (on all orders).`,
//    },
//   },
//});
//
//cube(`dim_date_orders`, {
//  sql_table: `ocular_reports.dim_date`,
//  description: `This table contains the dimensional information about the date.`,
//
//  dimensions: {
//    calender_year: {
//      sql: `calender_year`,
//      type: `number`,
//      description: `Year number. e.g. 2023 for the date '2023-02-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    month: {
//      sql: `month`,
//      type: `number`,
//      description: `Month number. e.g. 02 for the date '2023-02-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    year_week: {
//      sql: `year_week`,
//      type: `number`,
//      description: `Week number in the calender_year. e.g. 01 for the date '2023-01-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    calender_quarter: {
//      sql: `calender_quarter`,
//      type: `number`,
//      description: `Quarter number in the calender_year e.g. 01 for the date '2023-02-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    full_date: {
//      sql: `full_date`,
//      type: `time`,
//      description: `The complete date in 'YYYY-MM-DD' format.  It is fetched from the dim_date table directly.`,
//    },
//
//    week_year_combo: {
//      sql: `week_year_combo`,
//      type: `string`,
//      description: `The week-number-year combo for the given date. e.g. 'week_01 - 2023' for the date '2023-01-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    month_year_combo: {
//      sql: `month_year_combo`,
//      type: `string`,
//      description: `The month_name-year combo for the given date. e.g. 'Jan - 2023' for the date '2023-01-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    quarter_year_combo: {
//      sql: `quarter_year_combo`,
//      type: `string`,
//      description: `The quarter_number-year combo for the given date. e.g. 'Q_1 - 2023' for the date '2023-01-01'.  It is fetched from the dim_date table directly.`,
//    },
//   }
//
//
//
//});
//
//cube(`dim_date_customer_first_order`, {
//  sql_table: `ocular_reports.dim_date`,
//  description: `This table contains the dimensional information about the date.`,
//
//  dimensions: {
//    calender_year: {
//      sql: `calender_year`,
//      type: `number`,
//      description: `Year number. e.g. 2023 for the date '2023-02-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    month: {
//      sql: `month`,
//      type: `number`,
//      description: `Month number. e.g. 02 for the date '2023-02-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    year_week: {
//      sql: `year_week`,
//      type: `number`,
//      description: `Week number in the calender_year. e.g. 01 for the date '2023-01-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    calender_quarter: {
//      sql: `calender_quarter`,
//      type: `number`,
//      description: `Quarter number in the calender_year e.g. 01 for the date '2023-02-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    full_date: {
//      sql: `full_date`,
//      type: `time`,
//      description: `The complete date in 'YYYY-MM-DD' format.  It is fetched from the dim_date table directly.`,
//    },
//
//    week_year_combo: {
//      sql: `week_year_combo`,
//      type: `string`,
//      description: `The week-number-year combo for the given date. e.g. 'week_01 - 2023' for the date '2023-01-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    month_year_combo: {
//      sql: `month_year_combo`,
//      type: `string`,
//      description: `The month_name-year combo for the given date. e.g. 'Jan - 2023' for the date '2023-01-01'. It is fetched from the dim_date table directly.`,
//    },
//
//    quarter_year_combo: {
//      sql: `quarter_year_combo`,
//      type: `string`,
//      description: `The quarter_number-year combo for the given date. e.g. 'Q_1 - 2023' for the date '2023-01-01'.  It is fetched from the dim_date table directly.`,
//    },
//   }
//
//
//
//});
//
////cube(`margin_customer_count`, {
//// sql: `select customer_id, order_id, order_date from thewhitewillow_ocular_production.fact_order_item`,
////
////  joins: {
////    dim_customer_profile: {
////      relationship: `one_to_one`,
////      sql: `cast(${CUBE}.customer_id as string) = ${dim_customer_profile.customer_id}`,
////    },
////
//////    dim_date_customer_created: {
//////      relationship: `many_to_one`,
//////      sql: `cast({CUBE}.customer_created_at as date) = {dim_date_customer_created.full_date}`,
//////    },
////
////    dim_date_orders: {
////      relationship: `one_to_one`,
////      sql: `cast(${CUBE}.order_date as date) = ${dim_date_orders.full_date}`,
////    },
////
////  },
////
////   dimensions: {
////     order_id: {
////       sql: `order_id`,
////       type: `string`,
////     },
////
////     customer_id: {
////       sql: `customer_id`,
////       type: `string`,
////     },
////
////      first_order_week: {
////     sql: `${dim_date_customer_first_order.year_week}`,
////     description: `This is the week when the first order was made by that particular customer. It is fetched from dim_customer_profile table.`,
////     type: `number`,
////   },
////
////   first_order_month: {
////     sql: `${dim_date_customer_first_order.month}`,
////     type: `number`,
////     description: `This is the month when the first order was made by that particular customer. It is fetched from dim_customer_profile table`,
////   },
////
////   first_order_quarter: {
////     sql: `${dim_date_customer_first_order.calender_quarter}`,
////     description: `This is the quarter when the first order was made by that particular customer. It is fetched from dim_customer_profile table`,
////     type: `number`,
////   },
////
////   first_order_year: {
////     sql: `${dim_date_customer_first_order.calender_year}`,
////     type: `number`,
////     description: `This is the year when the first order was made by that particular customer. It is fetched from dim_customer_profile table.`,
////   },
////
////   retention_quarter: {
////     sql: `4*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.calender_quarter} - ${dim_date_customer_first_order.calender_quarter} )`,
////     type: `number`,
////     description: `The numeric difference between the starting quarter of the cohort and the order quarter`,
////      },
////
////   retention_month: {
////     sql: `12*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.month} - ${dim_date_customer_first_order.month} )`,
////     type: `number`,
////     description: `The numeric difference between the starting month of the cohort and the order month`,
////   },
////
////   retention_week: {
////     sql: ` 52*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.year_week} - ${dim_date_customer_first_order.year_week})`,
////     type: `number`,
////     description: `The numeric difference between the starting week of the cohort and the order week`,
////   },
////
////   age_month_year: {
////     sql: `${dim_date_customer_first_order.month_year_combo}`,
////     description: `The month-year extracted from the first order date column. This column contains the cohort definition.`,
////     type: `string`,
////   },
////
////   age_week_year: {
////     sql: `{dim_date_customer_first_order.week_year_combo}`,
////     description: ` The week-year extracted from the first order date column . This column contains the cohort definition.`,
////     type: `string`,
////   },
////
////   age_quarter_year: {
////     sql: `${dim_date_customer_first_order.quarter_year_combo}`,
////     description: `The quarter-year extracted from the first order date column . This column contains the cohort definition.`,
////     type: `string`,
////   },
////   },
////
////   measures: {
////
////     first_month_count_distinct_customer_id: {
////        sql: `customer_id`,
////        description: `The distinct count of customer_id.`,
////        type: `countDistinct`,
////        filters:[{ sql: `${retention_month} = 0`}]
////        },
////
////     },
////
////});
