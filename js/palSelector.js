// 加载帕鲁数据
async function loadPalData() {
    try {
        const response = await fetch('js/pal.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading pal data:', error);
        return {};
    }
}

// 初始化帕鲁选择器
async function initializePalSelector() {
    // 显示加载动画
    showLoadingIndicator();
    
    const palData = await loadPalData();
    const palSelector = document.getElementById('palSelector');
    const palIdInput = document.getElementById('palId');

    // 填充选择器选项
    for (const [id, name] of Object.entries(palData)) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${name} (${id})`;
        palSelector.appendChild(option);
    }

    // 初始化 Select2 并添加自定义模板
    $(palSelector).select2({
        placeholder: "请选择帕鲁...",
        allowClear: true,
        width: '100%',
        templateResult: formatPalOption,
        templateSelection: formatPalSelection
    });
    
    // 隐藏加载动画
    hideLoadingIndicator();

    // 添加事件监听器
$(palSelector).on('change', (event) => {
    const selectedPalId = event.target.value;
    palIdInput.value = selectedPalId;
    
    // 更新昵称输入框
    const nicknameInput = document.getElementById('nickname');
    if (nicknameInput) {
        nicknameInput.value = selectedPalId;
    }
    
    // 添加选择动画效果
    if (selectedPalId) {
        const palInfoSection = document.querySelector('.card-body');
        if (palInfoSection) {
            palInfoSection.classList.add('highlight-selection');
            setTimeout(() => {
                palInfoSection.classList.remove('highlight-selection');
            }, 800);
        }
        
        // 显示提示消息
        showPalToast(`已选择帕鲁: ${selectedPalId}`, 'success');
    }
});

    // 添加帕鲁ID输入框的事件监听器
    palIdInput.addEventListener('input', (event) => {
        const selectedPal = Array.from(palSelector.options).find(option => option.value === event.target.value);
        if (selectedPal) {
            $(palSelector).val(selectedPal.value).trigger('change');
        } else {
            $(palSelector).val(null).trigger('change');
        }
    });
}

// 当 DOM 和 jQuery 加载完成后初始化
$(document).ready(() => {
    // 确保 Select2 已加载
    if (typeof $.fn.select2 === 'function') {
        initializePalSelector();
    } else {
        console.error('Select2 not loaded properly');
    }
});

// 更新帕鲁选择器
function updatePalSelector(palId) {
    const palSelector = document.getElementById('palSelector');
    if (palSelector) {
        $(palSelector).val(palId).trigger('change');
        
        // 更新昵称输入框
        const nicknameInput = document.getElementById('nickname');
        if (nicknameInput) {
            nicknameInput.value = palId;
        }
        
        // 显示提示消息
        if (palId) {
            showPalToast(`已自动选择帕鲁: ${palId}`, 'success');
        }
    } else {
        console.error('帕鲁选择器元素不存在');
    }
}

// 格式化帕鲁选项
function formatPalOption(pal) {
    if (!pal.id) {
        return pal.text;
    }
    
    // 提取帕鲁名称和ID
    const match = pal.text.match(/(.+) \((.+)\)/);
    if (!match) return pal.text;
    
    const palName = match[1];
    const palId = match[2];
    
    // 创建自定义选项模板
    const $option = $(
        `<div class="d-flex align-items-center py-1">
            <div class="pal-icon me-2">
                <i class="bi bi-circle-fill text-primary"></i>
            </div>
            <div>
                <div class="fw-bold">${palName}</div>
                <small class="text-muted">${palId}</small>
            </div>
        </div>`
    );
    
    return $option;
}

// 格式化已选择的帕鲁
function formatPalSelection(pal) {
    if (!pal.id) {
        return pal.text;
    }
    
    // 提取帕鲁名称和ID
    const match = pal.text.match(/(.+) \((.+)\)/);
    if (!match) return pal.text;
    
    const palName = match[1];
    
    return palName;
}

// 显示加载指示器
function showLoadingIndicator() {
    const container = document.querySelector('.card-body');
    if (container) {
        const loader = document.createElement('div');
        loader.id = 'pal-loader';
        loader.className = 'text-center py-3';
        loader.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">加载中...</span></div><p class="mt-2">加载帕鲁数据中...</p>';
        
        container.prepend(loader);
    }
}

// 隐藏加载指示器
function hideLoadingIndicator() {
    const loader = document.getElementById('pal-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
}

// 显示提示消息
// 使用全局 showToast 函数，确保参数顺序正确
function showPalToast(message, type = 'success') {
    window.showToast(message, type);
}

// 将 updatePalSelector 函数添加到全局作用域
window.updatePalSelector = updatePalSelector;