# HabitatLedger Native

Native port of HabitatLedger built with React Native and Expo.

## Overview

This app lets tenants log, track, and resolve rental property issues with evidence and lifecycle history. It mirrors the web client with a neo-brutalist mobile UI and works offline using bundled mock data.

## Tech Stack

- React Native
- Expo / Expo Router
- React Navigation
- Zustand (state management on web; context here)
- Node.js + Express + MongoDB (server)

## Structure

- client: Expo React Native app
- server: Express API for issues and uploads

## Build

Use EAS to build an APK:

```
cd client
eas build -p android --profile preview
```
