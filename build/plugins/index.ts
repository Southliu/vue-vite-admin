import type { Plugin } from 'vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import { configStyleImportPlugin } from './styleImport'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'

export function createVitePlugins() {
  // 插件参数
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    PurgeIcons({}),
    Unocss({
      presets: [
        presetUno(), 
        presetAttributify(), 
        presetIcons()
      ],
    }),
    vueJsx({}),
    // 压缩包
    viteCompression(),
    AutoImport({
      resolvers: [
        AntDesignVueResolver()
      ]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver()
      ]
    }),
    // 包分析
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
    // css按需加载
    configStyleImportPlugin(),
    // 自动生成路由
    // configPageImportPlugin()
  ]

  return vitePlugins
}