const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);


class AssistenteEstudantil {
    private generationConfig = {};
    private safetySettings: any;
    private modelo = "";
    private disciplina = "";
    private pergunta = "";
    private freeChat = true;
    private initChat = false;
    private conversa: any;

    constructor() {
        this.modelo = "gemini-1.5-pro-latest";
        // this.modelo = "gemini-1.0-pro";
        this.disciplina = "";
        this.pergunta = "";

        this.generationConfig = {
            "temperature": 0.80,
            "top_p": 0.90,
            "top_k": 0,
            // "max_output_tokens": 8192,
        }

        this.safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
            },
        ];

    }

    private geraModelo(systemInstruction = "") {
        const model = genAI.getGenerativeModel({ model: this.modelo, generationConfig: this.generationConfig, safetySettings: this.safetySettings, systemInstruction: systemInstruction });

        return model;
    }

    private async definiAreaConhecimento() {

        const model = this.geraModelo()

        const prompt_parts = [
            "Qual a área de conhecimento do ensino fundamental ou médio, pertence essa pegunta?",
            "pergunta: quais são as 3 leis de newton",
            "física",
            "pergunta: o que foi a reforma protestante",
            "historia",
            "pergunta: o que é revolta de canudos?",
            "história",
            "pergunta: quais são os relevos do brasil",
            "geografia",
            "pergunta: me explica cadeia alimentar",
            "biologia",
        ]

        prompt_parts.push(`pergunta: ${this.pergunta}`);
        // prompt_parts.push(`pergunta: ${p}`);
        prompt_parts.push(" ");

        const result = await model.generateContent(prompt_parts)
        this.disciplina = result.response.text();
        return this.disciplina;
    }

    private geraModeloConversa() {
        const system_instruction = `aja como como um doutor em ${this.disciplina} com especialização em ensino de jovens que dar aula no ensino fundamental e busca ter uma didática simples e direta, voltada para para o jovem, com uma linguagem semelhante a utilizada em mídias sociais`;
        const model = this.geraModelo(system_instruction);
        this.conversa = model.startChat({ history: [] });
    }

    private async chatConhecimento() {
        // let conversa: any;
        // if (!this.initChat) {
        //     const system_instruction = `aja como como um doutor em ${this.disciplina} com especialização em ensino de jovens que dar aula no ensino fundamental e busca ter uma didática simples, voltada para para o jovem, com linguagem a mesma linguagem utilizada em mídias sociais e direta`;
        //     const model = this.geraModelo(system_instruction);
        //     const conversa = model.startChat({ history: [] });
        //     this.initChat = true;
        // }
        // else {
        //     const resposta = await conversa.sendMessage(this.pergunta);
        //     return resposta;
        // }

        const resposta = await this.conversa.sendMessage(this.pergunta);
        console.log(resposta)
        return resposta;

    }

    public async professor(pergunta: string) {
        this.pergunta = pergunta;
        if (this.freeChat) {
            this.definiAreaConhecimento();
            this.geraModeloConversa();
            this.freeChat = false;
        }

        const resposta = await this.chatConhecimento();

        return resposta.response.text();
    }

    public restartChat() {
        this.freeChat = true;
        this.disciplina = "";
        this.pergunta = "";
    }
}

const novoAssistente = new AssistenteEstudantil();

export default novoAssistente;
