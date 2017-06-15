# numbeo-helpers

> Helpers for translation data in [Numbeo API](https://www.numbeo.com/api/doc.jsp).

The most basic purpose is getting russian translations of categories names used in API. These categories used in this API methods:

**Prices**:
- /api/price_items
- /api/city_prices
- /api/country_prices
- /api/historical_city_prices
- /api/historical_country_prices
- /api/city_prices_raw
- /api/city_prices_archive_raw

Example:
```js
{
   "monthLastUpdate":4,
   "contributors":91,
   "name":"Belgrade, Serbia",
   "prices":[
      {
         "average_price":5.443478260869566,
         "item_name":"Meal, Inexpensive Restaurant, Restaurants",
         "highest_price":7,
         "item_id":1,
         "lowest_price":4
      },
      {
         "average_price":1.8523809523809522,
         "item_name":"Imported Beer (0.33 liter bottle), Restaurants",
         "highest_price":2.3,
         "item_id":5,
         "lowest_price":1.5
      },
      {
         "average_price":0.3611111111111111,
         "item_name":"Lettuce (1 head), Markets",
         "highest_price":0.5,
         "item_id":113,
         "lowest_price":0.25
      },
      {
         "average_price":1.3,
         "item_name":"Cappuccino (regular), Restaurants",
         "highest_price":1.5,
         "item_id":114,
         "lowest_price":1.2
      }
   ],
   "yearLastUpdate":2012,
   "currency":"EUR"
}
```

Here you see array of objects named prices, and every object have `item_id`. So, `numbeo-helpers` working with this IDs.

Also there is one small method for getting textual version of crime and safety indices used by this API methods:

**Indices**:
- /api/indices
- /api/country_indices
- /api/city_crime
- /api/country_crime

**Example**:
```js
{
   "health_care_index":66.75925925925927,
   "crime_index":38.84500915750915,
   "traffic_time_index":17,
   "purchasing_power_incl_rent_index":104.48707062276117,
   "cpi_index":77.32543080858119,
   "pollution_index":69.3103448275862,
   "traffic_index":93.60606499265447,
   "quality_of_life_index":141.4787210994602,
   "cpi_and_rent_index":58.15013366824719,
   "groceries_index":71.8735218572076,
   "safety_index":61.154990842490825,
   "name":"Kuwait",
   "rent_index":37.49969632054832,
   "traffic_co2_index":4256,
   "restaurant_price_index":75.45173244741275,
   "traffic_inefficiency_index":52.48906353257302,
   "property_price_to_income_ratio":6.989395647748136
}
```

## Install
```console
$ npm install numbeo-helpers
```

```console
$ yarn add numbeo-helpers
```

## Usage

Basic:
```js
const numbeo = require("numbeo-helpers")();
```
Debug:
```js
const numbeo = require("numbeo-helpers")({"debug": true});
```

You can pass `{"debug": true}` in function, so it `console.log` messages, if you pass something wrong to method. If you don't pass - debug is `false` by default.

## API

### numbeo.categoryObjectById(category_id)
Returns object of category by ID.

#### category_id
Type: `number`, `string`

Example:
```js
numbeo.categoryObjectById(1);
```
Result:
```js
  {
    "id": 1,
    "category_name": {
      "en": "Restaurants",
      "ru": "Рестораны"
    },
    "item_name": {
      "en": "Meal, Inexpensive Restaurant",
      "ru": "Порция, недорогой ресторан"
    },
    "payment_type": "oneoff",
    "slug": "restaurants"
  }
```

### numbeo.nameById(category_id, [locale])
Get name of category by ID on specified language.

#### category_id
Type: `number`, `string`

#### locale
Type: `string`
Default: `ru`
Supported: `ru`, `en`

Example:
```js
numbeo.nameById(2, "ru")
```
Result:
```js
Порция на двоих, ресторан среднего класса, три блюда
```

### numbeo.allCategoriesByType(category)
Returns array of objects with categories of this type.

#### category
Type: `string`
Supported: `restaurants`, `markets`, `transportation`, `utilities`, `sportsleisure`, `childcare`, `fashion`, `rent`, `apartments`, `finance`

Example:
```js
numbeo.allCategoriesByType("finance")
```
Result:
```js
[ { id: 105,
    category_name:
     { en: 'Salaries And Financing',
       ru: 'Зарплата и финансирование' },
    item_name:
     { en: 'Average Monthly Net Salary (After Tax)',
       ru: 'Месячная (после уплаты налогов)' },
    payment_type: 'monthly',
    slug: 'finance' },
  { id: 106,
    category_name:
     { en: 'Salaries And Financing',
       ru: 'Зарплата и финансирование' },
    item_name:
     { en: 'Mortgage Interest Rate in Percentages (%), Yearly',
       ru: 'Ипотека (%, год)' },
    payment_type: 'yearly',
    slug: 'finance' } ]
```

### numbeo.allCategoriesByPaymentType(payment_type)
Returns array of objects with categories of this payment type.

#### payment_type
Type: `string`
Supported: `oneoff`, `monthly`, `yearly`
(`oneoff` means one-time payments, e.g. market purchases, taxi payments and suchlike)

Example:
```js
numbeo.allCategoriesByPaymentType("yearly")
```
Results in:
```js
[ { id: 228,
    category_name: { en: 'Childcare', ru: 'Дети' },
    item_name:
     { en: 'International Primary School, Yearly for 1 Child',
       ru: '' },
    payment_type: 'yearly',
    slug: 'childcare' },
  { id: 106,
    category_name:
     { en: 'Salaries And Financing',
       ru: 'Зарплата и финансирование' },
    item_name:
     { en: 'Mortgage Interest Rate in Percentages (%), Yearly',
       ru: 'Ипотека (%, год)' },
    payment_type: 'yearly',
    slug: 'finance' } ]

```

### Get text description of crime and safety index
```js
numbeo.crimeAndSafetyIndex(index, locale)
```
Returns object with text descriptions of crime and safety indices by passing crime index. In Numbeo API safety index is a number opposite to crime index, so it's decriptions is opposite too (*high* level of *crime* means *low* level of *safety*).

`locale` is language locale for returned results (now supported **ru** and **en**). If locale not specified, then **ru** will be used.

Example:
```js
numbeo.crimeAndSafetyIndex(18.99726889577763, "ru")
```
Results in:
```js
{
	"crime": "Очень низкий",
    "safety": "Очень высокий"
}
```

## Testing
```console
$ npm run test
```

## License

MIT © Alexander Sharabarov
