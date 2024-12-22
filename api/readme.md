# Route API Documentation

This document describes the available routes and API endpoints for managing routes. The API allows you to create, retrieve, update, and delete routes.

## Base URL

```

/routes

```

---

## Endpoints

### 1. **Create a New Route**

- **URL:** `/routes`
- **Method:** `POST`
- **Description:** Creates a new route with the provided data. The route requires a `userId`, `name`, and `geometry` (a GeoJSON structure).

#### Request Body Example:

```json
{
	"userId": 1,
	"name": "Morning Ride",
	"geometry": {
		"type": "LineString",
		"coordinates": [
			[-73.9876, 40.7661],
			[-73.9851, 40.7643],
			[-73.9833, 40.7625]
		]
	}
}
```

#### Success Response:

- **Code:** 201 Created
- **Content:**

  ```json
  {
  	"success": true,
  	"message": "Successfully saved route.",
  	"data": {
  		"id": 1,
  		"userId": 1,
  		"name": "Morning Ride",
  		"geometry": {
  			"type": "LineString",
  			"coordinates": [
  				[-73.9876, 40.7661],
  				[-73.9851, 40.7643],
  				[-73.9833, 40.7625]
  			]
  		}
  	}
  }
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"statusCode": 400,
  	"success": false,
  	"usrMsg": "Missing required fields (User Id, Name and Geometry).",
  	"data": null,
  	"respDataType": "json",
  	"errMsg": null
  }
  ```

---

### 2. **Get All Routes**

- **URL:** `/routes`
- **Method:** `GET`
- **Description:** Fetches all routes from the database.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"success": true,
  	"message": "All Routes.",
  	"data": [
  		{
  			"id": 1,
  			"userId": 1,
  			"name": "Morning Ride",
  			"geometry": {
  				"type": "LineString",
  				"coordinates": [
  					[-73.9876, 40.7661],
  					[-73.9851, 40.7643],
  					[-73.9833, 40.7625]
  				]
  			}
  		},
  		{
  			"id": 2,
  			"userId": 2,
  			"name": "Evening Ride",
  			"geometry": {
  				"type": "LineString",
  				"coordinates": [
  					[-73.9886, 40.7662],
  					[-73.9861, 40.7645],
  					[-73.9843, 40.7626]
  				]
  			}
  		}
  	]
  }
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"statusCode": 400,
  	"success": false,
  	"usrMsg": "No routes found.",
  	"data": null,
  	"respDataType": "json",
  	"errMsg": null
  }
  ```

---

### 3. **Get a Route by ID**

- **URL:** `/routes/:id`
- **Method:** `GET`
- **Description:** Fetches a single route by its ID.

#### Path Parameters:

- `id` (required): The ID of the route to retrieve.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"success": true,
  	"message": "Successful.",
  	"data": {
  		"id": 1,
  		"userId": 1,
  		"name": "Morning Ride",
  		"geometry": {
  			"type": "LineString",
  			"coordinates": [
  				[-73.9876, 40.7661],
  				[-73.9851, 40.7643],
  				[-73.9833, 40.7625]
  			]
  		}
  	}
  }
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"statusCode": 400,
  	"success": false,
  	"usrMsg": "No routes found.",
  	"data": null,
  	"respDataType": "json",
  	"errMsg": null
  }
  ```

---

### 4. **Update a Route**

- **URL:** `/routes/:id`
- **Method:** `PUT`
- **Description:** Updates a route by its ID. The request requires the route's `name` and `geometry` (GeoJSON structure).

#### Path Parameters:

- `id` (required): The ID of the route to update.

#### Request Body Example:

```json
{
	"name": "Updated Morning Ride",
	"geometry": {
		"type": "LineString",
		"coordinates": [
			[-73.9876, 40.7661],
			[-73.9851, 40.7643],
			[-73.9833, 40.7625]
		]
	}
}
```

#### Success Response:

- **Code:** 201 Created
- **Content:**

  ```json
  {
  	"success": true,
  	"message": "Update successful.",
  	"data": {
  		"id": 1,
  		"userId": 1,
  		"name": "Updated Morning Ride",
  		"geometry": {
  			"type": "LineString",
  			"coordinates": [
  				[-73.9876, 40.7661],
  				[-73.9851, 40.7643],
  				[-73.9833, 40.7625]
  			]
  		}
  	}
  }
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"statusCode": 400,
  	"success": false,
  	"usrMsg": "Missing required fields (User Id, Name and Geometry).",
  	"data": null,
  	"respDataType": "json",
  	"errMsg": null
  }
  ```

---

### 5. **Delete a Route**

- **URL:** `/routes/:id`
- **Method:** `DELETE`
- **Description:** Deletes a route by its ID.

#### Path Parameters:

- `id` (required): The ID of the route to delete.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"success": true,
  	"message": "Delete successful.",
  	"data": {
  		"id": 1,
  		"userId": 1,
  		"name": "Morning Ride",
  		"geometry": {
  			"type": "LineString",
  			"coordinates": [
  				[-73.9876, 40.7661],
  				[-73.9851, 40.7643],
  				[-73.9833, 40.7625]
  			]
  		}
  	}
  }
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"statusCode": 400,
  	"success": false,
  	"usrMsg": "Please provide valid route id.",
  	"data": null,
  	"respDataType": "json",
  	"errMsg": null
  }
  ```

---

## Error Codes

- `400 Bad Request`: The request is malformed or missing required fields.
- `404 Not Found`: The requested route does not exist.
- `500 Internal Server Error`: Unexpected server error.
