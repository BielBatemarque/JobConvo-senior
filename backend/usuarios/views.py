from rest_framework import viewsets, status
from rest_framework.decorators import action,permission_classes
from rest_framework.permissions import AllowAny
from django.db.models import Count
from django.utils import timezone
from collections import defaultdict
from django.db.models.functions import TruncMonth
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Usuario, Vaga, AplicacoesVaga
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from usuarios.serializers import UsuarioSerializer, VagaSerializer, AplicacoesVagaSerializer
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
        

    @action(detail=False, methods=['get'], url_path='vagas_por_mes', url_name='vagas_por_mes')
    def vagas_por_mes(self, request):
        empresa_id = request.query_params.get('empresa_id')
        usuario_empresa = Usuario.objects.get(id=empresa_id)

        now = timezone.now()
        current_month = now.month
        current_year = now.year

        meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

        vagas_empresa = self.queryset.filter(empresa=usuario_empresa, data_criacao__month=current_month, data_criacao__year=current_year)

        vagas_no_mes_atual = vagas_empresa.count()

        return Response({'mes': meses[current_month - 1], 'vagas_por_mes': vagas_no_mes_atual}, status=status.HTTP_200_OK)

class AplicacoesVagaViewSet(viewsets.ModelViewSet):
    queryset = AplicacoesVaga.objects.all()
    serializer_class = AplicacoesVagaSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        candidato_id = request.data.get('usuario')
        vaga_id = request.data.get('vaga')
        pretensao_salarial = request.data.get('pretensao_salarial')
        candidato_escolaridade = request.data.get('candidato_escolaridade')

        try:
            vaga = Vaga.objects.get(id=vaga_id)
            candidato = Usuario.objects.get(id=candidato_id)
        except Vaga.DoesNotExist:
            return Response({"detail": "Vaga não encontrada"}, status=status.HTTP_404_NOT_FOUND)

        if AplicacoesVaga.objects.filter(vaga=vaga, candidato=candidato).exists():
            return Response({"detail": "Você já aplicou para esta vaga."}, status=status.HTTP_400_BAD_REQUEST)

        aplicacao_vaga = AplicacoesVaga.objects.create(
            vaga=vaga,
            candidato=candidato,
            pretensao_salarial=pretensao_salarial,
            candidato_escolaridade=candidato_escolaridade
        )

        return Response({"detail": "Aplicação realizada com sucesso."}, status=status.HTTP_201_CREATED)


    @action(detail=False, methods=['get'], url_path='retorna_aplicacoes_candidato', url_name="retorna_aplicacoes_candidato")
    def retorna_aplicacoes_candidato(self, request):
        usuario_id = request.query_params.get('usuario_id')
        
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"detail": "Candidato não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        vagas_candidatadas = self.queryset.filter(candidato=usuario)

        vagas_detalhadas = []

        for aplicacao in vagas_candidatadas:
            vaga = aplicacao.vaga

            vagas_detalhadas.append({
                "apicacao_id": aplicacao.id,
                "nome_vaga": vaga.nome_vaga,
                "empresa": vaga.empresa.username,
                "escolaridade_informada": aplicacao.candidato_escolaridade,
                "pretensao_salarial_informada": aplicacao.pretensao_salarial,
            })

        return Response(vagas_detalhadas, status=status.HTTP_200_OK)
    
    def calcular_pontuacao(self, vaga, aplicacao):
        pontuacao = 0

        faixa_salarial = vaga.faixa_salarial
        pretensao_salarial = aplicacao.pretensao_salarial
        
        if faixa_salarial == 'ate_1000' and pretensao_salarial <= 1000:
            pontuacao += 1
        elif faixa_salarial == '1000_2000' and 1000 < pretensao_salarial <= 2000:
            pontuacao += 1
        elif faixa_salarial == '2000_3000' and 2000 < pretensao_salarial <= 3000:
            pontuacao += 1
        elif faixa_salarial == 'acima_3000' and pretensao_salarial > 3000:
            pontuacao += 1

        escolaridade_minima = vaga.escolaridade_minima
        candidato_escolaridade = aplicacao.candidato_escolaridade

        ordem_escolaridade = ['fundamental', 'medio', 'tecnologo', 'superior', 'pos', 'doutorado']

        if ordem_escolaridade.index(candidato_escolaridade) >= ordem_escolaridade.index(escolaridade_minima):
            pontuacao += 1

        return pontuacao
    
    @action(detail=False, methods=['get'], url_path="retorna_aplicacoes_empresa", url_name="retorna_aplicacoes_empresa")
    def retorna_aplicacoes_empresa(self, request):
        usuario_id = request.query_params.get('usuario_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"detail": "Candidato não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        aplicacoes_empresa = self.queryset.filter(vaga__empresa=usuario)

        vagas_com_aplicacoes = {}

        for aplicacao in aplicacoes_empresa:
            vaga = aplicacao.vaga
            
            if vaga.nome_vaga not in vagas_com_aplicacoes:
                vagas_com_aplicacoes[vaga.nome_vaga] = []

            pontuacao = self.calcular_pontuacao(vaga, aplicacao)

            vagas_com_aplicacoes[vaga.nome_vaga].append({
                "aplicacao_id": aplicacao.id,
                "candidato": aplicacao.candidato.username,
                "data_aplicacao": aplicacao.data_aplicacao,
                "pretensao_salarial_informada": aplicacao.pretensao_salarial,
                "candidato_escolaridade": aplicacao.candidato_escolaridade,
                "pontuacao": pontuacao  
            })

        return Response(vagas_com_aplicacoes, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='candidatos_por_mes', url_name='candidatos_por_mes')
    def candidatos_por_mes(self, request):
        empresa_id = request.query_params.get('empresa_id')
        usuario_empresa = Usuario.objects.get(id=empresa_id)
        now = timezone.now()
        current_year = now.year

        meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

        candidaturas_por_mes = {mes: 0 for mes in meses}

        aplicacoes_da_empresa = self.queryset.filter(vaga__empresa=usuario_empresa)

        for mes in range(1, 13):
            candidaturas_por_mes[meses[mes - 1]] = aplicacoes_da_empresa.filter(data_aplicacao__month=mes, data_aplicacao__year=current_year).count()

        return Response(candidaturas_por_mes, status=status.HTTP_200_OK)
        
