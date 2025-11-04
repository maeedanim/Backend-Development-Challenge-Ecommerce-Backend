# Backend-Development-Challenge-Ecommerce-Backend.

## 📖 Overview

This project is a **backend API** built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** for managing products and categories.
It includes features like **CRUD operations**, **category association**, **automatic product code generation**, and **discount-based pricing calculation**.

This project follows **industry-standard folder structure** and uses a **service-controller-route pattern** for scalability and clean code separation.

---

## ⚙️ Tech Stack

| Layer              | Technology                |
| :----------------- | :------------------------ |
| Runtime            | Node.js                   |
| Framework          | Express.js                |
| Database           | MongoDB with Mongoose ORM |
| Language           | JavaScript (ES6)          |
| Environment Config | dotenv                    |
| Hashing Utility    | crypto                    |

---

## 🧱 Folder Structure

```
product-backend/
│
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   │
│   ├── controllers/              # Handles HTTP requests & responses
│   │   ├── categoryController.js
│   │   └── productController.js
│   │
│   ├── models/                   # Database Schemas (Mongoose)
│   │   ├── Category.js
│   │   └── Product.js
│   │
│   ├── routes/                   # API route definitions
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── services/                 # Business logic (data processing)
│   │   ├── categoryService.js
│   │   └── productService.js
│   │
│   ├── utils/                    # Utility functions
│   │   └── generateProductCode.js
│   │
│   └── index.js                  # Entry point of the server
│
├── .env                          # Environment variables
├── package.json
└── README.md
```

---

## 🧩 Features

### 🟢 Category Management

* Create, update, delete, and view all categories.
* Ensures **unique category names**.

### 🟣 Product Management

* Create, update, and view products.
* Automatically generates a **unique product code** using:

  * **Longest increasing substring** logic
  * **Hashed name prefix**
  * **Start and end index encoding**

### 🧮 Discount & Pricing

* Calculates the **final price** (price - discount).
* Supports **searching** and **filtering** products by name or category.

### 🧷 Associations

* Each product is linked to a valid **Category**.
* Uses `.populate()` to fetch full category details (MongoDB-style JOIN).

---

## 🔢 Product Code Generation Logic

Each product’s unique code is auto-generated following this rule:

**Format:**

```
<hashed_product_name>-<startIndex><longest_increasing_substring><endIndex>
```

### Example:

Product name: `"Alpha Sorter"`

* Longest increasing substrings → `"alp"` and `"ort"`
* Starting & ending indices → 0 and 8
* Generated code →
  `"p48asd4-0alport8"`

This ensures **uniqueness and traceability** of every product.

---

## 📡 API Endpoints

### 🗂️ Categories

|   Method   | Endpoint              | Description           |
| :--------: | :-------------------- | :-------------------- |
|  **POST**  | `/api/categories`     | Create a new category |
|   **GET**  | `/api/categories`     | Get all categories    |
|   **PUT**  | `/api/categories/:id` | Update a category     |
| **DELETE** | `/api/categories/:id` | Delete a category     |

### 📦 Products

|  Method  | Endpoint            | Description                                     |
| :------: | :------------------ | :---------------------------------------------- |
| **POST** | `/api/products`     | Create a new product (auto-generates code)      |
|  **GET** | `/api/products`     | Get all products (filter by category or name)   |
|  **PUT** | `/api/products/:id` | Update product status, description, or discount |

---

## 🧠 How the Code Works (Data Flow)

1. **Client (Postman)** sends request → e.g., `POST /api/products`
2. The **route** (`productRoutes.js`) forwards it to the appropriate **controller function**.
3. The **controller** validates data and calls the **service layer**.
4. The **service** interacts with the **MongoDB database (via Mongoose model)**.
5. If product is created → the **generateProductCode.js** utility is used to create a unique product code.
6. The **controller** sends the response (status + message + data) back to the client.

🔁 This structure ensures:

* Clean separation of concerns
* Reusable logic
* Easier debugging and testing

---

## 🧩 Database Schema Diagram

```
+----------------+         +----------------+
|   Category     |         |    Product     |
+----------------+         +----------------+
| _id (ObjectId) | <------ | category (ref) |
| name           |         | name           |
| description    |         | description    |
| createdAt      |         | price          |
| updatedAt      |         | discount       |
|                |         | image          |
|                |         | status         |
|                |         | productCode    |
|                |         | createdAt      |
|                |         | updatedAt      |
+----------------+         +----------------+
```

Relationship:
➡ **One Category → Many Products**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/product-backend.git
cd product-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the root:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productdb
```

### 4️⃣ Run the Server

```bash
npm run dev
```

The server will run on
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 💬 Testing with Postman

### Create Category

**POST** → `/api/categories`

```json
{
  "name": "Electronics",
  "description": "All gadgets"
}
```

### Create Product

**POST** → `/api/products`

```json
{
  "name": "Alpha Sorter",
  "description": "Amazing sorter",
  "price": 100,
  "discount": 10,
  "image": "http://img.com/sorter.jpg",
  "status": "In Stock",
  "category": "PUT_CATEGORY_ID_HERE"
}
```

### Update Product

**PUT** → `/api/products/PRODUCT_ID`

```json
{
  "status": "Stock Out",
  "discount": 15
}
```

---

## 🧮 Concepts Implemented

| Concept                     | Description                                               |
| :-------------------------- | :-------------------------------------------------------- |
| **Async/Await**             | Used for handling asynchronous MongoDB operations cleanly |
| **Separation of Concerns**  | Routes → Controllers → Services → Models → DB             |
| **Error Handling**          | Try/Catch blocks with clear HTTP responses                |
| **Data Validation**         | Ensures unique names, valid category associations         |
| **Populate (Join)**         | Fetches category details inside product documents         |
| **ACID Principles**         | MongoDB ensures data consistency and durability           |
| **Transactions (Optional)** | Can be added for combined create operations               |

---

## 🧾 License

This project is for educational and demonstration purposes — designed to showcase backend development best practices using Node.js and MongoDB.

---

Would you like me to include a **visual ER diagram (image or code-generated)** in this README so you can attach it to your viva presentation too? I can generate that for you automatically.
