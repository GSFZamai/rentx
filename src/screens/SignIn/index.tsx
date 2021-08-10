import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';


import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer,
} from './styles';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const theme = useTheme();
    return (
        <Container>
            <Header>
                <Title>
                    Estamos{'\n'}
                    quase lá.
                </Title>
                <SubTitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível.
                </SubTitle>
            </Header>

            <Form>
                <Input
                    iconName='mail'
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setEmail}
                    value={email}
                />

                <PasswordInput
                    iconName='lock'
                    placeholder='Senha'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={setSenha}
                    value={senha}
                />

            </Form>

            <Footer>
                <Button
                    title='Login'
                    enabled={false}
                    onPress={() => { }}
                />
                <Button
                    title='Criar conta gratuita'
                    onPress={() => { }}
                    light
                    color={theme.colors.background_secondary}
                />
            </Footer>
        </Container>
    )
}