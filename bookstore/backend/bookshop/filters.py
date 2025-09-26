# filters.py
from django_filters import rest_framework as filters
from .models import Product

class ProductFilter(filters.FilterSet):
    in_stock = filters.BooleanFilter(method='filter_in_stock')
    
    class Meta:
        model = Product
        fields = ['category']
    
    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(quantity__gt=0)
        return queryset