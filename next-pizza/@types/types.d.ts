import { GetSearchParams } from "../lib/find-pizzas";

declare module "next" {
  interface PageProps {
    searchParams: GetSearchParams;
  }
}