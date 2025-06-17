# Trainr 🏋️‍♂️

> Plataforma mobile para conectar personal trainers e clientes, com sistema completo de treinos e gerenciamento de sessões.

## 📱 Sobre o Projeto

Trainr é um aplicativo React Native desenvolvido com Expo que conecta personal trainers e clientes, oferecendo uma plataforma completa para:

- **Para Clientes**: Buscar trainers, agendar sessões, acompanhar treinos e progresso
- **Para Trainers**: Gerenciar clientes, criar treinos personalizados, acompanhar sessões

## 🛠️ Tecnologias

- **React Native** - Framework mobile multiplataforma
- **Expo SDK 53** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Expo Router v5** - Navegação baseada em arquivos
- **Zustand** - Gerenciamento de estado global
- **Expo SecureStore** - Armazenamento seguro multiplataforma
- **LinearGradient** - Gradientes nativos
- **Lucide React Native** - Ícones consistentes

## 🎨 Design System

O projeto implementa um sistema de design centralizado:

```typescript
// constants/theme.ts
export const colors = {
  primary: '#ff7b54',      // Laranja principal
  primaryLight: '#ff9a56', // Laranja claro
  secondary: '#ffb366',    // Laranja secundário
  // ... mais cores
}
```

### Paleta de Cores
- **Primary**: Gradiente laranja (`#ff7b54` → `#ff9a56`)
- **Backgrounds**: Tons de cinza claro
- **Text**: Hierarquia de cinzas
- **Status**: Verde, amarelo, vermelho para estados

## 📁 Estrutura do Projeto

```
Trainr/
├── app/                      # Rotas do aplicativo (Expo Router)
│   ├── (tabs)/              # Navegação por abas
│   │   ├── home.tsx         # Dashboard principal
│   │   ├── search.tsx       # Busca de trainers
│   │   ├── workouts.tsx     # Treinos e exercícios
│   │   ├── schedule.tsx     # Agenda de sessões
│   │   ├── messages.tsx     # Chat entre users
│   │   ├── more.tsx         # Menu bottom sheet
│   │   └── profile.tsx      # Perfil do usuário
│   ├── auth/                # Autenticação
│   │   ├── login.tsx        # Tela de login
│   │   └── register.tsx     # Cadastro
│   └── homepage.tsx         # Landing page
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # Componentes de UI base
│   └── trainer/             # Componentes específicos
├── constants/               # Constantes do projeto
│   └── theme.ts            # Sistema de design
├── stores/                 # Gerenciamento de estado
│   ├── authStore.ts        # Autenticação
│   ├── exerciseStore.ts    # Exercícios e treinos
│   └── trainerStore.ts     # Busca de trainers
├── types/                  # Definições TypeScript
│   └── exercise.ts         # Tipos de exercícios
└── hooks/                  # Hooks customizados
    └── useFrameworkReady.ts # Inicialização cross-platform
```

## 🏃‍♂️ Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI
- iOS Simulator ou Android Emulator

### Instalação

```bash
# Clonar o repositório
git clone <repo-url>
cd Trainr

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npx expo start
```

### Executar no Dispositivo

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android

# Web (para testes)
npx expo start --web
```

## 👥 Tipos de Usuário

### Cliente
- Buscar personal trainers por localização e especialidade
- Agendar e gerenciar sessões de treino
- Acompanhar progresso e histórico
- Chat com trainers

### Personal Trainer
- Gerenciar agenda e disponibilidade
- Criar treinos personalizados
- Acompanhar clientes e suas evoluções
- Sistema de avaliações

## 🎯 Funcionalidades Principais

### ✅ Implementadas
- **Autenticação**: Login/logout com persistência segura
- **Navegação**: Tab navigation + bottom sheet menu
- **Busca**: Sistema de filtros para encontrar trainers
- **Treinos**: Base de exercícios e templates de treino
- **Design System**: Tema centralizado e consistente
- **Cross-platform**: Funciona em iOS, Android e Web

### 🚧 Em Desenvolvimento
- Sistema de exercícios completo
- Chat em tempo real
- Agendamento de sessões
- Sistema de pagamentos
- Integração com mapas
- Notificações push

## 📊 Dados Mockados

O projeto utiliza dados mockados prontos para integração com API real:

```typescript
// stores/exerciseStore.ts
const mockExercises = [
  {
    id: '1',
    name: 'Push-ups',
    category: 'strength',
    muscle_groups: ['chest', 'shoulders', 'triceps'],
    difficulty: 'beginner',
    // ...
  }
]
```

### Estruturas de Dados
- **Exercise**: Exercícios individuais com instruções
- **Workout**: Treinos completos com exercícios organizados
- **WorkoutSession**: Sessões com tracking de progresso
- **User**: Profiles de clientes e trainers

## 🔧 Configuração do Ambiente

### Expo Configuration
```json
{
  "expo": {
    "name": "Trainr",
    "slug": "trainr",
    "version": "1.0.0",
    "platforms": ["ios", "android", "web"],
    "sdkVersion": "53.0.0"
  }
}
```

### TypeScript
Projeto totalmente tipado com interfaces bem definidas para todos os dados.

## 📱 Screenshots

*Em breve - capturas das telas principais*

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
---

### 🚀 Próximos Passos

- [ ] Integração com API real
- [ ] Sistema de notificações
- [ ] Chat em tempo real
- [ ] Geolocalização
- [ ] Sistema de pagamentos
- [ ] Publicação nas stores