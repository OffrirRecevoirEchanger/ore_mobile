import { OreChatMessage } from "./ore-chat-message";

export class OreChatGroup {
	id: number;
	groupId: number;
	messages: OreChatMessage[];
	image: string;
	name: string;
	resumeMessage: string;

	constructor(
		id: number,
		groupId: number,
		messages: OreChatMessage[],
		image: string,
		name: string,
		resumeMessage: string
	) {
		this.id = id;
		this.groupId = groupId;
		this.messages = messages;
		this.image = image;
		this.name = name;
		this.resumeMessage = resumeMessage;
	}
}
