// 工作偏好处理函数

// 获取当前场景的工作偏好
function getCurrentSceneWorkPreferences() {
    const palData = window.currentPalData || {};
    // 检查是否在BaseCampBattle场景
    if (palData.BaseCampBattle) {
        console.log('当前在BaseCampBattle场景');
        return palData.BaseCampWorkPreferences || [];
    }
    // 默认使用普通工作偏好
    return palData.WorkPreferences || [];
}

// 保存当前场景的工作偏好
function saveCurrentSceneWorkPreferences(preferences) {
    const palData = window.currentPalData || {};
    // 检查是否在BaseCampBattle场景
    if (palData.BaseCampBattle) {
        console.log('保存BaseCampBattle场景工作偏好');
        palData.BaseCampWorkPreferences = preferences;
    } else {
        console.log('保存普通场景工作偏好');
        palData.WorkPreferences = preferences;
    }
    window.currentPalData = palData;
}

// 初始化工作偏好复选框
function initializeWorkPreferenceCheckboxes() {
    console.log('开始初始化工作偏好复选框...');
    const workPreferences = getCurrentSceneWorkPreferences();

    // 获取工作偏好列表容器
    const container = document.querySelector('.work-preferences-list');
    if (!container) {
        console.error('找不到工作偏好列表容器');
        return;
    }

    // 清空容器
    container.innerHTML = '';

    // 添加工作偏好选项
    const preferences = [
        { value: 'Farming', label: '农耕' },
        { value: 'Handiwork', label: '手工' },
        { value: 'Lumbering', label: '伐木' },
        { value: 'Mining', label: '采矿' },
        { value: 'MedicineProduction', label: '制药' },
        { value: 'Transporting', label: '运输' },
        { value: 'Gathering', label: '采集' },
        { value: 'Cooking', label: '烹饪' },
        { value: 'Generating', label: '发电' }
    ];

    preferences.forEach(pref => {
        const div = document.createElement('div');
        div.className = 'form-check';
        div.innerHTML = `
            <input class="form-check-input work-preference" type="checkbox" value="${pref.value}" id="${pref.value}">
            <label class="form-check-label" for="${pref.value}">${pref.label}</label>
        `;
        container.appendChild(div);
    });

    // 设置复选框初始状态
    const checkboxes = document.querySelectorAll('.work-preference');
    checkboxes.forEach(checkbox => {
        // 如果工作在偏好列表中，说明是要禁用的工作
        const isDisabled = workPreferences.includes(checkbox.value);
        checkbox.checked = isDisabled;
        
        // 更新标签样式
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            if (isDisabled) {
                label.classList.add('disabled-preference');
            } else {
                label.classList.remove('disabled-preference');
            }
        }
    });

    console.log('工作偏好复选框已初始化，当前选中的工作偏好:', workPreferences);
}

// 保存工作偏好
function saveWorkPreferences() {
    console.log('开始保存工作偏好...');
    try {
        const workPreferences = [];

        // 获取所有未选中的工作偏好（这些将被允许）
        const allCheckboxes = document.querySelectorAll('.work-preference');
        allCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                workPreferences.push(checkbox.value);
            }
        });

        console.log('要允许的工作偏好:', workPreferences);

        // 更新全局数据
        saveCurrentSceneWorkPreferences(workPreferences);

        console.log('工作偏好已更新:', workPreferences);

        // 更新已禁用的工作偏好显示（复选框状态等）
        updateDisabledWorkPreferences();

        // 显示成功提示
        showToast('工作偏好已保存', 'success');

        // 关闭模态框
        const modalElement = document.getElementById('disableWorkPreferencesModal');
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    } catch (error) {
        console.error('保存工作偏好时出错:', error);
        showToast('保存工作偏好失败', 'danger');
    }
}

// 更新工作偏好
function updateWorkPreferences() {
    const workPreferences = [];

    // 获取所有选中的工作偏好
    const checkedBoxes = document.querySelectorAll('.work-preference:checked');
    checkedBoxes.forEach(checkbox => {
        workPreferences.push(checkbox.value);
    });

    // 更新全局数据
    saveCurrentSceneWorkPreferences(workPreferences);

    console.log('工作偏好已更新:', workPreferences);

    // 更新已禁用的工作偏好显示
    updateDisabledWorkPreferences();
}

// 更新已禁用的工作偏好显示
function updateDisabledWorkPreferences() {
    console.log('开始更新已禁用的工作偏好显示...');
    const workPreferences = getCurrentSceneWorkPreferences();
    console.log('当前工作偏好:', workPreferences);

    // 获取所有工作偏好复选框
    const checkboxes = document.querySelectorAll('.work-preference');

    checkboxes.forEach(checkbox => {
        // 获取对应的标签元素 (与复选框相邻的label元素)
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            if (workPreferences.includes(checkbox.value)) {
                // 如果在工作偏好列表中，说明这个工作被禁用了
                console.log(`禁用工作偏好: ${checkbox.value}`);
                label.classList.add('disabled-preference');
                checkbox.checked = true; // 确保复选框保持选中状态
            } else {
                // 不在工作偏好列表中，说明这个工作是启用的
                console.log(`启用工作偏好: ${checkbox.value}`);
                label.classList.remove('disabled-preference');
                checkbox.checked = false; // 确保复选框保持未选中状态
            }
        } else {
            console.warn(`未找到工作偏好的标签: ${checkbox.value}`);
        }
    });

    // 更新主界面的工作偏好显示
    updateMainUIWorkPreferences(workPreferences);

    console.log('已禁用的工作偏好显示已更新');
}

// 更新主界面上的工作偏好显示
function updateMainUIWorkPreferences(workPreferences) {
    console.log('正在更新主界面工作偏好显示，传入的工作偏好:', workPreferences);
    
    // 查找主界面上显示工作偏好的元素
    const workPreferencesDisplay = document.getElementById('selectedDisabledPreferences');
    if (!workPreferencesDisplay) {
        console.warn('未找到主界面工作偏好显示元素');
        return;
    }

    // 工作偏好映射表
    const preferencesMap = {
        'BaseCampBattle': '基地战斗',
        'Deforest': '砍伐',
        'Mining': '采矿',
        'Collection': '采集',
        'GenerateElectricity': '发电',
        'CoolDown': '降温',
        'Transport': '运输',
        'MonsterFarm': '农场',
        'Handcraft': '手工制作',
        'Seeding': '种植',
        'Watering': '浇水',
        'MedicalCare': '医疗',
        'Shop': '商店',
        'Ranch': '放牧',
        'OilExtraction': '油田',
        'MedicineProduction': '制药',
        'Transporting': '运输',
        'Gathering': '采集',
        'Cooking': '烹饪',
        'Generating': '发电',
        'Farming': '农耕',
        'Handiwork': '手工',
        'Lumbering': '伐木'
    };

    // 直接使用传入的工作偏好列表（这些是被禁用的工作）
    if (workPreferences && workPreferences.length > 0) {
        const disabledText = workPreferences
            .map(pref => preferencesMap[pref] || pref)
            .filter(text => text) // 过滤掉可能的undefined或空值
            .join(', ');
        
        workPreferencesDisplay.textContent = `已禁用工作: ${disabledText}`;
        workPreferencesDisplay.style.display = 'block';
        console.log(`已禁用的工作: ${disabledText}`);
    } else {
        workPreferencesDisplay.textContent = '无禁用工作';
        workPreferencesDisplay.style.display = 'block';
        console.log('当前没有禁用的工作');
    }
}

// 初始化工作偏好
function initializeWorkPreferences() {
    initializeWorkPreferenceCheckboxes();
    
    // 获取当前工作偏好并更新主界面
    const workPreferences = getCurrentSceneWorkPreferences();
    console.log('初始化时的工作偏好:', workPreferences);
    
    // 直接更新主界面显示
    updateMainUIWorkPreferences(workPreferences);
    
    // 更新复选框状态等
    updateDisabledWorkPreferences();
    
    console.log('工作偏好初始化完成');
}

// 导出函数到全局作用域
window.initializeWorkPreferenceCheckboxes = initializeWorkPreferenceCheckboxes;
window.updateWorkPreferences = updateWorkPreferences;
window.updateDisabledWorkPreferences = updateDisabledWorkPreferences;
window.initializeWorkPreferences = initializeWorkPreferences;
window.saveWorkPreferences = saveWorkPreferences;

// 添加事件监听器
function setupEventListeners() {
    console.log('设置工作偏好事件监听器...');
    
    // 绑定保存按钮事件
    const saveButton = document.getElementById('saveWorkPreferences');
    if (saveButton) {
        console.log('找到保存按钮，添加点击事件监听器');
        saveButton.addEventListener('click', () => {
            console.log('保存按钮被点击');
            saveWorkPreferences();
        });
    } else {
        console.error('未找到保存按钮');
    }

    // 绑定模态框事件
    const modal = document.getElementById('disableWorkPreferencesModal');
    if (modal) {
        console.log('找到模态框，添加显示事件监听器');
        modal.addEventListener('show.bs.modal', () => {
            console.log('模态框显示事件触发');
            initializeWorkPreferenceCheckboxes();
        });
    } else {
        console.error('未找到模态框');
    }
}

// 在 DOM 加载完成后设置事件监听器和初始化工作偏好
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupEventListeners();
        // 等待一段时间后再初始化工作偏好，确保DOM元素已完全加载
        setTimeout(() => {
            console.log('DOM完全加载，初始化工作偏好');
            initializeWorkPreferences();
        }, 500);
    });
} else {
    setupEventListeners();
    // 等待一段时间后再初始化工作偏好，确保DOM元素已完全加载
    setTimeout(() => {
        console.log('DOM已就绪，初始化工作偏好');
        initializeWorkPreferences();
    }, 500);
}