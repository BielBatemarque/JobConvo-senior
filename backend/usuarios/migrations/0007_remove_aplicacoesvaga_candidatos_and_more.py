# Generated by Django 5.1.2 on 2024-10-24 00:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0006_aplicacoesvaga'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='aplicacoesvaga',
            name='candidatos',
        ),
        migrations.AddField(
            model_name='aplicacoesvaga',
            name='candidato',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='minhas_aplicacoes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='aplicacoesvaga',
            name='candidato_escolaridade',
            field=models.CharField(choices=[('fundamental', 'Ensino Fundamental'), ('medio', 'Ensino Médio'), ('tecnologo', 'Tecnólogo'), ('superior', 'Ensino Superior'), ('pos', 'Pós / MBA / Mestrado'), ('doutorado', 'Doutorado')], default='medio', max_length=15),
        ),
    ]
