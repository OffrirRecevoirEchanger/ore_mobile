export class ApiAuthenticationData {
	uid: number;
	partnerId: number;
	accessToken: string;

	constructor(uid: number, partnerId: number, accessToken: string) {
		this.uid = uid;
		this.partnerId = partnerId;
		this.accessToken = accessToken;
	}
}
