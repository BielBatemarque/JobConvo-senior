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

            if usuario.check_password(password):  # Use o método check_password
                # Gere o token de autenticação
                token, created = Token.objects.get_or_create(user=usuario)
                return Response({
                    "detail": "Login feito com sucesso",
                    "token": token.key
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Senha incorreta"}, status=status.HTTP_400_BAD_REQUEST)

        except Usuario.DoesNotExist:
            return Response({"detail": "Usuário não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'], url_path='logout', url_name='logout')
    @permission_classes([IsAuthenticated])  # Garante que apenas usuários autenticados possam fazer logout
    def logout(self, request):
        try:
            token = request.auth  # Obtém o token atual do request
            if token:
                token.delete()  # Remove o token do banco de dados
                return Response({"detail": "Logout feito com sucesso"}, status=status.HTTP_200_OK)
            return Response({"detail": "Token não encontrado"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






class VagaViewSets(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer