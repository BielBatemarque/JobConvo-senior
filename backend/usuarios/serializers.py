from rest_framework import serializers
from .models import Usuario, Vaga

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'password', 'tipo_usuario', 'is_active', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        usuario = Usuario(
            username=validated_data['username'],
            tipo_usuario=validated_data['tipo_usuario']
        )
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = "__all__"