from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_superuser(self, name, username, password):
        user = self.model(name=name, username=username, password=password)
        user.set_password(password)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def create_staffuser(self, name, username, password,tenant, is_staff=True):
        user = self.model(name=name, username=username, password=password)
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = False
        user.tenant = tenant
        user.save(using=self._db)
        return user

    def create_user(self, name, username, password, tenant):
        user = self.model(name=name, username=username, password=password)
        user.set_password(password)
        user.is_active = True
        user.is_staff = False
        user.is_superuser = False
        user.tenant = tenant
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, username_):
        return self.get(username=username_)
