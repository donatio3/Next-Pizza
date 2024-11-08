import axios from 'axios'

// axios 

export const axiosInstance = axios.create({ // NEXT_PUBLIC - Ключевые слова для production 
    baseURL: process.env.NEXT_PUBLIC_API_URL, // ЗАПИСЫВАЕМ В ПЕРМЕНУЮ ОКРУЖЕНИЯ - env Файл
})

