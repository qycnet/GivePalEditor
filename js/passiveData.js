// 被动技能数据
window.passiveData = {
    // 移动速度相关
    "movement": [
        { id: "MoveSpeed_up_1", name: "灵活", description: "移动速度提升10%" },
        { id: "MoveSpeed_up_2", name: "运动健将", description: "移动速度提升20%" },
        { id: "MoveSpeed_up_3", name: "神速", description: "移动速度提升30%" },
        { id: "MoveSpeed_up_PartnerSkill_1", name: "玩家移动速度提升_伙伴技能Lv1", description: "" },
        { id: "MoveSpeed_up_PartnerSkill_2", name: "玩家移动速度提升_伙伴技能Lv2", description: "" },
        { id: "MoveSpeed_up_PartnerSkill_3", name: "玩家移动速度提升_伙伴技能Lv3", description: "" },
        { id: "MoveSpeed_up_PartnerSkill_4", name: "玩家移动速度提升_伙伴技能Lv4", description: "" },
        { id: "MoveSpeed_up_PartnerSkill_5", name: "玩家移动速度提升_伙伴技能Lv5", description: "" }
    ],
    
    // 传说属性
    "legendary": [
        { id: "Legend", name: "传说", description: "攻击+20%，防御+20%，移动速度提升15%" },
        { id: "Rare", name: "稀有", description: "工作速度+15% (对自己生效)，攻击+15% (对自己生效)" },
        { id: "Vampire", name: "吸血鬼", description: "会吸收造成伤害的一部分恢复自身的。即使到夜晚也不会睡觉，可以一直工作。" },
        { id: "Nocturnal", name: "夜行性", description: "即使到夜晚也不会睡觉，会一直工作。" },
        { id: "Alien", name: "未知生物细胞", description: "攻击力+10%，火属性伤害减免15%，雷属性伤害减免15%" },
        { id: "NonKilling", name: "手下留情", description: "和平主义者，使攻击目标的生命值不会小于1。" }
    ],
    
    // 元素增强
    "elementBoost": [
        { id: "ElementBoost_Normal_2_PAL", name: "圣天", description: "无属性攻击伤害增加20%" },
        { id: "ElementBoost_Fire_2_PAL", name: "炎帝", description: "火属性攻击伤害增加20%" },
        { id: "ElementBoost_Aqua_2_PAL", name: "海皇", description: "水属性攻击伤害增加20%" },
        { id: "ElementBoost_Thunder_2_PAL", name: "雷帝", description: "雷属性攻击伤害增加20%" },
        { id: "ElementBoost_Leaf_2_PAL", name: "精灵王", description: "草属性攻击伤害增加20%" },
        { id: "ElementBoost_Ice_2_PAL", name: "冰帝", description: "冰属性攻击伤害增加20%" },
        { id: "ElementBoost_Earth_2_PAL", name: "岩帝", description: "地属性攻击伤害增加20%" },
        { id: "ElementBoost_Dark_2_PAL", name: "冥王", description: "暗属性攻击伤害增加20%" },
        { id: "ElementBoost_Dragon_2_PAL", name: "神龙", description: "龙属性攻击伤害增加20%" },
        { id: "ElementBoost_Normal_1_PAL", name: "禅境", description: "无属性攻击伤害增加10%" },
        { id: "ElementBoost_Fire_1_PAL", name: "喜欢玩火", description: "火属性攻击伤害增加10%" },
        { id: "ElementBoost_Aqua_1_PAL", name: "喜欢戏水", description: "水属性攻击伤害增加10%" },
        { id: "ElementBoost_Thunder_1_PAL", name: "电容", description: "雷属性攻击伤害增加10%" },
        { id: "ElementBoost_Leaf_1_PAL", name: "草木馨香", description: "草属性攻击伤害增加10%" },
        { id: "ElementBoost_Ice_1_PAL", name: "冷血", description: "冰属性攻击伤害增加10%" },
        { id: "ElementBoost_Earth_1_PAL", name: "大地之力", description: "地属性攻击伤害增加10%" },
        { id: "ElementBoost_Dark_1_PAL", name: "夜幕", description: "暗属性攻击伤害增加10%" },
        { id: "ElementBoost_Dragon_1_PAL", name: "龙之血脉", description: "龙属性攻击伤害增加10%" }
    ],
    
    // 元素抗性
    "elementResist": [
        { id: "ElementResist_Normal_1_PAL", name: "一反常态", description: "无属性伤害减少10%" },
        { id: "ElementResist_Fire_1_PAL", name: "拥抱烈日", description: "火属性伤害减少10%" },
        { id: "ElementResist_Aqua_1_PAL", name: "防水性能", description: "水属性伤害减少10%" },
        { id: "ElementResist_Thunder_1_PAL", name: "绝缘体", description: "雷属性伤害减少10%" },
        { id: "ElementResist_Leaf_1_PAL", name: "除草效果", description: "草属性伤害减少10%" },
        { id: "ElementResist_Ice_1_PAL", name: "高温体质", description: "冰属性伤害减少10%" },
        { id: "ElementResist_Earth_1_PAL", name: "抗震结构", description: "地属性伤害减少10%" },
        { id: "ElementResist_Dark_1_PAL", name: "阳光开朗", description: "暗属性伤害减少10%" },
        { id: "ElementResist_Dragon_1_PAL", name: "屠龙者", description: "龙属性伤害减少10%" }
    ],

    // 战斗相关
    "combat": [
        { id: "ATK_up_PartnerSkill_1", name: "攻击力提升_伙伴技能Lv1", description: "攻击力 +5%" },
        { id: "ATK_up_PartnerSkill_2", name: "攻击力提升_伙伴技能Lv2", description: "攻击力 +6%" },
        { id: "ATK_up_PartnerSkill_3", name: "攻击力提升_伙伴技能Lv3", description: "攻击力 +7%" },
        { id: "ATK_up_PartnerSkill_4", name: "攻击力提升_伙伴技能Lv4", description: "攻击力 +8%" },
        { id: "PAL_ALLAttack_up1", name: "勇敢", description: "攻击+10% (对自己生效)" },
        { id: "PAL_ALLAttack_up2", name: "凶猛", description: "攻击+20% (对自己生效)" },
        { id: "PAL_ALLAttack_up3", name: "鬼神", description: "攻击+30% (对帕鲁生效)，防御+5% (对帕鲁生效)" },
        { id: "Deffence_up1", name: "坚硬皮肤", description: "防御+10% (对自己生效)" },
        { id: "Deffence_up2", name: "顽强肉体", description: "防御+20% (对自己生效)" },
        { id: "Deffence_up3", name: "金刚之躯", description: "防御+30% (对帕鲁生效)" }
    ],

    // 工作相关
    "work": [
        { id: "CraftSpeed_up1", name: "认真", description: "工作速度+20% (对自己生效)" },
        { id: "CraftSpeed_up2", name: "工匠精神", description: "工作速度+50% (对自己生效)" },
        { id: "CraftSpeed_up3", name: "卓绝技艺", description: "工作速度+75% (对帕鲁生效)" },
        { id: "TrainerWorkSpeed_UP_1", name: "啦啦队", description: "玩家的工作速度提升25%" },
        { id: "TrainerMining_up1", name: "矿山首领", description: "玩家的挖掘速度提升25%" },
        { id: "TrainerLogging_up1", name: "采伐领袖", description: "玩家的采伐速度提升25%" },
        { id: "WorkSpeed_ACC_up1", name: "高速工作Lv1", description: "工作速度 10%" },
        { id: "WorkSpeed_ACC_up2", name: "高速工作Lv2", description: "工作速度 15%" },
        { id: "WorkSpeed_ACC_up3", name: "高速工作Lv3", description: "工作速度 20%" }
    ],

    // 生存属性
    "survival": [
        { id: "PAL_FullStomach_Down_1", name: "小胃", description: "+10%" },
        { id: "PAL_FullStomach_Down_2", name: "节食大师", description: "+15%" },
        { id: "PAL_FullStomach_Down_3", name: "极限绝食", description: "减少饱腹度下降速度+20.0%" },
        { id: "PAL_Sanity_Down_1", name: "积极思维", description: "+10%" },
        { id: "PAL_Sanity_Down_2", name: "工作狂", description: "+15%" },
        { id: "PAL_Sanity_Down_3", name: "明镜止水", description: "减少SAN值下降速度+20.0%" },
        { id: "HP_ACC_up1", name: "提升体力Lv1", description: "HP 5%" },
        { id: "HP_ACC_up2", name: "提升体力Lv2", description: "HP 10%" },
        { id: "HP_ACC_up3", name: "提升体力Lv3", description: "HP 15%" }
    ],

    // 特殊能力
    "special": [
        { id: "Test_PalEgg_HatchingSpeed_Up", name: "博爱主义者", description: "当分配到配种牧场时，产出蛋的速度将加快100%。" },
        { id: "CoolTimeReduction_Up_1", name: "沉着冷静", description: "主动技能的冷却时间缩短30%，攻击+10%" },
        { id: "CoolTimeReduction_Up_2", name: "急性子", description: "主动技能的冷却时间缩短15%" },
        { id: "SalePrice_Up_1", name: "高贵", description: "改善交易价格+5%" },
        { id: "SalePrice_Up_2", name: "贵族", description: "改善交易价格+3%" }
    ],

    // 骑乘相关
    "mount": [
        { id: "Stamina_Up_1", name: "无限精力", description: "最大体力+50%，※此效果仅对可骑乘的帕鲁有效。" },
        { id: "Stamina_Up_2", name: "品学兼优", description: "最大体力+25%，※此效果仅对可骑乘的帕鲁有效。" },
        { id: "Stamina_Up_3", name: "永动机", description: "最大耐力+75%，此效果仅对可骑乘的帕鲁有效。" }
    ],

    // 负面效果
    "negative": [
        { id: "CraftSpeed_down1", name: "笨手笨脚", description: "工作速度-10% (对自己生效)" },
        { id: "CraftSpeed_down2", name: "偷懒成瘾", description: "工作速度-30% (对自己生效)" },
        { id: "Deffence_down1", name: "弱不禁风", description: "防御-10% (对自己生效)" },
        { id: "Deffence_down2", name: "骨质疏松", description: "防御-20% (对自己生效)" },
        { id: "PAL_ALLAttack_down1", name: "胆小", description: "攻击-10% (对自己生效)" },
        { id: "PAL_ALLAttack_down2", name: "消极主义", description: "攻击-20% (对自己生效)" },
        { id: "PAL_FullStomach_Up_1", name: "贪吃", description: "+10%" },
        { id: "PAL_FullStomach_Up_2", name: "无底之胃", description: "+15%" },
        { id: "PAL_Sanity_Up_1", name: "情绪不稳", description: "+10%" },
        { id: "PAL_Sanity_Up_2", name: "毁灭欲望", description: "+15%" },
        { id: "CoolTimeReduction_Down_1", name: "慢性子", description: "主动技能的冷却时间延长-15%" },
        { id: "Stamina_Down_1", name: "家里蹲", description: "最大体力-25%，※此效果仅对可骑乘的帕鲁有效。" },
        { id: "SalePrice_Down_1", name: "寒酸", description: "改善交易价格-10%" }
    ],

    // 复合效果
    "composite": [
        { id: "Witch", name: "魔女", description: "暗属性攻击伤害增加30%，冰属性攻击伤害增加30%" },
        { id: "EternalFlame", name: "永炎", description: "火属性攻击伤害增加30%，雷属性攻击伤害增加30%" },
        { id: "Invader", name: "侵略者", description: "暗属性攻击伤害增加30%，龙属性攻击伤害增加30%" },
        { id: "Noukin", name: "脑筋", description: "攻击+30% (对自己生效)，工作速度-50% (对自己生效)" },
        { id: "PAL_rude", name: "粗暴", description: "攻击+15% (对自己生效)，工作速度-10% (对自己生效)" },
        { id: "PAL_conceited", name: "自恋狂", description: "工作速度+10% (对自己生效)，防御-10% (对自己生效)" },
        { id: "PAL_sadist", name: "虐待狂", description: "攻击+15% (对自己生效)，防御-15% (对自己生效)" },
        { id: "PAL_masochist", name: "受虐狂", description: "防御+15% (对自己生效)，攻击-15% (对自己生效)" },
        { id: "PAL_CorporateSlave", name: "社畜", description: "工作速度+30% (对自己生效)，攻击-30% (对自己生效)" },
        { id: "PAL_oraora", name: "强势", description: "攻击+10% (对自己生效)，防御-10% (对自己生效)" }
    ],

    // 玩家增益
    "playerBuff": [
        { id: "TrainerATK_UP_1", name: "突袭指挥官", description: "玩家的攻击提升10%" },
        { id: "TrainerDEF_UP_1", name: "铁壁军师", description: "玩家的防御提升10%" },
        { id: "TrainerATK_UP_PartnerSkill_1", name: "玩家攻击力提升_伙伴技能Lv1", description: "攻击力 +10%" },
        { id: "TrainerATK_UP_PartnerSkill_2", name: "玩家攻击力提升_伙伴技能Lv2", description: "攻击力 +11%" },
        { id: "TrainerATK_UP_PartnerSkill_3", name: "玩家攻击力提升_伙伴技能Lv3", description: "攻击力 +13%" },
        { id: "TrainerATK_UP_PartnerSkill_4", name: "玩家攻击力提升_伙伴技能Lv4", description: "攻击力 +16%" },
        { id: "TrainerATK_UP_PartnerSkill_5", name: "玩家攻击力提升_伙伴技能Lv5", description: "攻击力 +20%" },
        { id: "TrainerDEF_UP_PartnerSkill_1", name: "玩家防御力提升_伙伴技能Lv1", description: "防御 +5%" },
        { id: "TrainerDEF_UP_PartnerSkill_2", name: "玩家防御力提升_伙伴技能Lv2", description: "防御 +6%" },
        { id: "TrainerDEF_UP_PartnerSkill_3", name: "玩家防御力提升_伙伴技能Lv3", description: "防御 +7%" },
        { id: "TrainerDEF_UP_PartnerSkill_4", name: "玩家防御力提升_伙伴技能Lv4", description: "防御 +8%" },
        { id: "TrainerDEF_UP_PartnerSkill_5", name: "玩家防御力提升_伙伴技能Lv5", description: "防御 +10%" },
        { id: "TrainerDEF_UP_PartnerSkill_6", name: "玩家防御力提升_伙伴技能Lv6", description: "防御 +12%" },
        { id: "TrainerDEF_UP_PartnerSkill_7", name: "玩家防御力提升_伙伴技能Lv7", description: "防御 +14%" }
    ],

    // 重量相关
    "weight": [
        { id: "MaxInventoryWeight_up", name: "提升负重上限Lv1", description: "" },
        { id: "MaxInventoryWeight_up2", name: "提升负重上限Lv2", description: "" },
        { id: "MaxInventoryWeight_up3", name: "提升负重上限Lv3", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_1", name: "最大库存重量_伙伴技能Lv1", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_2", name: "最大库存重量_伙伴技能Lv2", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_3", name: "最大库存重量_伙伴技能Lv3", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_4", name: "最大库存重量_伙伴技能Lv4", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_5", name: "最大库存重量_伙伴技能Lv5", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_6", name: "最大库存重量_伙伴技能Lv6", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_7", name: "最大库存重量_伙伴技能Lv7", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_8", name: "最大库存重量_伙伴技能Lv8", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_9", name: "最大库存重量_伙伴技能Lv9", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_10", name: "最大库存重量_伙伴技能Lv10", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_11", name: "最大库存重量_伙伴技能Lv11", description: "" },
        { id: "MaxInventoryWeight_up_Partnerskill_12", name: "最大库存重量_伙伴技能Lv12", description: "" }
    ],

    // 温度抗性
    "temperatureResist": [
        { id: "TemperatureResist_Heat1", name: "耐暑Lv1", description: "" },
        { id: "TemperatureResist_Heat2", name: "耐暑Lv2", description: "" },
        { id: "TemperatureResist_Heat3", name: "耐暑Lv3", description: "" },
        { id: "TemperatureResist_Cold1", name: "耐寒Lv1", description: "" },
        { id: "TemperatureResist_Cold2", name: "耐寒Lv2", description: "" },
        { id: "TemperatureResist_Cold3", name: "耐寒Lv3", description: "" }
    ],

    // 元素抗性2（更新）
    elementResist2: [
        { id: "ElementResist_Normal_1", name: "减轻无属性伤害Lv1", description: "" },
        { id: "ElementResist_Fire_1", name: "减轻火属性伤害Lv1", description: "" },
        { id: "ElementResist_Aqua_1", name: "减轻水属性伤害Lv1", description: "" },
        { id: "ElementResist_Thunder_1", name: "减轻雷属性伤害Lv1", description: "" },
        { id: "ElementResist_Leaf_1", name: "减轻草属性伤害Lv1", description: "" },
        { id: "ElementResist_Ice_1", name: "减轻冰属性伤害Lv1", description: "" },
        { id: "ElementResist_Earth_1", name: "减轻地属性伤害Lv1", description: "" },
        { id: "ElementResist_Dark_1", name: "减轻暗属性伤害Lv1", description: "" },
        { id: "ElementResist_Dragon_1", name: "减轻龙属性伤害Lv1", description: "" },
        { id: "ElementResist_Normal_2", name: "减轻无属性伤害Lv2", description: "" },
        { id: "ElementResist_Fire_2", name: "减轻火属性伤害Lv2", description: "" },
        { id: "ElementResist_Aqua_2", name: "减轻水属性伤害Lv2", description: "" },
        { id: "ElementResist_Thunder_2", name: "减轻雷属性伤害Lv2", description: "" },
        { id: "ElementResist_Leaf_2", name: "减轻草属性伤害Lv2", description: "" },
        { id: "ElementResist_Ice_2", name: "减轻冰属性伤害Lv2", description: "" },
        { id: "ElementResist_Earth_2", name: "减轻地属性伤害Lv2", description: "" },
        { id: "ElementResist_Dark_2", name: "减轻暗属性伤害Lv2", description: "" },
        { id: "ElementResist_Dragon_2", name: "减轻龙属性伤害Lv2", description: "" },
        { id: "ElementResist_Normal_3", name: "减轻无属性伤害Lv3", description: "" },
        { id: "ElementResist_Fire_3", name: "减轻火属性伤害Lv3", description: "" },
        { id: "ElementResist_Aqua_3", name: "减轻水属性伤害Lv3", description: "" },
        { id: "ElementResist_Thunder_3", name: "减轻雷属性伤害Lv3", description: "" },
        { id: "ElementResist_Leaf_3", name: "减轻草属性伤害Lv3", description: "" },
        { id: "ElementResist_Ice_3", name: "减轻冰属性伤害Lv3", description: "" },
        { id: "ElementResist_Earth_3", name: "减轻地属性伤害Lv3", description: "" },
        { id: "ElementResist_Dark_3", name: "减轻暗属性伤害Lv3", description: "" },
        { id: "ElementResist_Dragon_3", name: "减轻龙属性伤害Lv3", description: "" },
        { id: "ElementResist_Normal_1_PAL", name: "一反常态", description: "无属性伤害减少10%" },
        { id: "ElementResist_Fire_1_PAL", name: "拥抱烈日", description: "火属性伤害减少10%" },
        { id: "ElementResist_Aqua_1_PAL", name: "防水性能", description: "水属性伤害减少10%" },
        { id: "ElementResist_Thunder_1_PAL", name: "绝缘体", description: "雷属性伤害减少10%" },
        { id: "ElementResist_Leaf_1_PAL", name: "除草效果", description: "草属性伤害减少10%" },
        { id: "ElementResist_Ice_1_PAL", name: "高温体质", description: "冰属性伤害减少10%" },
        { id: "ElementResist_Earth_1_PAL", name: "抗震结构", description: "地属性伤害减少10%" },
        { id: "ElementResist_Dark_1_PAL", name: "阳光开朗", description: "暗属性伤害减少10%" },
        { id: "ElementResist_Dragon_1_PAL", name: "屠龙者", description: "龙属性伤害减少10%" }
    ],

    // 帕鲁球相关
    "sphereModule": [
        { id: "SphereModule_Heavy", name: "帕鲁球重量+1", description: "PASSIVE_SphereModule_Heavy" },
        { id: "SphereModule_Curve", name: "投掷曲线+1", description: "PASSIVE_SphereModule_Curve" },
        { id: "SphereModule_Sniper", name: "投掷距离+1", description: "PASSIVE_SphereModule_Sniper" },
        { id: "SphereModule_Curve2", name: "滑球模块", description: "PASSIVE_SphereModule_Curve2" },
        { id: "SphereModule_Sniper2", name: "投掷距离+2", description: "PASSIVE_SphereModule_Sniper2" },
        { id: "SphereModule_Homing", name: "追踪模块", description: "PASSIVE_SphereModule_Homing" }
    ],

    // 捕获相关
    "capture": [
        { id: "CaptureLevel_Up_1", name: "捕获力强化+1", description: "PASSIVE_CaptureLevel_Up_1" },
        { id: "CaptureLevel_Up_2", name: "捕获力强化+2", description: "PASSIVE_CaptureLevel_Up_2" },
        { id: "CaptureLevel_Up_3", name: "捕获力强化+3", description: "PASSIVE_CaptureLevel_Up_3" },
        { id: "CaptureLevel_Up_4", name: "捕获力强化+4", description: "PASSIVE_CaptureLevel_Up_4" },
        { id: "CaptureLevel_Up_5", name: "捕获力强化+5", description: "PASSIVE_CaptureLevel_Up_5" },
        { id: "CaptureLevel_Up_6", name: "捕获力强化+6", description: "PASSIVE_CaptureLevel_Up_6" }
    ],

    // 移动能力
    "mobility": [
        { id: "JumpPower_Increase", name: "跳跃力强化", description: "跳跃力强化" },
        { id: "JumpCount_Increase1", name: "连续跳跃次数+1", description: "连续跳跃次数+1" },
        { id: "JumpCount_Increase2", name: "连续跳跃次数+2", description: "连续跳跃次数+2" },
        { id: "JumpCount_Increase3", name: "连续跳跃次数+3", description: "连续跳跃次数+3" },
        { id: "AirDash_1", name: "空中冲刺+1", description: "空中冲刺+1" },
        { id: "AirDash_2", name: "空中冲刺+2", description: "空中冲刺+2" },
        { id: "AirDash_3", name: "空中冲刺+3", description: "空中冲刺+3" },
        { id: "AirDash_4", name: "空中冲刺+4", description: "空中冲刺+4" }
    ],

    // 其他
    "other": [
        { id: "PAL_SpiritualInst", name: "精神不稳定", description: "工作速度 -10%" }
    ]
};

// 所有被动技能列表
window.allPassives = [];
for (const category in passiveData) {
    passiveData[category].forEach(passive => {
        allPassives.push({
            ...passive,
            category: category
        });
    });
}