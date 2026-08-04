<script setup>
</script>

<template>
    <div class="cadastroPro">
        <div class="topo">
            <h1>Cadastro de Profissional</h1>
            <div class="bemvindo">
                <h2>Bem-vindo</h2>
                <h3>Ao NutriVitae</h3>
            </div>
        </div>
        <div class="form">
            <input type="text" placeholder="Nome" class="nome" required />
            <input type="email" placeholder="Email" class="email" required />
            <input type="number" placeholder="CPF" class="cpf" required />
            <input type="number" placeholder="Telefone" class="telefone" required/>
            <input type="date" placeholder="Data de Nascimento" class="data" required/>
            <div class="senha">
            <input type="password" placeholder="senha" class="senha" required />
            <input type="password" placeholder="confirme a senha" class="senha" required />
            </div>
            <button type="submit">Cadastrar</button>
        </div>
    </div>
</template>

<style scoped>
.cadastroPro {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    & .topo {
        display: flex;
        width: 100%;
        text-align: center;
        align-items: center;

        & h1 {
            font-size: 4rem;
            color: #73441B;
            width: 50%;

        }

        & .bemvindo {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #73441B;
            border-radius: 0 0 0 300px;
            margin: 0 0 30px 0;

            & h2 {
                margin: 20px 0 0 0;
                font-size: 4rem;
                color: #fff;
            }

            & h3 {
                margin: 0 0 20px 0;
                font-size: 4rem;
                color: #fff;
            }
        }
    }

    & .form {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        align-items: center;
        text-align: center;
        & input {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #73441B;
            border-radius: 20px;
            background-color: #D1BFA5;
            font-family: "Italiana", serif;
            font-size: 30px;
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
            margin: 20px;
            width: 40%;
            &::placeholder {
                color: #536236;
                font-family: "Italiana", serif;
                font-weight: bold;
                
            }
        }
        & .senha{
            display: flex;
            width: 100%;
            justify-content: space-between;
            & input{
                background-color: #9A9E70;
            }
        }
        & button{
            margin: 20px;
            padding: 10px;
            border: 1px solid #73441B;
            border-radius: 20px;
            background-color: #536236;
            font-family: "Italiana", serif;
            font-size: 30px;
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
            width: 40%;
            cursor: pointer;
            color: #9A9E70;
        }
    }
}
</style>
