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

---

# Simulation API Documentation

This document provides details for the available endpoints to control the simulation process. The API allows you to start, pause, reset, and check the status of the simulation.

## Base URL

```

/simulation

```

---

## Endpoints

### 1. **Start Simulation**

- **URL:** `/simulation/start`
- **Method:** `POST`
- **Description:** Starts the simulation using the provided route data. The simulation runs step-by-step, and each step is emitted to the client.

#### Request Body Example:

```json
{
	"route": [
		[40.7128, -74.006],
		[40.7138, -74.005],
		[40.7148, -74.004]
	]
}
```

- `route`: An array of coordinates representing the simulation route.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"message": "Simulation started."
  }
  ```

- The server sends each simulation step as a response every second. Example:

  ```json
  0
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"message": "Simulation already running"
  }
  ```

---

### 2. **Pause Simulation**

- **URL:** `/simulation/pause`
- **Method:** `POST`
- **Description:** Pauses the currently running simulation.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"message": "Simulation paused"
  }
  ```

#### Error Response:

- **Code:** 400 Bad Request
- **Content:**

  ```json
  {
  	"message": "Simulation is not running"
  }
  ```

---

### 3. **Reset Simulation**

- **URL:** `/simulation/reset`
- **Method:** `POST`
- **Description:** Resets the simulation, stopping any ongoing process and clearing the state.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"message": "Simulation reset"
  }
  ```

---

### 4. **Get Simulation Status**

- **URL:** `/simulation/status`
- **Method:** `GET`
- **Description:** Returns the current status of the simulation, including whether it is running and the current step.

#### Success Response:

- **Code:** 200 OK
- **Content:**

  ```json
  {
  	"isRunning": true,
  	"currentStep": 3
  }
  ```

---

## Error Codes

- `400 Bad Request`: Indicates that the simulation cannot start, pause, or reset due to invalid state or conflicting actions (e.g., trying to start the simulation when it is already running).
- `404 Not Found`: Route does not exist (not applicable for these routes).
- `500 Internal Server Error`: Unexpected server error.

---

## Notes

- The simulation steps are processed sequentially, and each step is sent to the client every second.
- The simulation can be paused, reset, or checked for status at any time.
- The simulation will complete once all steps have been processed.
- To restart the simulation, it must be reset first.
