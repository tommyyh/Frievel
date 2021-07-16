import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat_room.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_sockets.settings')

application = ProtocolTypeRouter({
  'http': get_asgi_application(),
  'websocket': AuthMiddlewareStack(
    URLRouter(
      chat_room.routing.websocket_urlpatterns
    )
  )
})
