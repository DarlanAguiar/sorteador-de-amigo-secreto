import React from "react";
import Card from "../card";
import Formulario from "../Formulario";
import ListaParticipantes from "../ListaParticipantes";
import Rodape from "../Rodape";

interface Props {}

function Configuracao(props: Props) {
  const {} = props;

  return (
    <Card>
      <section>
        <h2>Vamos começar!</h2>
        <Formulario />
        <ListaParticipantes />
        <Rodape />
      </section>
    </Card>
  );
}

export default Configuracao;
