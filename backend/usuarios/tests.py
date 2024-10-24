from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Usuario, Vaga

class UsuarioViewSetTest(APITestCase):
    def setUp(self):
        self.usuario = Usuario.objects.create_user(username='testuser', password='testpass')

    def test_login_success(self):
        response = self.client.post(reverse('usuarios-login'), {'username': 'testuser', 'password': 'testpass'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)  # Verifica se o token está presente na resposta

    def test_login_failure(self):
        response = self.client.post(reverse('usuarios-login'), {'username': 'testuser', 'password': 'wrongpass'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data) 


class VagaViewSetTest(APITestCase):
    def setUp(self):
        self.usuario = Usuario.objects.create_user(username='empresauser', password='empresapass', tipo_usuario='empresa')
        self.vaga = Vaga.objects.create(nome_vaga='Desenvolvedor', empresa=self.usuario)

    def test_retorna_vagas_empresa(self):
        response = self.client.post(reverse('vagas-retorna_vagas_empresa'), {'empresa_id': self.usuario.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retorna_vagas_empresa_no_empresa(self):
        response = self.client.post(reverse('vagas-retorna_vagas_empresa'), {'empresa_id': 999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)