from django.contrib import admin

from inventory.models import Product, Log


class ProductAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'available_quantity', 'category']


admin.site.register(Product, ProductAdmin)


class LogAdmin(admin.ModelAdmin):
    list_display = ['code', 'date']


admin.site.register(Log, LogAdmin)
