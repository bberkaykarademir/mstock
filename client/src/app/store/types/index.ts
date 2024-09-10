export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  rating: number;
  stockQuantity: number;
  sales: Sale[];
  purchases: Purchase[];
}

export interface Sale {
  id: string;
  productId: string;
  timestamp: Date;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Purchase {
  id: string;
  productId: string;
  deliverer: Deliverer;
  delivererId: string;
  timestamp: Date;
  quantity: number;
  unitCost: number;
  totalCost: number;
  product: Product;
}

export interface Deliverer {
  id: string;
  name: string;
  purchases: Purchase[];
}

export interface Expense {
  id: string;
  type: ExpenseType;
  amount: number;
  timestamp: Date;
}

export enum ExpenseType {
  PURCHASES,
  ASSETS,
  SALARIES,
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: Role;
  salary: number;
  joinDate: Date;
}

export enum Role {
  BOSS,
  EMPLOYEE,
}

export interface Asset {
  id: string;
  name: string;
  cost: number;
  quantity: number;
  purchaseDate: Date;
}
