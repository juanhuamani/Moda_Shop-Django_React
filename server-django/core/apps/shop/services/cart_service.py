# services/cart_service.py

from django.shortcuts import get_object_or_404
from carts.models import Cart, CartItem, Product

class CartService:

    @staticmethod
    def get_or_create_cart(user):
        return Cart.objects.get_or_create(user=user, paid=False)

    @staticmethod
    def get_cart(user):
        return get_object_or_404(Cart, user=user, paid=False)

    @staticmethod
    def get_product(product_id):
        return get_object_or_404(Product, id=product_id)

    @staticmethod
    def add_product(cart, product):
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        return cart_item

    @staticmethod
    def update_cart_item_quantity(cart, cart_item_id, quantity):
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart=cart)
        cart_item.quantity = quantity
        cart_item.save()
        return cart_item

    @staticmethod
    def delete_cart_item(cart, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()

    @staticmethod
    def clear_cart(user):
        cart = get_object_or_404(Cart, user=user, paid=False)
        cart.delete()
