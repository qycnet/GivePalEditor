// 导入导出功能处理

// 处理文件导入
function handleFileImport(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('未选择文件'));
            return;
        }

        if (!file.name.toLowerCase().endsWith('.json')) {
            reject(new Error('请选择 JSON 文件'));
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                console.log('开始解析导入的JSON文件...');
                let jsonData;
                try {
                    jsonData = JSON.parse(event.target.result);
                    console.log('JSON解析成功:', Object.keys(jsonData));
                } catch (parseError) {
                    console.error('JSON解析错误:', parseError);
                    reject(new Error('JSON 格式错误: ' + parseError.message));
                    return;
                }

                // 验证导入的数据结构
                if (!validateImportData(jsonData)) {
                    console.error('数据验证失败');
                    reject(new Error('数据格式不符合要求'));
                    return;
                }

                console.log('数据验证通过，开始处理数据...');

                // 确保所有必要的数组都存在并且是数组类型
                const arrays = ['ActiveSkills', 'LearntSkills', 'Passives', 'DisableWorkPreferences'];
                arrays.forEach(array => {
                    if (!Array.isArray(jsonData[array])) {
                        console.warn(`字段 ${array} 不是数组，正在初始化为空数组`);
                        jsonData[array] = [];
                    } else {
                        console.log(`${array} 数组包含 ${jsonData[array].length} 个元素`);
                    }
                });

                // 确保必要的对象字段存在
                const objects = ['PalSouls', 'IVs'];
                objects.forEach(obj => {
                    if (!jsonData[obj] || typeof jsonData[obj] !== 'object') {
                        console.warn(`字段 ${obj} 不是对象，正在初始化为空对象`);
                        jsonData[obj] = {};
                    } else {
                        console.log(`${obj} 对象包含 ${Object.keys(jsonData[obj]).length} 个属性`);
                    }
                });

                // 确保基本字段都有合理的默认值
                if (!jsonData.PalID) jsonData.PalID = "";
                if (!jsonData.Nickname) jsonData.Nickname = "";
                if (!jsonData.Gender) jsonData.Gender = "None";
                if (typeof jsonData.Level !== 'number') jsonData.Level = 1;
                if (typeof jsonData.Exp !== 'number') jsonData.Exp = 0;
                if (typeof jsonData.Shiny !== 'boolean') jsonData.Shiny = false;
                
                // 确保IVs对象存在并包含所需的字段
if (!jsonData.IVs || typeof jsonData.IVs !== 'object') {
    jsonData.IVs = {};
}
const ivFields = ['Health', 'AttackMelee', 'AttackShot', 'Defense'];
ivFields.forEach(field => {
    if (typeof jsonData.IVs[field] !== 'number') {
        jsonData.IVs[field] = Math.floor(Math.random() * 12) + 20;
    }
});
                
                console.log('数据处理完成，准备返回处理后的数据');
                resolve(jsonData);
            } catch (error) {
                console.error('处理文件时发生错误:', error);
                reject(new Error('处理文件失败: ' + error.message));
            }
        };
        
        reader.onerror = (error) => {
            console.error('读取文件失败:', error);
            reject(new Error('读取文件失败'));
        };
        
        console.log('开始读取文件...');
        reader.readAsText(file);
    });
}

// 处理文件导出
function handleFileExport(data) {
    try {
        // 深拷贝当前数据
        const exportData = JSON.parse(JSON.stringify(data));
        
        // 确保所有数组都已排序
        if (Array.isArray(exportData.ActiveSkills)) {
            exportData.ActiveSkills.sort((a, b) => a.localeCompare(b));
        }
        if (Array.isArray(exportData.LearntSkills)) {
            exportData.LearntSkills.sort((a, b) => a.localeCompare(b));
        }
        if (Array.isArray(exportData.Passives)) {
            exportData.Passives.sort((a, b) => a.localeCompare(b));
        }
        if (Array.isArray(exportData.DisableWorkPreferences)) {
            exportData.DisableWorkPreferences.sort((a, b) => a.localeCompare(b));
        }
        
        // 创建并下载文件
        const jsonString = JSON.stringify(exportData, null, 4); // 使用4空格缩进以匹配示例文件格式
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${exportData.PalID}_${exportData.Nickname}.json`;
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);

        // 显示成功提示
        showToast('JSON导出成功', 'success');
    } catch (error) {
        console.error('导出数据时出错:', error);
        throw new Error('导出数据失败: ' + error.message);
    }
}

// 验证导入的数据结构
function validateImportData(data) {
    try {
        // 检查是否为有效的对象
        if (!data || typeof data !== 'object') {
            console.error('无效的数据格式：不是一个对象');
            return false;
        }

        // 检查必要的字段
        const requiredFields = [
            'PalID',
            'Nickname',
            'Gender',
            'Level',
            'Exp',
            'ActiveSkills',
            'LearntSkills',
            'Passives',
            'DisableWorkPreferences'
        ];

        for (const field of requiredFields) {
            if (!(field in data)) {
                console.error(`缺少必要字段: ${field}`);
                return false;
            }
        }

        // 验证数组字段及其内容
        const arrayFields = ['ActiveSkills', 'LearntSkills', 'Passives', 'DisableWorkPreferences'];
        for (const field of arrayFields) {
            if (!Array.isArray(data[field])) {
                console.error(`字段 ${field} 必须是数组`);
                return false;
            }
            // 验证数组元素都是字符串
            if (!data[field].every(item => typeof item === 'string')) {
                console.error(`${field} 数组中的所有元素必须是字符串`);
                return false;
            }
        }

        // 验证对象字段
        const objectFields = ['PalSouls', 'IVs'];
        for (const field of objectFields) {
            if (field in data) {
                if (typeof data[field] !== 'object' || data[field] === null) {
                    console.error(`字段 ${field} 必须是对象`);
                    return false;
                }
                // 验证对象的值是否都是数字
                if (!Object.values(data[field]).every(value => typeof value === 'number')) {
                    console.error(`${field} 对象中的所有值必须是数字`);
                    return false;
                }
            }
        }

        // 验证基本数据类型
        if (typeof data.PalID !== 'string' || 
            typeof data.Nickname !== 'string' || 
            typeof data.Gender !== 'string' || 
            typeof data.Level !== 'number' || 
            typeof data.Exp !== 'number') {
            console.error('基本字段类型不正确');
            return false;
        }
        
        // 确保IVs对象存在并且所有值都是数字
if (!data.IVs || typeof data.IVs !== 'object') {
    data.IVs = {};
}
['Health', 'AttackMelee', 'AttackShot', 'Defense'].forEach(field => {
    if (typeof data.IVs[field] !== 'number') {
        const numValue = parseInt(data.IVs[field]);
        if (!isNaN(numValue)) {
            data.IVs[field] = numValue;
            console.log(`已将 IVs.${field} 转换为数字: ${numValue}`);
        } else {
            console.warn(`无法将 IVs.${field} 转换为数字，使用默认值`);
            data.IVs[field] = Math.floor(Math.random() * 100) + 1; // 生成1-100之间的随机数
        }
    }
});

        return true;
    } catch (error) {
        console.error('验证数据时出错:', error);
        return false;
    }
}

// 绑定导入导出事件
function bindImportExportEvents() {
    try {
        console.log('开始绑定导入导出事件...');
        
        // 获取必要的DOM元素
        const loadJsonBtn = document.getElementById('loadJsonBtn');
        const generateJsonBtn = document.getElementById('generateJsonBtn');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        
        // 绑定导入按钮点击事件
        if (loadJsonBtn) {
            loadJsonBtn.addEventListener('click', () => {
                fileInput.click();
            });
            
            // 设置文件导入处理
            setupFileImport(fileInput, 
                // 成功回调
                (data) => {
                    window.currentPalData = data;
                    loadDefaultData();
                    showToast('数据导入成功', 'success');
                },
                // 错误回调
                (error) => {
                    showToast(error, 'danger');
                }
            );
        } else {
            console.error('找不到导入按钮元素');
        }
        
        // 绑定导出按钮点击事件
        if (generateJsonBtn) {
            generateJsonBtn.addEventListener('click', () => {
                try {
                    handleFileExport(window.currentPalData);
                    // 移除重复的成功提示，因为handleFileExport函数中已经包含了提示
                } catch (error) {
                    showToast(error.message, 'danger');
                }
            });
        } else {
            console.error('找不到导出按钮元素');
        }
        
        console.log('导入导出事件绑定完成');
    } catch (error) {
        console.error('绑定导入导出事件时出错:', error);
        showToast('绑定导入导出事件失败: ' + error.message, 'danger');
    }
}

// 设置文件导入监听器
function setupFileImport(fileInput, onSuccess, onError) {
    if (!fileInput) {
        console.error('文件输入元素不存在');
        return;
    }

    console.log('设置文件导入监听器');
    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.warn('未选择文件');
            return;
        }

        console.log(`选择的文件: ${file.name}, 大小: ${file.size} 字节`);
        
        try {
            console.log('开始处理文件导入...');
            const data = await handleFileImport(file);
            console.log('文件导入处理成功，准备更新UI');
            
            // 在调用成功回调前记录日志
            console.log('导入的数据概览:', {
                PalID: data.PalID,
                Nickname: data.Nickname,
                ActiveSkills: Array.isArray(data.ActiveSkills) ? data.ActiveSkills.length : 'not an array',
                LearntSkills: Array.isArray(data.LearntSkills) ? data.LearntSkills.length : 'not an array',
                Passives: Array.isArray(data.Passives) ? data.Passives.length : 'not an array'
            });
            
            // 调用成功回调
            onSuccess(data);
            console.log('导入数据更新完成');

            // 更新帕鲁选择器
            if (window.updatePalSelector && typeof window.updatePalSelector === 'function') {
                window.updatePalSelector(data.PalID);
            } else {
                console.warn('updatePalSelector 函数未定义或不可用');
            }
            
        } catch (error) {
            console.error('导入文件时出错:', error);
            onError(error.message);
            
            // 清除文件输入，允许重新选择同一个文件
            fileInput.value = '';
        }
    });
    
    console.log('文件导入监听器设置完成');
}