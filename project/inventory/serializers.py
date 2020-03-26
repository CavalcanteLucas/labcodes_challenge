from rest_framework import serializers

from inventory.models import Product, Log

# class ProductListSerializer(serializer.)

class ProductSerializer(serializers.ModelSerializer):

    # test_var = serializers.SerializerMethodField('get_test_var')
    # total_items_in_stock = serializers.SerializerMethodField('get_total_items_in_stock')

    # def get_test_var(self, obj):
    #     return "456"
    
    # def get_total_items_in_stock(self,obj):
    #     product_list = Product.objects.all()

    class Meta:
        model = Product
        fields = '__all__'
        # fields = ('code', 'name', 'available_quantity', 'description', 'category', 'test_var')

    # def get_serializer_context(self, **kwargs):
    #     context = super().get_serializer_context(**kwargs)
    #     # context['test_var'] = '123'
    #     context.update({'test_var': '123'})
    #     return context


class QuantitySerializer(serializers.Serializer):
    quantity = serializers.IntegerField()

# class InventorySerializer(serializers.Serializer):
#     pass

class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = '__all__'
