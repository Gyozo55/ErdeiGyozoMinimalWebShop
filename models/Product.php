<?php 
  class Product {
    // DB stuff
    private $conn;
    private $table = 'products';

    // Products Properties
    public $id;
    public $name;
    public $description;
    public $price;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get All Products
    public function read_all() {
      // Create query
      $query = 'SELECT * FROM ' . $this->table . '';
      
      // Prepare statement
      $statement = $this->conn->prepare($query);

      // Execute query
      $statement->execute();

      return $statement;
    }

    // Create Product
    public function create() {
          // Create query
          $query = 'INSERT INTO ' . $this->table . ' SET name = :name, description = :description, price = :price';

          // Prepare statement
          $statement = $this->conn->prepare($query);

          // Clean data
          $this->name = htmlspecialchars(strip_tags($this->name));
          $this->description = htmlspecialchars(strip_tags($this->description));
          $this->price = htmlspecialchars(strip_tags($this->price));

          // Bind data
          $statement->bindParam(':name', $this->name);
          $statement->bindParam(':description', $this->description);
          $statement->bindParam(':price', $this->price);

          // Execute query
          if($statement->execute()) {
            return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $statement->error);

      return false;
    }
  }