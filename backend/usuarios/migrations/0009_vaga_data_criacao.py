# Generated by Django 5.1.2 on 2024-10-24 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0008_aplicacoesvaga_pretensao_salarial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vaga',
            name='data_criacao',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
