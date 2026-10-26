export interface AppareilModel {
  _id: string;
  name: string;
  status: 'On' | 'Off';
  createdAt?: string;
  updatedAt?: string;
}
