import { api } from '@/axios/BaseAxios'
import { showSuccessToast, showErrorToast } from '@/utils/toast';

export const addToCart = async (productId: number) => {
  try {
    const response = await api.post(`/api/cartItem/`, {
      product_id: productId
    });
    showSuccessToast('Producto agregado al carrito');
    return response.data;
  } catch (error) {
    showErrorToast('Error al agregar al carrito',)
    throw error;
  }
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  try {
    const response = await api.put(`/api/cartItem/`, {
      cart_item_id: cartItemId,
      quantity: quantity
    });
    showSuccessToast('Carrito actualizado')
    return response.data; 
  }  catch (error) {
    showErrorToast('Error al agregar al carrito')
    throw error;
  }
}

export const removeFromCart = async (itemId: number) => {
  try {
    const response = await api.delete(`/api/cartItem/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get(`/api/cart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete(`/api/cart/clear/`);
    showSuccessToast('Carrito limpiado')
    return response.data;
  } catch (error) {
    console.error('Error al limpiar el carrito:', error);
    throw error;
  }
};
