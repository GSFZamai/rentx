import React, { useEffect, useState } from 'react';
import { Button, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize  } from '@nozbe/watermelondb/sync';

import { LoadingAnimation } from '../../components/LoadingAnimation';
import { api } from '../../services/api';
import { database } from '../../database';
import { Car as CarModel } from '../../database/model/Car';
import { CarCard } from '../../components/CarCard';
import Logo from '../../assets/logo.svg';

import {
    Container,
    Header,
    HeaderContent,
    Title,
    CarList,
    ActivityIndicatorContainer,
} from './styles';

export function Home() {
    const [carList, setCarList] = useState<CarModel[]>([]);
    const [loadingCars, setLoadingCars] = useState(false);
    const navigation = useNavigation();
    const netInfo = useNetInfo();

    function handleCardClick(car: CarModel) {
        navigation.navigate('CarDetails', { car: car })
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api
                .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
                const { changes, latestVersion } = response.data;
                return { changes, timestamp: latestVersion};
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                console.log("#### TO SERVER ####");
                console.log(changes);
                try {
                    const response = await api.post('/users/sync', user);
                    console.log(response.status);   
        
                }catch(error) {
                    console.log(error);
                }
            },

        })
    }

    useEffect(() => {
        if(netInfo.isConnected === true) {
            offlineSynchronize();
        }   
    }, [netInfo.isConnected]);

    useEffect(() => {
        let isMounted = true;

        async function getData() {
            try {
                const carCollection = database.get<CarModel>('cars');
                const cars = await carCollection.query().fetch();
                if (isMounted) {
                    setCarList(cars);
                }
            } catch (error) {
                console.log(error)
            } finally {
                if (isMounted) {
                    setLoadingCars(false);
                }
            }
        }  

        getData();
        return () => {
            isMounted = false;
        }
    }, []);



    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
                hidden={false}
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        heigth={RFValue(12)}
                    />
                    {
                        !loadingCars &&
                        <Title>Total de {carList.length} carros</Title>

                    }
                </HeaderContent>
            </Header>
            {
                loadingCars ?
                    <ActivityIndicatorContainer>
                        <LoadingAnimation animation='loadingCar' />
                    </ActivityIndicatorContainer>

                    :

                    <CarList
                        data={carList}
                        keyExtractor={(item: CarModel) => item.id}
                        renderItem={({ item }) =>
                            <CarCard carDetails={item} onPress={() => handleCardClick(item)} />
                        }

                    />


            }
        </Container>
    )
}