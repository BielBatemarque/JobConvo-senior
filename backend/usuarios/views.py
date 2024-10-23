from rest_framework import viewsets, status
from rest_framework.decorators import action,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Usuario, Vaga
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from usuarios.serializers import UsuarioSerializer, VagaSerializer
# Create your views here.

class UsuarioViewSets(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['post'], url_path='login', url_name='login')
    @permission_classes([AllowAny])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Por favor informe o usuário e senha"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.get(username=username)

            if usuario.check_password(password):
                token, created = Token.objects.get_or_create(user=usuario)
                return Response({
                    "detail": "Login feito com sucesso",
                    "token": token.key,
                    "tipo": usuario.tipo_usuario,
                    "username": usuario.username,
                    "usuario_id": usuario.id,
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Senha incorreta"}, status=status.HTTP_400_BAD_REQUEST)

        except Usuario.DoesNotExist:
            return Response({"detail": "Usuário não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'], url_path='logout', url_name='logout')
    @permission_classes([IsAuthenticated])
    def logout(self, request):
        try:
            token = request.auth
            if token:
                token.delete()
                return Response({"detail": "Logout feito com sucesso"}, status=status.HTTP_200_OK)
            return Response({"detail": "Token não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VagaViewSets(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer

    @action(detail=False, methods=['post'], url_path='retorna_vagas_empresa', url_name="retorna_vagas_empresa")
    def retorna_vagas_empresa(self, request):
        empresa_id = request.data.get("empresa_id")

        if not empresa_id:
            return Response({"detail": "ID da empresa não informado"}, status=status.HTTP_400_BAD_REQUEST)

        vagas = Vaga.objects.filter(empresa_id=empresa_id)
        
        if vagas.exists():
            serializer = VagaSerializer(vagas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Nenhuma vaga encontrada para essa empresa"}, status=status.HTTP_404_NOT_FOUND)
        