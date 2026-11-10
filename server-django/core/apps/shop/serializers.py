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
    # Read-only product category name, plus a writable foreign key.
    category = serializers.StringRelatedField()
    category_id = serializers.PrimaryKeyRelatedField(
        source='category',
        allow_null=True,
        required=False,
        queryset=Category.objects.all(),
    )

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'price',
            'description',
            'category',
            'category_id',
            'image',
            'created_at',
            'updated_at',
        ]


class CartItemQuantitySerializer(serializers.Serializer):
    cart_item_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
        

class DetailedProductSerializer(serializers.ModelSerializer):
    # Same shape as ProductSerializer: category name + its id, so the client can
    # render `product.category` as text on both list and detail pages.
    category = serializers.StringRelatedField()
    category_id = serializers.IntegerField(read_only=True)
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'price', 'description', 'category', 'category_id', 'image', 'similar_products']

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
