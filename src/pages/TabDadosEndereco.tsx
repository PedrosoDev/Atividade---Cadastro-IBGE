import { ChangeEvent, cloneElement, useState } from "react";
import InputCidades from "../components/InputCidades";
import InputEstados from "../components/InputEstados";
import InputMask from "react-input-mask";

export default function () {
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [complemento, setComplemento] = useState("");

  function onKeyUpCEP(event: React.KeyboardEvent<HTMLInputElement>) {
    const cep = event.currentTarget.value;
    if (cep.includes("_")) return;

    buscarCep(cep);
  }

  async function buscarCep(cep: string) {
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const response = await request.json();

    setUf(response.uf);
    setCidade(response.localidade);
    setBairro(response.bairro);
    setRua(response.logradouro);
    setComplemento(response.complemento);
  }

  function x(set: React.Dispatch<React.SetStateAction<string>>) {
    return (event: any) => set(event.currentTarget.value);
  }

  return (
    <>
      <h1>Cadastro: Dados de Endereço</h1>
      <InputMask onKeyUp={onKeyUpCEP} mask="99999-999" placeholder="CEP" />
      <InputEstados uf={uf} setUf={setUf} />
      <InputCidades uf={uf} cidade={cidade} setCidade={setCidade} />
      <input
        type="text"
        onKeyUp={x(setBairro)}
        defaultValue={bairro}
        placeholder="Bairro"
      />
      <input onKeyUp={x(setRua)} defaultValue={rua} placeholder="Rua" />
      <input
        onKeyUp={x(setComplemento)}
        defaultValue={complemento}
        placeholder="Complemento"
      />
    </>
  );
}
