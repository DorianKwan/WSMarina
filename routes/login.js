const express = require('express');

function createRouter(knex, bcrypt) {
	const router = express.Router();

	// router.get("/", (req, res) => {
	// 	let templateVars = { user: req.session.user_id };
	// 	res.render("login", templateVars);
	// });

	router.post("/login", (req, res) => {
		// Guard function to check for bad input
		if (!req.body.email || !req.body.password) {
			// res.send('no input in input fields!');
			res.sendStatus(420)
			return;
		}
		// Check for email match in db
		const findUserByEmail = knex('users')
			.select('id', 'username', 'password')
			.where({ email: req.body.email })
			.limit(1);

		findUserByEmail.then((rows) => {
			const user = rows[0];
			if (!user) {
				return Promise.reject({
					type: 409,
					message: 'Check your spelling, submitted credentials are invalid!'
				});
			}
			// If user exists, check for password match
			const comparePasswords = bcrypt.compare(req.body.password, user.password);

			return comparePasswords.then((passwordsMatch) => {
				if (!passwordsMatch) {
					return Promise.reject({
						type: 409,
						message: 'Bad credentials!'
					});
				}
				return Promise.resolve(user);
			});
		}).then((user) => {
			// Log user in
			req.session.user_id = user.id;
			// Redirect to users page
			res.sendStatus(200);

			// If chain is broken by error:
		}).catch((err) => {
	    res.sendStatus(err.type)
		});
	});
	return router
}
module.exports = createRouter;