import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Rodape from "./Rodape";

// informando ao jest o que ele tem que mocar de fato
jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockNavegar = jest.fn();
const mockSorteio = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: ()=> mockNavegar,
  };
});

jest.mock("../state/hook/useSorteador", () => {
  return {
    useSorteador: ()=> mockSorteio,
  };
});

describe("Quando não houver a quantidade de participantes suficientes", () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test("A brindadeira não pode se iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    expect(botao).toBeDisabled();
  });
});

describe("Quando houver a quantidade de participantes suficientes (3)", () => {
  const listaDeParticipantes = ["darlan", "pedro", "claudio"];

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(
      listaDeParticipantes
    );
  });

  test("A brindadeira pode se iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    expect(botao).not.toBeDisabled();
  });

  test("A brindeira foi iniciada", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    fireEvent.click(botao);

    expect(mockNavegar).toHaveBeenCalled();
    expect(mockNavegar).toHaveBeenCalledTimes(1)
    expect(mockNavegar).toHaveBeenCalledWith('/sorteio')

    expect(mockSorteio).toHaveBeenCalledTimes(1)

  });
});
