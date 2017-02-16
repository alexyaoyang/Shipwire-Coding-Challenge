# ShipWire Coding Challenge - A Product & Order CRUD.

## Installation

1. Install NodeJS and MongoDB for your OS
2. Run MongoDB: e.g. `mongod --dbpath=./data`.
3. Clone repo and `cd` in.
4. Get address validation API key from [SmartyStreets](https://smartystreets.com/) (free)
5. Create a `.env` file in root folder, store AUTH_ID and AUTH_TOKEN from SmartyStreet inside and save file.
6. Install Dependencies: `npm install`.
7. Start Server: `npm start`.

## API Reference
### Product APIs
#### Show all products
* URL: `/api/product` 
* Method: GET
* URL Params: none
* Data Params: none
* Response:
  * Code: 200
  * Content: `[{"_id": "58a17642c3eca572de2f2f89","name": "product1","description": "product1","value": 1,"__v": 0}]`

#### Find a single product
* URL: `/api/product` 
* Method: GET
* URL Params:
  * id : Number
* Data Params: none
* Response:
  * Code: 200
  * Content: `{"_id":"58a4d60290aa034e1ffc2249","name":"p1","value":1,"__v":0}`

#### Create a product
* URL: `/api/product` 
* Method: POST
* URL Params: none
* Data Params: 

  ##### Required
  * name: String
  * value: Number
  
  ##### Optional
  * description: String
  * width: Number
  * length: Number
  * height: Number
  * weight: Number
* Response:
  * Code: 200
  * Content: `created`

#### Update a product
* URL: `/api/product` 
* Method: PUT
* URL Params:
  * id : Number
* Data Params: 

  ##### Required
  * name: String
  * value: Number
  
  ##### Optional
  * description: String
  * width: Number
  * length: Number
  * height: Number
  * weight: Number
* Response:
  * Code: 200
  * Content: `updated`

#### DELETE a product
* URL: `/api/product` 
* Method: DELETE
* URL Params:
  * id : Number
* Data Params: none
* Success Response:
  * Code: 200
  * Content: `deleted`

### Order APIs
#### Show all orders
* URL: `/api/order` 
* Method: GET
* URL Params: none
* Data Params: none
* Response:
  * Code: 200
  * Content: `[{"_id":"58a4ba386e1cb93140aaa64f","recipientName":"Joey","streetAddress":"1269 Poplar Ave","city":"Sunnyvale","state":"CA","zipCode":"94086","phoneNumber":"4158192749","quantity":3,"product":"58a17642c3eca572de2f2f89","__v":0}]`

#### Find a single order
* URL: `/api/order` 
* Method: GET
* URL Params:
  * id : Number
* Data Params: none
* Response:
  * Code: 200
  * Content: `{"_id":"58a4ba386e1cb93140aaa64f","recipientName":"Joey","streetAddress":"1269 Poplar Ave","city":"Sunnyvale","state":"CA","zipCode":"94086","phoneNumber":"4158192749","quantity":3,"product":"58a17642c3eca572de2f2f89","__v":0}`

#### Create an order
* URL: `/api/order` 
* Method: POST
* URL Params: none
* Data Params: 

  ##### Required
  * recipientName: String
  * streetAddress: Number
  * city: String
  * state: Number
  * zipCode: Number
  * phoneNumber: Number
  * product: Number
  * quantity: objectId
* Response:
  * Code: 200
  * Content: `created`

#### Update an order
* URL: `/api/order` 
* Method: PUT
* URL Params:
  * id : Number
* Data Params: 

  ##### Required
  * recipientName: String
  * streetAddress: Number
  * city: String
  * state: Number
  * zipCode: Number
  * phoneNumber: Number
  * product: Number
  * quantity: objectId
* Response:
  * Code: 200
  * Content: `updated`

#### DELETE an order
* URL: `/api/order` 
* Method: DELETE
* URL Params:
  * id : Number
* Data Params: none
* Success Response:
  * Code: 200
  * Content: `deleted`

## Tests

`npm test` will run end-to-end tests. (To be done)

## Acknowledgements
* Address Validation is done with SmartyStreets API.
* Tech Stack is MEAN.
* Bootstrap for UI.
* Mongoose as middle layer between UI & DB.
* Yahoo Finance API & AngularJS Doc for currency exchange.
* Modified MEAN.io boilerplate

## License

Copyright 2017, Alex Yao

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
