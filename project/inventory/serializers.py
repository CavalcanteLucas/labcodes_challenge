from rest_framework import serializers

from inventory.models import Product, Log


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class QuantitySerializer(serializers.Serializer):
    quantity = serializers.IntegerField()


class InventorySerializer(ProductSerializer):
    pass


class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = '__all__'
