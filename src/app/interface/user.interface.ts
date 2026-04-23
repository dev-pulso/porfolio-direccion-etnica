export enum Rols {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    CASHIER = "cashier",
}

export interface User {
    id: string;
    username: string;
    email: string;
    nombre?: string;
    apellido?: string;
    rol?: Rols;
}
