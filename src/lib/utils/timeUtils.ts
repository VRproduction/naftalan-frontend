export const formatDateTime = (isoDate: string): string => {
    const date = new Date(isoDate);

    // Gün, Ay ve Yıl
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Saat ve Dakika
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    // Gün, Ay ve Yıl
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};


export const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate);

    // Saat ve Dakika
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
};


export const getCurrentTimeISO = (): string => {
    const currentTime = new Date();
    return currentTime.toISOString();
  };