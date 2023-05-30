export interface TJourney {
  journeyId: string;
  departureDate: Date;
  returnDate: Date;
  departureStationId: number;
  departureStationName: string;
  returnStationId: number;
  returnStationName: string;
  distance: number;
  duration: number;
}

export interface TJourneysWithTime {
  startTime: string;
  endTime: string;
  departureDate: string;
  returnDate: string;
  departureStationId: number;
  departureStationName: string;
  returnStationId: number;
  returnStationName: string;
  distance: number;
  duration: number;
}

export interface TPostJourneys {
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
