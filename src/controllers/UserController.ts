import api from "../lib/api";
import { User } from "../types/userTypes";

class UserController {
  async createUser(user: User) {
    const result = await api
      .post("/users", user)
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

  async updateUser(userId: number, user: User) {
    const result = await api
      .patch(`/users/${userId}`, user)
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

    async deleteUser(userId: number) {
    const result = await api
      .delete(`/users/${userId}`)
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
export default UserController;
