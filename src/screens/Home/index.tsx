import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    Header,
    HeaderContent,
    Title,
    CarList,
    ActivityIndicatorContainer
} from './styles';

export function Home({ navigation }) {
    const [carList, setCarList] = useState<CarDTO[]>([]);
    const [loadingCars, setLoadingCars] = useState(true);
    
    const theme = useTheme();


    function handleCardClick(car: CarDTO) {
        navigation.navigate('CarDetails', {car: car});
    }

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await api.get('/cars');
                setCarList(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingCars(false);
            }
        }

        getData();
    }, [])

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        heigth={RFValue(12)}
                    />
                    <Title>Total de 12 carros</Title>
                </HeaderContent>
            </Header>

            {
                loadingCars ?
                <ActivityIndicatorContainer>
                    <ActivityIndicator 
                        size='large'
                        color={theme.colors.main}
                    />
                </ActivityIndicatorContainer>

                :

                    <CarList
                        data={carList}
                        keyExtractor={(item: CarDTO) => item.id}
                        renderItem={({ item }) =>
                            <CarCard carDetails={item} onPress={() => handleCardClick(item)} />
                        }

                    />
            }
        </Container>
    )
}