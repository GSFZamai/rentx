import React from 'react';
import {Calendar as CustomCalendar, LocaleConfig} from 'react-native-calendars';
import {Feather} from '@expo/vector-icons';
import {useTheme} from 'styled-components'

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    dayNamesShort: ['SEG', 'TER', 'QUA', 'QUI', 'SEX'],
    today: 'Hoje'
}

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
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

            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 20,
                marginBottom: 20
            }}

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