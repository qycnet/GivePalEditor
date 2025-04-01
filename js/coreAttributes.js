// 核心属性处理函数

// 更新核心属性
function updateCoreAttributes() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const hpInput = document.getElementById('hp');
    const spInput = document.getElementById('sp');
    const hungerInput = document.getElementById('hunger');
    const maxHungerInput = document.getElementById('maxHunger');
    const sanInput = document.getElementById('san');
    const supportInput = document.getElementById('support');
    const craftSpeedInput = document.getElementById('craftSpeed');

    // 更新数据
    if (hpInput) palData.HP = parseInt(hpInput.value) || 0;
    if (spInput) palData.SP = parseInt(spInput.value) || 0;
    if (hungerInput) palData.Hunger = parseInt(hungerInput.value) || 0;
    if (maxHungerInput) palData.MaxHunger = parseInt(maxHungerInput.value) || 100;
    if (sanInput) palData.SAN = parseInt(sanInput.value) || 0;
    if (supportInput) palData.Support = parseInt(supportInput.value) || 0;
    if (craftSpeedInput) palData.CraftSpeed = parseFloat(craftSpeedInput.value) || 1.0;

    // 更新全局数据
    window.currentPalData = palData;
    
    console.log('核心属性已更新:', palData);
}

// 初始化核心属性表单
function initializeCoreAttributes() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const hpInput = document.getElementById('hp');
    const spInput = document.getElementById('sp');
    const hungerInput = document.getElementById('hunger');
    const maxHungerInput = document.getElementById('maxHunger');
    const sanInput = document.getElementById('san');
    const supportInput = document.getElementById('support');
    const craftSpeedInput = document.getElementById('craftSpeed');

    // 设置初始值
    if (hpInput) hpInput.value = palData.HP || 100;
    if (spInput) spInput.value = palData.SP || 0;
    if (hungerInput) hungerInput.value = palData.Hunger || 0;
    if (maxHungerInput) maxHungerInput.value = palData.MaxHunger || 100;
    if (sanInput) sanInput.value = palData.SAN || 0;
    if (supportInput) supportInput.value = palData.Support || 0;
    if (craftSpeedInput) craftSpeedInput.value = palData.CraftSpeed || 100;

    // 添加事件监听器
    if (hpInput) hpInput.addEventListener('change', updateCoreAttributes);
    if (spInput) spInput.addEventListener('change', updateCoreAttributes);
    if (hungerInput) hungerInput.addEventListener('change', updateCoreAttributes);
    if (maxHungerInput) maxHungerInput.addEventListener('change', updateCoreAttributes);
    if (sanInput) sanInput.addEventListener('change', updateCoreAttributes);
    if (supportInput) supportInput.addEventListener('change', updateCoreAttributes);
    if (craftSpeedInput) craftSpeedInput.addEventListener('change', updateCoreAttributes);
    
    console.log('核心属性表单已初始化');
}

// 导出函数到全局作用域
window.updateCoreAttributes = updateCoreAttributes;
window.initializeCoreAttributes = initializeCoreAttributes;