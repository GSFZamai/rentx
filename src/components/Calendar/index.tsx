import React from 'react';
import {
    Calendar as CustomCalendar, 
    DateCallbackHandler,
    LocaleConfig,
} from 'react-native-calendars';
import {Feather} from '@expo/vector-icons';
import {useTheme} from 'styled-components';

import { ptBr } from './localeConfig'

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

interface MarkedDateProps {
    [date: string]: {
        marked?: boolean;
        dotColor?: string;
        color?: string;
        textColor?: string;
        startingDay?: boolean;
        endingDay?: boolean;
        disableTouchEvent?: boolean
    }
    
}


interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: DateCallbackHandler;
}

export function Calendar({markedDates, onDayPress}: CalendarProps) {
    const theme = useTheme();

    return(
        <CustomCalendar 
            minDate={new Date()}
            renderArrow={(direction) => 
                <Feather 
                    size={24}
                    name= {direction === 'left' ?  "chevron-left" : "chevron-right"}
                    color={theme.colors.text}
                />
            }
            firstDay={1}
            markingType="period"
            onDayPress={onDayPress}
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 20,
                marginBottom: 20
            }}
            markedDates={markedDates}
            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontFamily: theme.fonts.secondady_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}
        />
    )
}

export {
    MarkedDateProps,
    DayProps
}