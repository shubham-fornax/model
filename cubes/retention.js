//cube(`customer_first_order`, {
//  sql: `
//        with first_order_details_per_customer as (
//
//        select customer_id, sku_name, dp.product_name, dp.category, dp.sub_category, foi.order_date
//        , shipping_city, shipping_state
//        , day_name as day_of_the_week
//        , case when day_is_weekday = 1 then 'Weekday' when day_is_weekday = 0 then 'Weekend' end as type_of_day
//        , dense_rank() over (partition by customer_id order by order_date asc) as rn
//        from  thewhitewillow_ocular_production.fact_order_item as foi
//        left join  thewhitewillow_ocular_raw.dim_products as dp on foi.sku_name = dp.sku
//        left join  thewhitewillow_ocular_raw.dim_date as dd  on date(foi.order_date) = dd.full_date
//
//         )
//
//      select *
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
//    retention: {
//      relationship: `one_to_many`,
//      sql: `${CUBE}.customer_id = ${retention.customer_id}`,
//    },
//  },
//
//  dimensions: {
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
//      description: `distinct product_name values from the dim_product table.`,
//      },
//
//    category: {
//        sql: `category`,
//        type: `string`,
//        description: `category of the SKU ordered in the first order for a customer. It is fetched from the dim_products table.`,
//        },
//
//     sub_category: {
//        sql: `sub_category`,
//        type: `string`,
//        description: `sub_category of the SKU ordered in the first order for a customer. It is fetched from the dim_products table.`,
//        },
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
//cube(`retention`, {
//    sql: `select distinct * from  thewhitewillow_ocular_production.fact_order_item`,
//    description: ` This cube contains necessary measure and dimensions for order and customer retention profiles.
//      It is built on fact_order_item and the customer level information is fetched by performing a join with the
//      dim_customer_profile table, on customer_id.`,
//
//    joins: {
//      dim_customer_profile: {
//        relationship: `many_to_one`,
//        sql: `cast(${CUBE}.customer_id as string) = ${dim_customer_profile.customer_id}`,
//        },
//
//      dim_products: {
//        relationship: `many_to_one`,
//        sql: `cast(${CUBE}.sku_name as string) = ${dim_products.sku}`
//      },
////
//      dim_date_orders: {
//        relationship: `many_to_one`,
//        sql: `cast(${CUBE}.order_date as date) = ${dim_date_orders.full_date}`
//      },
//    },
//
//    dimensions: {
//      composite_key: {
//        sql: `CONCAT(order_id, '-', order_item)`,
//        description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
//        type: `string`,
//        primary_key: true,
//      },
//
//
//      order_id : {
//        sql: `order_id` ,
//        description: ` ID of an order as per the sales channel`,
//        type: `string`,
//      },
//
//      order_item_id : {
//        sql: `order_item_id` ,
//        description: `ID of an item inside an order, based on the sales channel`,
//        type: `string`,
//      },
//
//      marketplace : {
//        sql: `marketplace` ,
//        description: `The channel where the order was processed.`,
//        type: `string`,
//      },
//
//      customer_id : {
//        sql: `customer_id` ,
//        description: ` ID of the customer who placed the order. It is currently generated by the marketplace/channel`,
//        type: `string`,
//      },
////
//      order_date : {
//        sql: `order_date` ,
//        description: `The timestamp when the order was placed on the marketplace website.`,
//        type: `time`,
//      },
//
//      item_cost: {
//        sql: `item_cost`,
//        type: `number`,
//      },
//
//      item_tax_total: {
//        sql: `item_tax_total`,
//        type: `number`,
//      },
//
//      item_coupon_discount: {
//        sql: `item_coupon_discount`,
//        type: `number`,
//      },
//
//      order_week: {
//        sql: `${dim_date_orders.year_week_combo}`,
//        description: ` The week number when the order was placed.  This is extracted from the order_date column and week number is extracted from dim_date.`,
//        type: `number` ,
//      },
//
//      order_month: {
//        sql: `${dim_date_orders.month}` ,
//        description: `The month number when the order was placed.  This is extracted from the order_date column and month number is extracted from dim_date.`,
//        type: `number` ,
//      },
//
//      order_quarter: {
//        sql: `${dim_date_orders.calender_quarter}` ,
//        description: `The quarter number when the order was placed.  This is extracted from the order_date column  and quarter number is extracted from dim_date.`,
//        type: `number` ,
//      },
//
//      order_year: {
//        sql: `${dim_date_orders.calender_year}` ,
//        description: `The year number when the order was placed.  This is extracted from the order_date column  and quarter number is extracted from dim_date.`,
//        type: `number` ,
//      },
//
//      customer_created_at: {
//        sql: `customer_created_at` ,
//        description: `The timestamp when a particular customer was created on the website of the marketplace.`,
//        type: `time` ,
//      },
//
//      first_order_date: {
//        sql: `${dim_customer_profile.first_order_date}` ,
//        description: `This is the date when the first order was made by that particular customer. It is fetched from dim_customer_profile table.`,
//        type: `time` ,
//      },
//
//      first_order_week: {
//        sql: `${dim_date_customer_first_order.year_week_combo}` ,
//        description: ` This is the week when the first order was made by that particular customer. It is fetched from dim_customer_profile table and week number is extracted from dim_date table.`,
//        type: `number` ,
//      },
//
//      first_order_month: {
//        sql: `${dim_date_customer_first_order.month}` ,
//        description: `This is the month when the first order was made by that particular customer. It is fetched from dim_customer_profile table and month number is extracted from dim_date table.`,
//        type: `number` ,
//      },
//
//      first_order_quarter: {
//        sql: `${dim_date_customer_first_order.calender_quarter}` ,
//        description: `This is the quarter when the first order was made by that particular customer. It is fetched from dim_customer_profile table and quarter number is extracted from dim_date table.`,
//        type: `number` ,
//      },
//
//      first_order_year: {
//        sql: `${dim_date_customer_first_order.calender_year}` ,
//        description: `This is the year when the first order was made by that particular customer. It is fetched from dim_customer_profile table and year number is extracted from dim_date`,
//        type: `number` ,
//      },
//
//      item_price: {
//        sql: `item_price` ,
//        description: ` The total price paid for the item in the order.`,
//        type: `number` ,
//      },
//
//      order_price: {
//        sql: `order_price` ,
//        description: `The total price paid for the order.`,
//        type: `number` ,
//      },
//
//      order_cost: {
//        sql: `order_cost` ,
//        description: `The total cost for the order.`,
//        type: `number` ,
//      },
//
//      sku: {
//        sql: `${dim_products.sku}` ,
//        type: `string` ,
//      },
//
//      product_name: {
//        sql: `${dim_products.product_name}` ,
//        description: ` The name of the product.`,
//        type: `string` ,
//      },
//
//      category: {
//        sql: `${dim_products.category}` ,
//        description: `The main category to which the items in this order belong.`,
//        type: `string` ,
//      },
//
//      sub_category: {
//        sql: `sub_category` ,
//        description: `The sub-category to which the items in this order belong.`,
//        type: `string` ,
//      },
//
//      retention_quarter: {
//        sql: ` 4*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.calender_quarter} - ${dim_date_customer_first_order.calender_quarter} )` ,
//        description: `The number of quarters between the starting quarter of the cohort and the order quarter.`,
//        type: `number` ,
//      },
//
//      retention_month: {
//        sql: `12*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.month} - ${dim_date_customer_first_order.month} )` ,
//        description: ` The number of months  between the starting month of the cohort and the order month`,
//        type: `number` ,
//      },
//
//       retention_week: {
//        sql: `52*(${dim_date_orders.calender_year} - ${dim_date_customer_first_order.calender_year}) + (${dim_date_orders.year_week_combo} - ${dim_date_customer_first_order.year_week_combo})` ,
//        description: `The number of weeks  between the starting week of the cohort and the order week`,
//        type: `number` ,
//      },
//
//      age_month_year: {
//        sql: `${dim_date_customer_first_order.month_year_combo}` ,
//        description: `The month-year extracted from the first order date column. This column contains the cohort definition.`,
//        type: `string` ,
//      },
//
//      age_week_year: {
//        sql: `${dim_date_customer_first_order.year_week_combo}` ,
//        description: ` The week-year extracted from the first order date column. This column contains the cohort definition.`,
//        type: `string` ,
//      },
//
//      age_quarter_year: {
//        sql: `${dim_date_customer_first_order.quarter_year_combo}` ,
//        description: `The quarter-year extracted from the first order date column . This column contains the cohort definition.`,
//        type: `string` ,
//      },
//
//    },
//
//    measures: {
//      count_distinct_order_id: {
//        sql: `order_id`,
//        description: `The distinct count of order_id.`,
//        type: `countDistinct`,
//        drill_members: [order_id, order_item_id, sku ,marketplace, order_date, item_price, item_cost, item_tax_total
//                        ,item_coupon_discount, product_name, category, sub_category],
//         rolling_window: {
//          trailing: `unbounded`,
//          },
//      },
//
////      row_number: {
////        sql: `row_number() over (partition by ${retention_month}, ${retention_year}  )`,
////        type:  `number`,
////      },
//
//      count_distinct_customer_id: {
//        sql: `customer_id`,
//        description: `The distinct count of customer_ids.`,
//        type: `countDistinct`,
//        drill_members: [customer_id, order_id, order_item_id, sku ,marketplace, order_date, item_price, item_cost, item_tax_total
//                        ,item_coupon_discount, product_name, category, sub_category],
//      },
//
//      revenue: {
//        sql: `case when sum(item_price) is null then 0 else sum(item_price) end`,
//        description: `The revenue generated from the order. It is calculated by taking sum of item_price.`,
//        type: `number`,
//        drill_members: [order_id, order_item_id, sku ,marketplace, order_date, item_price, item_cost, item_tax_total
//                        ,item_coupon_discount, product_name, category, sub_category],
//        format: `currency`,
//      },
//    }
//
//});
//
//cube(`dim_products_for_retention`, {
//  extends: dim_products,
//  description: `This cube contains dimensional information about products.`,
//
//  dimensions: {
//
//  },
//});
//
//cube(`dim_customer_profile_for_retention`, {
//  extends: dim_customer_profile,
//  description: `This cube contains relevant dimensional customer info based on the dim_customer_profile table.`,
//
//  joins: {
//    dim_date_customer_first_order: {
//      relationship: `many_to_one`,
//      sql: `cast(${CUBE}.first_order_date as date) = ${dim_date_customer_first_order.full_date}`,
//    },
//    },
//
//    dimensions:{
//
//    },
//});
//
//cube(`dim_date_orders`, {
//  extends: dim_date,
//  description: `This table contains the dimensional information about the date.`,
//
//  dimensions:{
//
//    },
//});
////
//cube(`dim_date_customer_first_order`, {
//  extends: dim_date,
//  description: `This table contains the dimensional information about the date.`,
//
//  dimensions:{
//
//    },
//});
//
//
