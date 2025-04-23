from rest_framework import serializers
from .models import CartItem, Product, Cart, Category

class CategorySerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ['name', 'slug', 'image', 'description', 'count']

    def get_count(self, obj):
        return Product.objects.filter(category=obj).count()
        

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'price', 'description', 'category', 'image']

class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name','slug', 'price', 'description', 'category', 'image', 'similar_products']

    def get_similar_products(self, product):
        similar_products = Product.objects.filter(category=product.category).exclude(id=product.id)
        serializer = ProductSerializer(similar_products, many=True)
        return serializer.data


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, source='cart_items', read_only=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'created_at', 'sum_total', 'num_of_items', 'updated_at', 'items']
    
    def get_sum_total(self, obj):
        return sum(item.product.price * item.quantity for item in obj.cart_items.all())
    
    def get_num_of_items(self, obj):
        return sum(item.quantity for item in obj.cart_items.all())

