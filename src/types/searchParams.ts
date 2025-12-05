export interface IFindAndCountAll {
  page?: number;
  amount?: number;
  order?: string;
  direct?: 'asc' | 'desc';
  filter?: string;
  filters?: any; // Supondo que seja uma string que será convertida para um objeto JSON
  field?: string;
  include?: any;
  baseAssociation?: boolean;
}
