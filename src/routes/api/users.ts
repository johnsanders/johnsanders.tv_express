import passport from 'passport';
import express from 'express';
import auth from '../auth';
import User from '../../models/User';

const router = express.Router();

router.post('/register', auth.optional, async (req, res, next) => {
	const {
		body: { user },
	} = req;
	if (!user.email) {
		return res.status(422).json({
			errors: {
				email: 'is required',
			},
		});
	}
	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}
	const finalUser = new User(user);
	finalUser.setPassword(user.password);
	try {
		const a = await finalUser.save();
		console.log('fds', a);
		res.json({ user: finalUser.toAuthJson() });
	} catch (e) {
		console.error(e);
	}
});

router.post('/login', auth.optional, (req, res, next) => {
	const {
		body: { user },
	} = req;
	if (!user.email) {
		return res.status(422).json({
			errors: {
				email: 'is required',
			},
		});
	}
	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: 'is required',
			},
		});
	}
	return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
		if (err) {
			return next(err);
		}
		if (passportUser) {
			const user = passportUser;
			user.token = passportUser.generateJwt();
			return res.json({ user: user.toAuthJson() });
		}
		return res.status(400).json(info);
	})(req, res, next);
});
router.get('/current', auth.required, (req, res, next) => {
	const { id } = req.query;
	return User.findById(id).then(user => {
		if (!user) {
			return res.sendStatus(400);
		}
		return res.json({ user: user.toAuthJson() });
	});
});

export default router;
