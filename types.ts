export interface ItineraryItem {
  date: string;
  title: string;
  details: string;
  accommodation: string;
  important?: string;
  links?: { type: string; label: string; url: string }[];
  isSkiDay: boolean;
}

export interface Expense {
  id: number;
  item: string;
  jpy: number;
  twd: number;
  payer: string;
  splitCount: number;
  twdPerPerson: number;
  participants: string[];
  date: string;
  thumbnail?: string;
}

export interface ChecklistItem {
  text: string;
  checked: boolean;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
}
