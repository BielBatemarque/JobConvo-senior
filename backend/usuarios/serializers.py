from rest_framework import serializers
from .models import Usuario, Vaga, AplicacoesVaga
from django.db import IntegrityError

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'password', 'tipo_usuario', 'is_active', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso. Por favor, escolha outro.")
        return value

    def create(self, validated_data):
        try:
            usuario = Usuario(
                username=validated_data['username'],
                tipo_usuario=validated_data['tipo_usuario']
            )
            usuario.set_password(validated_data['password'])
            usuario.save()
            return usuario
        except IntegrityError:
            raise serializers.ValidationError({"username": "Este nome de usuário já está em uso. Por favor, escolha outro."})


class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = "__all__"


class AplicacoesVagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AplicacoesVaga
        fields = ['vaga', 'candidato', 'data_aplicacao', 'candidato_escolaridade', 'pretensao_salarial']
        depth = 1