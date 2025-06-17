# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitConnect is a React Native marketplace app built with Expo that connects personal trainers with clients. The app supports both web and mobile platforms using Expo Router for navigation.

## Commands

- `npm run dev` - Start the development server with telemetry disabled
- `npm run build:web` - Export the app for web deployment
- `npm run lint` - Run Expo linting

## Architecture

### Navigation Structure
- Uses Expo Router v5 with file-based routing in the `app/` directory
- Root layout (`app/_layout.tsx`) handles font loading and splash screen
- Main entry point (`app/index.tsx`) is a splash screen that routes to auth or tabs based on authentication status
- Auth flow: `app/auth/` contains login, register, and related screens
- Main app: `app/(tabs)/` contains the tabbed interface with conditional tabs based on user type

### State Management
- **Zustand** for state management with persistence
- `authStore.ts` - Handles user authentication, profile data, and session management with localStorage persistence
- `trainerStore.ts` - Manages trainer listings, search filters, and selection
- `sessionStore.ts` - Booking and session management

### User Types & Features
- **Clients**: Can search trainers, book sessions, view schedules
- **Trainers**: Manage availability, view bookings, client communications
- Tab navigation adapts based on user type (clients see "Search" tab, trainers don't)

### Key Dependencies
- Expo Router (~5.1.0) for navigation
- Zustand for state management
- React Native Maps for location features
- Expo modules for camera, location, secure storage
- Lucide React Native for icons

### Platform Considerations
- Cross-platform support (iOS, Android, Web)
- Uses Platform checks for web-specific code (see `useFrameworkReady.ts`)
- LocalStorage persistence for web, secure storage for mobile
- Custom storage implementation in authStore for cross-platform compatibility

### UI Structure
- Custom UI components in `components/ui/` (Button, Card, Input)
- Inter font family loaded at app startup
- Blue color scheme (#3B82F6 primary)
- Tab bar with custom styling and platform-appropriate icons