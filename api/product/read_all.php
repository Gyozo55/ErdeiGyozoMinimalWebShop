<?php 
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Product.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog Product object
  $product = new Product($db);

  // Blog Product query
  $result = $product->read_all();
  // Get row count
  $num = $result->rowCount();

  // Check if any Products
  if($num > 0) {
    // Product array
    $products_arr = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $product_item = array(
        'id' => $id,
        'name' => $name,
        'description' => $description,
        'price' => $price,
      );

      // Push to "data"
      array_push($products_arr, $product_item);
    }

    // Turn to JSON & output
    echo json_encode($products_arr);

  } else {
    // No Products
    echo json_encode(
      array('message' => 'No Products Found')
    );
  }