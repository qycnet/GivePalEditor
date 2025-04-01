// @ts-nocheck

// 显示提示消息（全局可用）
window.showToast = function(message, type = 'success') {
    // 确保存在toast容器
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // 创建新的toast元素
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // 根据类型设置图标
    let iconContent = '';
    switch (type) {
        case 'success':
            iconContent = '✓';
            break;
        case 'danger':
            iconContent = '✗';
            break;
        case 'warning':
            iconContent = '⚠';
            break;
        case 'info':
            iconContent = 'ℹ';
            break;
        default:
            iconContent = '•';
    }
    
    // 构建toast内容
    toast.innerHTML = `
        <div class="toast-icon">${iconContent}</div>
        <div class="toast-content">${message}</div>
        <div class="toast-close"></div>
    `;
    
    // 添加到容器
    toastContainer.appendChild(toast);
    
    // 添加关闭按钮事件
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    // 触发重排以应用过渡效果
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 5秒后自动移除提示
    setTimeout(() => {
        removeToast(toast);
    }, 5000);
    
    return toast;
}

// 移除提示函数
function removeToast(toast) {
    if (!toast || !toast.classList.contains('show')) return;
    
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
            
            // 如果容器中没有更多toast，移除容器
            const container = document.querySelector('.toast-container');
            if (container && !container.hasChildNodes()) {
                document.body.removeChild(container);
            }
        }
    }, 300);
}

// 获取技能分类的中文名称（使用统一的分类管理）
function getPassiveCategoryName(category) {
    return window.categoryConfig.getCategoryName(category);
}

// 全局变量
window.currentPalData = {
    PalID: "JetDragon",
    Nickname: "PalGuardian",
    Gender: "Male",
    Level: 1,
    Exp: 1,
    Shiny: true,
    PartnerSkillLevel: 231,
    CondensedPals: 255,
    UnusedStatusPoints: 0,
    HP: 1000,
    SP: 100.0,
    Hunger: 557.42,
    MaxHunger: 600.0,
    SAN: 100.0,
    Support: 0,
    CraftSpeed: 1680,
    PalSouls: {
        Health: 255,
        Attack: 255,
        Defense: 255,
        CraftSpeed: 255
    },
    IVs: {
        Health: 100,
        AttackMelee: 100,
        AttackShot: 100,
        Defense: 100
    },
    ActiveSkills: [],
    LearntSkills: [],
    Passives: [],
    ExtraWorkSuitabilities: {},
    DisableWorkPreferences: ["BaseCampBattle"] // 设置默认值与示例文件一致
};

// 这些函数已移至initializer.js

// 绑定导入导出事件
function bindImportExportEvents() {
    try {
        console.log('开始绑定导入导出事件...');
        
        // 使用统一的文件输入元素
        const fileInput = createFileInput();

        // 导入按钮事件
        const loadJsonBtn = document.getElementById('loadJsonBtn');
        if (loadJsonBtn) {
            loadJsonBtn.addEventListener('click', () => {
                console.log('点击导入按钮');
                fileInput.click();
            });
        } else {
            console.error('找不到导入按钮元素');
        }

        // 导出按钮事件已移至 fileHandler.js 中统一处理
        const generateJsonBtn = document.getElementById('generateJsonBtn');
        if (!generateJsonBtn) {
            console.error('找不到导出按钮元素');
        }

        // 移除了复制JSON按钮事件，因为我们不再需要模态框

        // 使用 fileHandler.js 中的导入处理逻辑
        setupFileImport(fileInput, 
            // 成功回调
            (data) => {
                try {
                    // 保存当前数据的备份
                    const oldData = { ...currentPalData };
                    
                    // 更新数据
                    Object.assign(currentPalData, data);
                    
                    // 更新所有界面元素
                    updateAllFields();
                    
                    // 更新技能列表
                    updateSelectedActiveSkills();
                    updateSelectedLearntSkills();
                    updateSelectedPassiveSkills();
                    
                    // 显示成功提示
                    showToast('数据导入成功', 'success');
                } catch (error) {
                    console.error('更新界面失败:', error);
                    // 发生错误时恢复旧数据
                    Object.assign(currentPalData, oldData);
                    try {
                        updateAllFields();
                    } catch (restoreError) {
                        console.error('恢复界面失败:', restoreError);
                    }
                    showToast('导入后更新界面失败: ' + error.message, 'danger');
                }
            },
            // 错误回调
            (error) => {
                showToast('导入失败: ' + error, 'danger');
            }
        );
        
        console.log('导入导出事件绑定完成');
    } catch (error) {
        console.error('绑定导入导出事件时出错:', error);
        showToast('初始化导入导出功能失败: ' + error.message, 'danger');
    }
}

// 注意：页面初始化已经在index.html中通过DOMContentLoaded事件处理，此处不需要重复初始化

// 绑定刷新技能列表按钮事件
function bindRefreshSkillsEvent() {
    const refreshBtn = document.getElementById('refreshSkillsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            try {
                console.log('刷新技能列表');
                initializeSkillLists();
                updateSelectedActiveSkills();
                updateSelectedLearntSkills();
                updateSelectedPassiveSkills();
                showToast('技能列表已刷新！', 'success');
            } catch (error) {
                console.error('刷新技能列表时出错:', error);
                showToast('刷新技能列表失败: ' + error.message, 'danger');
            }
        });
    } else {
        console.warn('找不到刷新技能列表按钮');
    }
}

// 加载默认数据并更新技能列表
function loadDefaultDataAndUpdateSkills() {
    // 加载默认数据
    if (typeof loadDefaultData === 'function') {
        loadDefaultData();
    } else {
        console.warn('loadDefaultData函数未定义');
    }

    // 确保所有技能列表都正确显示
    updateSelectedActiveSkills();
    updateSelectedLearntSkills();
    updateSelectedPassiveSkills();
    
    console.log('技能列表更新完成');
}

// 更新基本信息
function updateBasicInfo() {
    currentPalData.PalID = document.getElementById('palId').value;
    currentPalData.Nickname = document.getElementById('nickname').value;
    currentPalData.Gender = document.getElementById('gender').value;
    currentPalData.Level = parseInt(document.getElementById('level').value);
    currentPalData.Exp = parseInt(document.getElementById('exp').value);
    currentPalData.Shiny = document.getElementById('shiny').checked;
    currentPalData.PartnerSkillLevel = parseInt(document.getElementById('partnerSkillLevel').value);
    currentPalData.CondensedPals = parseInt(document.getElementById('condensedPals').value);
    currentPalData.UnusedStatusPoints = parseInt(document.getElementById('unusedStatusPoints').value);
}

// 初始化核心属性已移至initializer.js

// 清空技能按钮事件绑定
function bindClearSkillsEvents() {
    try {
        console.log('开始绑定清空技能按钮事件...');
        
        // 绑定清空已学技能按钮
        const clearLearntSkillsBtn = document.getElementById('clearLearntSkills');
        if (clearLearntSkillsBtn) {
            clearLearntSkillsBtn.addEventListener('click', () => {
                if (currentPalData.LearntSkills.length === 0) {
                    showToast('已学技能列表已经是空的', 'info');
                    return;
                }
                currentPalData.LearntSkills = [];
                updateSelectedLearntSkills();
                showToast('已清空所有已学技能', 'success');
            });
        } else {
            console.warn('未找到清空已学技能按钮');
        }
        
        // 绑定清空被动技能按钮
        const clearPassiveSkillsBtn = document.getElementById('clearPassiveSkills');
        if (clearPassiveSkillsBtn) {
            clearPassiveSkillsBtn.addEventListener('click', () => {
                if (currentPalData.Passives.length === 0) {
                    showToast('被动技能列表已经是空的', 'info');
                    return;
                }
                currentPalData.Passives = [];
                updateSelectedPassiveSkills();
                showToast('已清空所有被动技能', 'success');
            });
        } else {
            console.warn('未找到清空被动技能按钮');
        }
        
        console.log('清空技能按钮事件绑定完成');
    } catch (error) {
        console.error('绑定清空技能按钮事件时出错:', error);
        showToast('绑定清空技能按钮失败: ' + error.message, 'danger');
    }
}

// 更新工作偏好
function updateWorkPreferences() {
    // 确保DisableWorkPreferences是一个数组
    if (!Array.isArray(currentPalData.DisableWorkPreferences)) {
        currentPalData.DisableWorkPreferences = [];
    }
    
    // 获取所有工作类型复选框的状态
    const workTypes = [
        'BaseCampBattle',
        'Collection',
        'Deforest',
        'EmergencyFood',
        'Farming',
        'Generate_Electricity',
        'Handcraft',
        'Cool',
        'Mining',
        'Transport',
        'MonsterFarm',
        'Seeding'
    ];
    
    // 清空当前禁用工作列表
    currentPalData.DisableWorkPreferences = [];
    
    // 检查每个复选框，如果被选中则添加到禁用列表
    workTypes.forEach(workType => {
        const checkbox = document.getElementById(`work_${workType}`);
        if (checkbox && checkbox.checked) {
            currentPalData.DisableWorkPreferences.push(workType);
        }
    });
    
    console.log('更新后的禁用工作偏好:', currentPalData.DisableWorkPreferences);
}

// 更新核心属性
function updateCoreAttributes() {
    currentPalData.HP = parseInt(document.getElementById('hp').value);
    currentPalData.SP = parseFloat(document.getElementById('sp').value);
    currentPalData.Hunger = parseFloat(document.getElementById('hunger').value);
    currentPalData.MaxHunger = parseFloat(document.getElementById('maxHunger').value);
    currentPalData.SAN = parseFloat(document.getElementById('san').value);
    currentPalData.Support = parseInt(document.getElementById('support').value);
    currentPalData.CraftSpeed = parseInt(document.getElementById('craftSpeed').value);
}

// 初始化帕鲁灵魂
function initializePalSouls() {
    // 绑定输入事件
    document.getElementById('soulHealth').addEventListener('change', updatePalSouls);
    document.getElementById('soulAttack').addEventListener('change', updatePalSouls);
    document.getElementById('soulDefense').addEventListener('change', updatePalSouls);
    document.getElementById('soulCraftSpeed').addEventListener('change', updatePalSouls);
}

// 更新帕鲁灵魂
function updatePalSouls() {
    currentPalData.PalSouls = {
        Health: parseInt(document.getElementById('soulHealth').value),
        Attack: parseInt(document.getElementById('soulAttack').value),
        Defense: parseInt(document.getElementById('soulDefense').value),
        CraftSpeed: parseInt(document.getElementById('soulCraftSpeed').value)
    };
}

// 初始化和更新个体值的函数已移至 individualValues.js

// 绑定技能相关事件
function bindSkillEvents() {
    try {
        console.log('开始绑定技能相关事件...');
        
        // 绑定技能选择事件
        const skillLists = ['activeSkillsList', 'learntSkillsList', 'passiveSkillsList'];
        skillLists.forEach(listId => {
            const list = document.getElementById(listId);
            if (list) {
                list.addEventListener('click', function(event) {
                    const skillItem = event.target.closest('.skill-item');
                    if (skillItem) {
                        const isSelected = skillItem.classList.toggle('selected');
                        const skillId = skillItem.getAttribute('data-skill-id');
                        const skillType = skillItem.getAttribute('data-skill-type');
                        
                        // 根据技能类型更新相应的技能列表
                        switch(listId) {
                            case 'activeSkillsList':
                                if (isSelected && !currentPalData.ActiveSkills.includes(skillId)) {
                                    if (currentPalData.ActiveSkills.length < 14) {
                                        currentPalData.ActiveSkills.push(skillId);
                                        updateSelectedActiveSkills();
                                    } else {
                                        showToast('主动技能已达到上限（14个）', 'warning');
                                        skillItem.classList.remove('selected');
                                    }
                                } else if (!isSelected) {
                                    const index = currentPalData.ActiveSkills.indexOf(skillId);
                                    if (index > -1) {
                                        currentPalData.ActiveSkills.splice(index, 1);
                                        updateSelectedActiveSkills();
                                    }
                                }
                                break;
                            case 'learntSkillsList':
                                const learntIndex = currentPalData.LearntSkills.indexOf(skillId);
                                if (learntIndex === -1 && isSelected) {
                                    currentPalData.LearntSkills.push(skillId);
                                } else if (learntIndex > -1 && !isSelected) {
                                    currentPalData.LearntSkills.splice(learntIndex, 1);
                                }
                                updateSelectedLearntSkills();
                                break;
                            case 'passiveSkillsList':
                                const passiveIndex = currentPalData.Passives.indexOf(skillId);
                                if (passiveIndex === -1 && isSelected) {
                                    currentPalData.Passives.push(skillId);
                                } else if (passiveIndex > -1 && !isSelected) {
                                    currentPalData.Passives.splice(passiveIndex, 1);
                                }
                                updateSelectedPassiveSkills();
                                break;
                        }
                    }
                });
            } else {
                console.warn(`技能列表元素 ${listId} 未找到`);
            }
        });

        // 绑定技能筛选事件
        const filterElements = {
            'skillCategoryFilter': filterActiveSkills,
            'skillSearch': filterActiveSkills,
            'learntSkillCategoryFilter': filterLearntSkills,
            'learntSkillSearch': filterLearntSkills,
            'passiveCategoryFilter': filterPassiveSkills,
            'passiveSearch': filterPassiveSkills
        };

        for (const [id, handler] of Object.entries(filterElements)) {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', handler);
            } else {
                console.warn(`筛选元素 ${id} 未找到`);
            }
        }

        console.log('技能相关事件绑定完成');
    } catch (error) {
        console.error('绑定技能事件时出错:', error);
        showToast('绑定技能事件失败: ' + error.message, 'danger');
    }
}

// 处理主动技能选择
function handleActiveSkillSelection(skillId, isSelected) {
    if (!Array.isArray(currentPalData.ActiveSkills)) {
        currentPalData.ActiveSkills = [];
    }
    
    if (isSelected) {
        if (!currentPalData.ActiveSkills.includes(skillId)) {
            currentPalData.ActiveSkills.push(skillId);
        }
    } else {
        const index = currentPalData.ActiveSkills.indexOf(skillId);
        if (index > -1) {
            currentPalData.ActiveSkills.splice(index, 1);
        }
    }
    console.log('更新主动技能列表:', currentPalData.ActiveSkills);
}

// 处理已学技能选择
function handleLearntSkillSelection(skillId, isSelected) {
    if (!Array.isArray(currentPalData.LearntSkills)) {
        currentPalData.LearntSkills = [];
    }
    
    if (isSelected) {
        if (!currentPalData.LearntSkills.includes(skillId)) {
            currentPalData.LearntSkills.push(skillId);
        }
    } else {
        const index = currentPalData.LearntSkills.indexOf(skillId);
        if (index > -1) {
            currentPalData.LearntSkills.splice(index, 1);
        }
    }
    console.log('更新已学技能列表:', currentPalData.LearntSkills);
}

// 处理被动技能选择
function handlePassiveSkillSelection(skillId, isSelected) {
    if (!Array.isArray(currentPalData.Passives)) {
        currentPalData.Passives = [];
    }
    
    if (isSelected) {
        if (!currentPalData.Passives.includes(skillId)) {
            currentPalData.Passives.push(skillId);
        }
    } else {
        const index = currentPalData.Passives.indexOf(skillId);
        if (index > -1) {
            currentPalData.Passives.splice(index, 1);
        }
    }
    console.log('更新被动技能列表:', currentPalData.Passives);
}

// 获取技能类型名称
function getSkillCategoryName(category) {
    const categoryMap = {
        dragon: '龙系技能',
        fire: '火系技能',
        water: '水系技能',
        grass: '草系技能',
        electric: '电系技能',
        ice: '冰系技能',
        ground: '地/岩石系技能',
        dark: '暗/幽灵系技能',
        wind: '风/空气系技能',
        special: '特殊技能',
        unique: '独特技能'
    };
    return categoryMap[category] || category;
}

// 获取被动技能类型名称
function getPassiveCategoryName(category) {
    const categoryMap = {
        movement: '移动速度相关',
        legendary: '传说属性',
        elementBoost: '元素增强',
        elementResist: '元素抗性',
        combat: '战斗相关',
        work: '工作相关',
        survival: '生存相关',
        special: '特殊能力',
        mount: '骑乘相关',
        negative: '负面效果',
        composite: '复合效果',
        playerBuff: '玩家增益',
        weight: '重量相关',
        temperatureResist: '温度抗性',
		elementResist2: '元素抗性2',
        sphereModule: '帕鲁球相关',
        capture: '捕获相关',
        mobility: '移动能力',
        other: '其他'
    };
    return categoryMap[category] || category;
}

// 创建技能项
function createSkillItem(skill, category, type = 'active') {
    const skillItem = document.createElement('div');
    skillItem.className = `skill-item skill-${category} cursor-pointer`;
    skillItem.dataset.skillId = skill.id;
    skillItem.dataset.category = category;
    
    const skillName = document.createElement('div');
    skillName.className = 'skill-name';
    skillName.textContent = skill.name;
    
    const skillDescription = document.createElement('div');
    skillDescription.className = 'skill-description text-muted small';
    skillDescription.textContent = skill.description;
    
    skillItem.appendChild(skillName);
    skillItem.appendChild(skillDescription);
    
    // 添加点击事件
    if (type === 'active') {
        skillItem.addEventListener('click', () => selectActiveSkill(skill.id));
    } else if (type === 'learnt') {
        skillItem.addEventListener('click', () => selectLearntSkill(skill.id));
    } else if (type === 'passive') {
        skillItem.addEventListener('click', () => selectPassiveSkill(skill.id));
    }

    // 根据是否已选择添加选中状态
    if (type === 'active' && currentPalData.ActiveSkills.includes(skill.id)) {
        skillItem.classList.add('selected');
    } else if (type === 'learnt' && currentPalData.LearntSkills.includes(skill.id)) {
        skillItem.classList.add('selected');
    } else if (type === 'passive' && currentPalData.Passives.includes(skill.id)) {
        skillItem.classList.add('selected');
    }
    
    return skillItem;
}

// 筛选主动技能
function filterActiveSkills() {
    const category = document.getElementById('skillCategoryFilter').value;
    const searchText = document.getElementById('skillSearch').value.toLowerCase();
    const skillItems = document.getElementById('activeSkillsList').getElementsByClassName('skill-item');
    
    Array.from(skillItems).forEach(item => {
        const matchesCategory = category === 'all' || item.dataset.category === category;
        const matchesSearch = item.textContent.toLowerCase().includes(searchText);
        item.style.display = matchesCategory && matchesSearch ? '' : 'none';
    });
}

// 筛选已学技能
function filterLearntSkills() {
    const category = document.getElementById('learntSkillCategoryFilter').value;
    const searchText = document.getElementById('learntSkillSearch').value.toLowerCase();
    const skillItems = document.getElementById('learntSkillsList').getElementsByClassName('skill-item');
    
    Array.from(skillItems).forEach(item => {
        const matchesCategory = category === 'all' || item.dataset.category === category;
        const matchesSearch = item.textContent.toLowerCase().includes(searchText);
        const shouldDisplay = matchesCategory && matchesSearch;
        item.style.display = shouldDisplay ? 'block' : 'none';  // 明确指定display值
        console.log('技能:', item.textContent.trim(), 
                  'category:', item.dataset.category, 
                  'matchesCategory:', matchesCategory, 
                  'matchesSearch:', matchesSearch, 
                  'display:', item.style.display);
    });
}

// 筛选被动技能
function filterPassiveSkills() {
    const category = document.getElementById('passiveCategoryFilter').value;
    const searchText = document.getElementById('passiveSearch').value.toLowerCase();
    const skillItems = document.getElementById('passiveSkillsList').getElementsByClassName('skill-item');
    
    // 调试信息
    console.log('执行被动技能筛选 - 选择的类别:', category, '搜索文本:', searchText);
    
    Array.from(skillItems).forEach(item => {
        // 检查技能项是否是类别标题
        if (item.classList.contains('skill-category')) {
            item.style.display = category === 'all' ? 'block' : 
                               item.textContent === getPassiveCategoryName(category) ? 'block' : 'none';
            return;
        }
        
        const matchesCategory = category === 'all' || item.dataset.category === category;
        const matchesSearch = item.textContent.toLowerCase().includes(searchText);
        const shouldDisplay = matchesCategory && matchesSearch;
        
        // 调试信息
        console.log('被动技能:', item.textContent.trim(), 
                  'category:', item.dataset.category, 
                  'matchesCategory:', matchesCategory, 
                  'matchesSearch:', matchesSearch, 
                  'display:', shouldDisplay ? 'block' : 'none');
        
        item.style.display = shouldDisplay ? 'block' : 'none';
    });
}

// 全选已学技能
function selectAllLearntSkills() {
    try {
        console.log('开始执行全选已学技能...');
        
        // 获取当前可见的技能项
        const learntSkillsList = document.getElementById('learntSkillsList');
        if (!learntSkillsList) {
            console.error('找不到learntSkillsList元素');
            return;
        }
        
        // 获取当前筛选条件
        const category = document.getElementById('learntSkillCategoryFilter').value;
        const searchText = document.getElementById('learntSkillSearch').value.toLowerCase();
        console.log('当前筛选条件 - 类别:', category, '搜索文本:', searchText);
        
        const skillItems = learntSkillsList.querySelectorAll('.skill-item');
        console.log('找到技能项总数量:', skillItems.length);
        
        if (skillItems.length === 0) {
            console.warn('没有找到任何技能项');
            showToast('没有找到任何可选择的技能', 'info');
            return;
        }
        
        // 过滤出符合当前筛选条件的技能
        const visibleSkills = Array.from(skillItems).filter(item => {
            const matchesCategory = category === 'all' || item.dataset.category === category;
            const matchesSearch = item.textContent.toLowerCase().includes(searchText);
            const isVisible = matchesCategory && matchesSearch;
            console.log('技能项:', item.textContent.trim(), 
                      'category:', item.dataset.category, 
                      'matchesCategory:', matchesCategory, 
                      'matchesSearch:', matchesSearch, 
                      'isVisible:', isVisible);
            return isVisible;
        });
        
        console.log('符合筛选条件的技能数量:', visibleSkills.length);
        
        // 检查是否所有可见技能都已被选中
        const allSelected = visibleSkills.every(item => {
            const skillId = item.dataset.skillId;
            return currentPalData.LearntSkills.includes(skillId);
        });
        
        // 如果所有可见技能都已被选中，则取消选择它们
        if (allSelected) {
            let removedCount = 0;
            visibleSkills.forEach(item => {
                const skillId = item.dataset.skillId;
                const index = currentPalData.LearntSkills.indexOf(skillId);
                if (index !== -1) {
                    currentPalData.LearntSkills.splice(index, 1);
                    removedCount++;
                }
            });
            updateSelectedLearntSkills();
            showToast(`已移除${removedCount}个技能`, 'info');
            return;
        }
        
        // 将所有符合条件的技能添加到已选择列表中
        let addedCount = 0;
        let alreadyExisted = 0;
        
        visibleSkills.forEach(item => {
            const skillId = item.dataset.skillId;
            console.log('处理技能ID:', skillId, '技能名称:', item.textContent.trim());
            
            if (skillId) {
                if (!currentPalData.LearntSkills.includes(skillId)) {
                    currentPalData.LearntSkills.push(skillId);
                    addedCount++;
                    console.log('添加新技能ID:', skillId);
                } else {
                    alreadyExisted++;
                    console.log('技能ID已存在:', skillId);
                }
            }
        });
        
        // 更新显示
        updateSelectedLearntSkills();
        console.log('新添加:', addedCount, '个技能，已存在:', alreadyExisted, 
                  '个技能，当前已选择的技能列表:', currentPalData.LearntSkills);
        
        // 显示提示信息
        if (addedCount > 0) {
            showToast(`已添加${addedCount}个新技能${alreadyExisted > 0 ? `，${alreadyExisted}个技能已存在` : ''}`, 'success');
        } else if (alreadyExisted > 0) {
            showToast(`${alreadyExisted}个技能已在列表中`, 'info');
        } else {
            showToast('没有新的技能可以添加', 'info');
        }
        
    } catch (error) {
        console.error('全选已学技能时出错:', error);
        showToast('全选技能失败: ' + error.message, 'danger');
    }
}

// 此处不需要重复定义showToast函数，因为它已经在文件开头定义过了


// 选择主动技能
function selectActiveSkill(skillId) {
    if (!currentPalData.ActiveSkills.includes(skillId) && currentPalData.ActiveSkills.length < 14) {
        currentPalData.ActiveSkills.push(skillId);
        updateSelectedActiveSkills();
        updateActiveSkillCount();
    }
}

// 选择已学技能
function selectLearntSkill(skillId) {
    const index = currentPalData.LearntSkills.indexOf(skillId);
    if (index === -1) {
        // 如果技能不在列表中，添加它
        currentPalData.LearntSkills.push(skillId);
    } else {
        // 如果技能已在列表中，移除它
        currentPalData.LearntSkills.splice(index, 1);
    }
    updateSelectedLearntSkills();
}

// 更新主动技能计数
function updateActiveSkillCount() {
    const count = currentPalData.ActiveSkills.length;
    document.getElementById('activeSkillCount').textContent = `${count}/14`;
}

// 更新已选择的主动技能
function updateSelectedActiveSkills() {
    try {
        console.log('开始更新主动技能显示...');
        const container = document.getElementById('selectedActiveSkills');
        if (!container) {
            console.error('找不到selectedActiveSkills容器');
            return;
        }
        container.innerHTML = '';
        
        // 确保ActiveSkills是数组
        if (!Array.isArray(currentPalData.ActiveSkills)) {
            console.warn('ActiveSkills不是数组，正在初始化...');
            currentPalData.ActiveSkills = [];
        }
        
        // 更新已选择的技能标签
        currentPalData.ActiveSkills.forEach((skillId, index) => {
            console.log(`处理主动技能 ${index + 1}/${currentPalData.ActiveSkills.length}: ${skillId}`);
            const skill = findSkillById(skillId);
            if (skill) {
                const skillTag = createSelectedSkillTag(skill, 'active');
                container.appendChild(skillTag);
            } else {
                console.warn(`未找到ID为${skillId}的主动技能`);
            }
        });
        
        // 更新技能列表中的选中状态
        const skillsList = document.getElementById('activeSkillsList');
        if (!skillsList) {
            console.error('找不到activeSkillsList列表');
            return;
        }
        
        const skillItems = skillsList.getElementsByClassName('skill-item');
        Array.from(skillItems).forEach(item => {
            const skillId = item.dataset.skillId;
            if (skillId) {
                const isSelected = currentPalData.ActiveSkills.includes(skillId);
                item.classList.toggle('selected', isSelected);
                console.log(`更新技能${skillId}的选中状态: ${isSelected}`);
            }
        });
        
        updateActiveSkillCount();
        console.log('主动技能更新完成');
    } catch (error) {
        console.error('更新主动技能显示时出错:', error);
        showToast('更新主动技能显示失败: ' + error.message, 'danger');
    }
}

// 更新已选择的已学技能
function updateSelectedLearntSkills() {
    try {
        console.log('开始更新已学技能显示...');
        const container = document.getElementById('selectedLearntSkills');
        if (!container) {
            console.error('找不到selectedLearntSkills容器');
            return;
        }
        container.innerHTML = '';
        
        // 确保LearntSkills是数组
        if (!Array.isArray(currentPalData.LearntSkills)) {
            console.warn('LearntSkills不是数组，正在初始化...');
            currentPalData.LearntSkills = [];
        }
        
        // 更新已选择的技能标签
        currentPalData.LearntSkills.forEach((skillId, index) => {
            console.log(`处理已学技能 ${index + 1}/${currentPalData.LearntSkills.length}: ${skillId}`);
            const skill = findSkillById(skillId);
            if (skill) {
                const skillTag = createSelectedSkillTag(skill, 'learnt');
                container.appendChild(skillTag);
            } else {
                console.warn(`未找到ID为${skillId}的已学技能`);
            }
        });
        
        // 更新技能列表中的选中状态
        const skillsList = document.getElementById('learntSkillsList');
        if (!skillsList) {
            console.error('找不到learntSkillsList列表');
            return;
        }
        
        const skillItems = skillsList.getElementsByClassName('skill-item');
        Array.from(skillItems).forEach(item => {
            const skillId = item.dataset.skillId;
            if (skillId) {
                const isSelected = currentPalData.LearntSkills.includes(skillId);
                item.classList.toggle('selected', isSelected);
                console.log(`更新技能${skillId}的选中状态: ${isSelected}`);
            }
        });
        
        console.log('已学技能更新完成');
    } catch (error) {
        console.error('更新已学技能显示时出错:', error);
        showToast('更新已学技能显示失败: ' + error.message, 'danger');
    }
}

// 初始化被动技能列表
function initializePassiveSkills() {
    const passiveSkillsList = document.getElementById('passiveSkillsList');
    const passiveSkillsContainer = document.getElementById('selectedPassiveSkills');
    
    // 添加被动技能到列表
    for (const category in passiveData) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        categoryDiv.textContent = getPassiveCategoryName(category);
        passiveSkillsList.appendChild(categoryDiv);
        
        passiveData[category].forEach(passive => {
            const passiveItem = createPassiveItem(passive, category);
            passiveSkillsList.appendChild(passiveItem);
        });
    }
    
    // 绑定被动技能筛选事件
    // 绑定被动技能筛选事件
    const passiveCategoryFilter = document.getElementById('passiveCategoryFilter');
    const passiveSearch = document.getElementById('passiveSearch');
    if (passiveCategoryFilter) {
        passiveCategoryFilter.addEventListener('change', filterPassiveSkills);
    }
    if (passiveSearch) {
        passiveSearch.addEventListener('input', filterPassiveSkills);
    }
}

// 获取被动技能类型名称
// 此函数已在文件开头定义，此处删除重复代码

// 创建被动技能项
function createPassiveItem(passive, category) {
    const passiveItem = document.createElement('div');
    passiveItem.className = `skill-item passive-${category} cursor-pointer`;
    passiveItem.dataset.passiveId = passive.id;
    passiveItem.dataset.category = category;
    
    const passiveName = document.createElement('div');
    passiveName.className = 'skill-name';
    passiveName.textContent = passive.name;
    
    const passiveDescription = document.createElement('div');
    passiveDescription.className = 'skill-description text-muted small';
    passiveDescription.textContent = passive.description;
    
    passiveItem.appendChild(passiveName);
    passiveItem.appendChild(passiveDescription);
    
    // 添加点击事件
    passiveItem.addEventListener('click', () => selectPassiveSkill(passive.id));
    
    return passiveItem;
}

// 选择被动技能
function selectPassiveSkill(skillId) {
    const index = currentPalData.Passives.indexOf(skillId);
    if (index === -1) {
        // 如果技能不在列表中，添加它
        currentPalData.Passives.push(skillId);
    } else {
        // 如果技能已在列表中，移除它
        currentPalData.Passives.splice(index, 1);
    }
    updateSelectedPassiveSkills();
}

// 更新已选择的被动技能
function updateSelectedPassiveSkills() {
    try {
        console.log('开始更新被动技能显示...');
        const container = document.getElementById('selectedPassiveSkills');
        if (!container) {
            console.error('找不到selectedPassiveSkills容器');
            return;
        }
        container.innerHTML = '';
        
        // 确保Passives是数组
        if (!Array.isArray(currentPalData.Passives)) {
            console.warn('Passives不是数组，正在初始化...');
            currentPalData.Passives = [];
        }
        
        // 更新已选择的技能标签
        currentPalData.Passives.forEach((skillId, index) => {
            console.log(`处理被动技能 ${index + 1}/${currentPalData.Passives.length}: ${skillId}`);
            const skill = findPassiveById(skillId);
            if (skill) {
                const skillTag = createSelectedSkillTag(skill, 'passive');
                container.appendChild(skillTag);
            } else {
                console.warn(`未找到ID为${skillId}的被动技能`);
            }
        });
        
        // 更新技能列表中的选中状态
        const skillsList = document.getElementById('passiveSkillsList');
        if (skillsList) {
            const skillItems = skillsList.getElementsByClassName('skill-item');
            Array.from(skillItems).forEach(item => {
                const skillId = item.dataset.passiveId;
                if (skillId) {
                    const isSelected = currentPalData.Passives.includes(skillId);
                    item.classList.toggle('selected', isSelected);
                    console.log(`更新技能${skillId}的选中状态: ${isSelected}`);
                }
            });
        }
        
        console.log('被动技能更新完成');
    } catch (error) {
        console.error('更新被动技能显示时出错:', error);
        showToast('更新被动技能显示失败: ' + error.message, 'danger');
    }
}

// 通过ID查找被动技能
function findPassiveById(skillId) {
    for (const category in passiveData) {
        const skill = passiveData[category].find(s => s.id === skillId);
        if (skill) return skill;
    }
    return null;
}

// 筛选被动技能
function filterPassiveSkills() {
    const category = document.getElementById('passiveCategoryFilter').value;
    const searchText = document.getElementById('passiveSearch').value.toLowerCase();
    const passiveItems = document.getElementById('passiveSkillsList').getElementsByClassName('skill-item');
    
    Array.from(passiveItems).forEach(item => {
        const matchesCategory = category === 'all' || item.dataset.category === category;
        const matchesSearch = item.textContent.toLowerCase().includes(searchText);
        item.style.display = matchesCategory && matchesSearch ? '' : 'none';
    });
}

// 创建已选择的技能标签
function createSelectedSkillTag(skill, type) {
    const skillTag = document.createElement('div');
    skillTag.className = 'selected-skill';
    skillTag.dataset.skillId = skill.id;
    skillTag.textContent = skill.name;
    
    const removeButton = document.createElement('span');
    removeButton.className = 'remove-skill';
    removeButton.innerHTML = '×';
    removeButton.onclick = (e) => {
        e.stopPropagation();
        removeSkill(skill.id, type);
    };
    
    skillTag.appendChild(removeButton);
    return skillTag;
}

// 移除技能
function removeSkill(skillId, type) {
    let removed = false;
    
    switch (type) {
        case 'active':
            const activeIndex = currentPalData.ActiveSkills.indexOf(skillId);
            if (activeIndex > -1) {
                currentPalData.ActiveSkills.splice(activeIndex, 1);
                updateSelectedActiveSkills();
                removed = true;
            }
            break;
            
        case 'learnt':
            const learntIndex = currentPalData.LearntSkills.indexOf(skillId);
            if (learntIndex > -1) {
                currentPalData.LearntSkills.splice(learntIndex, 1);
                updateSelectedLearntSkills();
                removed = true;
            }
            break;
            
        case 'passive':
            const passiveIndex = currentPalData.Passives.indexOf(skillId);
            if (passiveIndex > -1) {
                currentPalData.Passives.splice(passiveIndex, 1);
                updateSelectedPassiveSkills();
                removed = true;
            }
            break;
    }
    
    return removed;
}

// 查找技能
function findSkillById(skillId) {
    for (const category in skillData) {
        const skill = skillData[category].find(s => s.id === skillId);
        if (skill) return skill;
    }
    return null;
}


// 加载默认数据
function loadDefaultData() {
    // 基本信息
    document.getElementById('palId').value = currentPalData.PalID;
    document.getElementById('nickname').value = currentPalData.Nickname;
    document.getElementById('gender').value = currentPalData.Gender;
    document.getElementById('level').value = currentPalData.Level;
    document.getElementById('exp').value = currentPalData.Exp;
    document.getElementById('shiny').checked = currentPalData.Shiny;
    document.getElementById('partnerSkillLevel').value = currentPalData.PartnerSkillLevel;
    document.getElementById('condensedPals').value = currentPalData.CondensedPals;
    document.getElementById('unusedStatusPoints').value = currentPalData.UnusedStatusPoints;
    
    // 核心属性
    document.getElementById('hp').value = currentPalData.HP;
    document.getElementById('sp').value = currentPalData.SP;
    document.getElementById('hunger').value = currentPalData.Hunger;
    document.getElementById('maxHunger').value = currentPalData.MaxHunger;
    document.getElementById('san').value = currentPalData.SAN;
    document.getElementById('support').value = currentPalData.Support;
    document.getElementById('craftSpeed').value = currentPalData.CraftSpeed;
    
    // 帕鲁灵魂
    document.getElementById('soulHealth').value = currentPalData.PalSouls.Health;
    document.getElementById('soulAttack').value = currentPalData.PalSouls.Attack;
    document.getElementById('soulDefense').value = currentPalData.PalSouls.Defense;
    document.getElementById('soulCraftSpeed').value = currentPalData.PalSouls.CraftSpeed;
    
    // 个体值
    document.getElementById('ivHealth').value = currentPalData.IVs.Health;
    document.getElementById('ivAttackMelee').value = currentPalData.IVs.AttackMelee;
    document.getElementById('ivAttackShot').value = currentPalData.IVs.AttackShot;
    document.getElementById('ivDefense').value = currentPalData.IVs.Defense;
}

// 初始化工作偏好已移至initializer.js

// 初始化工作偏好复选框
function initializeWorkPreferenceCheckboxes() {
    try {
        console.log('初始化工作偏好复选框...');
        
        // 获取所有工作偏好复选框
        const checkboxes = document.querySelectorAll('#workPreferencesList .form-check-input');
        if (!checkboxes || checkboxes.length === 0) {
            console.error('找不到工作偏好复选框');
            return;
        }
        
        console.log(`找到 ${checkboxes.length} 个工作偏好复选框`);
        console.log('当前禁用工作偏好:', currentPalData.DisableWorkPreferences);
        
        // 根据当前数据设置复选框状态
        checkboxes.forEach(checkbox => {
            const workType = checkbox.value;
            const isChecked = Array.isArray(currentPalData.DisableWorkPreferences) && 
                             currentPalData.DisableWorkPreferences.includes(workType);
            
            console.log(`设置复选框 ${workType} 的状态为: ${isChecked}`);
            checkbox.checked = isChecked;
            
            // 移除旧的事件监听器（如果有）
            checkbox.removeEventListener('change', checkbox._changeHandler);
            
            // 添加新的事件监听器
            checkbox._changeHandler = function() {
                toggleWorkPreference(workType, this.checked);
            };
            
            checkbox.addEventListener('change', checkbox._changeHandler);
        });
        
        console.log('工作偏好复选框初始化完成');
    } catch (error) {
        console.error('初始化工作偏好复选框时出错:', error);
    }
}

// 切换工作偏好
function toggleWorkPreference(workType, isDisabled) {
    try {
        console.log(`切换工作偏好: ${workType}, 禁用: ${isDisabled}`);
        
        // 确保DisableWorkPreferences是一个数组
        if (!Array.isArray(currentPalData.DisableWorkPreferences)) {
            currentPalData.DisableWorkPreferences = [];
        }
        
        // 根据选中状态添加或移除工作类型
        const index = currentPalData.DisableWorkPreferences.indexOf(workType);
        if (isDisabled && index === -1) {
            // 添加到禁用列表
            currentPalData.DisableWorkPreferences.push(workType);
        } else if (!isDisabled && index !== -1) {
            // 从禁用列表中移除
            currentPalData.DisableWorkPreferences.splice(index, 1);
        }
        
        // 更新显示
        updateDisabledWorkPreferences();
    } catch (error) {
        console.error('切换工作偏好时出错:', error);
        showToast('更新工作偏好失败: ' + error.message, 'danger');
    }
}

// 更新已禁用的工作偏好显示
function updateDisabledWorkPreferences() {
    try {
        console.log('更新已禁用的工作偏好显示...');
        
        // 获取容器元素
        const container = document.getElementById('selectedDisabledPreferences');
        if (!container) {
            console.error('找不到selectedDisabledPreferences容器');
            return;
        }
        
        // 清空容器
        container.innerHTML = '';
        
        // 工作类型名称映射
        const workTypeNames = {
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
            'OilExtraction': '油田'
        };
        
        // 添加已禁用的工作偏好
        if (Array.isArray(currentPalData.DisableWorkPreferences) && currentPalData.DisableWorkPreferences.length > 0) {
            currentPalData.DisableWorkPreferences.forEach(workType => {
                const workItem = document.createElement('div');
                workItem.className = 'selected-work-item';
                
                const workName = document.createElement('span');
                workName.textContent = workTypeNames[workType] || workType;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn btn-sm btn-danger remove-work';
                removeBtn.innerHTML = '<i class="bi bi-x"></i>';
                removeBtn.addEventListener('click', () => {
                    // 从禁用列表中移除
                    const index = currentPalData.DisableWorkPreferences.indexOf(workType);
                    if (index !== -1) {
                        currentPalData.DisableWorkPreferences.splice(index, 1);
                    }
                    
                    // 更新复选框状态
                    const checkbox = document.getElementById(`pref_${workType}`);
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                    
                    // 更新显示
                    updateDisabledWorkPreferences();
                });
                
                workItem.appendChild(workName);
                workItem.appendChild(removeBtn);
                container.appendChild(workItem);
            });
        } else {
            // 如果没有禁用的工作，显示提示信息
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'text-muted';
            emptyMessage.textContent = '未设置禁用工作';
            container.appendChild(emptyMessage);
        }
        
        console.log('已禁用的工作偏好显示更新完成');
    } catch (error) {
        console.error('更新已禁用的工作偏好显示时出错:', error);
    }
}

// 更新选中的主动技能
function updateSelectedActiveSkills() {
    const selectedSkillsContainer = document.getElementById('selectedActiveSkills');
    if (!selectedSkillsContainer) {
        console.error('找不到selectedActiveSkills容器');
        return;
    }
    
    selectedSkillsContainer.innerHTML = '';
    
    // 更新计数
    const activeSkillCount = document.getElementById('activeSkillCount');
    if (activeSkillCount) {
        activeSkillCount.textContent = `${currentPalData.ActiveSkills.length}/14`;
    }
    
    // 添加已选择的技能
    currentPalData.ActiveSkills.forEach(skillId => {
        // 查找技能信息
        let skillInfo = null;
        for (const category in skillData) {
            const skill = skillData[category].find(s => s.id === skillId);
            if (skill) {
                skillInfo = skill;
                break;
            }
        }
        
        if (skillInfo) {
            const skillItem = document.createElement('div');
            skillItem.className = 'selected-skill-item';
            skillItem.dataset.skillId = skillId;
            
            const skillName = document.createElement('span');
            skillName.textContent = skillInfo.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-danger remove-skill';
            removeBtn.innerHTML = '<i class="bi bi-x"></i>';
            removeBtn.addEventListener('click', () => {
                // 从当前数据中移除
                currentPalData.ActiveSkills = currentPalData.ActiveSkills.filter(id => id !== skillId);
                // 更新显示
                updateSelectedActiveSkills();
                // 更新技能列表中的选中状态
                const skillItems = document.querySelectorAll(`#activeSkillsList .skill-item[data-skill-id="${skillId}"]`);
                skillItems.forEach(item => item.classList.remove('selected'));
            });
            
            skillItem.appendChild(skillName);
            skillItem.appendChild(removeBtn);
            selectedSkillsContainer.appendChild(skillItem);
        }
    });
}

// 更新选中的已学技能
function updateSelectedLearntSkills() {
    const selectedSkillsContainer = document.getElementById('selectedLearntSkills');
    if (!selectedSkillsContainer) {
        console.error('找不到selectedLearntSkills容器');
        return;
    }
    
    selectedSkillsContainer.innerHTML = '';

    // 更新计数器
    const learntSkillCounter = document.getElementById('learntSkillCounter');
    const selectedSkillsCounter = document.getElementById('selectedSkillsCounter');
    if (learntSkillCounter && selectedSkillsCounter) {
        const visibleSkillsCount = document.querySelectorAll('#learntSkillsList .skill-item:not([style*="display: none"])').length;
        learntSkillCounter.textContent = `显示 ${visibleSkillsCount} 个技能`;
        selectedSkillsCounter.textContent = `已选择 ${currentPalData.LearntSkills.length} 个技能`;
    }
    
    // 添加已选择的技能
    currentPalData.LearntSkills.forEach(skillId => {
        // 查找技能信息
        let skillInfo = null;
        for (const category in skillData) {
            const skill = skillData[category].find(s => s.id === skillId);
            if (skill) {
                skillInfo = skill;
                break;
            }
        }
        
        if (skillInfo) {
            const skillItem = document.createElement('div');
            skillItem.className = 'selected-skill-item';
            skillItem.dataset.skillId = skillId;
            
            const skillName = document.createElement('span');
            skillName.textContent = skillInfo.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-danger remove-skill';
            removeBtn.innerHTML = '<i class="bi bi-x"></i>';
            removeBtn.addEventListener('click', () => {
                // 从当前数据中移除
                currentPalData.LearntSkills = currentPalData.LearntSkills.filter(id => id !== skillId);
                // 更新显示
                updateSelectedLearntSkills();
                // 更新技能列表中的选中状态
                const skillItems = document.querySelectorAll(`#learntSkillsList .skill-item[data-skill-id="${skillId}"]`);
                skillItems.forEach(item => item.classList.remove('selected'));
            });
            
            skillItem.appendChild(skillName);
            skillItem.appendChild(removeBtn);
            selectedSkillsContainer.appendChild(skillItem);
        }
    });
}

// 更新选中的被动技能
function updateSelectedPassiveSkills() {
    const selectedSkillsContainer = document.getElementById('selectedPassiveSkills');
    if (!selectedSkillsContainer) {
        console.error('找不到selectedPassiveSkills容器');
        return;
    }
    
    selectedSkillsContainer.innerHTML = '';
    
    // 添加已选择的技能
    currentPalData.Passives.forEach(skillId => {
        // 查找技能信息
        let skillInfo = null;
        for (const category in passiveData) {
            const skill = passiveData[category].find(s => s.id === skillId);
            if (skill) {
                skillInfo = skill;
                break;
            }
        }
        
        if (skillInfo) {
            const skillItem = document.createElement('div');
            skillItem.className = 'selected-skill-item';
            skillItem.dataset.skillId = skillId;
            
            const skillName = document.createElement('span');
            skillName.textContent = skillInfo.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-danger remove-skill';
            removeBtn.innerHTML = '<i class="bi bi-x"></i>';
            removeBtn.addEventListener('click', () => {
                // 从当前数据中移除
                currentPalData.Passives = currentPalData.Passives.filter(id => id !== skillId);
                // 更新显示
                updateSelectedPassiveSkills();
                // 更新技能列表中的选中状态
                const skillItems = document.querySelectorAll(`#passiveSkillsList .skill-item[data-skill-id="${skillId}"]`);
                skillItems.forEach(item => item.classList.remove('selected'));
            });
            
            skillItem.appendChild(skillName);
            skillItem.appendChild(removeBtn);
            selectedSkillsContainer.appendChild(skillItem);
        }
    });
}

// 选择主动技能
function selectActiveSkill(skillId) {
    // 检查是否已经选择了该技能
    const index = currentPalData.ActiveSkills.indexOf(skillId);
    if (index !== -1) {
        // 已选择，则移除
        currentPalData.ActiveSkills.splice(index, 1);
        // 更新UI
        const skillItems = document.querySelectorAll(`#activeSkillsList .skill-item[data-skill-id="${skillId}"]`);
        skillItems.forEach(item => item.classList.remove('selected'));
    } else {
        // 检查是否已达到最大数量
        if (currentPalData.ActiveSkills.length >= 14) {
            showToast('主动技能最多选择14个', 'danger');
            return;
        }
        
        // 未选择，则添加
        currentPalData.ActiveSkills.push(skillId);
        // 更新UI
        const skillItems = document.querySelectorAll(`#activeSkillsList .skill-item[data-skill-id="${skillId}"]`);
        skillItems.forEach(item => item.classList.add('selected'));
    }
    
    // 更新已选择的技能列表
    updateSelectedActiveSkills();
}

// 选择已学技能
function selectLearntSkill(skillId) {
    // 检查是否已经选择了该技能
    const index = currentPalData.LearntSkills.indexOf(skillId);
    if (index !== -1) {
        // 已选择，则移除
        currentPalData.LearntSkills.splice(index, 1);
        // 更新UI
        const skillItems = document.querySelectorAll(`#learntSkillsList .skill-item[data-skill-id="${skillId}"]`);
        skillItems.forEach(item => item.classList.remove('selected'));
    } else {
        // 未选择，则添加
        currentPalData.LearntSkills.push(skillId);
        // 更新UI
        const skillItems = document.querySelectorAll(`#learntSkillsList .skill-item[data-skill-id="${skillId}"]`);
        skillItems.forEach(item => item.classList.add('selected'));
    }
    
    // 更新已选择的技能列表
    updateSelectedLearntSkills();
}

// 选择被动技能
function selectPassiveSkill(skillId) {
    // 检查是否已经选择了该技能
    const index = currentPalData.Passives.indexOf(skillId);
    if (index !== -1) {
        // 已选择，则移除
        currentPalData.Passives.splice(index, 1);
        // 更新UI
        const skillItems = document.querySelectorAll(`#passiveSkillsList .skill-item[data-skill-id="${skillId}"]`);
        skillItems.forEach(item => item.classList.remove('selected'));
    } else {
        // 未选择，则添加
        currentPalData.Passives.push(skillId);
        // 更新UI
        const skillItems = document.querySelectorAll(`#passiveSkillsList .skill-item[data-skill-id="${skillId}"]`);
        skillItems.forEach(item => item.classList.add('selected'));
    }
    
    // 更新已选择的技能列表
    updateSelectedPassiveSkills();
}

// 更新所有字段
function updateAllFields() {
    try {
        console.log('开始更新所有字段...');
        
        // 更新基本信息
        const basicFields = {
            'palId': 'PalID',
            'nickname': 'Nickname',
            'gender': 'Gender',
            'level': 'Level',
            'exp': 'Exp',
            'shiny': 'Shiny',
            'partnerSkillLevel': 'PartnerSkillLevel',
            'condensedPals': 'CondensedPals',
            'unusedStatusPoints': 'UnusedStatusPoints',
            'hp': 'HP',
            'sp': 'SP',
            'hunger': 'Hunger',
            'maxHunger': 'MaxHunger',
            'san': 'SAN',
            'support': 'Support',
            'craftSpeed': 'CraftSpeed'
        };
        
        // 更新文本和数字输入字段
        for (const [elementId, dataKey] of Object.entries(basicFields)) {
            const element = document.getElementById(elementId);
            if (element) {
                const value = currentPalData[dataKey];
                if (element.type === 'checkbox') {
                    element.checked = !!value;
                } else {
                    element.value = value !== undefined ? value : '';
                }
            }
        }
        
        // 更新帕鲁灵魂数值
        const soulFields = ['Health', 'Attack', 'Defense', 'CraftSpeed'];
        soulFields.forEach(field => {
            const element = document.getElementById('soul' + field);
            if (element && currentPalData.PalSouls) {
                element.value = currentPalData.PalSouls[field] || 0;
            }
        });
        
        // 更新个体值
        const ivFields = {
            'ivHealth': 'Health',
            'ivAttackMelee': 'AttackMelee',
            'ivAttackShot': 'AttackShot',
            'ivDefense': 'Defense'
        };
        
        for (const [elementId, dataKey] of Object.entries(ivFields)) {
            const element = document.getElementById(elementId);
            if (element && currentPalData.IVs) {
                element.value = currentPalData.IVs[dataKey] || 0;
            }
        }
        
        // 更新技能列表
        updateSelectedActiveSkills();
        updateSelectedLearntSkills();
        updateSelectedPassiveSkills();
        
        // 更新工作偏好复选框
        if (Array.isArray(currentPalData.DisableWorkPreferences)) {
            const workTypes = [
                'BaseCampBattle',
                'Collection',
                'Deforest',
                'EmergencyFood',
                'Farming',
                'Generate_Electricity',
                'Handcraft',
                'Cool',
                'Mining',
                'Transport',
                'MonsterFarm',
                'Seeding'
            ];
            
            workTypes.forEach(workType => {
                const checkbox = document.getElementById(`work_${workType}`);
                if (checkbox) {
                    checkbox.checked = currentPalData.DisableWorkPreferences.includes(workType);
                }
            });
        }
        
        console.log('所有字段更新完成');
    } catch (error) {
        console.error('更新字段时出错:', error);
        showToast('更新界面失败: ' + error.message, 'danger');
        throw error;
    }
    try {
        console.log('开始更新所有字段...');
        
        // 更新基本信息
        document.getElementById('palId').value = currentPalData.PalID || '';
        document.getElementById('nickname').value = currentPalData.Nickname || '';
        document.getElementById('gender').value = currentPalData.Gender || 'Male';
        document.getElementById('level').value = currentPalData.Level || 1;
        document.getElementById('exp').value = currentPalData.Exp || 0;
        document.getElementById('shiny').checked = currentPalData.Shiny || false;
        document.getElementById('partnerSkillLevel').value = currentPalData.PartnerSkillLevel || 0;
        document.getElementById('condensedPals').value = currentPalData.CondensedPals || 0;
        document.getElementById('unusedStatusPoints').value = currentPalData.UnusedStatusPoints || 0;

        // 更新核心属性
        document.getElementById('hp').value = currentPalData.HP || 0;
        document.getElementById('sp').value = currentPalData.SP || 0;
        document.getElementById('hunger').value = currentPalData.Hunger || 0;
        document.getElementById('maxHunger').value = currentPalData.MaxHunger || 0;
        document.getElementById('san').value = currentPalData.SAN || 0;
        document.getElementById('support').value = currentPalData.Support || 0;
        document.getElementById('craftSpeed').value = currentPalData.CraftSpeed || 0;

        // 更新帕鲁灵魂
        document.getElementById('soulHealth').value = currentPalData.PalSouls?.Health || 0;
        document.getElementById('soulAttack').value = currentPalData.PalSouls?.Attack || 0;
        document.getElementById('soulDefense').value = currentPalData.PalSouls?.Defense || 0;
        document.getElementById('soulCraftSpeed').value = currentPalData.PalSouls?.CraftSpeed || 0;

        // 更新个体值
        document.getElementById('ivHealth').value = currentPalData.IVs?.Health || 0;
        document.getElementById('ivAttackMelee').value = currentPalData.IVs?.AttackMelee || 0;
        document.getElementById('ivAttackShot').value = currentPalData.IVs?.AttackShot || 0;
        document.getElementById('ivDefense').value = currentPalData.IVs?.Defense || 0;

        // 更新技能列表
        updateSelectedActiveSkills();
        updateSelectedLearntSkills();
        updateSelectedPassiveSkills();
        
        // 更新工作偏好
        initializeWorkPreferenceCheckboxes();
        updateDisabledWorkPreferences();
        
        console.log('所有字段更新完成');
    } catch (error) {
        console.error('更新字段时出错:', error);
        showToast('更新界面失败: ' + error.message, 'danger');
    }
}

// 页面初始化已移至initializer.js
// 基本事件绑定
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 导出JSON按钮事件
        document.getElementById('generateJsonBtn').addEventListener('click', generateJson);
        
        // 绑定刷新技能列表按钮事件
        document.getElementById('refreshSkillsBtn').addEventListener('click', () => {
            initializeSkillLists();
            showToast('技能列表已刷新', 'success');
        });
        
        console.log('基本事件绑定完成');
    } catch (error) {
        console.error('基本事件绑定时出错:', error);
        showToast('基本事件绑定失败: ' + error.message, 'danger');
    }
});

// 创建技能项
function createSkillItem(skill, category, type = 'active') {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.dataset.skillId = skill.id;
    skillItem.dataset.skillType = type;
    skillItem.dataset.category = category;

    const skillName = document.createElement('div');
    skillName.className = 'skill-name';
    skillName.textContent = skill.name;
    
    const skillDescription = document.createElement('div');
    skillDescription.className = 'skill-description text-muted small';
    skillDescription.textContent = skill.description || '';
    
    skillItem.appendChild(skillName);
    skillItem.appendChild(skillDescription);

    // 根据当前选中状态设置selected类
    if (type === 'active' && currentPalData.ActiveSkills.includes(skill.id)) {
        skillItem.classList.add('selected');
    } else if (type === 'learnt' && currentPalData.LearntSkills.includes(skill.id)) {
        skillItem.classList.add('selected');
    } else if (type === 'passive' && currentPalData.Passives.includes(skill.id)) {
        skillItem.classList.add('selected');
    }

    return skillItem;
}

// 创建文件输入元素
function createFileInput() {
    const existingFileInput = document.getElementById('fileInput');
    if (existingFileInput) {
        return existingFileInput;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileInput';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    return fileInput;
}

// 生成JSON
function generateJson() {
    try {
        // 收集基本信息
        currentPalData.PalID = document.getElementById('palId').value;
        currentPalData.Nickname = document.getElementById('nickname').value;
        currentPalData.Gender = document.getElementById('gender').value;
        currentPalData.Level = parseInt(document.getElementById('level').value) || 1;
        currentPalData.Exp = parseInt(document.getElementById('exp').value) || 0;
        currentPalData.Shiny = document.getElementById('shiny').checked;
        currentPalData.PartnerSkillLevel = parseInt(document.getElementById('partnerSkillLevel').value) || 0;
        currentPalData.CondensedPals = parseInt(document.getElementById('condensedPals').value) || 0;
        currentPalData.UnusedStatusPoints = parseInt(document.getElementById('unusedStatusPoints').value) || 0;
        
        // 收集核心属性
        currentPalData.HP = parseInt(document.getElementById('hp').value) || 0;
        currentPalData.SP = parseFloat(document.getElementById('sp').value) || 0;
        currentPalData.Hunger = parseFloat(document.getElementById('hunger').value) || 0;
        currentPalData.MaxHunger = parseFloat(document.getElementById('maxHunger').value) || 0;
        currentPalData.SAN = parseFloat(document.getElementById('san').value) || 0;
        currentPalData.Support = parseInt(document.getElementById('support').value) || 0;
        currentPalData.CraftSpeed = parseInt(document.getElementById('craftSpeed').value) || 0;
        
        // 收集帕鲁灵魂
        currentPalData.PalSouls = {
            Health: parseInt(document.getElementById('soulHealth').value) || 0,
            Attack: parseInt(document.getElementById('soulAttack').value) || 0,
            Defense: parseInt(document.getElementById('soulDefense').value) || 0,
            CraftSpeed: parseInt(document.getElementById('soulCraftSpeed').value) || 0
        };
        
        // 收集个体值
        currentPalData.IVs = {
            Health: parseInt(document.getElementById('ivHealth').value) || 0,
            AttackMelee: parseInt(document.getElementById('ivAttackMelee').value) || 0,
            AttackShot: parseInt(document.getElementById('ivAttackShot').value) || 0,
            Defense: parseInt(document.getElementById('ivDefense').value) || 0
        };
        
        // 生成JSON字符串
        const jsonString = JSON.stringify(currentPalData, null, 2);
        
        // 创建下载链接
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentPalData.PalID}_${currentPalData.Nickname}.json`;
        a.click();
        
        // 释放URL
        URL.revokeObjectURL(url);
        
        showToast('JSON导出成功', 'success');
    } catch (error) {
        console.error('生成JSON时出错:', error);
        showToast('JSON导出失败: ' + error.message, 'danger');
    }
}