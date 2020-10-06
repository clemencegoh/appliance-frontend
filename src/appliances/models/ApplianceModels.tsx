export interface Appliance {
  id?: string;
  serialNumber: string;
  brand: string;
  model: string;
  status: Status;
  dateBought: string;
}

export type Status = "Available" | "Sold";
