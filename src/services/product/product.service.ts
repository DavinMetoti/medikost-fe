import { apiFetch } from '../api.service';

export interface Product {
  id: number;
  name: string;
  address: string;
  distance_to_kariadi: number;
  thumbnail: string;
  starting_price: number | null;
  whatsapp: string;
  google_maps_link: string;
  facilities_preview: string[];
  status: string;
  room_available: number;
}

export interface ProductPagination {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta: {
    timestamp: string;
    execution_time_ms: number;
    request_id: string;
    api_version: string;
    path: string;
    method: string;
    status_code: number;
    pagination?: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
      from: number;
      to: number;
    };
  };
}

export const getProducts = async (page: number = 1): Promise<ApiResponse<ProductPagination>> => {
  return apiFetch(`products?page=${page}`);
};

export const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
  return apiFetch(`products/${id}`);
};