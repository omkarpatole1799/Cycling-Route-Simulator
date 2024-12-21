const pgClient = require('../utils/dbConnect.js');
const routesModel = {
	createRoute: async (data) => {
		console.log(data, '==data==');
		return await pgClient.query(
			`INSERT INTO routes 
                (user_id, 
                name, 
                geometry, 
                distance)
            VALUES ($1, $2, ST_GeomFromGeoJSON($3), ST_Length(ST_GeomFromGeoJSON($3)))
                     RETURNING *`,
			[data.userId, data.name, JSON.stringify(data.geometry)]
		);
	},

	getRouteById: async (id) => {
		return await pgClient.query(
			`SELECT 
                id, 
                user_id, 
                name, 
                ST_AsGeoJSON(geometry) as geometry, 
                distance, 
                created_at, 
                updated_at
            FROM routes 
            WHERE id = $1`,
			[id]
		);
	},

	updateRoute: async (data, id) => {
		return await pgClient.query(
			`UPDATE routes 
                SET 
                name = $1, 
                geometry = ST_GeomFromGeoJSON($2), 
                distance = ST_Length(ST_GeomFromGeoJSON($2))
            WHERE id = $3
            RETURNING *`,
			[data.name, JSON.stringify(data.geometry), id]
		);
	},

	deleteRoute: async (id) => {
		return await pgClient.query(`DELETE FROM routes WHERE id = $1 RETURNING *`, [id]);
	},
};
module.exports = routesModel;
