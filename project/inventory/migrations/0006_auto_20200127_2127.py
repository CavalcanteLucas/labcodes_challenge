# Generated by Django 3.0.2 on 2020-01-27 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_auto_20200127_2125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productlog',
            name='input_quantity',
            field=models.IntegerField(blank=True, verbose_name='Input quantity'),
        ),
        migrations.AlterField(
            model_name='productlog',
            name='output_quantity',
            field=models.IntegerField(blank=True, verbose_name='Output quantity'),
        ),
    ]
