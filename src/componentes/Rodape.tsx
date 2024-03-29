import React from "react";
import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useSorteador } from "../state/hook/useSorteador";

import './Rodape.css'

interface Props {}

function Rodape(props: Props) {
  const {} = props;

  const participantes = useListaDeParticipantes();

  const navegarPara= useNavigate()

  const sortear = useSorteador()

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }

  return (
    <footer className="rodape-configuracoes">
      <button className="botao" disabled={participantes.length < 3} onClick={iniciar}>Iniciar Brincadeira</button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
}

export default Rodape;
