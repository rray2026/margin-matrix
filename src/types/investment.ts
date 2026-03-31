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

/* ── Market Consensus ─────────────────────── */

export type ConsensusStance  = 'agree' | 'disagree' | 'neutral';
export type ConsensusSubjectType = 'stock' | 'industry';
export type ConsensusType    = 'qualitative' | 'quantitative';
export type ConsensusStatus  = 'tracking' | 'confirmed' | 'invalidated';

export const CONSENSUS_STANCE_LABEL: Record<ConsensusStance, string> = {
  agree:    '认同',
  disagree: '反对',
  neutral:  '观望',
};

export const CONSENSUS_STANCE_COLOR: Record<ConsensusStance, string> = {
  agree:    '#52c41a',
  disagree: '#ff4d4f',
  neutral:  '#8c8c8c',
};

export const CONSENSUS_STATUS_LABEL: Record<ConsensusStatus, string> = {
  tracking:    '追踪中',
  confirmed:   '已证实',
  invalidated: '已证伪',
};

export const CONSENSUS_STATUS_COLOR: Record<ConsensusStatus, string> = {
  tracking:    'processing',
  confirmed:   'success',
  invalidated: 'error',
};

export const CONSENSUS_TYPE_LABEL: Record<ConsensusType, string> = {
  qualitative: '定性',
  quantitative: '定量',
};

export interface ConsensusMetric {
  label: string;   // e.g. '目标价中值', '一致预期EPS增速'
  value: string;   // e.g. '¥185', '+28%'
  source?: string; // e.g. '彭博一致预期'
}

export interface MarketConsensus {
  id: string;
  subject: string;                  // 标的名称，e.g. '宁德时代' / '半导体行业'
  subjectType: ConsensusSubjectType;
  consensusType: ConsensusType;
  content: string;                  // 共识内容描述
  metrics?: ConsensusMetric[];      // 定量指标（consensusType=quantitative 时使用）
  myStance: ConsensusStance;
  myReason?: string;                // 个人立场理由
  status: ConsensusStatus;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
}
