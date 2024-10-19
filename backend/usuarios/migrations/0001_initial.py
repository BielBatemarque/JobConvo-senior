# Generated by Django 5.1.2 on 2024-10-19 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('senha', models.CharField(max_length=128)),
                ('tipo_usuario', models.CharField(choices=[('empresa', 'empresa'), ('candidato', 'candidato')], max_length=20)),
            ],
        ),
    ]
