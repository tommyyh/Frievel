from django.contrib import admin
from user.models import Account, Following
from django.contrib.auth.admin import UserAdmin

class AccountAdmin(UserAdmin):
  list_display = (
    'email',
    'name',
    'date_joined',
    'last_login',
    'is_admin',
    'is_staff',
    'username',
    'lives_in',
    'born_in',
    'follower_count',
    'following_count'
  )
  search_fields = ('email', 'username')
  readonly_fields = ('date_joined', 'last_login')
  
  filter_horizontal = ()
  fieldsets = ()
  list_filter = ()

admin.site.register(Account, AccountAdmin)
admin.site.register(Following)