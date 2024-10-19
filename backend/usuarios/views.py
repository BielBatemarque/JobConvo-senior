from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario
from usuarios.serializers import UsuarioSerializer
# Create your views here.

class UsuarioViewSets(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer