export interface Column {
  id: "name" | "image" | "contact" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  renderCell?: any;
}

export interface Data {
  name: string;
  image: string;
  contact: number;
}

export interface Session {
  user?: {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}
