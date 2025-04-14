from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Cart, CartItem
from .serializers import CartItemSerializer, DetailedProductSerializer, ProductSerializer, CartSerializer


class ProductView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        if slug:
            product = Product.objects.get(slug=slug)
            serializer = DetailedProductSerializer(product)
            return Response({'product': serializer.data}, status=status.HTTP_200_OK)
        
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data}, status=status.HTTP_200_OK)

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
        categories = [category[0] for category in Product.CATEGORY]
        return Response({'categories': categories}, status=status.HTTP_200_OK)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cart_code = request.query_params.get('cart_code')
        cart = Cart.objects.get(cart_code=cart_code, user=user)
        serializer = CartSerializer(cart)
        return Response({'cart': serializer.data}, status=status.HTTP_200_OK)

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            cart_code = request.data.get('cart_code')
            product_id = request.data.get('product_id')
            cart, created = Cart.objects.get_or_create(cart_code=cart_code, user=user)
            product = Product.objects.get(id=product_id)
            
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if not created:
                cart_item.quantity += 1
                cart_item.save()

    
            serializer = CartItemSerializer(cart_item)
            return Response({
                'cart_item': serializer.data,
                'message': 'Item added to cart successfully'
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        try:
            user = request.user
            cart_code = request.data.get('cart_code')
            cart_item_id = request.data.get('cart_item_id')
            cart = Cart.objects.get(cart_code=cart_code, user=user)
            cart_item = CartItem.objects.get(id=cart_item_id, cart=cart)
            cart_item.delete()

            return Response({
                'message': 'Item removed from cart successfully',
                }, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        