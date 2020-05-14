export class SportObject {
  name: string;
  sport: string;
  phone: string;
  address: string;
  lat: string;
  lon: string;
  images: FormData;
  description: string;

  constructor(objectName: string,
              sportName: string,
              phone: string,
              address: string,
              lat: string,
              lon: string,
              images: FormData,
              description: string)
  {
    this.name = objectName;
    this.sport = sportName;
    this.phone = phone;
    this.address = address;
    this.lat = lat;
    this.lon = lon;
    this.images = images;
    this.description = description;
  }

  getSportObject() {
    return {
      name: this.name,
      sport: this.sport,
      phone: this.phone,
      address: this.address,
      lat: this.lat,
      lon: this.lon,
      // images: this.images,
      description: this.description
    };
  }
}

