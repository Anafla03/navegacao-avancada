# App de Navegação React Native com Expo Router

Aplicativo React Native demonstrando boas práticas de navegação e UX usando **Expo Router** (file-based routing).

## Características

-  **Bottom Tab Navigation** (Home + Profile)
-  **Stack Navigation** interno na tab Home
-  **Tratamento completo de estados UX**:
  - Loading
  - Empty (sem dados)
  - Error (com retry)
-  **Deep Linking** configurado (`meuapp://`)
-  **TypeScript**
-  **Implementações inline** (sem componentes reutilizáveis)

##  Estrutura de Navegação

### Hierarquia de Rotas (File-Based)

```
app/
├── _layout.tsx                    # Root Layout (Stack)
├── (tabs)/                        # Tab Group
│   ├── _layout.tsx               # Bottom Tab Navigator
│   ├── (home)/                   # Home Tab (Stack group)
│   │   ├── _layout.tsx          # Stack Navigator
│   │   ├── index.tsx            # Home Screen
│   │   └── details/
│   │       └── [id].tsx         # Details Screen (dynamic route)
│   └── profile.tsx              # Profile Screen
```

### Navegação Visual

```
Root (Stack)
  └── Tabs (Bottom)
      ├── Home (Stack)
      │   ├── Home Screen
      │   └── Details Screen
      └── Profile Screen
```

##  Tratamento de Estados UX

Todas as telas garantem que **nenhuma tela fique em branco**, tratando os seguintes estados:

| Tela | Loading | Empty | Error |
|------|---------|-------|-------|
| **Home** | ✅ ActivityIndicator durante 2s | ✅ Mensagem "Nenhum dado disponível" | - |
| **Details** | ✅ ActivityIndicator durante 1.5s | - | ✅ Mensagem de erro + botão "Tentar Novamente" |
| **Profile** | ✅ ActivityIndicator durante 1.5s | ✅ Mensagem "Nenhum perfil disponível" | - |

### Onde os Estados são Tratados

#### Home Screen (`app/(tabs)/(home)/index.tsx`)
- **Loading**: Linhas 27-35 - Exibe ActivityIndicator + texto
- **Empty**: Linhas 38-44 - Exibe mensagem quando `data.length === 0`
- **Data**: Linhas 47-65 - Exibe lista de itens + botão de navegação

#### Details Screen (`app/(tabs)/(home)/details/[id].tsx`)
- **Loading**: Linhas 47-54 - Exibe ActivityIndicator + texto
- **Error**: Linhas 57-68 - Exibe mensagem de erro + botão de retry
- **Data**: Linhas 71-78 - Exibe detalhes do item com ID recebido
- **Retry Logic**: Função `loadData()` (linhas 16-35) - Pode ser chamada novamente

#### Profile Screen (`app/(tabs)/profile.tsx`)
- **Loading**: Linhas 28-35 - Exibe ActivityIndicator + texto
- **Empty**: Linhas 38-46 - Exibe mensagem quando `profile === null`
- **Data**: Linhas 49-66 - Exibe informações do perfil

## Deep Linking

### Configuração

O deep linking está configurado no `app.json`:

```json
{
  "expo": {
    "scheme": "meuapp"
  }
}
```

O Expo Router **mapeia automaticamente** as rotas baseado na estrutura de arquivos:

- `meuapp://` → Abre a raiz do app (tabs)
- `meuapp://details/1` → Abre `Details` com `id=1` ✅
- `meuapp://details/123` → Abre `Details` com `id=123`
- `meuapp://profile` → Abre a aba Profile

### Como Testar Deep Links

#### No Android:
```bash
npx uri-scheme open meuapp://details/1 --android
```

#### No iOS:
```bash
npx uri-scheme open meuapp://details/1 --ios
```

#### Durante desenvolvimento (Expo Go):
Escaneie o QR code ou use:
```bash
npx expo start
# Digite 's' para alternar para Expo Go
```

## 🚀 Como Executar

### 1. Instalar dependências:
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento:
```bash
npx expo start
```

### 3. Executar no dispositivo:

**Android:**
```bash
npx expo start --android
```

**iOS:**
```bash
npx expo start --ios
```

**Web:**
```bash
npx expo start --web
```

### 4. Usar Expo Go (alternativa):
- Instale o app Expo Go no seu dispositivo
- Escaneie o QR code exibido no terminal

## 📱 Fluxo de Uso

1. **App inicia** → Exibe Bottom Tabs (Home e Profile)
2. **Tab Home** → Mostra loading por 2 segundos → Exibe lista de itens
3. **Clique em "Ir para Details"** → Navega para tela Details com ID `123`
4. **Details carrega** → 50% de chance de erro ou sucesso
   - Se **erro** → Exibe mensagem + botão "Tentar Novamente"
   - Se **sucesso** → Exibe detalhes do item
5. **Tab Profile** → Mostra loading → Exibe perfil do usuário
