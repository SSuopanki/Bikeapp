export interface TJourneys {
  journeyId: number;
  departureDate: Date;
  returnDate: Date;
  departureStationId: number;
  departureStationName: string;
  returnStationId: number;
  returnStationName: string;
  distance: number;
  duration: number;
}

export interface TStations {
  Id: number;
  Nimi: string;
  Namn: string;
  Name: string;
  Osoite: string;
  Adress: string;
  Kaupunki: string;
  Stad: string;
  Operaattor: string;
  Kapasiteet: number;
  CoordinateX: number;
  CoordinateY: number;
}
