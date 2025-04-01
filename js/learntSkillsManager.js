// @ts-nocheck

// 已学技能管理模块
const learntSkillsManager = {
    // 全选当前可见的已学技能
    selectAllLearntSkills: function() {
        try {
            console.log('开始全选已学技能...');
            const skillsList = document.getElementById('learntSkillsList');
            if (!skillsList) {
                showToast('找不到技能列表', 'danger');
                return;
            }

            // 获取当前可见的技能项
            const visibleSkills = Array.from(skillsList.getElementsByClassName('skill-item'))
                .filter(item => item.style.display !== 'none' && !item.classList.contains('selected'));

            if (visibleSkills.length === 0) {
                showToast('当前没有可选择的技能', 'info');
                return;
            }

            // 收集所有可见且未选中技能的ID
            const skillIds = visibleSkills.map(item => item.dataset.skillId);

            // 更新选中状态
            visibleSkills.forEach(item => {
                item.classList.add('selected');
            });

            // 更新数据（使用Set去重）
            if (!Array.isArray(currentPalData.LearntSkills)) {
                currentPalData.LearntSkills = [];
            }
            currentPalData.LearntSkills = Array.from(new Set([...currentPalData.LearntSkills, ...skillIds]));

            // 更新显示
            updateSelectedLearntSkills();
            showToast(`已全选${visibleSkills.length}个技能`, 'success');
            console.log('已学技能全选完成，新增技能数量:', visibleSkills.length);
        } catch (error) {
            console.error('全选已学技能时出错:', error);
            showToast('全选已学技能失败: ' + error.message, 'danger');
        }
    },

    // 清空所有已学技能
    clearLearntSkills: function() {
        try {
            console.log('开始清空已学技能...');
            if (!Array.isArray(currentPalData.LearntSkills) || currentPalData.LearntSkills.length === 0) {
                showToast('已学技能列表已经是空的', 'info');
                return;
            }

            // 清空数据
            currentPalData.LearntSkills = [];

            // 更新UI中的选中状态
            const skillsList = document.getElementById('learntSkillsList');
            if (skillsList) {
                const skillItems = skillsList.getElementsByClassName('skill-item');
                Array.from(skillItems).forEach(item => {
                    item.classList.remove('selected');
                });
            }

            // 更新显示
            updateSelectedLearntSkills();
            showToast('已清空所有已学技能', 'success');
            console.log('已学技能清空完成');
        } catch (error) {
            console.error('清空已学技能时出错:', error);
            showToast('清空已学技能失败: ' + error.message, 'danger');
        }
    },

    // 初始化事件监听
    initialize: function() {
        try {
            console.log('初始化已学技能管理器...');

            // 绑定全选按钮事件 - 使用箭头函数保留上下文
            const selectAllBtn = document.getElementById('selectAllLearntSkills');
            if (selectAllBtn) {
                selectAllBtn.addEventListener('click', () => {
                    this.selectAllLearntSkills();
                });
                console.log('全选按钮事件绑定成功');
            } else {
                console.warn('未找到全选已学技能按钮');
            }

            // 绑定清空按钮事件 - 使用箭头函数保留上下文
            const clearBtn = document.getElementById('clearLearntSkills');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.clearLearntSkills();
                });
                console.log('清空按钮事件绑定成功');
            } else {
                console.warn('未找到清空已学技能按钮');
            }

            console.log('已学技能管理器初始化完成');
        } catch (error) {
            console.error('初始化已学技能管理器时出错:', error);
            showToast('初始化已学技能管理器失败: ' + error.message, 'danger');
        }
    }
};

// 导出模块
window.learntSkillsManager = learntSkillsManager;