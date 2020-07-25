import React from "react";
import {Card} from "../widgets/Card";
import styled from "styled-components";
import {Button} from "../widgets/Button";

const Layout = styled.div`
    display: grid;
    place-items: center;
`

export const Login = () => {
    return (
        <Layout className="w-screen h-screen bg-primary-normal">
            <Card title={"Entrar no Sistema"} className="w-full max-w-xl">
                <div>
                    <label>Email</label>
                    <input className="block bg-gray-200 rounded p-1 w-full border-gray-300 border shadow-sm"
                           autoComplete={"email"}/>
                </div>
                <div className="mt-4">
                    <label>Senha</label>
                    <input className="block bg-gray-200 rounded p-1 w-full border-gray-300 border shadow-sm"
                           type={"password"}
                           autoComplete={"password"}/>
                </div>
                <div className="mt-4">
                    <Button>Login</Button>
                </div>
            </Card>
        </Layout>
    )
}
