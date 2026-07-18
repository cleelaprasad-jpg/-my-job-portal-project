from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField" 
    #automatically create id column with autoincrement in case we forget
    name = 'apps.accounts'
