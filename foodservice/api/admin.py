from django.contrib import admin
from .models import Restaurant, FoodItem, CartItem

admin.site.register(Restaurant)
admin.site.register(FoodItem)
admin.site.register(CartItem)
