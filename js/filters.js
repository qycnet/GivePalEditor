// @ts-nocheck

// 初始化所有筛选器
function initializeFilters() {
    // 初始化被动技能筛选器
    initializePassiveSkillFilter();
}

// 初始化被动技能筛选器
function initializePassiveSkillFilter() {
    const filter = document.getElementById('passiveCategoryFilter');
    const searchInput = document.getElementById('passiveSearch');
    const clearButton = document.getElementById('clearPassiveSkills');
    const selectAllButton = document.getElementById('selectAllPassiveSkills');

    // 检查必要的DOM元素是否存在
    if (!filter || !searchInput) {
        console.warn('被动技能筛选器所需的DOM元素未找到');
        return;
    }

    // 清空现有选项
    filter.innerHTML = '';

    // 添加"全部技能"选项
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = '全部技能';
    filter.appendChild(allOption);

    // 从 categoryConfig 中获取并添加所有被动技能分类
    if (window.categoryConfig && typeof window.categoryConfig.getPassiveCategories === 'function') {
        const passiveCategories = window.categoryConfig.getPassiveCategories();
        passiveCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            // 使用 getPassiveCategoryName 函数获取中文名称
            option.textContent = window.getPassiveCategoryName ? 
                window.getPassiveCategoryName(category.id) : 
                category.name;
            filter.appendChild(option);
        });
    } else {
        console.warn('categoryConfig 未定义或 getPassiveCategories 方法不可用');
        return;
    }

    // 绑定事件监听器
    filter.addEventListener('change', filterPassiveSkills);
    searchInput.addEventListener('input', filterPassiveSkills);

    // 绑定清空和全选按钮事件（如果按钮存在）
    if (clearButton) {
        clearButton.addEventListener('click', clearPassiveSkills);
    }
    if (selectAllButton) {
        selectAllButton.addEventListener('click', selectAllPassiveSkills);
    }

    // 初始化时立即执行一次过滤
    filterPassiveSkills();
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeFilters);

// 过滤主动技能
function filterActiveSkills(searchText, category) {
    const skillItems = document.querySelectorAll('#activeSkillsList .skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.getAttribute('data-name').toLowerCase();
        const skillCategory = item.getAttribute('data-category');
        
        const matchesSearch = searchText === '' || skillName.includes(searchText.toLowerCase());
        const matchesCategory = category === 'all' || skillCategory === category;
        
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 过滤学习技能
function filterLearntSkills() {
    const searchInput = document.getElementById('learntSkillSearch');
    const searchText = searchInput ? searchInput.value.toLowerCase() : '';
    const categoryFilter = document.getElementById('learntSkillCategoryFilter');
    const category = categoryFilter ? categoryFilter.value : 'all';
    const skillItems = document.querySelectorAll('#learntSkillsList .skill-item');
    
    console.log('开始过滤已学技能...');
    console.log('搜索文本:', searchText);
    console.log('选择的分类:', category);
    console.log('找到的技能项数量:', skillItems.length);
    
    let visibleSkillsCount = 0;
    let selectedSkillsCount = 0;
    
    skillItems.forEach(item => {
        const skillName = item.getAttribute('data-name')?.toLowerCase() || '';
        const skillDescription = item.querySelector('.skill-description')?.textContent.toLowerCase() || '';
        const skillCategory = item.getAttribute('data-category');
        const isChecked = item.querySelector('input[type="checkbox"]')?.checked || false;
        
        if (isChecked) {
            selectedSkillsCount++;
        }
        
        const matchesSearch = searchText === '' || 
                            skillName.includes(searchText) || 
                            skillDescription.includes(searchText);
        const matchesCategory = category === 'all' || skillCategory === category;
        
        const isVisible = matchesSearch && matchesCategory;
        item.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            visibleSkillsCount++;
        }
    });

    console.log('可见技能数量:', visibleSkillsCount);
    console.log('已选择技能数量:', selectedSkillsCount);

    // 更新分类标题的显示状态
    const categoryDivs = document.querySelectorAll('#learntSkillsList .skill-category');
    categoryDivs.forEach(div => {
        const categoryId = div.getAttribute('data-category');
        
        // 检查该分类下是否有可见的技能项
        let hasVisibleSkills = false;
        let nextElement = div.nextElementSibling;
        while (nextElement && nextElement.classList.contains('skill-item')) {
            if (nextElement.style.display !== 'none') {
                hasVisibleSkills = true;
                break;
            }
            nextElement = nextElement.nextElementSibling;
        }
        
        // 根据是否有可见的技能项来决定是否显示分类标题
        div.style.display = hasVisibleSkills ? 'block' : 'none';
    });

    // 更新技能计数器
    const skillCounter = document.getElementById('learntSkillCounter');
    const selectedCounter = document.getElementById('selectedSkillsCounter');
    
    if (skillCounter) {
        skillCounter.textContent = `显示 ${visibleSkillsCount} 个技能`;
        console.log('已更新可见技能计数器:', skillCounter.textContent);
    } else {
        console.warn('未找到可见技能计数器元素');
    }
    
    if (selectedCounter) {
        selectedCounter.textContent = `已选择 ${selectedSkillsCount} 个技能`;
        console.log('已更新已选择技能计数器:', selectedCounter.textContent);
    } else {
        console.warn('未找到已选择技能计数器元素');
    }
}

// 过滤被动技能
function filterPassiveSkills() {
    const searchInput = document.getElementById('passiveSearch');
    const searchText = searchInput ? searchInput.value.toLowerCase() : '';
    const categoryFilter = document.getElementById('passiveCategoryFilter');
    const category = categoryFilter ? categoryFilter.value : 'all';
    const skillItems = document.querySelectorAll('#passiveSkillsList .skill-item');
    
    // 获取所有分类的中文名称
    const categoryMap = {};
    if (typeof window.getPassiveCategoryName === 'function') {
        // 使用全局的分类名称映射函数
        window.categoryConfig.getPassiveCategories().forEach(cat => {
            categoryMap[cat.id] = window.getPassiveCategoryName(cat.id);
        });
    } else {
        // 如果没有全局映射函数，使用配置中的名称
        window.categoryConfig.getPassiveCategories().forEach(cat => {
            categoryMap[cat.id] = cat.name;
        });
    }

    // 更新所有技能项的显示状态和分类名称
    let visibleSkillsCount = 0;
    skillItems.forEach(item => {
        const skillName = item.getAttribute('data-name').toLowerCase();
        const skillDescription = item.querySelector('.skill-description')?.textContent.toLowerCase() || '';
        const skillCategory = item.getAttribute('data-category');
        const skillCategoryName = categoryMap[skillCategory] || skillCategory;
        
        // 更新技能项的分类名称显示
        const categoryLabel = item.querySelector('.skill-category-label');
        if (categoryLabel) {
            categoryLabel.textContent = skillCategoryName;
        }

        // 为技能项添加分类样式
        item.classList.forEach(className => {
            if (className.startsWith('passive-')) {
                item.classList.remove(className);
            }
        });
        item.classList.add(`passive-${skillCategory}`);
        
        // 判断是否匹配搜索条件
        const matchesSearch = searchText === '' || 
                            skillName.includes(searchText) || 
                            skillDescription.includes(searchText) ||
                            skillCategoryName.toLowerCase().includes(searchText);
        const matchesCategory = category === 'all' || skillCategory === category;
        
        // 高亮匹配的文本
        if (searchText && matchesSearch) {
            highlightText(item, searchText);
        } else {
            removeHighlight(item);
        }
        
        const isVisible = matchesSearch && matchesCategory;
        item.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            visibleSkillsCount++;
        }
    });

    // 更新分类标题的显示状态
    const categoryDivs = document.querySelectorAll('#passiveSkillsList .skill-category');
    categoryDivs.forEach(div => {
        const categoryId = div.getAttribute('data-category');
        const categoryName = categoryMap[categoryId] || categoryId;
        
        // 更新分类标题为中文
        div.textContent = categoryName;
        
        // 为分类标题添加样式
        div.classList.forEach(className => {
            if (className.startsWith('passive-')) {
                div.classList.remove(className);
            }
        });
        div.classList.add(`passive-${categoryId}`);
        
        // 检查该分类下是否有可见的技能项
        let hasVisibleSkills = false;
        let nextElement = div.nextElementSibling;
        while (nextElement && nextElement.classList.contains('skill-item')) {
            if (nextElement.style.display !== 'none') {
                hasVisibleSkills = true;
                break;
            }
            nextElement = nextElement.nextElementSibling;
        }
        
        // 根据是否有可见的技能项来决定是否显示分类标题
        div.style.display = hasVisibleSkills ? 'block' : 'none';
    });

    // 更新技能计数器
    const skillCounter = document.getElementById('passiveSkillCounter');
    if (skillCounter) {
        skillCounter.textContent = `显示 ${visibleSkillsCount} 个技能`;
    }
}


// 清空被动技能
function clearPassiveSkills() {
    const skillItems = document.querySelectorAll('#passiveSkillsList .skill-item input[type="checkbox"]');
    skillItems.forEach(item => {
        item.checked = false;
    });
    updateSelectedPassiveSkills();
}

// 全选被动技能
function selectAllPassiveSkills() {
    const skillItems = document.querySelectorAll('#passiveSkillsList .skill-item input[type="checkbox"]:not(:disabled)');
    skillItems.forEach(item => {
        item.checked = true;
    });
    updateSelectedPassiveSkills();
}

// 高亮匹配的文本
function highlightText(element, searchText) {
    const nodes = element.childNodes;
    nodes.forEach(node => {
        if (node.nodeType === 3) { // 文本节点
            const text = node.textContent;
            const highlightedText = text.replace(new RegExp(searchText, 'gi'), match => 
                `<span class="highlight">${match}</span>`
            );
            if (text !== highlightedText) {
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1) { // 元素节点
            // 跳过已经高亮的元素和输入框
            if (!node.classList.contains('highlight') && node.tagName !== 'INPUT') {
                highlightText(node, searchText);
            }
        }
    });
}

// 移除高亮
function removeHighlight(element) {
    const highlights = element.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        // 如果父元素只包含这个文本节点，则合并相邻的文本节点
        parent.normalize();
    });
}

// 更新已选择的被动技能显示
function updateSelectedPassiveSkills() {
    const selectedSkillsContainer = document.getElementById('selectedPassiveSkills');
    const selectedSkills = document.querySelectorAll('#passiveSkillsList .skill-item input[type="checkbox"]:checked');
    
    selectedSkillsContainer.innerHTML = '';
    selectedSkills.forEach(skill => {
        const skillItem = skill.closest('.skill-item');
        const skillName = skillItem.querySelector('.skill-name').textContent;
        const skillDescription = skillItem.querySelector('.skill-description')?.textContent;
        const skillCategory = skillItem.getAttribute('data-category');
        const categoryName = window.getPassiveCategoryName ? window.getPassiveCategoryName(skillCategory) : skillCategory;
        
        const skillBadge = document.createElement('div');
        skillBadge.className = `selected-skill-badge p-2 bg-light rounded mb-2 passive-${skillCategory}`;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'fw-bold';
        nameSpan.textContent = skillName;
        
        const categorySpan = document.createElement('span');
        categorySpan.className = 'badge bg-secondary ms-2';
        categorySpan.textContent = categoryName;
        
        skillBadge.appendChild(nameSpan);
        skillBadge.appendChild(categorySpan);
        
        if (skillDescription) {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'small text-muted mt-1';
            descriptionDiv.textContent = skillDescription;
            skillBadge.appendChild(descriptionDiv);
        }
        
        selectedSkillsContainer.appendChild(skillBadge);
    });
}
