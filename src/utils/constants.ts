/**
 * 公用常数
 */

/**
 * 颜色
 */
 export enum colors {
  success = 'green',
  primary = '#409EFF',
  warning = '#E6A23C',
  danger = 'red',
  info = '#909399'
}

interface IConstant {
  value: string | number;
  label: string;
  color?: colors;
}

// 日期格式化
export const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * 来源
 */
 export const SOURCE_TYPE: IConstant[] = [
  { value: '43', label: '新SDK' },
  { value: '67', label: '旧SDK' }
]

/**
 * 游戏包类型
 */
 export const GAME_PACKAGE_TYPE: IConstant[] = [
  { value: 0, label: '自投' },
  { value: 1, label: 'CPS' },
  { value: 2, label: '联运' }
]

/**
 * 菜单状态
 */
 export const MENU_STATUS: IConstant[] = [
  { label: '显示', value: 1 },
  { label: '隐藏', value: 0 }
]

/**
 * 菜单模块
 */
 export const MENU_MODULE: IConstant[] = [
  { value: 'authority', label: '权限系统' },
  { value: 'platform', label: '运营系统' },
  { value: 'stat', label: '统计系统' },
  { value: 'ad', label: '投放系统' },
  { value: 'jrtt', label: '投放系统/今日头条' },
  { value: 'gdt', label: '投放系统/广点通' },
  { value: 'ks', label: '投放系统/快手' },
  { value: 'log', label: '日志系统' },
  { value: 'cp', label: 'CP系统' },
  { value: 'cs', label: '客服系统' }
]

/**
 * 菜单作用类型
 */
 export const MENU_ACTIONS: IConstant[] = [
  { value: 'create', label: '创建' },
  { value: 'update', label: '更新' },
  { value: 'delete', label: '删除' },
  { value: 'detail', label: '详情' },
  { value: 'export', label: '导出' },
  { value: 'status', label: '状态' },
]