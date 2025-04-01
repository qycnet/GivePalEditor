// 帕鲁个体值（IVs）处理函数

// 更新个体值数据
function updateIndividualValues() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const ivHealthInput = document.getElementById('ivHealth');
    const ivAttackMeleeInput = document.getElementById('ivAttackMelee');
    const ivAttackShotInput = document.getElementById('ivAttackShot');
    const ivDefenseInput = document.getElementById('ivDefense');

    // 更新数据，确保数值在0-255之间
    if (ivHealthInput) {
        const value = parseInt(ivHealthInput.value) || 0;
        palData.IVHealth = Math.max(0, Math.min(255, value));
        ivHealthInput.value = palData.IVHealth;
    }
    if (ivAttackMeleeInput) {
        const value = parseInt(ivAttackMeleeInput.value) || 0;
        palData.IVAttackMelee = Math.max(0, Math.min(255, value));
        ivAttackMeleeInput.value = palData.IVAttackMelee;
    }
    if (ivAttackShotInput) {
        const value = parseInt(ivAttackShotInput.value) || 0;
        palData.IVAttackShot = Math.max(0, Math.min(255, value));
        ivAttackShotInput.value = palData.IVAttackShot;
    }
    if (ivDefenseInput) {
        const value = parseInt(ivDefenseInput.value) || 0;
        palData.IVDefense = Math.max(0, Math.min(255, value));
        ivDefenseInput.value = palData.IVDefense;
    }

    // 更新全局数据
    window.currentPalData = palData;
    
    console.log('帕鲁个体值数据已更新:', palData);
}

// 初始化个体值表单
function initializeIVs() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const ivHealthInput = document.getElementById('ivHealth');
    const ivAttackMeleeInput = document.getElementById('ivAttackMelee');
    const ivAttackShotInput = document.getElementById('ivAttackShot');
    const ivDefenseInput = document.getElementById('ivDefense');

    // 设置初始值，使用随机值作为默认值（1-100之间）
if (ivHealthInput) ivHealthInput.value = palData.IVHealth !== undefined ? palData.IVHealth : Math.floor(Math.random() * 100) + 1;
if (ivAttackMeleeInput) ivAttackMeleeInput.value = palData.IVAttackMelee !== undefined ? palData.IVAttackMelee : Math.floor(Math.random() * 100) + 1;
if (ivAttackShotInput) ivAttackShotInput.value = palData.IVAttackShot !== undefined ? palData.IVAttackShot : Math.floor(Math.random() * 100) + 1;
if (ivDefenseInput) ivDefenseInput.value = palData.IVDefense !== undefined ? palData.IVDefense : Math.floor(Math.random() * 100) + 1;

    // 添加事件监听器
    if (ivHealthInput) ivHealthInput.addEventListener('change', updateIndividualValues);
    if (ivAttackMeleeInput) ivAttackMeleeInput.addEventListener('change', updateIndividualValues);
    if (ivAttackShotInput) ivAttackShotInput.addEventListener('change', updateIndividualValues);
    if (ivDefenseInput) ivDefenseInput.addEventListener('change', updateIndividualValues);

    // 添加数值限制（0-255）
    const inputs = [ivHealthInput, ivAttackMeleeInput, ivAttackShotInput, ivDefenseInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                let value = parseInt(input.value) || 0;
                if (value < 0) input.value = 0;
                if (value > 255) input.value = 255;
            });
        }
    });
    
    console.log('帕鲁个体值表单已初始化');
}

// 导出函数到全局作用域
window.initializeIVs = initializeIVs;
window.updateIndividualValues = updateIndividualValues;