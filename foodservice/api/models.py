from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    food_type = models.CharField(max_length=50)

class FoodItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)

class CartItem(models.Model):
    session_id = models.CharField(max_length=100)
    item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

class Order(models.Model):
    session_id = models.CharField(max_length=100)
    order_id = models.CharField(max_length=20, unique=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.order_id} - {self.session_id}"

class Wallet(models.Model):
    session_id = models.CharField(max_length=100, unique=True)
    balance = models.FloatField(default=0)

    def __str__(self):
        return f"{self.session_id} - ₹{self.balance}"
