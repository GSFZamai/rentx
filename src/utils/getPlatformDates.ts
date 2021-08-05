import { Platform } from 'react-native';
import { addDays } from 'date-fns';

export function getPlatformDates(date: Date) {
    if(Platform.OS === 'android') {
        return addDays(date, 1);
    }else {
        return date;
    }
}