export const targetLanguage = (str: string | undefined) => {
    if (!str) {
        return "英文";
    }
    return /[\u4E00-\u9FA5]/.test(str) ? "英文" : "中文";
};

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 3) {
        return "刚刚";
    }

    const isToday = now.toDateString() === date.toDateString();
    const isYesterday =
        new Date(now.setDate(now.getDate() - 1)).toDateString() ===
        date.toDateString();

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    if (isToday) {
        return `今天 ${formatTime(date)}`;
    }

    if (isYesterday) {
        return `昨天 ${formatTime(date)}`;
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = formatTime(date);

    if (year === now.getFullYear()) {
        return `${month}月${day}日 ${time}`;
    }

    return `${year}年${month}月${day}日 ${time}`;
}

// 进制转换函数
export function bytesToSize(bytes: number, fixed?: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024,
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        (bytes / Math.pow(k, i)).toFixed(fixed !== undefined ? fixed : 2) +
        " " +
        sizes[i]
    );
}
