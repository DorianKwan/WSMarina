const express = require('express');

function createRouter(knex, bcrypt) {
	const router = express.Router();

	router.post("/login", (req, res) => {
		// Guard function to check for bad input
		if (!req.body.email || !req.body.password) {
			console.log("Test1")
			res.sendStatus(300)
			return;
		}
		// Check for email match in db
		knex('users')
			.select('*')
			.where({ email: req.body.email })
			.limit(1)
		.then((rows) => {
			console.log("Test2")
			const user = rows[0];
			if (!user) {
				return Promise.reject({
					type: 409,
					message: 'Check your spelling, submitted credentials are invalid!'
				});
			}
			// If user exists, check for password match
			const comparePasswords = bcrypt.compare(req.body.password, user.password_digest);

			return comparePasswords.then((passwordsMatch) => {
				console.log("Test3")
				if (!passwordsMatch) {
					return Promise.reject({
						type: 409,
						message: 'Bad credentials!'
					});
				}
				return Promise.resolve(user);
			});
		}).then((user) => {
			console.log("Test4")
			// Log user in
			req.session.user_id = user.id;
			// Redirect to users page
			res.sendStatus(200);

			// If chain is broken by error:
		}).catch((err) => {
			console.log("Test5")
	    res.sendStatus(err.type)
		});
	});
	return router
}
module.exports = createRouter;