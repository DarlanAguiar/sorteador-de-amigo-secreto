import React, { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipantes";
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro";

import './Formulario.css'

interface Props {}

function Formulario(props: Props) {
  const {} = props;

  const [nome, setNome] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNalista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNalista(nome);
    setNome("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={adicionarParticipante}>
      <div className="grupo-input-btn">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          placeholder="Insira os nomes dos participantes"
          data-testid={"inputNomes"}
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
        />
        <button disabled={!nome}>Adicionar</button>
        {mensagemDeErro && <p role="alert" className="alerta erro" >{mensagemDeErro}</p>}
      </div>
    </form>
  );
}

export default Formulario;
