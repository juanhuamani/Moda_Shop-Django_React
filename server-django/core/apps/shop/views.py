from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from .models import Product, Cart, CartItem, Category
from .serializers import CartItemSerializer, DetailedProductSerializer, ProductSerializer, CartSerializer, CategorySerializer


class ProductView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        try:
            if slug:
                product = Product.objects.get(slug=slug)
                serializer = DetailedProductSerializer(product)
                return Response({'product': serializer.data}, status=status.HTTP_200_OK)
            
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response({'products': serializer.data}, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'product': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug):
        product = Product.objects.get(slug=slug)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'product': serializer.data}, status=status.HTTP_200_OK)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, slug):
        product = Product.objects.get(slug=slug)
        product.delete()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class CategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.annotate(count=Count('product')).order_by('-count')[:5]
        serializer = CategorySerializer(categories, many=True)
        
        return Response({'categories': serializer.data}, status=status.HTTP_200_OK)


class CategoryDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        if Category.objects.filter(slug=slug).exists():
            category = Category.objects.get(slug=slug)
            products = Product.objects.filter(category=category)
            serializer = ProductSerializer(products, many=True)

            return Response({'products': serializer.data}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid category slug'}, status=status.HTTP_400_BAD_REQUEST)


class FeaturedProductView(APIView):
    def get(self, request):
        featured_product = Product.objects.order_by('-created_at').first()
        print(featured_product)
        if featured_product:
            serializer = ProductSerializer(featured_product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'No hay productos'}, status=status.HTTP_404_NOT_FOUND)


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
        return Response(serializer.data, status=status.HTTP_200_OK)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            cart = Cart.objects.get(user=user, paid=False)
            serializer = CartSerializer(cart)
            return Response({'cart': serializer.data}, status=status.HTTP_200_OK)
            
        except Cart.DoesNotExist:
            return Response({'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            product_id = request.data.get('product_id')
            product = Product.objects.get(id=product_id)
            cart, _ = Cart.objects.get_or_create(paid=False, user=user)

            serializer = CartItemSerializer(data={'product': product.id, 'quantity': 1}, context={'cart': cart})
            
            serializer.is_valid(raise_exception=True)
            cart_item = serializer.save()


            return Response({
                'cart_item': CartItemSerializer(cart_item).data,
                'message': 'Item added to cart successfully'
            }, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        try:
            user = request.user
            cart_item_id = request.data.get('cart_item_id')
            quantity = request.data.get('quantity')

            if not cart_item_id or not quantity:
                return Response({'error': 'Missing cart_item_id or quantity'}, status=status.HTTP_400_BAD_REQUEST)

            if quantity <= 0:
                return Response({'error': 'Quantity must be greater than zero'}, status=400)

            cart = Cart.objects.get(user=user, paid=False)
            cart_item = CartItem.objects.get(id=cart_item_id , cart=cart)

            serializer = CartItemSerializer(cart_item, data={'quantity': quantity}, context={'cart': cart})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            cart_serializer  = CartSerializer(cart)

            return Response({
               'cart': cart_serializer.data,
               'message': 'Item quantity updated successfully' 
            } , status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, item_id):
        try:
            user = request.user
            cart = Cart.objects.get(user=user, paid=False)
            cart_item = CartItem.objects.get(id=item_id, cart=cart)
            cart_item.delete()
            serializer = CartSerializer(cart)

            return Response({
                'message': 'Item removed from cart successfully',
                'cart': serializer.data
                }, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ClearCartView(APIView):           
    def delete(self, request):
        try:
            user = request.user
            cart = Cart.objects.get(user=user, paid=False)

            cart.delete()

            return Response({'message': 'Carrito eliminado exitosamente.'}, status=status.HTTP_204_NO_CONTENT)

        except Cart.DoesNotExist:
            return Response({'error': 'No se encontró un carrito activo para este usuario.'},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        