from django.urls import path

from rest.app.notification.views import SendNotificationView

urlpatterns = [
    path("", SendNotificationView.as_view(), name="notification_send"),
]
