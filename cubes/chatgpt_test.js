// cube(`sales_1`, {
//    sql: `select 'abc001' as order_id, cast('2023-01-01' as date) as order_date, 1 as order_month, 'xyz001' as sku, 103 as order_price
//            union all
//            select 'abc002' as order_id, cast('2023-02-01' as date) as order_date, 2 as order_month, 'xyz001' as sku, 134 as order_price
//            union all
//            select 'abc003' as order_id, cast('2023-01-01' as date) as order_date, 1 as order_month,'xyz002' as sku, 13 as order_price
//            union all
//            select 'abc004' as order_id, cast('2023-02-01' as date) as order_date, 2 as order_month,'xyz002' as sku, 49 as order_price
//            union all
//            select 'abc005' as order_id, cast('2023-03-01' as date) as order_date, 3 as order_month,'xyz003' as sku, 389 as order_price
//
//          `,
//
////    joins:{
////
////    },
//
//
//    dimensions: {
//      order_id:  {
//        sql: `order_id`,
//        type: `string`,
//
//      },
//
//      sku:  {
//        sql: `sku`,
//        type: `string`,
//
//      },
//
//      order_date:  {
//        sql: `order_date`,
//        type: `time`,
//
//      },
//
//      order_price:  {
//        sql: `order_price`,
//        type: `number`,
//
//      },
//
//      order_month: {
//        sql: `order_month`,
//        type: `number`,
//      },
//
//      },
//
//    measures: {
//      revenue: {
//      sql: `sum(${order_price}) `,
//      type: `number`,
//      rolling_window: {
//        trailing: `unbounded`,
//      },
//      },
//
//
//      order_count: {
//        sql:`count(order_id)`,
//        type: `number`,
//         rolling_window: {
//        trailing: `unbounded`,
//      },
//      },
//
//      rn_order_count: {
//        sql: `row_number() over (order by order_month )`,
//        type: `number`,
//      },
//
//      firat_cohort_count: {
//        sql: `${order_count}`,
//        type: `number`,
//        filters: [{sql: `${rn_order_count} = 1`}],
//         rolling_window: {
//        trailing: `unbounded`,
//      },
//      },
//
//      runninng_first_cohort_count: {
//        sql: `sum(${revenue}) over (order by q_0.sales_1__order_month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
//        type: `number`,
//      },
//
//
//      running_revenue: {
//       sql: `sum(${revenue}) over (order by q_0.sales_1__order_month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`,
//       type: `number`,
//     },
//
//     first_cohort_agg: {
//       sql: ` ${running_revenue}/${runninng_first_cohort_count}`,
//       type: `number`,
//       shown: true,
//     }
//    },
//
//});