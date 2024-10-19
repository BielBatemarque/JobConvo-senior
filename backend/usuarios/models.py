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
    

class Vaga(models.Model):
    FAIXA_SALARIAL_OPCOES = [
        ('ate_1000', 'Até 1.000'),
        ('1000_2000', 'De 1.000 a 2.000'),
        ('2000_3000', 'De 2.000 a 3.000'),
        ('acima_3000', 'Acima de 3.000'),
    ]

    ESCOLARIDADE_OPCOES = [
        ('fundamental', 'Ensino Fundamental'),
        ('medio', 'Ensino Médio'),
        ('tecnologo', 'Tecnólogo'),
        ('superior', 'Ensino Superior'),
        ('pos', 'Pós / MBA / Mestrado'),
        ('doutorado', 'Doutorado'),
    ]

    nome_vaga = models.CharField(max_length=255)
    faixa_salarial = models.CharField(
        max_length=15,
        choices=FAIXA_SALARIAL_OPCOES,
        default='ate_1000'
    )
    requisitos = models.TextField()
    escolaridade_minima = models.CharField(
        max_length=15,
        choices=ESCOLARIDADE_OPCOES,
        default='medio'
    )

    def __str__(self):
        return self.nome_vaga
