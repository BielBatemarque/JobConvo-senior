from django.db import models

# Create your models here.
class Usuario(models.Model):
    username = models.CharField(max_length=100, unique=True)
    senha = models.CharField(max_length=128)
    tipo_usuario = models.CharField(
        max_length=20,
        choices = [
            ('empresa', 'empresa'),
            ('candidato', 'candidato')
        ]
    )

    def __str__(self) -> str:
        return self.username
    

