class MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    calorie: number;
    category: string;
    lat: number;
    lng: number;
    count: number;
    secondHiCal: boolean;
  
    constructor(
      id: number,
      name: string,
      description: string,
      price: number,
      image: string,
      calorie: number,
      category: string,
      lat: number,
      lng: number,
      secondHiCal:boolean,
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.image = image;
      this.calorie = calorie;
      this.category = category;
      this.lat = lat;
      this.lng = lng;
      this.count = 0;
      this.secondHiCal = secondHiCal;
    }
  }
  
  export default MenuItem;
  