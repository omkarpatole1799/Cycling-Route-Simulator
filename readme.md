[Architecture Overview](#architecture-overview)

[Api Documentation](#route-api-documentation)

[Simulation Api Documentation](#simulation-api-documentation)

[Setup Instrucions](#setup-instructions)

# <a name='architecture-overview'>**Architecture Overview**</a>

### **1. Frontend Architecture**

The frontend is built using **React**, leveraging the **Leaflet.js** library for interactive maps and **react-toastify** for user notifications, used **Typescript** for typesafety and **Tailwind CSS** for css styles . It consists of the following key components:

- **Home Component**:

  - Acts as the main entry point.
  - Manages the Leaflet map instance and provides user interaction functionality.
  - Connects to modals and lists for route management and simulation.

- **SavePolylineModal**:

  - A modal for saving newly drawn routes with a user-provided name.

- **UserRoutesList**:

  - Displays saved routes.
  - Allows users to delete routes or pan the map to specific routes.

- **RouteSimulation**:

  - Handles the simulation of movement along a route.
  - Manages start, pause, reset, and cancel actions.
  - Updates the map with simulated position markers.

**Technologies:**

- **React**: Component-based UI.
- **Leaflet.js**: Interactive mapping library.
- **Tailwind CSS**: Styling for UI elements.
- **TypeScript**: For better type safety.

---

### **2. Backend Architecture**

The backend provides RESTful APIs to interact with the database and manage route operations and simulations.

- **Endpoints**:
  - **Save Route** (`POST /routes`): Saves a route's name and geometry data.
  - **Fetch Routes** (`GET /routes`): Retrieves all saved routes.
  - **Delete Route** (`DELETE /routes/:id`): Deletes a specific route by its ID.
  - **Simulation Control**:
    - **Start Simulation** (`POST /simulation/start`): Initiates route simulation.
    - **Pause Simulation** (`POST /simulation/pause`): Pauses the ongoing simulation.
    - **Reset Simulation** (`POST /simulation/reset`): Resets the simulation.

**Technologies:**

- **Node.js**: Backend runtime.
- **Express.js**: Simplifies API creation.
- **PostgreSQL + PostGIS**: For DB and storing GeoJSON data.

---

### **3. Database Architecture**

The database layer stores route data, including metadata and geometry.

- **Data Structure**:
  - **Routes Collection/Table**:
    - `id`: Unique identifier for the route.
    - `name`: Name of the route.
    - `geometry`: GeoJSON object storing the route's geographical data.
    - `distance`: Distance of the polyline/route in meters.

**Technologies:**

- **PostgreSQL** (or equivalent): Relational database for structured data storage.
- **PostGIS**: Extends PostgreSQL with spatial capabilities for storing GeoJSON.

---

### **4. Data Flow**

1.  **User Interaction**:

    - Users draw routes on the map or interact with existing ones (e.g., panning, deleting).
    - The frontend communicates with the backend through RESTful API calls.

2.  **Backend Processing**:

    - Backend handles requests, performs CRUD operations on the database, and manages simulation states.

3.  **Database**:

    - Stores and retrieves route data as needed.

4.  **Map Rendering**:

    - The marker in frontend dynamically updates on the Leaflet map based on backend responses.

---

# <a name='route-api-documentation'>**Route API Documentation**</a>

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

# <a name='simulation-api-documentation'> Simulation API Documentation </a>

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

---

# <a name="setup-instructions">**Setup Instructions**</a>

### 1. Clone this reporitory

```json
	git clone https://github.com/omkarpatole1799/Cycling-Route-Simulator.git
```

### 2. Install packages (for API)

```json
	cd /api
	npm install
	npm start
```

### 3. Install packages (for WEB)

```json
	cd /web
	npm install
	npm run dev
```
