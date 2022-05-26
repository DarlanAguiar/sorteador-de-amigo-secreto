import React from "react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";

interface Props {}

function ListaParticipantes(props: Props) {
  const {} = props;

  const participantes: string[] = useListaDeParticipantes();

  return (
    <ul>
      {participantes.map((participante) => (
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  );
}

export default ListaParticipantes;
