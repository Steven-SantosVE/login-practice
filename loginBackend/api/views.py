from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .serializers import NoteSerializer, UserSerializer
from .models import Note

# Create your views here.
class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_auth(request):
    return Response({
        'authenticated':True,
        'users': request.user.username
    })


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(
            {"message": "Successfully logged out"},
            status=status.HTTP_205_RESET_CONTENT
        )

    except Exception:
        return Response(
            {"error": "Invalid token"},
            status=status.HTTP_400_BAD_REQUEST
        )