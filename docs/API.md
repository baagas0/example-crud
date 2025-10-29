# Node.js CRUD API Documentation

## Overview

This API provides CRUD (Create, Read, Update, Delete) operations for managing items with comprehensive input types. The API follows a standardized response format with consistent error handling and pagination support.

**Base URL:** `http://localhost:3000/api`

**Content-Type:** `application/json`

## Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "meta": {
    "code": 200,
    "status": "Success",
    "message": "Request processed successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:19:03.934Z"
  },
  "data": [], // or [] or null or "string"
  "pagination": { // Only for paginated endpoints
    "total_data": 0,
    "limit": 0,
    "total_page": 0,
    "current_page": 0
  }
}
```

### Error Response
```json
{
  "meta": {
    "code": 404,
    "status": "Error",
    "message": "Item not found",
    "error": null,
    "log_code": 2,
    "timestamp": "2025-10-29T05:19:05.864Z"
  },
  "data": null,
  "pagination": {
    "total_data": 0,
    "limit": 0,
    "total_page": 0,
    "current_page": 0
  }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

## Log Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | General Error |
| 2 | Not Found |
| 3 | Validation Error |
| 4 | Unauthorized |
| 5 | Forbidden |

## Endpoints

### 1. Get All Items

Retrieve all items from the database.

**Endpoint:** `GET /api/items`

**Response:**
```json
{
  "meta": {
    "code": 200,
    "status": "Success",
    "message": "Items retrieved successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:18:58.121Z"
  },
  "data": [
    {
      "id": "8cc25d66-9485-4533-b41b-5ed025c9582e",
      "textInput": "Contoh teks",
      "passwordInput": "password123",
      "emailInput": "contoh@email.com",
      "numberInput": 42,
      "telInput": "+628123456789",
      "urlInput": "https://example.com",
      "searchInput": "pencarian",
      "radioInput": "option2",
      "checkboxInput": ["option1", "option3"],
      "selectInput": "option2",
      "multiSelectInput": ["option1", "option3"],
      "dateInput": "2023-11-15",
      "timeInput": "14:30",
      "datetimeInput": "2023-11-15T14:30",
      "monthInput": "2023-11",
      "weekInput": "2023-W46",
      "rangeInput": 75,
      "colorInput": "#ff5733",
      "fileInput": "contoh.pdf",
      "textareaInput": "Ini adalah contoh teks panjang dalam textarea.",
      "createdAt": "2025-10-29T05:17:09.591Z",
      "updatedAt": "2025-10-29T05:17:09.592Z"
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/items
```

---

### 2. Get Paginated Items

Retrieve items with pagination support.

**Endpoint:** `GET /api/items/paginated`

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 10 | Items per page |

**Response:**
```json
{
  "meta": {
    "code": 200,
    "status": "Success",
    "message": "Items retrieved successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:19:03.934Z"
  },
  "data": [...],
  "pagination": {
    "total_data": 1,
    "limit": 5,
    "total_page": 1,
    "current_page": 1
  }
}
```

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/items/paginated?page=1&limit=5"
```

---

### 3. Get Item by ID

Retrieve a single item by its unique ID.

**Endpoint:** `GET /api/items/:id`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique item identifier (UUID) |

**Response (Success):**
```json
{
  "meta": {
    "code": 200,
    "status": "Success",
    "message": "Item retrieved successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:19:05.936Z"
  },
  "data": {
    "id": "8cc25d66-9485-4533-b41b-5ed025c9582e",
    "textInput": "Contoh teks",
    "numberInput": 42,
    "createdAt": "2025-10-29T05:17:09.591Z",
    "updatedAt": "2025-10-29T05:17:09.592Z"
  }
}
```

**Response (Not Found):**
```json
{
  "meta": {
    "code": 404,
    "status": "Error",
    "message": "Item not found",
    "error": null,
    "log_code": 2,
    "timestamp": "2025-10-29T05:19:05.864Z"
  },
  "data": null,
  "pagination": {
    "total_data": 0,
    "limit": 0,
    "total_page": 0,
    "current_page": 0
  }
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/items/8cc25d66-9485-4533-b41b-5ed025c9582e
```

---

### 4. Create New Item

Create a new item with various input types.

**Endpoint:** `POST /api/items`

**Request Body:**
```json
{
  "textInput": "Sample text input",
  "passwordInput": "password123",
  "emailInput": "user@example.com",
  "numberInput": 42,
  "telInput": "+628123456789",
  "urlInput": "https://example.com",
  "searchInput": "search query",
  "radioInput": "option1",
  "checkboxInput": ["option1", "option2"],
  "selectInput": "option2",
  "multiSelectInput": ["option1", "option3"],
  "dateInput": "2023-11-15",
  "timeInput": "14:30",
  "datetimeInput": "2023-11-15T14:30",
  "monthInput": "2023-11",
  "weekInput": "2023-W46",
  "rangeInput": 75,
  "colorInput": "#ff5733",
  "fileInput": "document.pdf",
  "textareaInput": "This is a longer text input in a textarea field."
}
```

**Response:**
```json
{
  "meta": {
    "code": 201,
    "status": "Success",
    "message": "Item created successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:19:05.936Z"
  },
  "data": {
    "id": "5c397a46-ce28-4f8b-aec6-8a21c5aaf043",
    "textInput": "Sample text input",
    "numberInput": 42,
    "createdAt": "2025-10-29T05:19:05.936Z",
    "updatedAt": "2025-10-29T05:19:05.936Z"
  }
}
```

**Example Request:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"textInput":"Test Item","numberInput":123,"emailInput":"test@example.com"}' \
  http://localhost:3000/api/items
```

---

### 5. Update Item

Update an existing item by ID.

**Endpoint:** `PUT /api/items/:id`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique item identifier (UUID) |

**Request Body:**
```json
{
  "textInput": "Updated text input",
  "numberInput": 100,
  "emailInput": "updated@example.com"
}
```

**Response (Success):**
```json
{
  "meta": {
    "code": 200,
    "status": "Success",
    "message": "Item updated successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:19:05.936Z"
  },
  "data": {
    "id": "5c397a46-ce28-4f8b-aec6-8a21c5aaf043",
    "textInput": "Updated text input",
    "numberInput": 100,
    "emailInput": "updated@example.com",
    "createdAt": "2025-10-29T05:19:05.936Z",
    "updatedAt": "2025-10-29T05:20:00.123Z"
  }
}
```

**Response (Not Found):**
```json
{
  "meta": {
    "code": 404,
    "status": "Error",
    "message": "Item not found",
    "error": null,
    "log_code": 2,
    "timestamp": "2025-10-29T05:19:05.864Z"
  },
  "data": null,
  "pagination": {
    "total_data": 0,
    "limit": 0,
    "total_page": 0,
    "current_page": 0
  }
}
```

**Example Request:**
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"textInput":"Updated text","numberInput":999}' \
  http://localhost:3000/api/items/5c397a46-ce28-4f8b-aec6-8a21c5aaf043
```

---

### 6. Delete Item

Delete an item by ID.

**Endpoint:** `DELETE /api/items/:id`

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique item identifier (UUID) |

**Response (Success):**
```json
{
  "meta": {
    "code": 200,
    "status": "Success",
    "message": "Item deleted successfully",
    "error": null,
    "log_code": 0,
    "timestamp": "2025-10-29T05:19:05.936Z"
  },
  "data": {
    "id": "5c397a46-ce28-4f8b-aec6-8a21c5aaf043",
    "textInput": "Deleted item text",
    "numberInput": 42,
    "createdAt": "2025-10-29T05:19:05.936Z",
    "updatedAt": "2025-10-29T05:20:00.123Z"
  }
}
```

**Response (Not Found):**
```json
{
  "meta": {
    "code": 404,
    "status": "Error",
    "message": "Item not found",
    "error": null,
    "log_code": 2,
    "timestamp": "2025-10-29T05:19:05.864Z"
  },
  "data": null,
  "pagination": {
    "total_data": 0,
    "limit": 0,
    "total_page": 0,
    "current_page": 0
  }
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/items/5c397a46-ce28-4f8b-aec6-8a21c5aaf043
```

## Data Model

### Item Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Auto-generated | Unique identifier (UUID) |
| textInput | string | No | Plain text input |
| passwordInput | string | No | Password field |
| emailInput | string | No | Email address |
| numberInput | number | No | Numeric value |
| telInput | string | No | Telephone number |
| urlInput | string | No | URL address |
| searchInput | string | No | Search query |
| radioInput | string | No | Radio button selection |
| checkboxInput | array | No | Multiple checkbox selections |
| selectInput | string | No | Dropdown selection |
| multiSelectInput | array | No | Multiple dropdown selections |
| dateInput | string | No | Date (YYYY-MM-DD) |
| timeInput | string | No | Time (HH:MM) |
| datetimeInput | string | No | Date and time |
| monthInput | string | No | Month (YYYY-MM) |
| weekInput | string | No | Week (YYYY-W##) |
| rangeInput | number | No | Range slider value |
| colorInput | string | No | Color hex code |
| fileInput | string | No | File name/path |
| textareaInput | string | No | Multi-line text |
| createdAt | string | Auto-generated | Creation timestamp (ISO 8601) |
| updatedAt | string | Auto-generated | Last update timestamp (ISO 8601) |

## Error Handling

The API returns structured error responses with the following format:

```json
{
  "meta": {
    "code": 400,
    "status": "Error",
    "message": "Validation failed",
    "error": "Detailed error message",
    "log_code": 3,
    "timestamp": "2025-10-29T05:19:05.936Z"
  },
  "data": null,
  "pagination": {
    "total_data": 0,
    "limit": 0,
    "total_page": 0,
    "current_page": 0
  }
}
```

### Common Error Scenarios

1. **Invalid UUID Format**: Returns 400 error if ID format is invalid
2. **Item Not Found**: Returns 404 error if item doesn't exist
3. **Validation Errors**: Returns 400 error for malformed request data
4. **Server Errors**: Returns 500 error for unexpected server issues

## Quick Start Examples

### 1. Start the Server
```bash
npm install
npm start
```

### 2. Create a New Item
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "textInput": "My First Item",
    "numberInput": 42,
    "emailInput": "example@test.com"
  }' \
  http://localhost:3000/api/items
```

### 3. Get All Items
```bash
curl http://localhost:3000/api/items
```

### 4. Get Paginated Items
```bash
curl "http://localhost:3000/api/items/paginated?page=1&limit=5"
```

### 5. Update an Item
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"textInput":"Updated Item","numberInput":100}' \
  http://localhost:3000/api/items/{ITEM_ID}
```

### 6. Delete an Item
```bash
curl -X DELETE http://localhost:3000/api/items/{ITEM_ID}
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **Body Parser** - Request body parsing

## Development

### Running in Development Mode
```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

### Project Structure
```
├── helpers/
│   └── response.js      # Standardized API response helper
├── models/
│   └── item.js          # Item data model
├── routes/
│   └── api.js           # API routes
├── public/
│   └── js/
│       └── app.js       # Frontend JavaScript
├── docs/
│   └── API.md           # This documentation
├── server.js            # Main server file
└── package.json         # Project dependencies
```

## License

This project is licensed under the MIT License.