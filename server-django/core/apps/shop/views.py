from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from .models import Product, Cart, CartItem, Category
from .serializers import CartItemSerializer, DetailedProductSerializer, ProductSerializer, CartSerializer, CategorySerializer
from .services.cart_service import CartService
from .services.product_service import ProductService


class ProductView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, slug=None):
        try:
            if slug:
                product = ProductService.get_product_by_slug(slug)
                serializer = DetailedProductSerializer(product)
                return Response({'message': 'Product details retrieved successfully', 'product': serializer.data}, status=status.HTTP_200_OK)

            products = ProductService.get_all_products()
            serializer = ProductSerializer(products, many=True)
            return Response({'message': 'Products list retrieved successfully', 'products': serializer.data}, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            product = ProductService.create_product(request.data)
            serializer = ProductSerializer(product)
            return Response({'message': 'Product created successfully','product': serializer.data}, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug):
        try:
            product = ProductService.get_product_by_slug(slug)
            updated_product = ProductService.update_product(product, request.data)
            serializer = ProductSerializer(updated_product)
            return Response({'message': 'Product updated successfully','product': serializer.data}, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        try:
            product = ProductService.get_product_by_slug(slug)
            ProductService.delete_product(product)
            return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.annotate(
            count=Count('product')).order_by('-count')[:5]
        serializer = CategorySerializer(categories, many=True)

        return Response({'message': 'Categories retrieved successfully', 'categories': serializer.data}, status=status.HTTP_200_OK)


class CategoryDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        if Category.objects.filter(slug=slug).exists():
            category = Category.objects.get(slug=slug)
            products = Product.objects.filter(category=category)
            serializer = ProductSerializer(products, many=True)

            return Response({'message': 'Category products retrieved successfully', 'products': serializer.data}, status=status.HTTP_200_OK)

        return Response({'message': 'Category not found', 'error': 'Invalid category slug'}, status=status.HTTP_400_BAD_REQUEST)


class FeaturedProductView(APIView):
    def get(self, request):
        featured_product = Product.objects.order_by('-created_at').first()
        if featured_product:
            serializer = ProductSerializer(featured_product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'No products available', 'detail': 'No products available'}, status=status.HTTP_404_NOT_FOUND)


class PopularProductsThisWeek(APIView):
    def get(self, request):
        now = timezone.now()
        week_ago = now - timedelta(days=7)

        cart_items = CartItem.objects.filter(cart__created_at__gte=week_ago)

        product_counts = cart_items.values('product') \
            .annotate(total=Count('product')) \
            .order_by('-total')[:4]

        popular_product_ids = [item['product'] for item in product_counts]

        popular_products = Product.objects.filter(id__in=popular_product_ids)

        serializer = ProductSerializer(popular_products, many=True)
        return Response({'message': 'Popular products retrieved successfully', 'products': serializer.data}, status=status.HTTP_200_OK)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = CartService.get_cart(request.user)
        serializer = CartSerializer(cart)
        return Response({'message': 'Cart retrieved successfully', 'cart': serializer.data}, status=status.HTTP_200_OK)


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        product_id = request.data.get('product_id')

        if not product_id:
            return Response({'error': 'Missing product_id'}, status=400)

        product = CartService.get_product(product_id)
        cart, _ = CartService.get_or_create_cart(user)
        cart_item = CartService.add_product(cart, product)

        return Response({
            'cart_item': CartItemSerializer(cart_item).data,
            'message': 'Item added to cart successfully'
        }, status=status.HTTP_201_CREATED)

    def put(self, request):
        user = request.user
        cart_item_id = request.data.get('cart_item_id')
        quantity = request.data.get('quantity')

        cart = CartService.get_cart(user)
        CartService.update_cart_item_quantity(
            cart, cart_item_id, int(quantity))

        return Response({
            'cart': CartSerializer(cart).data,
            'message': 'Item quantity updated successfully'
        }, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        user = request.user
        cart = Cart.objects.get(user=user, paid=False)
        CartService.delete_cart_item(cart, item_id)

        return Response({
            'message': 'Item removed from cart successfully',
            'cart': CartSerializer(cart).data
        }, status=status.HTTP_200_OK)


class ClearCartView(APIView):
    def delete(self, request):
        CartService.clear_cart(request.user)
        return Response({'message': 'Cart cleared successfully.'}, status=status.HTTP_204_NO_CONTENT)
