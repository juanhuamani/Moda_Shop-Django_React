import { protectedApi } from '@/axios/BaseAxios'
import { toast } from 'react-toastify';

export const addToCart = async (productId: number) => {
  try {
    const response = await protectedApi.post(`/cartItem/`, {
      product_id: productId
    });
    toast.success('Producto agregado al carrito',{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
    return response.data;
  } catch (error) {
    toast.error('Error al agregar al carrito',{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true, 
    })
    throw error;
  }
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  try {
    const response = await protectedApi.put(`/cartItem/`, {
      cart_item_id: cartItemId,
      quantity: quantity
    });
    toast.success('Carrito actualizado',{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false, 
    })
    return response.data; 
  }  catch (error) {
    toast.error('Error al agregar al carrito',{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true, 
      })
    throw error;
  }
}

export const removeFromCart = async (itemId: number) => {
  try {
    const response = await protectedApi.delete(`/cartItem/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await protectedApi.get(`/cart`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await protectedApi.delete(`/cart/clear/`);
    toast.success('Carrito limpiado',{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
    })
    return response.data;
  } catch (error) {
    console.error('Error al limpiar el carrito:', error);
    throw error;
  }
};