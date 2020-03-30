from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView, Response

from django.shortcuts import get_object_or_404

from inventory.models import Product, Log
from inventory.serializers import ProductSerializer, QuantitySerializer, LogSerializer

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

        io_log = IOLog(instance)
        # from IPython import embed; embed()
        serializer = self.get_serializer(instance)
        context = {
            'selectedItem': serializer.data,
            'io_log': io_log.serialize(),
        }
        return Response(context)


class IOLog(object):

    def __init__(self, instance):
        today = date.today()
        yesterday = today - timedelta(days=1)
        beforeYesterday = yesterday - timedelta(days=1)

        today_log = Log.objects.filter(code=instance.code, date=today)
        yesterday_log = Log.objects.filter(code=instance.code, date=yesterday)
        beforeYesterday_log = Log.objects.filter(code=instance.code, date=beforeYesterday)

        self.today_income, self.today_outcome = self.log_into_io(today_log)
        self.yesterday_income, self.yesterday_outcome = self.log_into_io(yesterday_log)
        self.beforeYesterday_income, self.beforeYesterday_outcome = self.log_into_io(beforeYesterday_log)

    def log_into_io(self, log):
        income_log, outcome_log = [], []
        for log_entry in log:
            income_log.append(log_entry.income)
            outcome_log.append(log_entry.outcome)
        return (sum(income_log), sum(outcome_log))

    def serialize(self):
        return {
            'today_income': self.today_income,
            'today_outcome': self.today_outcome,
            'yesterday_income': self.yesterday_income,
            'yesterday_outcome': self.yesterday_outcome,
            'beforeYesterday_income': self.beforeYesterday_income,
            'beforeYesterday_outcome': self.beforeYesterday_outcome
        }


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
