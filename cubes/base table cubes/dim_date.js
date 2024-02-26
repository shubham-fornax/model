cube(`dim_date`, {
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

      type_of_day: {
        sql: `case when day_is_weekday = 0 then 'Weekend' when day_is_weekday = 1 then 'Weekday' end`,
        type: `string`,
      },

      month_year_combo: {
      sql: `month_year_combo`,
      type: `string`,
      description: `The month year combination for the date.`,
      },

      year_week_combo: {
       sql: `year_week`,
       type: `string`,
       description: `The week year combination for the date.`,
      },

      calender_year: {
          sql: `calender_year`,
          type: `number`,
          description: ` The calender year number for the date.`,
          },

      calender_quarter: {
        sql: `calender_quarter`,
        type: `number`,
        description: ` The quarter number in the calender year for the date.`
      },

       month: {
          sql: `month`,
          type: `number`,
          description: `The calender month number for the date.`,
          },


    }
});