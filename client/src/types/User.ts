interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone: string;
  birthdate: Date;
  location: string;
}

export type { User };