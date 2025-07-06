import * as ExpoDevice from 'expo-device'
import { Platform } from 'react-native'
import { useSyncQueriesExternal } from 'react-query-external-sync'
import { queryClient } from './query.setup'

export function useDevtools() {
  useSyncQueriesExternal({
    queryClient,
    socketURL: 'http://192.168.2.169:42831', // Default port for React Native DevTools
    deviceName: Platform?.OS || 'web', // Platform detection
    platform: Platform?.OS || 'web', // Use appropriate platform identifier
    deviceId: Platform?.OS || 'web', // Use a PERSISTENT identifier (see note below)
    isDevice: ExpoDevice.isDevice, // Automatically detects real devices vs emulators
    extraDeviceInfo: {
      // Optional additional info about your device
      appVersion: '1.0.0',
      // Add any relevant platform info
    },
    enableLogs: false,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
      // Add any private environment variables you want to monitor
      // Public environment variables are automatically loaded
    },
    // Storage monitoring with CRUD operations
    secureStorageKeys: [
      'userToken',
      'refreshToken',
      'biometricKey',
      'deviceId',
    ], // SecureStore keys to monitor
  })
}
