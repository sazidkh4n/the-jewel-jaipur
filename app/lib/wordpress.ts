import axios from 'axios';

const WORDPRESS_API_URL = 'https://thejeweljaipur.com/wp-json';
const WC_API_URL = `${WORDPRESS_API_URL}/wc/v3`;

const consumer_key = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const consumer_secret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

const wooCommerceApi = axios.create({
  baseURL: WC_API_URL,
  params: {
    consumer_key,
    consumer_secret,
  },
});

export async function getProducts(filters?: any) {
  try {
    const params = {
      ...filters,
      per_page: filters?.per_page || 100,
    };

    const response = await wooCommerceApi.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array instead of throwing
  }
}

export async function getCategories() {
  try {
    const params = {
      per_page: 100,
      hide_empty: true,
    };

    const response = await wooCommerceApi.get('/products/categories', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array instead of throwing
  }
}

export async function getProduct(id: number) {
  try {
    const response = await wooCommerceApi.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // Return null instead of throwing
  }
}