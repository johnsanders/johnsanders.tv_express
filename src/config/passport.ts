import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User';

const initPassport = (): void => {
	passport.use(
		new LocalStrategy.Strategy(
			{
				usernameField: 'user[email]',
				passwordField: 'user[password]',
			},
			(email: string, password: string, done) => {
				User.findOne({ email })
					.then(user => {
						if (!user || !user.validatePassword(password)) {
							return done(null, false, { message: 'Email or password is invalid' });
						}
						return done(null, user);
					})
					.catch(done);
			},
		),
	);
};

export default initPassport;
