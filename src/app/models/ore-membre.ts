export class OreMembre {
	id: number;
	name: string;
	partnerId: number;
	image: string;

	constructor(id: number, name: string, partnerId: number, image: string) {
		this.id = id;
		this.name = name;
		this.partnerId = partnerId;
		this.image = image;
	}
}
