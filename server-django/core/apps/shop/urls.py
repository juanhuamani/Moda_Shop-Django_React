from django.urls import path
from . import views

urlpatterns = [
    path('products', views.ProductView.as_view(), name='product_list'), 
    path('products/featured', views.FeaturedProductView.as_view(), name='featured_product'),
    path('products/popular', views.PopularProductsThisWeek.as_view(), name='popular_product'),
    path('products/<slug:slug>', views.ProductView.as_view(), name='product_detail'),

    path('categories', views.CategoryListView.as_view(), name='category_list'),
    path('categories/<slug:slug>', views.CategoryDetailView.as_view(), name='category_detail'),

    path('cartItem/', views.CartItemView.as_view(), name='add_item_to_cart'),
    path('cartItem/<int:item_id>/', views.CartItemView.as_view(), name='remove_item_from_cart'),
    path('cart/clear/', views.ClearCartView.as_view(), name='clear-cart'),
    path('cart', views.CartView.as_view(), name='cart'),
]