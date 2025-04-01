// 基本信息处理函数

// 更新基本信息
function updateBasicInfo() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const palIdInput = document.getElementById('palId');
    const nicknameInput = document.getElementById('nickname');
    const genderSelect = document.getElementById('gender');
    const levelInput = document.getElementById('level');
    const expInput = document.getElementById('exp');
    const shinyCheckbox = document.getElementById('shiny');

    // 更新数据
    if (palIdInput) palData.PalID = palIdInput.value;
    if (nicknameInput) palData.Nickname = nicknameInput.value;
    if (genderSelect) palData.Gender = genderSelect.value;
    if (levelInput) palData.Level = parseInt(levelInput.value) || 1;
    if (expInput) palData.Exp = parseInt(expInput.value) || 0;
    if (shinyCheckbox) palData.Shiny = shinyCheckbox.checked;

    // 更新全局数据
    window.currentPalData = palData;
    
    console.log('基本信息已更新:', palData);
}

// 初始化基本信息表单
function initializeBasicInfo() {
    const palData = window.currentPalData || {};
    
    // 获取表单元素
    const palIdInput = document.getElementById('palId');
    const nicknameInput = document.getElementById('nickname');
    const genderSelect = document.getElementById('gender');
    const levelInput = document.getElementById('level');
    const expInput = document.getElementById('exp');
    const shinyCheckbox = document.getElementById('shiny');

    // 设置初始值
    if (palIdInput) palIdInput.value = palData.PalID || '';
    if (nicknameInput) nicknameInput.value = palData.Nickname || '';
    if (genderSelect) genderSelect.value = palData.Gender || 'None';
    if (levelInput) levelInput.value = palData.Level || 1;
    if (expInput) expInput.value = palData.Exp || 0;
    if (shinyCheckbox) shinyCheckbox.checked = palData.Shiny || false;

    // 添加事件监听器
    if (palIdInput) palIdInput.addEventListener('change', updateBasicInfo);
    if (nicknameInput) nicknameInput.addEventListener('change', updateBasicInfo);
    if (genderSelect) genderSelect.addEventListener('change', updateBasicInfo);
    if (levelInput) levelInput.addEventListener('change', updateBasicInfo);
    if (expInput) expInput.addEventListener('change', updateBasicInfo);
    if (shinyCheckbox) shinyCheckbox.addEventListener('change', updateBasicInfo);
    
    console.log('基本信息表单已初始化');
}

// 导出函数到全局作用域
window.updateBasicInfo = updateBasicInfo;
window.initializeBasicInfo = initializeBasicInfo;