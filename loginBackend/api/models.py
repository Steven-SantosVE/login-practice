from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=128, null=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return self.title