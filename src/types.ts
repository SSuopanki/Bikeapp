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
  id: number;
  nimi: string;
  namn: string;
  name: string;
  osoite: string;
  adress: string;
  kaupunki: string;
  stad: string;
  operaattor: string;
  kapasiteet: number;
  coordinateX: number;
  coordinateY: number;
}
