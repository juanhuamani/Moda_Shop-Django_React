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

    
        queryset = Product.objects.all()
        
        if category := filters.get('category'):
            queryset = queryset.filter(category__slug=category)
        if min_price := filters.get('min_price'):
            queryset = queryset.filter(price__gte=min_price)
        if max_price := filters.get('max_price'):
            queryset = queryset.filter(price__lte=max_price)
        if created_after := filters.get('created_after'):
            queryset = queryset.filter(created_at__gte=created_after)
        
        if search_query := filters.get('search'):
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query)
            )
        
        return queryset.order_by('-created_at')