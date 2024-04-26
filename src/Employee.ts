export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  user_role: string;
  id_proof?: string;
  gender?: string;
  date_of_birth: string;
  marital_status: string;
  detailed_address: string;
  city_municipality: string;
  province: string;
  contact_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  bio?: string;
}
