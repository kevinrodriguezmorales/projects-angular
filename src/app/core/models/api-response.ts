import { Product } from "src/app/shared";

export interface ApiResponseItem {
    code: number
    description: string | Product | Partial<Product> | boolean | Product[]
}

export interface ApiResponse {
    responses: ApiResponseItem[];
}