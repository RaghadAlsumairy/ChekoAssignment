export class Branch {
    id: number;         
    name: string;       
    latitude: number;    
    longitude: number;   
    address: string;     
  
    constructor(id: number, name: string, latitude: number, longitude: number, address: string) {
      this.id = id;
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
      this.address = address;
    }
  }
  