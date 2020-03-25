from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response

from django.shortcuts import get_object_or_404

from inventory.models import Product, Log
from inventory.serializers import ProductSerializer, QuantitySerializer, LogSerializer

from datetime import date


class ListInventoryEndpoint(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # context_object_name = super.get_context_object_name(queryset)
    # context_object_name = 'test_var'
    def get_serializer_context(self, **kwargs):
        context = super().get_serializer_context(**kwargs)
        # context['test_var'] = '123'
        context.update({'test_var': '123'})
        return context

    # def get_queryset(self):
    #     return Product.objects.all()
    # def asdf(self):
    #     return


class ListLogEndpoint(ListAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class ProductDetailEndpoint(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'code'


class UpdateProductQuantityEndpoint(APIView):

    def post(self, request, code):
        product = get_object_or_404(Product, code=code)

        serializer = QuantitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        updated_quantity = serializer.validated_data['quantity']
        product.available_quantity += updated_quantity
        product.save()

        if (updated_quantity != 0):
            if (updated_quantity > 0):
                income=updated_quantity
                outcome=0
            else:
                income=0
                outcome=-updated_quantity

            Log.objects.create(code=product,
                               date=date.today(),
                               income=income,
                               outcome=outcome)

        return Response({'available_quantity': product.available_quantity})
