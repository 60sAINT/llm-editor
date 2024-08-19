import { saveAs } from "file-saver";

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

export function exportFile(data: any, fileName: string) {
  const blobData = new Blob([data]);
  const downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(blobData);
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

const downloadZipFile = (blob: BlobPart, filename = "downloaded.zip") => {
  try {
    const zipBlob = new Blob([blob], { type: "application/zip" });
    saveAs(zipBlob, filename);
  } catch (error) {
    console.error("下载文件失败:", error);
  }
};

export default downloadZipFile;

export const countLeafNodes = (nodes: any) => {
  let count = 0;
  const traverse = (nodeList: any[]) => {
    nodeList.forEach((node) => {
      if (node.isLeaf) {
        count++;
      } else if (node.children) {
        traverse(node.children);
      }
    });
  };
  traverse(nodes);
  return count;
};
