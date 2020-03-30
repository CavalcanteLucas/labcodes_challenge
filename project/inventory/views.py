from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response

from django.shortcuts import get_object_or_404

from inventory.models import Product, Log
from inventory.serializers import ProductSerializer, QuantitySerializer, \
                                  LogSerializer, IOHistorySerializer

from datetime import date, timedelta

class ListInventoryEndpoint(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        context = {
            'items': serializer.data, 
            'total_items_in_stock': self.get_total_items_in_stock()
        }
        return Response(context)

    def get_total_items_in_stock(self):
        product_list = Product.objects.all()
        total = 0
        for product in product_list:
            total += product.available_quantity
        return total

class ListLogEndpoint(ListAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class ProductDetailEndpoint(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'code'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        quantity = request.GET.get('quantity', 3)
        context = {
            'selectedItem': serializer.data,
            'io_history': self.get_io_history(instance, quantity)
        }
        return Response(context)

    def get_io_history(self, instance, quantity):
        return [ IOHistorySerializer(IOHistory(instance, date)).data for date in range(quantity) ]


class IOHistory:

    def __init__(self, instance, no_of_days=1):
        the_date = date.today() - timedelta(days=no_of_days)
        self.date_string = the_date.strftime("%d/%m/%Y")
        date_log = Log.objects.filter(code=instance.code, date=the_date)
        self.income, self.outcome = self.log_into_io(date_log)

    def log_into_io(self, log):
        income_log, outcome_log = [], []
        for log_entry in log:
            income_log.append(log_entry.income)
            outcome_log.append(log_entry.outcome)
        return (sum(income_log), sum(outcome_log))

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
