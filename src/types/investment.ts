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
