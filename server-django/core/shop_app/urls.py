from django.urls import path
from . import views

urlpatterns = [
    path('categories', views.CategoryListView.as_view(), name='category_list'),
    path('products', views.ProductView.as_view(), name='product_list'), 
    path('products/<slug:slug>', views.ProductView.as_view(), name='product_detail'), 

    path('item_to_cart/', views.CartItemView.as_view(), name='add_item_to_cart'),
    path('cart', views.CartView.as_view(), name='cart'),
]