@echo off
REM Abre o PostgreSQL no container Docker "codeacademy"

echo Abrindo PostgreSQL no container "codeacademy"...
docker exec -it codeacademy psql -U postgres

pause