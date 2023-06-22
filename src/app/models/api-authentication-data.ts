export class ApiAuthenticationData {
	uid: number;
	accessToken: string;

	constructor(uid: number, accessToken: string) {
		this.uid = uid;
		this.accessToken = accessToken;
	}
}
