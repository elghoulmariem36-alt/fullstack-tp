export interface Room {
  _id: string;
  name: string;
}

export interface AppareilModel {
  _id: string;
  name: string;
  status: 'On' | 'Off';
  room?: Room | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppareilPayload {
  name: string;
  status: 'On' | 'Off';
  room?: string | null;
}
