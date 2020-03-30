from rest_framework import serializers

from inventory.models import Product, Log


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class QuantitySerializer(serializers.Serializer):
    quantity = serializers.IntegerField()


class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = '__all__'

# class IOHistorySerializer(serializers.Serializer):
#     date_string = serializers.CharField(max_length=10)
#     income = serializers.IntegerField()
#     outcome = serializers.IntegerField()