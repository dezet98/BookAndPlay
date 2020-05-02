export class SportObject {
  objectName: string;
  sportName: string;
  phoneNumber: string;
  address: string;
  latitude: string;
  longitude: string;
  images: Array<string>;
  objectDescription: string;

  constructor(objectName: string,
              sportName: string,
              phoneNumber: string,
              address: string,
              latitude: string,
              longitude: string,
              images: Array<string>,
              objectDescription: string)
  {
    this.objectName = objectName;
    this.sportName = sportName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.images = images;
    this.objectDescription = objectDescription;
  }

  getSportObject() {
    return {
      objectName: this.objectName,
      sportName: this.sportName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      images: this.images,
      objectDescription: this.objectDescription
    };
  }
}

