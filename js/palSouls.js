// 帕鲁灵魂处理函数

// 更新帕鲁灵魂数据
function updatePalSouls() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const soulHealthInput = document.getElementById('soulHealth');
    const soulAttackInput = document.getElementById('soulAttack');
    const soulDefenseInput = document.getElementById('soulDefense');
    const soulCraftSpeedInput = document.getElementById('soulCraftSpeed');

    // 更新数据
    if (soulHealthInput) palData.SoulHealth = parseInt(soulHealthInput.value) || 0;
    if (soulAttackInput) palData.SoulAttack = parseInt(soulAttackInput.value) || 0;
    if (soulDefenseInput) palData.SoulDefense = parseInt(soulDefenseInput.value) || 0;
    if (soulCraftSpeedInput) palData.SoulCraftSpeed = parseInt(soulCraftSpeedInput.value) || 0;

    // 更新全局数据
    window.currentPalData = palData;
    
    console.log('帕鲁灵魂数据已更新:', palData);
}

// 初始化帕鲁灵魂表单
function initializePalSouls() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const soulHealthInput = document.getElementById('soulHealth');
    const soulAttackInput = document.getElementById('soulAttack');
    const soulDefenseInput = document.getElementById('soulDefense');
    const soulCraftSpeedInput = document.getElementById('soulCraftSpeed');

    // 设置初始值
    if (soulHealthInput) soulHealthInput.value = palData.SoulHealth || 0;
    if (soulAttackInput) soulAttackInput.value = palData.SoulAttack || 0;
    if (soulDefenseInput) soulDefenseInput.value = palData.SoulDefense || 0;
    if (soulCraftSpeedInput) soulCraftSpeedInput.value = palData.SoulCraftSpeed || 0;

    // 添加事件监听器
    if (soulHealthInput) soulHealthInput.addEventListener('change', updatePalSouls);
    if (soulAttackInput) soulAttackInput.addEventListener('change', updatePalSouls);
    if (soulDefenseInput) soulDefenseInput.addEventListener('change', updatePalSouls);
    if (soulCraftSpeedInput) soulCraftSpeedInput.addEventListener('change', updatePalSouls);

    // 添加数值限制（0-255）
    const inputs = [soulHealthInput, soulAttackInput, soulDefenseInput, soulCraftSpeedInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                let value = parseInt(input.value) || 0;
                if (value < 0) input.value = 0;
                if (value > 255) input.value = 255;
            });
        }
    });
    
    console.log('帕鲁灵魂表单已初始化');
}

// 导出函数到全局作用域
window.initializePalSouls = initializePalSouls;
window.updatePalSouls = updatePalSouls;