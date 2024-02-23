cube(`fact_order_item`, {
   sql: ` SELECT
                  *,
                  row_number() OVER (ORDER BY order_date ASC) AS row_number_order_date_asc
                FROM
                  thewhitewillow_ocular_production.fact_order_item`,
    data_source: `default`,

    dimensions: {

      order_id : {
      sql: `${CUBE}.order_id`,
      type: `string`,
      },

    composite_key: {
        sql: `CONCAT(order_id, '-', order_item)`,
        description: ` A composite_key to act as a primary key. Based on the smallest grain - order_id and order_item_id`,
        type: `string`,
        primary_key: true,
      },

     order_item_id : {
      sql: `order_item_id`,
      type: `string`,
      },

     marketplace: {
      sql: `marketplace`,
      type: `string`,
      },

     item_quantity: {
      sql: `item_quantity`,
      type: `string`,
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
        type: `number`,
      },

      igst_rate: {
        sql: `igst_rate`,
        type: `number`,
      },

      cgst_amount: {
        sql: `cgst_amount`,
        type: `number`,
      },

      sgst_amount: {
        sql: `sgst_amount`,
        type: `number`,
      },

      igst_amount: {
        sql: `igst_amount`,
        type: `number`,
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
        type: `number`,
      },

      shipping_total: {
        sql: `shipping_total`,
        type: `number`,
      },

      shipping_pincode: {
        sql: `shipping_pincode`,
        type: `number`,
      },

      shipping_city: {
        sql: `shipping_city`,
        type: `string`
      },

      shipping_state: {
        sql: `shipping_state`,
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
         type: `string`,
       },

       product_name: {
         sql: `product_name`,
         type: `string`,
       },

       category: {
         sql: `category`,
         type: `string`
       },

       sub_category: {
         sql: `sub_category`,
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



},});