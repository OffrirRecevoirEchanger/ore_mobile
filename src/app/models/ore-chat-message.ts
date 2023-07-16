export class OreChatMessage {
	id: number;
	isRead: boolean;
	memberId: number;
	text: string;

	constructor(id: number, isRead: boolean, memberId: number, text: string) {
		this.id = id;
		this.isRead = isRead;
		this.memberId = memberId;
		this.text = text;
	}
}
