import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';
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

interface SchedulesProps {
    car: CarDTO,
    user_id: string;
    id: number;
    endDate: string;
    startDate: string;
}

export function MyCars() {
    const navigation = useNavigation();
    const [userRentals, setUserRentals] = useState<SchedulesProps[]>([]);
    const [isloading, setIsLoading] = useState(true);

    const theme = useTheme();

    function handleBackButtonClick() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const rendDates = await api.get('/schedules_byuser?user_id=2');
                const userRentDate = rendDates.data;
                setUserRentals(userRentDate);
                console.log(userRentDate);
            } catch (error) {
                console.log(error);
                Alert.alert('Não foi possível carregar seus agendamentos');
            } finally {
                setIsLoading(false);
            }

        }

        fetchCars();
    }, []);

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
                                                <CarFooterDate>{item.startDate}</CarFooterDate>
                                                <AntDesign 
                                                    name='arrowright'
                                                    size={20}
                                                    color={theme.colors.title}
                                                    style={{ marginHorizontal: 10 }}

                                                />
                                                <CarFooterDate>{item.endDate}</CarFooterDate>
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