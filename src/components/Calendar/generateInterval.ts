import { eachDayOfInterval, format } from 'date-fns';
import { getPlatformDates } from '../../utils/getPlatformDates';
import {DayProps, MarkedDateProps} from './'
import theme from '../../styles/theme';

export function generateInterval(initialDate: DayProps, finalDate: DayProps) {
    let dateInterval: MarkedDateProps = {};

    eachDayOfInterval({start: new Date(initialDate.timestamp), end: new Date(finalDate.timestamp)})
    .forEach(item => {
        const date = format(getPlatformDates(item), 'yyyy-MM-dd');
        dateInterval = {
            ...dateInterval,
            [date]: {
                color: initialDate.dateString === date || finalDate.dateString === date 
                ? theme.colors.main : theme.colors.main_light,
                textColor: initialDate.dateString === date || finalDate.dateString === date 
                ? theme.colors.background_secondary : theme.colors.main,
            }
        }
    })

    return dateInterval;
}