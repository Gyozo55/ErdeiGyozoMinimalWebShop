# ErdeiGyozoFalatozzHw

# How we can use this Api?

* Install XAMPP : `https://www.apachefriends.org/hu/index.html`
* Run XAMPP and Switch ON apache and mysql.
* Import database in `http://localhost/phpmyadmin` from products_init.sql file.

**This Api available in:**
* Windows: `http://localhost` port.
* Linux: `http://localhost:5000` port.
* Mac: `http://localhost:8080` port.

# API route discription:

## POST http://localhost/ErdeiGyozoFalatozzHw/api/product/create.php:
    
This route what we use, when we want create product.
This route only allow `POST` http method.

* **Accepted Content Type**:
  * `application/json`

* **Request Parameters**:
  * `name`: the name of the product
  * `description`: the description of the product
  * `price`: the price of the product
  

* **Status codes**
  * `200` successfully request
  * `400` if request parameter is missing or incorrect
  * `500` server error 

## GET http://localhost/ErdeiGyozoFalatozzHw/api/product/read_all.php:
    
This route what we use, when we want to see all product.
This route only allow `GET` http method.

* **Accepted Content Type**:
  * `application/json`

* **Status codes**
  * `200` successfully request
  * `400` if request parameter is missing or incorrect
  * `500` server error 

## PUT http://localhost/ErdeiGyozoFalatozzHw/api/product/update.php:
    
This route what we use, when we want to update one specific product. 
This route only allow `PUT` http method.

* **Accepted Content Type**:
  * `application/json`

* **Request Parameters**:
    * `id`: the id of the product
    * `name`: the name of the product
    * `description`: the description of the product
    * `price`: the price of the product
  

* **Status codes**
  * `200` successfully request
  * `400` if request parameter is missing or incorrect
  * `500` server error 

## DELETE http://localhost/ErdeiGyozoFalatozzHw/api/product/delete.php:
    
This route what we use, when we want to delete one specific product. 
This route only allow `DELETE` http method.

* **Accepted Content Type**:
  * `application/json`

* **Request Parameters**:
    * `id`: the id of the product
  

* **Status codes**
  * `200` successfully request
  * `400` if request parameter is missing or incorrect
  * `500` server error 

  

### Run the JS/React Frontend

This project is best run using **Node 14.17.x**.

Install client dependencies:

```shell
cd frontend && npm i
```

Run the client tests:

```shell
cd frontend && npm test
```

Run the client (http://localhost:3000):

```shell
cd frontend && npm start
```
