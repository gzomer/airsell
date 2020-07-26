## AirSell - Build your own Online Store
Build an online business powered by AirTable

## Inspiration

Small businesses have been severely disrupted by Covid-19.

Small shops cannot sell their products and it is really difficult for them to go online, as they don't have experience in creating online stores.

So what if smalls businesses could easily create an online store, even without any experience?

Well, that's what AirSell is for. 

## What it does
AirSell is an E-commerce platform powered by AirTable.

It allows businesses to easily create and publish online stores. Customers can view products, select their preferences, add them to the basket and complete the purchase using Stripe. And the best part: all data is stored in AirTable, which can be easily customised for each business-specific demands.

Implemented features
- Setup wizard
- Configure themes
- Configure name and description
- Configure Products table
- Configure Orders table
- Configure Customers table
- Configure Order Products table
- Automatically select fields and table based on the name
- Publish Ecommerce
- View summary of Ecommerce
- Allow to edit and republish Ecommerce
- Show menus categories
- List products
- List products by categories
- Show products attributes
- Add to cart
- Select product attributes
- Show products' images
- Empty cart
- Go to checkout
- Verify purchase status
- Send order to AirTable base

## How I built it
I have used AirTable blocks for the frontend and Node.JS + Express for the backend. I have also used Stripe API for payments and the AirTable API to submit the orders to AirTable.

List of AirTable UI features used:

- Heading
- Button
- FormField
- Input
- Link
- Text
- Label
- Dialog
- TablePickerSynced
- FieldPickerSynced
- loadCSSFromString
- globalConfig
- useBase
- useRecords

## How to remix this block

1. Create a new base (or you can use an existing base).

2. Create a new block in your base (see [Create a new block](https://airtable.com/developers/blocks/guides/hello-world-tutorial#create-a-new-block),
   selecting "Remix from Github" as your template.

3. From the root of your new block, run `block run`.
