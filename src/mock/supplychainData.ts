import type { SupplyChainIndustry } from '../types/industry';

export const supplyChainIndustries: SupplyChainIndustry[] = [
  /* ── 汽车 ─────────────────────────────── */
  {
    key: 'auto',
    name: '汽车',
    description: '覆盖原材料、零部件、整车制造、销售渠道及配套服务全链条',
    tag: '制造业',
    tagColor: 'blue',
    accentColor: '#1677ff',
    layers: [
      {
        key: 'supply', category: 'supply',
        name: '上游供应', subtitle: '原材料 / 半导体',
        color: '#fa8c16', marketSize: 8500, growth: 12.3,
        companies: [
          { name: '宝钢股份', code: '600019' }, { name: '南山铝业', code: '600219' },
          { name: '赣锋锂业', code: '002460' }, { name: '天赐材料', code: '002709' },
          { name: '赛轮轮胎', code: '601058' }, { name: '韦尔股份', code: '603501' },
        ],
        metrics: [
          { label: '市场规模', value: '8,500 亿元' },
          { label: '同比增速', value: '+12.3%', up: true },
          { label: '碳酸锂价', value: '9.8 万/吨' },
          { label: '钢价同比', value: '-5.2%', up: false },
        ],
      },
      {
        key: 'parts', category: 'product',
        name: '核心零部件', subtitle: '电池 / 传动 / 智能化',
        color: '#1677ff', marketSize: 48000, growth: 18.7,
        companies: [
          { name: '宁德时代', code: '300750' }, { name: '德赛西威', code: '002920' },
          { name: '华阳集团', code: '002906' }, { name: '伯特利',   code: '603596' },
          { name: '均胜电子', code: '600699' }, { name: '中创新航' },
        ],
        metrics: [
          { label: '市场规模',     value: '4.8 万亿元' },
          { label: '同比增速',     value: '+18.7%', up: true },
          { label: '动力电池装机', value: '387 GWh' },
          { label: '国产化率',     value: '92%', up: true },
        ],
      },
      {
        key: 'oem', category: 'product',
        name: '整车制造', subtitle: '乘用车 / 商用车 / 新能源',
        color: '#52c41a', marketSize: 100000, growth: 3.8,
        companies: [
          { name: '比亚迪',   code: '002594' }, { name: '上汽集团', code: '600104' },
          { name: '广汽集团', code: '601238' }, { name: '长城汽车', code: '601633' },
          { name: '理想汽车', code: 'LI'     }, { name: '蔚来',     code: 'NIO'    },
          { name: '中国重汽', code: '000951' },
        ],
        metrics: [
          { label: '年销量',       value: '3,143 万辆' },
          { label: '同比增速',     value: '+3.8%', up: true },
          { label: '新能源渗透率', value: '40.9%', up: true },
          { label: '出口量',       value: '590 万辆', up: true },
        ],
      },
      {
        key: 'channel', category: 'purchase',
        name: '销售渠道', subtitle: '经销商 / 直销 / 出口',
        color: '#722ed1', marketSize: 30000, growth: 8.5,
        companies: [
          { name: '广汇汽车', code: '600297' }, { name: '中升控股', code: '00881' },
          { name: '永达汽车', code: '03669'  }, { name: '瓜子二手车' },
          { name: '优信二手车', code: 'UXIN' },
        ],
        metrics: [
          { label: '市场规模',   value: '3 万亿元' },
          { label: '同比增速',   value: '+8.5%', up: true },
          { label: '4S店数量',   value: '27,800 家' },
          { label: '二手车交易', value: '1,758 万辆', up: true },
        ],
      },
      {
        key: 'service', category: 'service',
        name: '配套服务', subtitle: '金融 / 保险 / 维保 / 充电',
        color: '#eb2f96', marketSize: 24000, growth: 22.1,
        companies: [
          { name: '人保财险', code: '601319' }, { name: '平安财险', code: '601318' },
          { name: '途虎养车', code: '09690'  }, { name: '汽车之家', code: 'ATHM'   },
          { name: '特来电' }, { name: '星星充电' },
        ],
        metrics: [
          { label: '市场规模',   value: '2.4 万亿元' },
          { label: '同比增速',   value: '+22.1%', up: true },
          { label: '车险保费',   value: '8,673 亿元' },
          { label: '充电桩数量', value: '1,188 万台', up: true },
        ],
      },
    ],
  },

  /* ── 半导体 ───────────────────────────── */
  {
    key: 'semiconductor',
    name: '半导体',
    description: '从硅片、设备、晶圆制造到封测、终端应用的完整产业链',
    tag: '科技',
    tagColor: 'purple',
    accentColor: '#722ed1',
    layers: [
      {
        key: 'material', category: 'supply',
        name: '基础材料', subtitle: '硅片 / 光刻胶 / 特气',
        color: '#fa8c16', marketSize: 3200, growth: 15.6,
        companies: [
          { name: '沪硅产业', code: '688126' }, { name: '雅克科技', code: '002409' },
          { name: '南大光电', code: '300346' }, { name: '华特气体', code: '688268' },
        ],
        metrics: [
          { label: '市场规模',   value: '3,200 亿元' },
          { label: '同比增速',   value: '+15.6%', up: true },
          { label: '硅片国产化', value: '28%', up: true },
          { label: '光刻胶自给', value: '15%', up: true },
        ],
      },
      {
        key: 'equipment', category: 'supply',
        name: '半导体设备', subtitle: '光刻 / 刻蚀 / 薄膜沉积',
        color: '#1677ff', marketSize: 4800, growth: 32.1,
        companies: [
          { name: '北方华创', code: '002371' }, { name: '中微公司', code: '688012' },
          { name: '华海清科', code: '688120' }, { name: '芯源微',   code: '688037' },
        ],
        metrics: [
          { label: '市场规模',   value: '4,800 亿元' },
          { label: '同比增速',   value: '+32.1%', up: true },
          { label: '国产化率',   value: '22%', up: true },
          { label: '刻蚀机占比', value: '35%' },
        ],
      },
      {
        key: 'fab', category: 'product',
        name: '晶圆制造', subtitle: '逻辑 / 存储 / 模拟',
        color: '#52c41a', marketSize: 12000, growth: 8.4,
        companies: [
          { name: '中芯国际', code: '688981' }, { name: '华虹半导体', code: '688347' },
          { name: '长江存储' }, { name: '长鑫存储' },
        ],
        metrics: [
          { label: '市场规模',   value: '1.2 万亿元' },
          { label: '同比增速',   value: '+8.4%', up: true },
          { label: '14nm产能',   value: '35K wpm', up: true },
          { label: '良率水平',   value: '92%' },
        ],
      },
      {
        key: 'packaging', category: 'product',
        name: '封装测试', subtitle: 'OSAT / 先进封装',
        color: '#722ed1', marketSize: 3800, growth: 12.8,
        companies: [
          { name: '长电科技', code: '600584' }, { name: '华天科技', code: '002185' },
          { name: '通富微电', code: '002156' }, { name: '晶方科技', code: '603005' },
        ],
        metrics: [
          { label: '市场规模',   value: '3,800 亿元' },
          { label: '同比增速',   value: '+12.8%', up: true },
          { label: '先进封装占比', value: '38%', up: true },
          { label: '全球市占率', value: '28%', up: true },
        ],
      },
      {
        key: 'terminal', category: 'purchase',
        name: '终端应用', subtitle: '手机 / AI / 汽车 / 工控',
        color: '#eb2f96', marketSize: 28000, growth: 21.5,
        companies: [
          { name: '韦尔股份', code: '603501' }, { name: '卓胜微', code: '300782' },
          { name: '澜起科技', code: '688008' }, { name: '寒武纪', code: '688256' },
        ],
        metrics: [
          { label: '市场规模',   value: '2.8 万亿元' },
          { label: '同比增速',   value: '+21.5%', up: true },
          { label: 'AI芯片占比', value: '18%', up: true },
          { label: '车规芯片增速', value: '+45%', up: true },
        ],
      },
    ],
  },

  /* ── 新能源 ───────────────────────────── */
  {
    key: 'newenergy',
    name: '新能源',
    description: '光伏、风电、储能全产业链，含上游材料到终端电站运营',
    tag: '能源',
    tagColor: 'green',
    accentColor: '#52c41a',
    layers: [
      {
        key: 'raw', category: 'supply',
        name: '上游原材料', subtitle: '多晶硅 / 碳纤维 / 稀土',
        color: '#fa8c16', marketSize: 4200, growth: -18.3,
        companies: [
          { name: '通威股份', code: '600438' }, { name: '协鑫科技', code: '03800' },
          { name: '中环股份', code: '002129' }, { name: '北方稀土', code: '600111' },
        ],
        metrics: [
          { label: '市场规模',    value: '4,200 亿元' },
          { label: '同比增速',    value: '-18.3%', up: false },
          { label: '多晶硅均价',  value: '4.2 万/吨' },
          { label: '硅片N型占比', value: '75%', up: true },
        ],
      },
      {
        key: 'component', category: 'product',
        name: '核心组件', subtitle: '组件 / 叶片 / 储能电芯',
        color: '#1677ff', marketSize: 9800, growth: 6.2,
        companies: [
          { name: '隆基绿能', code: '601012' }, { name: '晶科能源', code: '688223' },
          { name: '明阳智能', code: '601615' }, { name: '宁德时代', code: '300750' },
        ],
        metrics: [
          { label: '市场规模',     value: '9,800 亿元' },
          { label: '同比增速',     value: '+6.2%', up: true },
          { label: '组件均价',     value: '0.92 元/W' },
          { label: '储能装机',     value: '56 GWh', up: true },
        ],
      },
      {
        key: 'epc', category: 'product',
        name: 'EPC建设', subtitle: '光伏电站 / 风电场工程',
        color: '#52c41a', marketSize: 6500, growth: 14.8,
        companies: [
          { name: '中国电建', code: '601669' }, { name: '中国能建', code: '601868' },
          { name: '特变电工', code: '600089' }, { name: '阳光电源', code: '300274' },
        ],
        metrics: [
          { label: '市场规模',   value: '6,500 亿元' },
          { label: '同比增速',   value: '+14.8%', up: true },
          { label: '新增装机',   value: '360 GW', up: true },
          { label: '度电成本',   value: '0.28 元/kWh' },
        ],
      },
      {
        key: 'grid', category: 'purchase',
        name: '并网消纳', subtitle: '电网 / 储能配套',
        color: '#722ed1', marketSize: 3800, growth: 28.4,
        companies: [
          { name: '国家电网' }, { name: '南方电网' },
          { name: '许继电气', code: '000400' }, { name: '南瑞集团', code: '600406' },
        ],
        metrics: [
          { label: '市场规模',   value: '3,800 亿元' },
          { label: '同比增速',   value: '+28.4%', up: true },
          { label: '弃光率',     value: '1.8%', up: true },
          { label: '绿电交易量', value: '4,600 亿度', up: true },
        ],
      },
      {
        key: 'operation', category: 'service',
        name: '运营服务', subtitle: '电站运维 / 碳交易 / 绿证',
        color: '#eb2f96', marketSize: 2100, growth: 35.6,
        companies: [
          { name: '三峡能源', code: '600905' }, { name: '华能国际', code: '600011' },
          { name: '节能风电', code: '601016' }, { name: '中广核新能源', code: '01811' },
        ],
        metrics: [
          { label: '市场规模',   value: '2,100 亿元' },
          { label: '同比增速',   value: '+35.6%', up: true },
          { label: '碳价(CCER)', value: '82 元/吨', up: true },
          { label: '绿证价格',   value: '18 元/张' },
        ],
      },
    ],
  },

  /* ── 消费电子 ─────────────────────────── */
  {
    key: 'consumerelec',
    name: '消费电子',
    description: '手机、平板、PC、可穿戴设备的元器件到品牌销售全链条',
    tag: '科技',
    tagColor: 'cyan',
    accentColor: '#13c2c2',
    layers: [
      {
        key: 'material', category: 'supply',
        name: '核心元器件', subtitle: 'SoC / 屏幕 / 摄像头',
        color: '#fa8c16', marketSize: 15000, growth: 9.8,
        companies: [
          { name: '韦尔股份', code: '603501' }, { name: '舜宇光学', code: '02382' },
          { name: '蓝思科技', code: '300433' }, { name: '水晶光电', code: '002273' },
        ],
        metrics: [
          { label: '市场规模', value: '1.5 万亿元' },
          { label: '同比增速', value: '+9.8%', up: true },
          { label: 'CMOS增速', value: '+22%', up: true },
          { label: '折叠屏出货', value: '2,100 万台', up: true },
        ],
      },
      {
        key: 'pcba', category: 'product',
        name: '代工制造', subtitle: 'ODM / EMS / PCBA',
        color: '#1677ff', marketSize: 22000, growth: 5.4,
        companies: [
          { name: '立讯精密', code: '002475' }, { name: '歌尔股份', code: '002241' },
          { name: '比亚迪电子', code: '00285'}, { name: '富士康', code: '601138' },
        ],
        metrics: [
          { label: '市场规模', value: '2.2 万亿元' },
          { label: '同比增速', value: '+5.4%', up: true },
          { label: 'AirPods份额', value: '62%' },
          { label: '印度产能占比', value: '18%', up: true },
        ],
      },
      {
        key: 'brand', category: 'product',
        name: '品牌厂商', subtitle: '手机 / PC / 穿戴',
        color: '#52c41a', marketSize: 32000, growth: 4.2,
        companies: [
          { name: '小米集团', code: '01810' }, { name: '传音控股', code: '688036' },
          { name: '联想集团', code: '00992' }, { name: 'OPPO/vivo' },
        ],
        metrics: [
          { label: '市场规模',    value: '3.2 万亿元' },
          { label: '同比增速',    value: '+4.2%', up: true },
          { label: '国内手机出货', value: '2.89 亿台', up: true },
          { label: '折叠屏渗透率', value: '3.2%', up: true },
        ],
      },
      {
        key: 'channel', category: 'purchase',
        name: '零售渠道', subtitle: '线上 / 线下 / 海外',
        color: '#722ed1', marketSize: 8500, growth: 7.1,
        companies: [
          { name: '京东', code: '09618' }, { name: '苏宁', code: '002024' },
          { name: '国美零售', code: '00493' }, { name: '迪信通', code: '06188' },
        ],
        metrics: [
          { label: '市场规模',  value: '8,500 亿元' },
          { label: '同比增速',  value: '+7.1%', up: true },
          { label: '线上渗透率', value: '68%', up: true },
          { label: '出口额',    value: '1.2 万亿元', up: true },
        ],
      },
      {
        key: 'service', category: 'service',
        name: '增值服务', subtitle: '应用商店 / 云 / 售后',
        color: '#eb2f96', marketSize: 4800, growth: 18.9,
        companies: [
          { name: '小米生态链' }, { name: '华为云', code: '华为' },
          { name: '中国移动', code: '600941' }, { name: '闻泰科技', code: '600745' },
        ],
        metrics: [
          { label: '市场规模',  value: '4,800 亿元' },
          { label: '同比增速',  value: '+18.9%', up: true },
          { label: 'App Store增速', value: '+12%', up: true },
          { label: '云服务增速', value: '+25%', up: true },
        ],
      },
    ],
  },

  /* ── 医药生物 ─────────────────────────── */
  {
    key: 'pharma',
    name: '医药生物',
    description: '原料药、制剂研发、临床试验、商业化销售及医疗服务全链条',
    tag: '医疗',
    tagColor: 'red',
    accentColor: '#f5222d',
    layers: [
      {
        key: 'api', category: 'supply',
        name: '原料药 / CXO', subtitle: 'API / CDMO / CRO',
        color: '#fa8c16', marketSize: 6800, growth: 8.4,
        companies: [
          { name: '药明康德', code: '603259' }, { name: '凯莱英',   code: '002821' },
          { name: '博腾股份', code: '300363' }, { name: '九洲药业', code: '603456' },
        ],
        metrics: [
          { label: '市场规模',   value: '6,800 亿元' },
          { label: '同比增速',   value: '+8.4%', up: true },
          { label: 'CDMO增速',   value: '+18%', up: true },
          { label: '出口占比',   value: '42%' },
        ],
      },
      {
        key: 'rd', category: 'product',
        name: '研发管线', subtitle: '创新药 / 生物药 / 仿制药',
        color: '#1677ff', marketSize: 4200, growth: 15.6,
        companies: [
          { name: '恒瑞医药', code: '600276' }, { name: '百济神州', code: '688235' },
          { name: '君实生物', code: '688180' }, { name: '信达生物', code: '01801' },
        ],
        metrics: [
          { label: '市场规模',  value: '4,200 亿元' },
          { label: '同比增速',  value: '+15.6%', up: true },
          { label: 'NDA申报数', value: '1,840 项', up: true },
          { label: 'PD-1药物数', value: '12 款' },
        ],
      },
      {
        key: 'production', category: 'product',
        name: '生产制造', subtitle: '制剂 / 医疗器械 / 体外诊断',
        color: '#52c41a', marketSize: 18000, growth: 6.8,
        companies: [
          { name: '迈瑞医疗', code: '300760' }, { name: '联影医疗', code: '688271' },
          { name: '华大基因', code: '300676' }, { name: '万泰生物', code: '603392' },
        ],
        metrics: [
          { label: '市场规模',     value: '1.8 万亿元' },
          { label: '同比增速',     value: '+6.8%', up: true },
          { label: '医疗器械出口', value: '4,200 亿元', up: true },
          { label: '国产替代率',   value: '55%', up: true },
        ],
      },
      {
        key: 'hospital', category: 'purchase',
        name: '医院终端', subtitle: '公立医院 / 零售药店 / DTP',
        color: '#722ed1', marketSize: 22000, growth: 5.2,
        companies: [
          { name: '国药控股', code: '01099' }, { name: '华润医药', code: '03320' },
          { name: '大参林',   code: '603233' }, { name: '一心堂',   code: '002727' },
        ],
        metrics: [
          { label: '市场规模',   value: '2.2 万亿元' },
          { label: '同比增速',   value: '+5.2%', up: true },
          { label: '院内市场占比', value: '72%' },
          { label: '零售药店数', value: '67.5 万家' },
        ],
      },
      {
        key: 'service', category: 'service',
        name: '医疗服务', subtitle: '互联网医疗 / 体检 / 康复',
        color: '#eb2f96', marketSize: 5600, growth: 22.4,
        companies: [
          { name: '平安好医生', code: '01833' }, { name: '美年健康', code: '002044' },
          { name: '爱尔眼科',   code: '300015' }, { name: '通策医疗', code: '600763' },
        ],
        metrics: [
          { label: '市场规模',    value: '5,600 亿元' },
          { label: '同比增速',    value: '+22.4%', up: true },
          { label: '互联网问诊',  value: '8.2 亿次', up: true },
          { label: '体检渗透率',  value: '42%', up: true },
        ],
      },
    ],
  },

  /* ── 食品饮料 ─────────────────────────── */
  {
    key: 'food',
    name: '食品饮料',
    description: '从农业种植、加工制造、品牌运营到流通零售的全链条分析',
    tag: '消费',
    tagColor: 'orange',
    accentColor: '#fa8c16',
    layers: [
      {
        key: 'farming', category: 'supply',
        name: '农业种植养殖', subtitle: '粮食 / 水果 / 畜禽 / 水产',
        color: '#52c41a', marketSize: 68000, growth: 3.2,
        companies: [
          { name: '牧原股份', code: '002714' }, { name: '温氏股份', code: '300498' },
          { name: '圣农发展', code: '002299' }, { name: '獐子岛',   code: '002069' },
        ],
        metrics: [
          { label: '市场规模',   value: '6.8 万亿元' },
          { label: '同比增速',   value: '+3.2%', up: true },
          { label: '猪肉产量',   value: '5,794 万吨' },
          { label: '粮食总产量', value: '69,541 万吨', up: true },
        ],
      },
      {
        key: 'processing', category: 'product',
        name: '食品加工', subtitle: '深加工 / 速冻 / 调味品',
        color: '#fa8c16', marketSize: 15000, growth: 5.8,
        companies: [
          { name: '海天味业', code: '603288' }, { name: '中炬高新', code: '600872' },
          { name: '安井食品', code: '603345' }, { name: '三全食品', code: '002216' },
        ],
        metrics: [
          { label: '市场规模',   value: '1.5 万亿元' },
          { label: '同比增速',   value: '+5.8%', up: true },
          { label: '调味品CR5', value: '38%' },
          { label: '速冻食品增速', value: '+12%', up: true },
        ],
      },
      {
        key: 'brand', category: 'product',
        name: '品牌商', subtitle: '白酒 / 饮料 / 乳品 / 休闲食品',
        color: '#1677ff', marketSize: 22000, growth: 7.4,
        companies: [
          { name: '贵州茅台', code: '600519' }, { name: '五粮液',   code: '000858' },
          { name: '伊利股份', code: '600887' }, { name: '农夫山泉', code: '09633' },
        ],
        metrics: [
          { label: '市场规模',  value: '2.2 万亿元' },
          { label: '同比增速',  value: '+7.4%', up: true },
          { label: '白酒规模',  value: '7,563 亿元', up: true },
          { label: '飞天茅台价', value: '2,380 元/瓶' },
        ],
      },
      {
        key: 'channel', category: 'purchase',
        name: '流通渠道', subtitle: '经销商 / 商超 / 电商 / 餐饮',
        color: '#722ed1', marketSize: 12000, growth: 9.6,
        companies: [
          { name: '永辉超市', code: '601933' }, { name: '华润万家' },
          { name: '美团',     code: '03690' }, { name: '盒马鲜生' },
        ],
        metrics: [
          { label: '市场规模',  value: '1.2 万亿元' },
          { label: '同比增速',  value: '+9.6%', up: true },
          { label: '电商渗透率', value: '32%', up: true },
          { label: '即时零售增速', value: '+45%', up: true },
        ],
      },
      {
        key: 'service', category: 'service',
        name: '餐饮 / 服务', subtitle: '连锁餐饮 / 外卖 / 食安检测',
        color: '#eb2f96', marketSize: 5400, growth: 16.2,
        companies: [
          { name: '海底捞', code: '06862' }, { name: '九毛九', code: '09922' },
          { name: '百胜中国', code: '09987' }, { name: '广州酒家', code: '603043' },
        ],
        metrics: [
          { label: '市场规模',   value: '5,400 亿元' },
          { label: '同比增速',   value: '+16.2%', up: true },
          { label: '餐饮总收入', value: '5.4 万亿元', up: true },
          { label: '外卖渗透率', value: '28%', up: true },
        ],
      },
    ],
  },
];
