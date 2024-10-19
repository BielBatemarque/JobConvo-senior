from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Vaga
from usuarios.serializers import UsuarioSerializer, VagaSerializer
# Create your views here.

class UsuarioViewSets(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class VagaViewSets(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer