import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { resolvePath } from './config/utils/resolvePath'

export default defineConfig({
    plugins: [Vue()],
    test: {
      clearMocks: true
    },
    resolve: {
        alias: {
            '@spark-ui/ui': resolvePath('./packages/ui'),
            '@spark-ui/cli': resolvePath('./packages/cli')
        }
    }
})
