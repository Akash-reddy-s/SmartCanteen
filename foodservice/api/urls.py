from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestaurantViewSet, FoodItemViewSet, CartItemViewSet, WalletViewSet
from .views import OrderViewSet

router = DefaultRouter()
router.register('restaurants', RestaurantViewSet)
router.register('foods', FoodItemViewSet)
router.register('cart', CartItemViewSet)
router.register('wallet', WalletViewSet)
router.register('orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
