export interface IProvider {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  longitude: number;
  latitude: number;
  age: number;
  max_distance: number;
  gender: 'FEMALE' | 'MALE';
  activities: string[];
  photo?: File;
}
