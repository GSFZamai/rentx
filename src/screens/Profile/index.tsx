import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { useNetInfo } from '@react-native-community/netinfo'

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

import {
    Container,
    Header,
    HeaderTop,
    Title,
    LogoutButtonContainer,
    PhotoContainer,
    Photo,
    ChangePhotoButtonContainer,
    Content,
    Options,
    Option,
    OptionTitle,
    Form
} from './styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
type SelectedFormOptions = 'dataForm' | 'passwordForm';

export function Profile() {
    const { user, signOut, updateUser } = useAuth();
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyNewPassword, setVerifyNewPassword] = useState('');
    const [selectedForm, setSelectedForm] = useState<SelectedFormOptions>('dataForm')
    const navigation = useNavigation();
    const theme = useTheme();
    const netInfo = useNetInfo();

    function handleBackButton() {
        navigation.goBack();
    }

    function handleLogOut() {
        Alert.alert(
            'Tem certeza?',
            'Para realizar o login você precisará de conexão com a internet!',
            [
                {
                    text: 'Cancelar',
                    onPress: () => { }
                },
                {
                    text: 'Sair',
                    onPress: () => signOut()
                }
            ]
        )
    }

    async function handleChangePhoto() {
        async function imageFromCamera() {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            if (result.cancelled) {
                return;
            } else {
                setAvatar(result.uri);
            }
        }

        async function imageFromGallery() {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            if (result.cancelled) {
                return;
            } else {
                setAvatar(result.uri);
            }
        }

        Alert.alert(
            'Onde acessar?',
            'Você gostaria de pegar sua foto de onde?',
            [
                {
                    text: 'Câmera',
                    onPress: () => imageFromCamera()
                },
                {
                    text: 'Galeria',
                    onPress: () => imageFromGallery()
                },
            ]
        )
    }

    async function handleUpdateUser() {
        try {
            const schema = yup.object().shape({
                driverLicense: yup.string()
                    .required('CNH é obrigatória!'),
                name: yup.string()
                    .required('Nome é obrigatório!')
            });

            await schema.validate({ driverLicense, name });

            await updateUser({
                ...user,
                name,
                avatar,
                driver_license: driverLicense
            });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                Alert.alert('Opa!', error.message);
            } else {
                Alert.alert('Não foi possivel realizar a alteração do cadastro');
            }
        }
    }

    function handleChangeForm(form: SelectedFormOptions) {
        if(netInfo.isConnected === false && form === 'passwordForm') {
            setSelectedForm('dataForm');
            Alert.alert('Sem conexão!', 'Para alterar sua senha, você precisa ter conexão com a internet');
        }else {
            setSelectedForm(form);
        }

    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.background_secondary}
                                onPress={handleBackButton}
                            />
                            <Title>Editar Perfil</Title>
                            <LogoutButtonContainer onPress={handleLogOut}>
                                <Feather
                                    color={theme.colors.text_detail}
                                    size={24}
                                    name="power"
                                />
                            </LogoutButtonContainer>
                        </HeaderTop>
                        <PhotoContainer>
                            {
                                !!avatar &&

                                <Photo
                                    source={{
                                        uri: avatar
                                    }}
                                />}
                            <ChangePhotoButtonContainer onPress={handleChangePhoto}>
                                <Feather
                                    color={theme.colors.background_secondary}
                                    size={24}
                                    name='camera'
                                />
                            </ChangePhotoButtonContainer>
                        </PhotoContainer>
                    </Header>
                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option active={selectedForm === 'dataForm'}>
                                <OptionTitle
                                    active={selectedForm === 'dataForm'}
                                    onPress={() => handleChangeForm('dataForm')}
                                >
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option active={selectedForm === 'passwordForm'}>
                                <OptionTitle
                                    active={selectedForm === 'passwordForm'}
                                    onPress={() => handleChangeForm('passwordForm')}
                                >
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {
                            selectedForm === 'dataForm'

                                ?

                                <Form>

                                    <Input
                                        iconName='user'
                                        value={name}
                                        onChangeText={setName}
                                        defaultValue={user.name}
                                    />

                                    <Input
                                        iconName='mail'
                                        editable={false}
                                        defaultValue={user.email}
                                    />

                                    <Input
                                        iconName='credit-card'
                                        defaultValue={user.driver_license}
                                        value={driverLicense}
                                        onChangeText={setDriverLicense}
                                    />

                                </Form>

                                :

                                <Form >

                                    <PasswordInput
                                        iconName='lock'
                                        value={password}
                                        onChangeText={setPassword}
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        value={verifyNewPassword}
                                        onChangeText={setVerifyNewPassword}
                                    />

                                </Form>
                        }
                        <Button
                            title='Salvar alterações'
                            onPress={handleUpdateUser}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}