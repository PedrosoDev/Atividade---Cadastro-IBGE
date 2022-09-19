import { useEffect, useState } from "react";
interface Props {
  uf: string;
  cidade: string;
  setCidade: React.Dispatch<React.SetStateAction<string>>;
}
export default function ({ uf, cidade, setCidade }: Props) {
  const [loading, setLoading] = useState(false);
  const [cidades, setCidades] = useState([]);

  async function buscarCidades() {
    setLoading(true);
    const request = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const cidades = await request.json();
    setLoading(false);
    setCidades(cidades);
  }

  useEffect(() => {
    buscarCidades();
  }, [uf]);

  return (
    <>
      {loading ? (
        "Carregando"
      ) : (
        <select
          onChange={(event) => setCidade(event.currentTarget.value)}
          value={cidade}
        >
          {cidade == "" ? (
            <option value="">
              --Selecione {uf == "" ? "um Estado" : "uma Cidade"}--
            </option>
          ) : (
            ""
          )}
          {cidades.map(({ nome }, idx) => (
            <option key={idx}>{nome}</option>
          ))}
        </select>
      )}
    </>
  );
}
