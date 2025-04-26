from django.shortcuts import get_object_or_404
from ..models import Product, CartItem
from ..serializers import ProductSerializer

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
        raise ValueError(serializer.errors)

    @staticmethod
    def update_product(product, data):
        serializer = ProductSerializer(product, data=data, partial=True)
        if serializer.is_valid():
            return serializer.save()
        raise ValueError(serializer.errors)

    @staticmethod
    def delete_product(product):
        CartItem.objects.filter(product=product).delete()
        product.delete()
        return True