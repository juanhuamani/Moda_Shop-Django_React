from django.contrib import admin
from .models import Product, Cart, CartItem

# Panel de administración para el modelo Product
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'slug', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}  # Se puede pre-poblar el slug basado en el nombre
    ordering = ('-created_at',)  # Ordenar por la fecha de creación de forma descendente

# Panel de administración para el modelo Cart
class CartAdmin(admin.ModelAdmin):
    list_display = ('cart_code', 'user', 'paid', 'created_at', 'updated_at')
    list_filter = ('paid', 'created_at')
    search_fields = ('cart_code', 'user__username')
    ordering = ('-created_at',)

# Panel de administración para el modelo CartItem
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    list_filter = ('cart', 'product')
    search_fields = ('cart__cart_code', 'product__name')
    ordering = ('cart', 'product')

# Registrar los modelos en el panel de administración
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
