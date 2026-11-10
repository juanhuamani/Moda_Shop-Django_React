from django.shortcuts import get_object_or_404
from rest_framework import serializers
from ..models import Product, CartItem
from ..serializers import ProductSerializer


class ProductValidationError(serializers.ValidationError):
    """Invalid product input.

    Subclasses DRF's ValidationError so the view can let it propagate: DRF turns
    it into a standard 400 body (``{"category_id": ["Invalid pk ..."]}``) instead
    of the stringified ``ValueError`` representation this service used to raise.
    """


class ProductService:

    @staticmethod
    def get_all_products():
        return Product.objects.select_related('category').all()

    @staticmethod
    def get_product_by_id(product_id):
        return get_object_or_404(Product, id=product_id)

    @staticmethod
    def get_product_by_slug(slug):
        return get_object_or_404(Product, slug=slug)

    @staticmethod
    def create_product(data):
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            product = serializer.save()
            return product
        raise ProductValidationError(serializer.errors)

    @staticmethod
    def update_product(product, data):
        serializer = ProductSerializer(product, data=data, partial=True)
        if serializer.is_valid():
            return serializer.save()
        raise ProductValidationError(serializer.errors)

    @staticmethod
    def delete_product(product):
        CartItem.objects.filter(product=product).delete()
        product.delete()
        return True
