const cron = require('node-cron');

const CodeModule = require('../app/module/codeModule');

const clearCronJobs = () => {
    cron.schedule('0 * * * *', async () => {
        const now = new Date();
        try {
            await CodeModule.deleteMany({
                createdAt: { $lt: now },
            });
        } catch (err) {
            console.log('Lỗi khi xóa mã xác thực đã hết hạn:', err);
        }
    });
};

module.exports = { clearCronJobs };
