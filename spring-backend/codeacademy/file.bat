@echo off
echo =========================================
echo Automação Docker - Projeto
echo =========================================

:: Caminho do projeto (onde está o Dockerfile ou docker-compose.yml)
cd C:\Users\Aluno\Desktop\spring-devschool-platform\spring-backend\codeacademy

echo Iniciando containers com docker-compose...
docker-compose up -d

echo =========================================
echo Docker pronto!
pause