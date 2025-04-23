from django.contrib import admin
from .models import Product, Cart, CartItem, Category  

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'image', 'description')
    search_fields = ('name',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'slug', 'image', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-created_at',)

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'paid', 'created_at', 'updated_at')
    list_filter = ('paid', 'created_at')
    search_fields = ['user__username']
    ordering = ('-created_at',)

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'quantity')
    list_filter = ('cart', 'product')
    search_fields = ['product__name']
    ordering = ('cart', 'product')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
