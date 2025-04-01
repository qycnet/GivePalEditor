// @ts-nocheck

// 初始化下拉框选项
function initializeFilterOptions() {
    const filters = ['skillCategoryFilter', 'learntSkillCategoryFilter', 'passiveCategoryFilter'];
    
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (!filter) return;
        
        // 清空现有选项
        filter.innerHTML = '<option value="all">全部技能</option>';
        
        // 添加新选项
        if (filterId === 'passiveCategoryFilter') {
            // 被动技能分类
            window.categoryConfig.getPassiveCategories().forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;  // 使用预定义的中文名称
                filter.appendChild(option);
            });
        } else {
            // 主动技能分类
            window.categoryConfig.getActiveCategories().forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = getActiveCategoryName(category.id);
                filter.appendChild(option);
            });
        }
    });
}

// 初始化技能列表
function initializeSkillLists() {
    const activeSkillsList = document.getElementById('activeSkillsList');
    const learntSkillsList = document.getElementById('learntSkillsList');
    const passiveSkillsList = document.getElementById('passiveSkillsList');
    
    // 初始化筛选器选项
    initializeFilterOptions();

    // 设置筛选事件监听器
    document.getElementById('skillCategoryFilter').addEventListener('change', filterActiveSkills);
    document.getElementById('skillSearch').addEventListener('input', filterActiveSkills);
    document.getElementById('learntSkillCategoryFilter').addEventListener('change', filterLearntSkills);
    document.getElementById('learntSkillSearch').addEventListener('input', filterLearntSkills);
    document.getElementById('passiveCategoryFilter').addEventListener('change', filterPassiveSkills);
    document.getElementById('passiveSearch').addEventListener('input', filterPassiveSkills);
    
    if (!activeSkillsList || !learntSkillsList || !passiveSkillsList) {
        console.error('找不到技能列表容器元素');
        return;
    }
    
    // 检查必要的数据是否已加载
    if (!window.skillData || !window.passiveData) {
        console.error('技能数据尚未加载，请确保相关脚本已正确引入');
        showToast('技能数据未加载，请刷新页面或检查网络连接', 'danger');
        return;
    }

    // 清空现有内容
    activeSkillsList.innerHTML = '';
    learntSkillsList.innerHTML = '';
    passiveSkillsList.innerHTML = '';

    try {
        // 添加主动技能到列表
        for (const category in skillData) {
            // 主动技能类别
            const activeCategoryDiv = document.createElement('div');
            activeCategoryDiv.className = 'skill-category';
            activeCategoryDiv.textContent = getSkillCategoryName(category) || category;  // 使用中文分类名
            activeSkillsList.appendChild(activeCategoryDiv);
            
            // 已学技能类别
            const learntCategoryDiv = document.createElement('div');
            learntCategoryDiv.className = 'skill-category';
            learntCategoryDiv.textContent = getSkillCategoryName(category) || category;  // 使用中文分类名
            learntSkillsList.appendChild(learntCategoryDiv);

            // 添加技能项
            skillData[category].forEach(skill => {
                const activeSkillItem = createSkillItem(skill, category, 'active');
                const learntSkillItem = createSkillItem(skill, category, 'learnt');
                
                activeSkillsList.appendChild(activeSkillItem);
                learntSkillsList.appendChild(learntSkillItem);
            });
        }

        // 添加被动技能列表
        for (const category in passiveData) {
            const passiveCategoryDiv = document.createElement('div');
            passiveCategoryDiv.className = 'skill-category';
            passiveCategoryDiv.textContent = getPassiveCategoryName(category);  // 使用被动技能专用的分类名称函数
            passiveSkillsList.appendChild(passiveCategoryDiv);

            passiveData[category].forEach(skill => {
                const passiveSkillItem = createSkillItem(skill, category, 'passive');
                passiveSkillsList.appendChild(passiveSkillItem);
            });
        }

        // 更新选中状态
        updateSelectedActiveSkills();
        updateSelectedLearntSkills();
        updateSelectedPassiveSkills();
    } catch (error) {
        console.error('初始化技能列表时出错:', error);
    }
}

// 初始化基本信息
function initializeBasicInfo() {
    try {
        // 绑定输入事件，使用安全的事件绑定方法
        const elements = {
            'palId': updateBasicInfo,
            'nickname': updateBasicInfo,
            'gender': updateBasicInfo,
            'level': updateBasicInfo,
            'exp': updateBasicInfo,
            'shiny': updateBasicInfo,
            'partnerSkillLevel': updateBasicInfo,
            'condensedPals': updateBasicInfo,
            'unusedStatusPoints': updateBasicInfo
        };

        for (const [id, handler] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', handler);
            } else {
                console.warn(`Element with id '${id}' not found`);
            }
        }
    } catch (error) {
        console.error('初始化基本信息时出错:', error);
        showToast('初始化基本信息失败: ' + error.message, 'danger');
    }
}

// 初始化核心属性
function initializeCoreAttributes() {
    // 绑定输入事件
    document.getElementById('hp').addEventListener('change', updateCoreAttributes);
    document.getElementById('sp').addEventListener('change', updateCoreAttributes);
    document.getElementById('hunger').addEventListener('change', updateCoreAttributes);
    document.getElementById('maxHunger').addEventListener('change', updateCoreAttributes);
    document.getElementById('san').addEventListener('change', updateCoreAttributes);
    document.getElementById('support').addEventListener('change', updateCoreAttributes);
    document.getElementById('craftSpeed').addEventListener('change', updateCoreAttributes);
}

// 初始化工作偏好
function initializeWorkPreferences() {
    try {
        console.log('开始初始化工作偏好...');
        
        // 获取工作偏好标签页元素
        const workPreferencesTab = document.querySelector('[href="#work-preferences"]');
        if (!workPreferencesTab) {
            console.error('找不到工作偏好标签页元素');
            return;
        }

        // 获取工作偏好内容区域元素
        const workPreferencesPane = document.getElementById('work-preferences');
        if (!workPreferencesPane) {
            console.error('找不到工作偏好内容区域元素');
            return;
        }

        // 初始化工作偏好复选框
        initializeWorkPreferenceCheckboxes();
        
        // 更新已禁用的工作偏好显示
        updateDisabledWorkPreferences();
        
        console.log('工作偏好初始化完成');
    } catch (error) {
        console.error('初始化工作偏好时出错:', error);
        showToast('初始化工作偏好失败: ' + error.message, 'danger');
    }
}

// 初始化所有功能
function initializeAll() {
    try {
        console.log('页面和资源加载完成，开始初始化...');
        
        // 检查必要的DOM元素
        const requiredElements = [
            'generateJsonBtn',
            'loadJsonBtn',
            'refreshSkillsBtn'
            // 已移除的元素：'generateJsonModal', 'copyJsonBtn', 'jsonPreview'
        ];
        
        const missingElements = requiredElements.filter(id => !document.getElementById(id));
        if (missingElements.length > 0) {
            throw new Error('缺少必要的DOM元素: ' + missingElements.join(', '));
        }

        // 初始化基本信息
        initializeBasicInfo();
        
        // 初始化核心属性
        initializeCoreAttributes();
        
        // 初始化帕鲁灵魂
        initializePalSouls();
        
        // 初始化个体值（现在在individualValues.js中定义）
        if (typeof window.initializeIVs === 'function') {
            window.initializeIVs();
        } else {
            console.error('initializeIVs 函数未定义，请确保 individualValues.js 已正确加载');
        }
        
        // 初始化技能列表
        initializeSkillLists();
        
        // 初始化工作偏好
        initializeWorkPreferences();

        // 初始化已学技能管理器
        if (typeof window.learntSkillsManager === 'object' && 
            typeof window.learntSkillsManager.initialize === 'function') {
            window.learntSkillsManager.initialize();
            console.log('已学技能管理器初始化完成');
        } else {
            console.warn('learntSkillsManager 未定义或缺少 initialize 方法');
        }

        // 绑定事件处理
        bindImportExportEvents();
        bindSkillEvents();
        bindClearSkillsEvents();
        
        // 初始化完成
        console.log('页面初始化完成');
        showToast('页面加载完成', 'success');
    } catch (error) {
        console.error('页面初始化失败:', error);
        showToast('页面初始化失败: ' + error.message, 'danger');
    }
}

// 将所有函数添加到window对象上，使其可以全局访问
window.initializeFilterOptions = initializeFilterOptions;
window.initializeSkillLists = initializeSkillLists;
window.initializeBasicInfo = initializeBasicInfo;
window.initializeCoreAttributes = initializeCoreAttributes;
window.initializeWorkPreferences = initializeWorkPreferences;
window.initializeAll = initializeAll;
window.updateBasicInfo = updateBasicInfo;
window.updateCoreAttributes = updateCoreAttributes;
window.initializeWorkPreferenceCheckboxes = initializeWorkPreferenceCheckboxes;
window.updateDisabledWorkPreferences = updateDisabledWorkPreferences;
window.initializePalSouls = initializePalSouls;
// initializeIVs 已移至 individualValues.js
window.bindImportExportEvents = bindImportExportEvents;
window.bindSkillEvents = bindSkillEvents;
window.bindClearSkillsEvents = bindClearSkillsEvents;