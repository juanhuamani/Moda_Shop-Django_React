from accounts.models import User
from django.db import models
from django.utils.text import slugify

# Create your models here.

class Product(models.Model):
    CATEGORY = (
        ('Electronics', 'ELECTRONICS'),
        ('Clothing', 'CLOTHING'),
        ('Books', 'BOOKS'),
    )
    name = models.CharField(max_length=255)
    slug = models.SlugField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=255, choices=CATEGORY, blank=True, null=True)
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


class Cart(models.Model):
    cart_code = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.cart_code

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default = 1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart {self.cart.cart_code}"