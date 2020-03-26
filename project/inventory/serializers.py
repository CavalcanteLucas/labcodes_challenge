from rest_framework import serializers

from inventory.models import Product, Log


class ProductSerializer(serializers.ModelSerializer):

    total_items_in_stock = serializers.SerializerMethodField('get_total_items_in_stock')
    
    def get_total_items_in_stock(self,obj):
        product_list = Product.objects.all()
        total=0
        for product in product_list:
            total+=product.available_quantity
        return total

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
