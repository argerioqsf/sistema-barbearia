import { CircleIcon } from "../Icons/CircleIcon";
import { ClipboardIcon } from "../Icons/ClipboardIcon";
import { DashBoardIcon } from "../Icons/DashBoardIcon";
import { HandPointLeftIcon } from "../Icons/HandPointLeftIcon";
import { UsersIcon } from "../Icons/UsersIcon";

export type MockServer = typeof mockServer;

export const mockServer = {
  indicators: [
    {
      id: 1,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 2,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 3,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 4,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 5,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 6,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 7,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
  ],
  users: [
    {
      id: 1,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 2,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 3,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 4,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 5,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 6,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 7,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
  ],
  listActionsIndicators: [
    {
      id: 1,
      onclick: () => {},
      icon: "Edit",
      href: "indicators/edit",
      name: "Editar",
    },
    {
      id: 2,
      onclick: () => {},
      icon: "Eye",
      href: "home",
      name: "Vizualizar",
    },
    {
      id: 3,
      onclick: () => {},
      icon: "Lock",
      href: "home",
      name: "Desativar",
    },
    {
      id: 4,
      onclick: () => {},
      icon: "Link",
      href: "home",
      name: "Link",
    },
  ],
  listActionsUsers: [
    {
      id: 1,
      onclick: () => {},
      icon: "Edit",
      href: "users/edit",
    },
    {
      id: 2,
      onclick: () => {},
      icon: "Eye",
      href: "home",
    },
    {
      id: 3,
      onclick: () => {},
      icon: "Lock",
      href: "home",
    },
  ],
};
