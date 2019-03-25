import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface UserModel extends User, mongoose.Document {
	setPassword: (password: string) => void;
	validatePassword: (password: string) => boolean;
	generateJWT: (password: string) => void;
	toAuthJson: () => AuthJson;
}

const { Schema } = mongoose;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	watching: {
		type: [String],
		default: [],
	},
});

UserSchema.methods.setPassword = function(password: string) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password: string) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			email: this.email,
			id: this._id,
			exp: Math.floor(expirationDate.getTime() / 1000),
		},
		'secret',
	);
};

UserSchema.methods.toAuthJson = function() {
	return {
		_id: this._id,
		email: this.email,
		token: this.generateJwt(),
	};
};

export default mongoose.model<UserModel>('User', UserSchema);
