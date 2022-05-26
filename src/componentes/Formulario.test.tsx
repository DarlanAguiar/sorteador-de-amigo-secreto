import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe("O comportamento do formulario.TSX", () => {
  test("Quando o input estiver vazio, nao pode adicionar novos participantes", () => {
    //renderizar o componente de teste
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    const botao = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso o formulario estiver preechido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByTestId("inputNomes");

    const botao = screen.getByRole("button");

    fireEvent.change(input, { terget: { value: "Darlan" } });

    fireEvent.click(botao);

    expect(input).toHaveValue("");

    expect(input).toHaveFocus();
  });

  test("Nomes duplicados não podem ser adicionado na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByTestId("inputNomes");

    const botao = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Darlan" } });
    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "Darlan" } });
    fireEvent.click(botao);

    //pegando o conteudo do alert
    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos"
    );
  });

  test("A mensagem de erro deve sumir após os times", () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByTestId("inputNomes");

    const botao = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Darlan" } });
    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "Darlan" } });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    //esperar mensagem apagar
    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
