export type TJourneys = {
  Id: number;
  Departure: Date;
  Return: Date;
  DepartureStationId: number;
  DepartureStationName: string;
  ReturnStationId: number;
  ReturnStationName: string;
  Distance: number;
  Duration: number;
};

export type TStations = {
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
};
