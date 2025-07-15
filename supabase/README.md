# Supabase Project Structure

Esta carpeta contiene la configuración y estructura del proyecto Supabase.

## Estructura

```
supabase/
├── functions/          # Edge Functions
├── sql/               # Scripts SQL
├── policies/          # Row Level Security policies
└── migrations/        # Database migrations
```

## Configuración

Cuando integres Supabase, necesitarás:

1. Crear un proyecto en Supabase
2. Configurar las variables de entorno
3. Ejecutar las migraciones
4. Configurar las políticas de seguridad

## Variables de entorno

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```