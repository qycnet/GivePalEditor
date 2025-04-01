// @ts-nocheck

// 技能分类配置
window.categoryConfig = {
    // 获取主动技能分类
    getActiveCategories: function() {
        return [
            { id: 'dragon', name: '龙系技能' },
            { id: 'fire', name: '火系技能' },
            { id: 'water', name: '水系技能' },
            { id: 'grass', name: '草系技能' },
            { id: 'electric', name: '电系技能' },
            { id: 'ice', name: '冰系技能' },
            { id: 'ground', name: '地/岩石系技能' },
            { id: 'dark', name: '暗/幽灵系技能' },
            { id: 'wind', name: '风/空气系技能' },
            { id: 'special', name: '特殊技能' },
            { id: 'unique', name: '独特技能' }
        ];
    },
    
    // 获取被动技能分类
    getPassiveCategories: function() {
        return [
            { id: 'movement', name: '移动速度相关' },
            { id: 'legendary', name: '传说属性' },
            { id: 'elementBoost', name: '元素增强' },
            { id: 'elementResist', name: '元素抗性' },
            { id: 'combat', name: '战斗相关' },
            { id: 'work', name: '工作相关' },
            { id: 'survival', name: '生存相关' },
            { id: 'special', name: '特殊能力' },
            { id: 'mount', name: '骑乘相关' },
            { id: 'negative', name: '负面效果' },
            { id: 'composite', name: '复合效果' },
            { id: 'playerBuff', name: '玩家增益' },
            { id: 'weight', name: '重量相关' },
            { id: 'temperatureResist', name: '温度抗性' },
			{ id: 'elementResist2', name: '元素抗性2' },
            { id: 'sphereModule', name: '帕鲁球相关' },
            { id: 'capture', name: '捕获相关' },
            { id: 'mobility', name: '移动能力' },
            { id: 'other', name: '其他' }
        ];
    }
};

// 获取被动技能类别名称
function getPassiveCategoryName(category) {
    const categoryMap = {
        'movement': '移动速度相关',
        'legendary': '传说属性',
        'elementBoost': '元素增强',
        'elementResist': '元素抗性',
        'combat': '战斗相关',
        'work': '工作相关',
        'survival': '生存相关',
        'special': '特殊能力',
        'mount': '骑乘相关',
        'negative': '负面效果',
        'composite': '复合效果',
        'playerBuff': '玩家增益',
        'weight': '重量相关',
        'temperatureResist': '温度抗性',
		'elementResist2': '元素抗性2',
        'sphereModule': '帕鲁球相关',
        'capture': '捕获相关',
        'mobility': '移动能力',
        'other': '其他'
    };
    return categoryMap[category] || category;
}

// 获取主动技能类别名称
function getActiveCategoryName(category) {
    const categoryMap = {
        'dragon': '龙系技能',
        'fire': '火系技能',
        'water': '水系技能',
        'grass': '草系技能',
        'electric': '电系技能',
        'ice': '冰系技能',
        'ground': '地/岩石系技能',
        'dark': '暗/幽灵系技能',
        'wind': '风/空气系技能',
        'special': '特殊技能',
        'unique': '独特技能',
        'all': '全部技能'
    };
    return categoryMap[category] || category;
}
