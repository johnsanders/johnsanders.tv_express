interface AuthJson {
	_id: string;
	email: string;
	token: string;
}
interface User {
	email: string;
	hash: string;
	salt: string;
	watching: string[];
}
