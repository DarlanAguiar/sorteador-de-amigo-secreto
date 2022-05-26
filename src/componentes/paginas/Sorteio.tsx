import React, { useState } from "react";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../../state/hook/useResultadoDoSorteio";
import Card from "../card";
import "./Sorteio.css";

interface Props {}

function Sorteio(props: Props) {
  const {} = props;

  const [participanteDaVez, setParticipanteDaVez] = useState("");
  const [amigoSecreto, setAmigoSecreto] = useState("");

  const participantes = useListaDeParticipantes();

  const resultado = useResultadoDoSorteio();

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!);

      setTimeout(() => {
        setAmigoSecreto("");
      }, 10000);
    }
  };

  return (
    <Card>
      <section className="sorteio">
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select
            required
            name="participanteDaVez"
            id="participanteDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={(evento) => setParticipanteDaVez(evento.target.value)}
          >
            <option>Selecione seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
          <button className="botao-sortear" type="submit">
            Sortear
          </button>
        </form>
        {amigoSecreto && (
          <p className="resultado" role={"alert"}>
            {amigoSecreto}
          </p>
        )}

        <footer className="sorteio">
          <img
            src="/imagens/aviao.png"
            className="aviao"
            alt="Um desenho de um avião de papel"
          />
        </footer>
      </section>
    </Card>
  );
}

export default Sorteio;
