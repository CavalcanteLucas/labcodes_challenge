from django.urls import path

from inventory.views import *

app_name = 'inventory'

urlpatterns = [
    path('', ListInventoryEndpoint.as_view(), name='list'),
    path('log/', ListLogEndpoint.as_view(), name='log'),
    path('<slug:code>/update-quantity/', UpdateProductQuantityEndpoint.as_view(), name='update_product_quantity'),
    path('<slug:code>/', ProductDetailEndpoint.as_view(), name='detail'),
]
