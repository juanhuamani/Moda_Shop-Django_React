from apps.account.models import User
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name=_('name'))
    slug = models.SlugField(blank=True, null=True)
    image = models.ImageField(upload_to='category_images', blank=True, null=True)
    description = models.TextField(blank=True, null=True, verbose_name=_('description'))

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug or Category.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            base_slug = slugify(self.name)
            unique_slug = base_slug
            counter = 1

            while Category.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = unique_slug

        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        
class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('name'))
    slug = models.SlugField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('price'))
    description = models.TextField(blank=True, null=True, verbose_name=_('description'))
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_('category'))
    image = models.ImageField(upload_to='product_images', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug or Product.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            base_slug = slugify(self.name)
            unique_slug = base_slug
            counter = 1

            while Product.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = unique_slug

        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_('user'))
    paid = models.BooleanField(default=False, verbose_name=_('paid'))
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.user.username
    
    class Meta:
        verbose_name = _('cart')
        verbose_name_plural = _('carts')

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items', verbose_name=_('cart'))
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_('product'))
    quantity = models.PositiveIntegerField(default = 1, verbose_name=_('quantity'))

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    
    class Meta:
        verbose_name = _('cart item')
        verbose_name_plural = _('cart items')