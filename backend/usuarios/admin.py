from django.contrib import admin
from usuarios.models import Usuario, Vaga, AplicacoesVaga

# Register your models here.


admin.site.register(Usuario)
admin.site.register(Vaga)
admin.site.register(AplicacoesVaga)