export type PredictionStatus =
  | 'pending'      // 待验证
  | 'active'       // 验证中
  | 'realized'     // 已兑现
  | 'invalidated'; // 已证伪

export const PREDICTION_STATUS_LABEL: Record<PredictionStatus, string> = {
  pending:     '待验证',
  active:      '验证中',
  realized:    '已兑现',
  invalidated: '已证伪',
};

export const PREDICTION_STATUS_COLOR: Record<PredictionStatus, string> = {
  pending:     'default',
  active:      'processing',
  realized:    'success',
  invalidated: 'error',
};

// Valid manual transitions from each status
export const PREDICTION_TRANSITIONS: Record<PredictionStatus, PredictionStatus[]> = {
  pending:     ['active'],
  active:      ['realized', 'invalidated'],
  realized:    ['pending'],
  invalidated: ['pending'],
};

export const PREDICTION_TRANSITION_LABEL: Partial<Record<PredictionStatus, string>> = {
  pending:     '开始验证',
  active:      '',           // active has two branches; handled separately
  realized:    '重置为待验证',
  invalidated: '重置为待验证',
};

export interface Prediction {
  id: string;
  title: string;          // 简短预判标题
  basis: string;          // 判断依据
  target: string;         // 验证标准 / 目标条件
  timeframe: string;      // 时间范围, e.g. '2025年Q2'
  status: PredictionStatus;
  tags: string[];
  createdAt: string;      // ISO date string
  activeAt?: string;
  resolvedAt?: string;
}

/* ── Investment Logic ─────────────────────── */

export type ConvictionLevel = 'high' | 'medium' | 'low';
export type LogicStatus = 'active' | 'watching' | 'exited';

export const LOGIC_STATUS_LABEL: Record<LogicStatus, string> = {
  active:   '持有中',
  watching: '观察中',
  exited:   '已退出',
};

export const LOGIC_STATUS_COLOR: Record<LogicStatus, string> = {
  active:   'success',
  watching: 'processing',
  exited:   'default',
};

export const CONVICTION_LABEL: Record<ConvictionLevel, string> = {
  high:   '高',
  medium: '中',
  low:    '低',
};

export const CONVICTION_COLOR: Record<ConvictionLevel, string> = {
  high:   '#f5222d',
  medium: '#fa8c16',
  low:    '#8c8c8c',
};

export interface InvestmentLogic {
  id: string;
  subject: string;        // 投资标的
  coreLogic: string;      // 核心逻辑
  catalysts: string[];    // 催化剂
  risks: string[];        // 主要风险
  timeHorizon: string;    // 持有周期
  conviction: ConvictionLevel;
  status: LogicStatus;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
}
