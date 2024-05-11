"use client"
import { PaperPlaneRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import novoAssistente from "@/aistudio/aistdio";
import Markdown from "react-markdown";

export default function Main() {
    const [resposta, setResposta] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function perguntaGemini() {
        setCarregando(true);
        const responseText = await novoAssistente.professor(pergunta);
        setCarregando(false);
        setResposta(responseText);
        setPergunta("");
    }

    function reinicarChat() {
        novoAssistente.restartChat();
        setPergunta("");
        setResposta("");
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            perguntaGemini();
        }
    }

    return (
        <main className="container mx-auto flex flex-col items-center justify-center pt-12 px-4">

            <div className="w-full md:w-2/3 lg:w-1/2 flex">
                <Input type="text" value={pergunta} placeholder="Escreva sua dúvida" onChange={(e) => setPergunta(e.target.value)} onKeyDown={e => handleKeyPress(e)} />
                <Button className="bg-blue-500 ms-2" variant="outline" onClick={perguntaGemini} >
                    <PaperPlaneRight size={16} className="" />
                </Button>
            </div>

            {resposta && (
                <button className="font-light text-sm mt-2 justify-end" onClick={reinicarChat}>Nova conversa</button>
            )}

            {carregando && (
                <div className="font-light text-sm mt-4">
                    Calma ai... 🤔
                </div>
            )}

            <div className="flex flex-col items-center w-full md:w-2/3 lg:w-1/2">
                {resposta && (
                    <Card className="w-full mt-4 mb-10">
                        <CardContent className="p-4">
                            <Markdown>
                                {resposta}

                            </Markdown>
                        </CardContent>
                    </Card>
                )}
            </div>


        </main>
    )
}
