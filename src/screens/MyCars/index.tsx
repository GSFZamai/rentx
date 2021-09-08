import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, FlatList, } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import { useIsFocused } from '@react-navigation/core';

import { BackButton } from '../../components/BackButton';
import { CarCard } from '../../components/CarCard';
import { Car as CarModel } from '../../database/model/Car';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    SchedulesContainer,
    SchedulesTitle,
    SchedulesQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { getPlatformDates } from '../../utils/getPlatformDates';

interface SchedulesProps {
    car: CarModel,
    id: number;
    end_date: string;
    start_date: string;
}


export function MyCars() {
    const navigation = useNavigation();
    const [userRentals, setUserRentals] = useState<SchedulesProps[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();

    const theme = useTheme();

    function handleBackButtonClick() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const rentDates = await api.get('/rentals');
                const userRentDate = rentDates.data.map((data: SchedulesProps) => {
                    return {
                        car: data.car,
                        id: data.id,
                        start_date: format(getPlatformDates(parseISO(data.start_date)), 'dd/MM/yyyy'),
                        end_date: format(getPlatformDates(parseISO(data.end_date)), 'dd/MM/yyyy'),
                    }
                });
                setUserRentals(userRentDate);
            } catch (error) {
                console.log(error);
                Alert.alert('Não foi possível carregar seus agendamentos');
            } finally {
                setIsLoading(false);
            }

        }

        fetchCars();
    }, [isFocused]);

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor='transparent'
            />
            <Header>
                <BackButton
                    color={theme.colors.shape}
                    onPress={handleBackButtonClick}
                />
                <Title>
                    Seus agendamentos, estão aqui.
                </Title>

                <Subtitle>
                    Conforto, segurança e praticidade.
                </Subtitle>
            </Header>

            <Content>

                {
                    isloading ?


                            <LoadingAnimation 
                                animation='loadingCar2'
                            />

                        :

                        <>
                            <SchedulesContainer>
                                <SchedulesTitle>Agendamentos feitos</SchedulesTitle>
                                <SchedulesQuantity>{userRentals.length}</SchedulesQuantity>
                            </SchedulesContainer>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={userRentals}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <CarWrapper>
                                        <CarCard carDetails={item.car} />
                                        <CarFooter>
                                            <CarFooterTitle>
                                                Período
                                            </CarFooterTitle>
                                            <CarFooterPeriod>
                                                <CarFooterDate>{item.start_date}</CarFooterDate>
                                                <AntDesign 
                                                    name='arrowright'
                                                    size={20}
                                                    color={theme.colors.title}
                                                    style={{ marginHorizontal: 10 }}

                                                />
                                                <CarFooterDate>{item.end_date}</CarFooterDate>
                                            </CarFooterPeriod>
                                        </CarFooter>
                                    </CarWrapper>
                                )}
                            />
                        </>
                }
            </Content>
        </Container>
    )
}