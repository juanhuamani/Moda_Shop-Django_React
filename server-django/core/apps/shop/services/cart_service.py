from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from ..models import Cart, CartItem, Product

class CartService:

    @staticmethod
    def get_or_create_cart(user):
        """The only cart accessor: always returns an open cart for ``user``."""
        try:
            with transaction.atomic():
                return Cart.objects.get_or_create(user=user, paid=False)
        except IntegrityError:
            # Lost the race against unique_open_cart_per_user: re-fetch once.
            return Cart.objects.get(user=user, paid=False), False

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
        """Idempotent: no cart and no items is a success, not a 404."""
        cart = Cart.objects.filter(user=user, paid=False).first()
        if cart is None:
            return

        cart.cart_items.all().delete()
        cart.delete()
