from rest_framework import serializers
from .models import Restaurant, FoodItem, CartItem, Wallet
from .models import Order

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'price']

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    item = FoodItemSerializer(read_only=True)
    item_id = serializers.PrimaryKeyRelatedField(
        queryset=FoodItem.objects.all(),
        source='item',
        write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'session_id', 'item', 'item_id', 'quantity']

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'session_id', 'balance']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
