from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

class UsuarioManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('O campo de nome de usuário é obrigatório')
        
        usuario = self.model(username=username, **extra_fields)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(username, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    tipo_usuario = models.CharField(
        max_length=20,
        choices=[
            ('empresa', 'empresa'),
            ('candidato', 'candidato')
        ]
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
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
    empresa = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nome_vaga
