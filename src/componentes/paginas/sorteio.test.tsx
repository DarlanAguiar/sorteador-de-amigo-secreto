import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../../state/hook/useResultadoDoSorteio";
import Sorteio from "./Sorteio";

// informando ao jest o que ele tem que mocar de fato
jest.mock("../../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../../state/hook/useResultadoDoSorteio", () => {
  return {
    useResultadoDoSorteio: jest.fn(),
  };
});

describe("A pagina de sorteio", () => {
  const participantes = ["Darlan", "Mayara", "Theo"];

  const resultado = new Map([
    ["Darlan", "Theo"],
    ["Theo", "Mayara"],
    ["Mayara", "Darlan"],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test("Todos os participantes podem exibir o seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole("option");

    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test("O amigo secreto é exibido quando solicitado", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText("Selecione o seu nome");
    //adicionando um valor
    fireEvent.change(select, { target: { value: participantes[0] } });

    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole("alert");

    expect(amigoSecreto).toBeInTheDocument();

    act(()=> {
      jest.runAllTimers()
    })

    expect(amigoSecreto).not.toBeInTheDocument();

    
  
  });
});
