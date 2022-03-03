import api from "../lib/api";
import { Cost } from "../types/costTypes";

class CostController {
  async createCost(cost: Cost) {
    const result = await api
      .post("/costs", cost)
      .then((response) => ({
        success: true,
        data: response.data,
        message: "Usuário criado com sucesso",
      }))
      .catch((error) => ({
        success: false,
        message:
          error?.response?.data?.validation?.body?.message ||
          error?.response?.data?.message ||
          "Erro ao tentar criar usuário",
      }));

    return result;
  }

  async updateCost(costId: number, cost: Cost) {
    const result = await api
      .patch(`/costs/${costId}`, cost)
      .then((response) => ({
        success: true,
        data: response.data,
        message: "Usuário criado com sucesso",
      }))
      .catch((error) => ({
        success: false,
        message:
          error?.response?.data?.validation?.body?.message ||
          error?.response?.data?.message ||
          "Erro ao tentar atualizar usuário",
      }));

    return result;
  }

    async deleteCost(costId: number) {
    const result = await api
      .delete(`/costs/${costId}`)
      .then((response) => ({
        success: true,
        data: response.data,
        message: "Usuário criado com sucesso",
      }))
      .catch((error) => ({
        success: false,
        message:
          error?.response?.data?.validation?.body?.message ||
          error?.response?.data?.message ||
          "Erro ao tentar deletar usuário",
      }));

    return result;
  }
}
export default CostController;
