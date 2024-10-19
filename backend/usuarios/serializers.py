from rest_framework import serializers
from .models import Usuario, Vaga

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"


class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = "__all__"