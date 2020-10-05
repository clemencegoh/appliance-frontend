export interface Appliance {
  id?: string;
  serialNumber: string;
  brand: string;
  model: string;
  status: Status;
  dateBought: Date;
}

export type Status = "Available" | "Sold";
