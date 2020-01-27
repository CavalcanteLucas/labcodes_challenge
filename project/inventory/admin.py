from django.contrib import admin

from inventory.models import Product, ProductLog


class ProductAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'available_quantity', 'category']


admin.site.register(Product, ProductAdmin)


class ProductLogAdmin(admin.ModelAdmin):
    list_display = ['code', 'change_date']


admin.site.register(ProductLog, ProductLogAdmin)
