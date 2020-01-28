from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response

from django.shortcuts import get_object_or_404

from inventory.models import Product, Log
from inventory.serializers import ProductSerializer, QuantitySerializer, LogSerializer


class ListInventoryEndpoint(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ListLogEndpoint(ListAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


    # log = queryset

    # expected_content = [
    #     {
    #         "code": l.code,
    #         "date": l.date,
    #         "income": l.income,
    #         "outcome": l.outcome
    #     } for l in log
    # ]

    # return Response(expected_content)


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

        return Response({'available_quantity': product.available_quantity})
